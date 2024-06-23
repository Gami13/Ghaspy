package utils

import (
	"crypto/rand"
	"crypto/subtle"
	"encoding/base64"
	"errors"
	"fmt"
	"ghaspy_server/src/snowflake"
	"io"
	"mime"
	"mime/multipart"
	"net/smtp"
	"os"
	"regexp"
	"strings"

	"golang.org/x/crypto/argon2"
)

func GenerateRandomBytes(n uint32) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	if err != nil {
		return nil, err
	}

	return b, nil
}

func Base64URL(data []byte) string {
	result := base64.StdEncoding.EncodeToString(data)
	result = strings.Replace(result, "+", "-", -1) // 62nd char of encoding
	result = strings.Replace(result, "/", "_", -1) // 63rd char of encoding
	result = strings.Replace(result, "=", "", -1)  // Remove any trailing '='s

	return result
}

const memory = 16 * 1024
const iterations = 4
const parallelism = 1
const saltLength = 16
const keyLength = 164
const pepper = "4m0N6U51Sl0V3"

func PreparePassword(password string) (hashR string, saltR string, errR error) {
	salt, err := GenerateRandomBytes(saltLength)
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

func ComparePasswordAndHash(password string, hash string, salt string) (match bool) {
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
	return subtle.ConstantTimeCompare(hashBytes, otherHash) == 1
}

func GenerateToken() (token string, sw snowflake.Snowflake, err error) {
	sw = snowflake.New(snowflake.TOKEN)

	tokenBytes, err := GenerateRandomBytes(128)
	if err != nil {
		return "", sw, err
	}
	token = Base64URL(tokenBytes)
	finalToken := sw.String() + "." + token
	return finalToken, sw, nil
}

// PASSWORD REQUIREMENTS
// 8 characters minimum
// 1 uppercase letter
// 1 lowercase letter
// 1 number
func IsPasswordValid(password string) []string {
	var errors []string
	if len(password) < 8 {
		errors = append(errors, "passwordTooShort")
	}
	if regexp.MustCompile(`\s`).MatchString(password) {
		errors = append(errors, "passwordNoSpaces")
	}
	if !regexp.MustCompile(`[a-z]`).MatchString(password) {
		errors = append(errors, "passwordLetter")
	}
	if !regexp.MustCompile(`[0-9]`).MatchString(password) {
		errors = append(errors, "passwordNumber")
	}
	if !regexp.MustCompile(`[A-Z]`).MatchString(password) {
		errors = append(errors, "passwordCapital")
	}
	return errors
}

// USERNAME REQUIREMENTS
// 3 characters minimum
// 64 characters maximum
// no spaces
// no special characters except for _ and - and . and ,

func IsUsernameValid(username string) []string {
	var errors []string
	if len(username) < 3 {
		errors = append(errors, "usernameTooShort")
	}
	if len(username) > 64 {
		errors = append(errors, "usernameTooLong")
	}
	if regexp.MustCompile(`\s`).MatchString(username) {
		errors = append(errors, "usernameNoSpaces")
	}
	if !regexp.MustCompile(`[a-zA-Z0-9_.,-]`).MatchString(username) {
		errors = append(errors, "usernameNoSpecials")
	}
	return errors
}

func SendMail(address string, subject string, body string) error {
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
		println("ERROR: ", err)
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

func SaveFile(file *multipart.FileHeader) (string, error) {
	fmt.Println(file.Filename, file.Size, file.Header)

	fileExtension, err := mime.ExtensionsByType(file.Header.Get("Content-Type"))
	if err != nil {
		return "", err
	}
	println(fileExtension)

	snowflake := snowflake.New(snowflake.ATTACHMENT)

	newFileName := snowflake.String() + fileExtension[0]
	// Write the file to disk:
	out, err := os.Create("C:\\uploads\\" + newFileName)
	if err != nil {
		return "", err
	}
	ffile, err := file.Open()
	if err != nil {
		return "", err
	}
	defer out.Close()
	_, err = io.Copy(out, ffile)
	if err != nil {
		return "", err
	}

	return newFileName, nil
}
