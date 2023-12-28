package main

import (
	"context"
	"encoding/json"
	"regexp"
	"strings"
	"time"

	"crypto/rand"
	"encoding/base64"
	"net/mail"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/argon2"
)

func loginUser(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "UNDER CONSTRUCTION",
	})
}

// PASSWORD REQUIREMENTS
// 8 characters minimum
// 1 uppercase letter
// 1 lowercase letter
// 1 number
func isPasswordValid(password string) []string {
	var errors []string
	if len(password) < 8 {
		errors = append(errors, "Password must be at least 8 characters long")
	}
	if regexp.MustCompile(`\s`).MatchString(password) {
		errors = append(errors, "Password cant contain spaces")
	}
	if !regexp.MustCompile(`[a-z]`).MatchString(password) {
		errors = append(errors, "Password must contain at least one lowercase letter")
	}
	if !regexp.MustCompile(`[0-9]`).MatchString(password) {
		errors = append(errors, "Password must contain at least one number")
	}
	if !regexp.MustCompile(`[A-Z]`).MatchString(password) {
		errors = append(errors, "Password must contain at least one uppercase letter")
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
		errors = append(errors, "Username must be at least 3 characters long")
	}
	if len(username) > 64 {
		errors = append(errors, "Username must be at most 64 characters long")
	}
	if regexp.MustCompile(`\s`).MatchString(username) {
		errors = append(errors, "Username must not contain spaces")
	}
	if !regexp.MustCompile(`[a-zA-Z0-9_.,-]`).MatchString(username) {
		errors = append(errors, "Username must not contain special characters")
	}
	return errors
}

func registerUser(c *fiber.Ctx) error {
	requestBody := new(RegisterRequestBody)

	//DOESNT WORK
	// if err := c.BodyParser(requestBody); err != nil {
	// 	logger.Println("ERROR: ", err)
	// 	return err
	// }
	if err := json.Unmarshal(c.Body(), requestBody); err != nil {
		logger.Println("ERROR: ", err)
		return err
	}
	logger.Println("REGISTERING: ", requestBody.Email)

	passwordErrors := isPasswordValid(requestBody.Password)
	usernameErrors := isUsernameValid(requestBody.Nickname)
	var emailErrors []string

	if _, err := mail.ParseAddress(requestBody.Email); err != nil {

		emailErrors = append(emailErrors, "Invalid email address")
	}

	if len(passwordErrors) > 0 || len(usernameErrors) > 0 || len(emailErrors) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"passwordErrors": passwordErrors,
			"usernameErrors": usernameErrors,
			"emailErrors":    emailErrors,
		})

	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")

	//CHECK IF USERNAME IS TAKEN
	var rowAmount int
	err := dbpool.QueryRow(context.Background(), "SELECT COUNT(id) FROM users WHERE username = $1", requestBody.Nickname).Scan(&rowAmount)
	if err != nil {
		logger.Println("ERROR: ", err)
		return err
	}
	if rowAmount != 0 {
		//TODO: IF USERNAME IS TAKEN BUT ISNT VERIFIED, AND THE VERIFICATION CODE IS NO LONGER VALID, DELETE THE USER AND REGISTER A NEW ONE
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"usernameErrors": []string{"Username is already taken"},
		})
	}
	//CHECK IF EMAIL IS TAKEN
	err = dbpool.QueryRow(context.Background(), "SELECT COUNT(id) FROM users WHERE email = $1", requestBody.Email).Scan(&rowAmount)
	if err != nil {
		logger.Println("ERROR: ", err)
		return err
	}
	if rowAmount != 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"emailErrors": []string{"Email is already taken"},
		})
	}
	//TODO: REGISTER USER HERE

	//PREPARE PASSWORD
	hash, salt, err := preparePassword(requestBody.Password, 16*1024, 4, 1, 16, 164)
	if err != nil {
		logger.Println("ERROR: ", err)
		return err
	}
	logger.Println("HASH: ", hash, "SALT: ", salt)
	//TODO:INSERT INTO users (username, email, password,salt,isValidated) VALUES ($1, $2, $3,$4,$5)

	userId := newSnowflake("0000")
	_, err = dbpool.Exec(context.Background(), "INSERT INTO users (id, username, email, password,salt,isValidated) VALUES ($1, $2, $3,$4,$5,$6)", userId.ID, requestBody.Nickname, requestBody.Email, hash, salt, false)
	if err != nil {
		logger.Println("ERROR: ", err)
		return err
	}

	//TODO:INSERT INTO verifications (userId, code, validUntil) VALUES ($1, $2, $3)
	err = addVerificationCode(c, userId.ID)
	if err != nil {
		logger.Println("ERROR: ", err)
		return err
	}

	//TODO:SEND EMAIL WITH VERIFICATION CODE

	return c.Status(200).JSON(fiber.Map{
		"message": "User registered successfully",
	})

}
func validateUser(c *fiber.Ctx) error {
	valCode := c.Params("valId")
	logger.Println("Validating: " + valCode)
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	//TODO: CHECK IF VALIDATION CODE IS still VALID

	row := dbpool.QueryRow(context.Background(), "SELECT id, userId, code, validUntil  FROM verifications WHERE code LIKE $1", valCode)

	var id int64
	var userId int64
	var code string
	var validUntil time.Time
	err := row.Scan(&id, &userId, &code, &validUntil)
	if err != nil {
		logger.Println("ERROR 1: ", err)
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid verification code",
		})
	}
	logger.Println("ID: ", id, "USERID: ", userId, "CODE: ", code, "VALIDUNTIL: ", validUntil)

	if err != nil {
		logger.Println("ERROR 2: ", err)
		return err
	}
	if time.Now().After(validUntil) {
		addVerificationCode(c, userId)
		//TODO:Send email
		return c.Status(400).JSON(fiber.Map{
			"message": "Verification code is no longer valid, a new one has been sent to your email",
		})
	}
	//CHECK IF USER IS ALREADY VALIDATED
	var isValidated bool
	err = dbpool.QueryRow(context.Background(), "SELECT isValidated FROM users WHERE id = $1", userId).Scan(&isValidated)
	if err != nil {
		logger.Println("ERROR 3: ", err)
		return err
	}
	if isValidated {
		return c.Status(400).JSON(fiber.Map{
			"message": "User is already validated",
		})
	}

	_, err = dbpool.Exec(context.Background(), "UPDATE users SET isValidated = true WHERE id = $1", userId)
	if err != nil {
		logger.Println("ERROR 4: ", err)
		return err
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "User validated successfully",
	})
}

func generateRandomBytes(n uint32) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	if err != nil {
		return nil, err
	}

	return b, nil
}

func preparePassword(password string, memory uint32, iterations uint32, parallelism uint8, saltLength uint32, keyLength uint32) (hashR string, saltR string, errR error) {
	salt, err := generateRandomBytes(saltLength)
	if err != nil {
		return "", "", err
	}
	password = "4m0N6U51Sl0V3" + password

	hash := argon2.IDKey([]byte(password), salt, iterations, memory, parallelism, keyLength)

	// Base64 encode the salt and hashed password.
	b64Salt := base64.RawStdEncoding.EncodeToString(salt)
	b64Hash := base64.RawStdEncoding.EncodeToString(hash)

	return b64Hash, b64Salt, nil
}

func base64URL(data []byte) string {
	result := base64.StdEncoding.EncodeToString(data)
	result = strings.Replace(result, "+", "-", -1) // 62nd char of encoding
	result = strings.Replace(result, "/", "_", -1) // 63rd char of encoding
	result = strings.Replace(result, "=", "", -1)  // Remove any trailing '='s

	return result
}

func addVerificationCode(c *fiber.Ctx, userId int64) error {
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")

	verificationId := newSnowflake("0001")
	verificationBytes, err := generateRandomBytes(96)
	if err != nil {
		logger.Println("ERROR: ", err)
		return err
	}
	var verificationCode = base64URL(verificationBytes)
	logger.Println("VERIFICATION CODE: ", verificationCode)

	//CURRENT TIME + 1 WEEK
	//DESIRED FORMAT '2002-03-11 12:01AM'
	validUntil := time.Now().AddDate(0, 0, 7).Format("2006-01-02 03:04PM")
	_, err = dbpool.Exec(context.Background(), "INSERT INTO verifications (id,userId, code, validUntil) VALUES ($1, $2, $3, $4)", verificationId.ID, userId, verificationCode, validUntil)

	if err != nil {
		logger.Println("VERIFICATION ERROR: ", err)
		return err
	}
	return nil
}
