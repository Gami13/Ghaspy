package main

import (
	"context"
	"crypto/rand"
	"crypto/subtle"
	"encoding/base64"
	"errors"
	"ghaspy_server/src/types"

	"net/http"
	"net/smtp"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/argon2"
	"google.golang.org/protobuf/proto"
)

func logInUser(c *fiber.Ctx) error {
	requestBody := types.RequestLogInUser{}

	err := proto.Unmarshal(c.Body(), &requestBody)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "cantUnmarshal")
	}
	logger.Println("LOGGING IN: ", requestBody.Email)

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")

	var userId uint64
	var salt string
	var hash string
	var isValidated bool

	err = dbpool.QueryRow(context.Background(), "SELECT id, salt, password, isValidated FROM users WHERE email = $1", requestBody.Email).Scan(&userId, &salt, &hash, &isValidated)

	if err != nil {
		return protoError(c, http.StatusBadRequest, "loginDataIncorrect")
	}
	if !isValidated {

		return protoError(c, http.StatusBadRequest, "loginUnvalidated")

	}
	match := comparePasswordAndHash(requestBody.Password, hash, salt)

	if !match {
		return protoError(c, http.StatusBadRequest, "loginDataIncorrect")

	}

	token, snowflake, err := generateToken()
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "loginCantGenerateToken")

	}

	_, err = dbpool.Exec(context.Background(), "INSERT INTO tokens (id, userId, token, device) VALUES ($1, $2, $3, $4)", snowflake, userId, token, requestBody.DeviceName)
	if err != nil {
		return protoError(c, http.StatusBadRequest, "loginCantInsertToken")

	}
	logger.Println("USER LOGGED IN: ", requestBody.Email)

	return protoSuccess(c, http.StatusOK, &types.ResponseLogInUser{Token: token, UserID: userId, Message: "userLoggedIn"})

}

// PASSWORD REQUIREMENTS
// 8 characters minimum
// 1 uppercase letter
// 1 lowercase letter
// 1 number
func isPasswordValid(password string) []string {
	var errors []string
	if len(password) < 8 {
		errors = append(errors, "signupPasswordTooShort")
	}
	if regexp.MustCompile(`\s`).MatchString(password) {
		errors = append(errors, "signupPasswordNoSpaces")
	}
	if !regexp.MustCompile(`[a-z]`).MatchString(password) {
		errors = append(errors, "signupPasswordLetter")
	}
	if !regexp.MustCompile(`[0-9]`).MatchString(password) {
		errors = append(errors, "signupPasswordNumber")
	}
	if !regexp.MustCompile(`[A-Z]`).MatchString(password) {
		errors = append(errors, "signupPasswordCapital")
	}
	return errors
}

// USERNAME REQUIREMENTS
// 3 characters minimum
// 64 characters maximum
// no spaces
// no special characters except for _ and - and . and ,

func isUsernameValid(username string) []string {
	var errors []string
	if len(username) < 3 {
		errors = append(errors, "signupUsernameTooShort")
	}
	if len(username) > 64 {
		errors = append(errors, "signupUsernameTooLong")
	}
	if regexp.MustCompile(`\s`).MatchString(username) {
		errors = append(errors, "signupUsernameNoSpaces")
	}
	if !regexp.MustCompile(`[a-zA-Z0-9_.,-]`).MatchString(username) {
		errors = append(errors, "signupUsernameNoSpecials")
	}
	return errors
}

func signUpUser(c *fiber.Ctx) error {
	requestBody := types.RequestSignUpUser{}
	err := proto.Unmarshal(c.Body(), &requestBody)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "cantUnmarshal")
	}
	logger.Println("REGISTERING: ", requestBody.Email, requestBody.Username, requestBody.Password)

	passwordErrors := isPasswordValid(requestBody.Password)
	usernameErrors := isUsernameValid(requestBody.Username)
	var emailErrors []string

	if requestBody.Email == "" || requestBody.Email[0] == '@' || requestBody.Email[len(requestBody.Email)-1] == '@' || !strings.Contains(requestBody.Email, "@") {
		logger.Println("EMAIL INVALID", !strings.Contains(requestBody.Email, "@"), requestBody.Email)
		emailErrors = append(emailErrors, "emailInvalid")
	}

	if len(passwordErrors) > 0 || len(usernameErrors) > 0 || len(emailErrors) > 0 {
		return protoSuccess(c, http.StatusBadRequest, &types.ResponseSignUpUserError{
			PasswordErrors: passwordErrors,
			UsernameErrors: usernameErrors,
			EmailErrors:    emailErrors,
		})

	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")

	var rowAmount int
	err = dbpool.QueryRow(context.Background(), "SELECT COUNT(id) FROM users WHERE username = $1", requestBody.Username).Scan(&rowAmount)
	if err != nil {
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	if rowAmount != 0 {
		//TODO: IF USERNAME IS TAKEN BUT ISNT VERIFIED, AND THE VERIFICATION CODE IS NO LONGER VALID, DELETE THE USER AND REGISTER A NEW ONE
		return protoSuccess(c, http.StatusBadRequest, &types.ResponseSignUpUserError{
			UsernameErrors: []string{"usernameTaken"},
		})

	}

	err = dbpool.QueryRow(context.Background(), "SELECT COUNT(id) FROM users WHERE email = $1", requestBody.Email).Scan(&rowAmount)
	if err != nil {
		logger.Println("ERROR: ", err)

		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	if rowAmount != 0 {
		return protoSuccess(c, http.StatusBadRequest, &types.ResponseSignUpUserError{
			EmailErrors: []string{"emailTaken"},
		})

	}

	hash, salt, err := preparePassword(requestBody.Password)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	logger.Println("HASH: ", hash, "SALT: ", salt)

	userId := newSnowflake(SF_USER)

	verificationCode, err := addVerificationCode(c, userId)
	if err != nil {

		return protoError(c, http.StatusInternalServerError, "internalError")

	}
	_, err = dbpool.Exec(context.Background(), "INSERT INTO users (id, username, email, password,salt,isValidated) VALUES ($1, $2, $3,$4,$5,$6)", userId, requestBody.Username, requestBody.Email, hash, salt, false)
	if err != nil {
		return protoError(c, http.StatusInternalServerError, "internalError")

	}
	//SEND EMAIL WITH VERIFICATION CODE

	err = sendMail(requestBody.Email, "Verify your email for Ghaspy", "Verify your account by clicking this link: "+os.Getenv("FRONTEND_URL")+"/validate/"+verificationCode)

	if err != nil {
		return protoError(c, http.StatusInternalServerError, "internalError")
	}

	return protoSuccess(c, http.StatusOK, &types.ResponseSignUpUser{Message: "userRegistered"})

}

func logOutUser(c *fiber.Ctx) error {

	var token = c.GetReqHeaders()["Authorization"][0]

	logger.Println("LOGGING OUT: ", token)

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")

	res, err := dbpool.Exec(context.Background(), "DELETE FROM tokens WHERE token = $1", token)
	println("ROWS AFFECTED: ", res.RowsAffected(), res.Delete(), res.String())
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")

	}
	if res.RowsAffected() == 0 {
		return protoError(c, http.StatusBadRequest, "invalidToken")

	}

	return protoSuccess(c, http.StatusOK, &types.ResponseLogOutUser{Message: "userLoggedOut"})
}

func validateUser(c *fiber.Ctx) error {
	valCode := c.Params("valId")
	logger.Println("Validating: " + valCode)
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")

	row := dbpool.QueryRow(context.Background(), "SELECT id, userId, code, validUntil  FROM verifications WHERE code LIKE $1", valCode)

	var id int64
	var userId uint64
	var code string
	var validUntil time.Time
	err := row.Scan(&id, &userId, &code, &validUntil)
	if err != nil {
		logger.Println("ERROR 1: ", err)
		return protoError(c, http.StatusBadRequest, "verificationCodeInvalid")
	}
	logger.Println("ID: ", id, "USERID: ", userId, "CODE: ", code, "VALIDUNTIL: ", validUntil)

	if time.Now().After(validUntil) {
		verificationCode, err := addVerificationCode(c, Snowflake(userId))
		if err != nil {
			return protoError(c, http.StatusInternalServerError, "internalError")

		}
		//GET EMAIL
		row := dbpool.QueryRow(context.Background(), "SELECT email FROM users WHERE id = $1", userId)
		var email string
		err = row.Scan(&email)
		if err != nil {
			return protoError(c, http.StatusInternalServerError, "internalError")

		}
		sendMail(email, "Verify your email for Ghaspy", "Verify your account by clicking this link: "+os.Getenv("FRONTEND_URL")+"/validate/"+verificationCode)

		return protoError(c, http.StatusBadRequest, "verificationCodeOutdated")

	}
	//CHECK IF USER IS ALREADY VALIDATED
	var isValidated bool
	err = dbpool.QueryRow(context.Background(), "SELECT isValidated FROM users WHERE id = $1", userId).Scan(&isValidated)
	if err != nil {
		return protoError(c, http.StatusInternalServerError, "internalError")

	}
	if isValidated {
		return protoError(c, http.StatusBadRequest, "userAlreadyValidated")
	}

	_, err = dbpool.Exec(context.Background(), "UPDATE users SET isValidated = true WHERE id = $1", userId)
	if err != nil {
		return protoError(c, http.StatusInternalServerError, "internalError")

	}

	return protoSuccess(c, http.StatusOK, &types.ResponseValidateUser{Message: "userValidated"})

}

func generateRandomBytes(n uint32) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	if err != nil {
		return nil, err
	}

	return b, nil
}

func base64URL(data []byte) string {
	result := base64.StdEncoding.EncodeToString(data)
	result = strings.Replace(result, "+", "-", -1) // 62nd char of encoding
	result = strings.Replace(result, "/", "_", -1) // 63rd char of encoding
	result = strings.Replace(result, "=", "", -1)  // Remove any trailing '='s

	return result
}

func addVerificationCode(c *fiber.Ctx, userId Snowflake) (string, error) {
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")

	verificationId := newSnowflake(SF_VERIFICATION)
	verificationBytes, err := generateRandomBytes(96)
	if err != nil {
		logger.Println("ERROR: ", err)
		return "", err
	}
	var verificationCode = base64URL(verificationBytes)
	logger.Println("VERIFICATION CODE: ", verificationCode)

	//CURRENT TIME + 1 WEEK
	//DESIRED FORMAT '2002-03-11 12:01AM'
	validUntil := time.Now().AddDate(0, 0, 7).Format("2006-01-02 03:04PM")
	_, err = dbpool.Exec(context.Background(), "INSERT INTO verifications (id,userId, code, validUntil) VALUES ($1, $2, $3, $4)", verificationId, userId, verificationCode, validUntil)

	if err != nil {
		logger.Println("VERIFICATION ERROR: ", err)
		return "", err
	}

	return verificationCode, nil
}

const memory = 16 * 1024
const iterations = 4
const parallelism = 1
const saltLength = 16
const keyLength = 164
const pepper = "4m0N6U51Sl0V3"

func preparePassword(password string) (hashR string, saltR string, errR error) {
	salt, err := generateRandomBytes(saltLength)
	if err != nil {
		return "", "", err
	}
	password = pepper + password

	hash := argon2.IDKey([]byte(password), salt, iterations, memory, parallelism, keyLength)

	// Base64 encode the salt and hashed password.
	b64Salt := base64.RawStdEncoding.EncodeToString(salt)
	b64Hash := base64.RawStdEncoding.EncodeToString(hash)

	return b64Hash, b64Salt, nil
}

func comparePasswordAndHash(password string, hash string, salt string) (match bool) {
	// hash.
	password = pepper + password
	saltBytes, _ := base64.RawStdEncoding.DecodeString(salt)

	hashBytes, _ := base64.RawStdEncoding.DecodeString(hash)
	println("HASH: ", hashBytes)

	// Derive the key from the other password using the same parameters.
	otherHash := argon2.IDKey([]byte(password), saltBytes, iterations, memory, parallelism, keyLength)
	println("OTHER HASH: ", otherHash)

	// Check that the contents of the hashed passwords are identical. Note
	// that we are using the subtle.ConstantTimeCompare() function for this
	// to help prevent timing attacks.
	if subtle.ConstantTimeCompare(hashBytes, otherHash) == 1 {
		return true
	}
	return false
}

func generateToken() (token string, snowflake Snowflake, err error) {
	snowflake = newSnowflake(SF_TOKEN)

	tokenBytes, err := generateRandomBytes(128)
	if err != nil {
		return "", snowflake, err
	}
	token = base64URL(tokenBytes)
	finalToken := snowflake.String() + "." + token
	return finalToken, snowflake, nil
}

func sendMail(address string, subject string, body string) error {
	email := os.Getenv("EMAIL_USERNAME")
	password := os.Getenv("EMAIL_PASSWORD")
	host := os.Getenv("EMAIL_HOST")
	auth := LoginAuth(email, password)
	to := []string{address}
	msg := []byte(
		"To: " + address + "\r\n" +
			"Subject: " + subject + "\r\n" +
			"\r\n" +
			body + "\r\n")
	err := smtp.SendMail(host+":587", auth, email, to, msg)
	if err != nil {
		logger.Println("ERROR: ", err)
		return err
	}
	return nil
}

type loginAuth struct {
	username, password string
}

func LoginAuth(username, password string) smtp.Auth {
	return &loginAuth{username, password}
}

func (a *loginAuth) Start(server *smtp.ServerInfo) (string, []byte, error) {
	return "LOGIN", []byte{}, nil
}

func (a *loginAuth) Next(fromServer []byte, more bool) ([]byte, error) {
	if more {
		switch string(fromServer) {
		case "Username:":
			return []byte(a.username), nil
		case "Password:":
			return []byte(a.password), nil
		default:
			return nil, errors.New("unkown fromServer")
		}
	}
	return nil, nil
}
