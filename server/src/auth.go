package main

import (
	"context"
	"encoding/json"
	"regexp"

	"net/mail"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
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

	//TODO: CHECK IF USERNAME IS TAKEN
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
	//TODO: CHECK IF EMAIL IS TAKEN
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
	//TODO:INSERT INTO users (username, email, password,salt,isValidated) VALUES ($1, $2, $3,$4,$5)
	//TODO:INSERT INTO verifications (userId, code, validUntil) VALUES ($1, $2, $3)
	//TODO:SEND EMAIL WITH VERIFICATION CODE

	return c.Status(200).JSON(fiber.Map{
		"message": "UNDER CONSTRUCTION",
	})

}
func validateUser(c *fiber.Ctx) error {
	valId := c.Params("valId")
	logger.Println("Validating: " + valId)
	return c.Status(200).JSON(fiber.Map{
		"message": "UNDER CONSTRUCTION",
	})
}
