package main

import (
	"log"
	"os"

	"regexp"

	"github.com/gofiber/fiber/v2"
)

var logger = log.New(os.Stdout, "INFO: ", log.Ldate|log.Ltime)

var examples = []struct {
	TEXT string `json:"text"`
}{
	{TEXT: "SEBA LUBI PLACKI"},
	{TEXT: "GAMI LUBI PLACKI"},
}

func getExamples(c *fiber.Ctx) error {
	return c.Status(200).JSON(examples)

}

func setDisplayName(c *fiber.Ctx) error {
	// var token = c.Request.Header.Get("Authorization")
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})

}

func setBio(c *fiber.Ctx) error {
	// var token = c.Request.Header.Get("Authorization")
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func main() {

	println("TEST", regexp.MustCompile(`[a-zA-Z]`).MatchString("1234567"))
	//TESTING PASSWORD VALIDATION
	logger.Println("INVALID", isPasswordValid("12345678"))
	logger.Println("INVALID", isPasswordValid("1234567a"))
	logger.Println("INVALID", isPasswordValid("1234567A"))
	logger.Println("VALID", isPasswordValid("1234567Aa"))

	//TESTING USERNAME VALIDATION
	logger.Println("VALID", isUsernameValid("12345678"))
	logger.Println("VALID", isUsernameValid("1234567a"))
	logger.Println("VALID", isUsernameValid("1234567A"))
	logger.Println("VALID", isUsernameValid("1234567Aa"))
	logger.Println("VALID", isUsernameValid("1234567Aa.,"))
	logger.Println("INVALID", isUsernameValid("12345 67Aa., "))
	logger.Println("INVALID", isUsernameValid("12345 67Aa.,!-_"))
	logger.Println("VALID", isUsernameValid("1234567Aa.,-_"))

	app := fiber.New()
	app.Get("/examples", getExamples)
	app.Post("/login", loginUser)
	app.Post("/register", registerUser)
	app.Get("/validate/:valId", validateUser)
	app.Post("/setDisplayName", setDisplayName)
	app.Post("/setBio", setBio)

	app.Listen("localhost:8080")

}
