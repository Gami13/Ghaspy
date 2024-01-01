package main

import (
	"context"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var logger = log.New(os.Stdout, "INFO: ", log.Ldate|log.Ltime)

var examples = []struct {
	TEXT string `json:"text"`
}{
	{TEXT: "SEBA LUBI PLACKI"},
	{TEXT: "GAMI LUBI PLACKI"},
}

func SetLocal[T any](c *fiber.Ctx, key string, value T) {
	c.Locals(key, value)
}
func GetLocal[T any](c *fiber.Ctx, key string) T {
	return c.Locals(key).(T)
}
func main() {
	err := godotenv.Load(".env")
	if err != nil {
		logger.Fatalf("Error loading .env file: %s", err)
	}
	app := fiber.New()
	dbpool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	logger.Println("Connecting to database...", os.Getenv("DATABASE_URL"))
	if err != nil {
		logger.Println("Unable to connect to database: ", err)
		os.Exit(1)
	}
	defer dbpool.Close()
	app.Use(func(c *fiber.Ctx) error {
		SetLocal[*pgxpool.Pool](c, "dbpool", dbpool)
		// Go to next middleware:
		return c.Next()
	})
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

	app.Get("/examples", getExamples)
	app.Post("/login", logInUser)
	app.Post("/logout", logOutUser)
	app.Post("/register", registerUser)
	app.Get("/validate/:valId", validateUser)
	app.Post("/setDisplayName", setDisplayName)
	app.Post("/setBio", setBio)

	app.Listen("localhost:8080")

}
