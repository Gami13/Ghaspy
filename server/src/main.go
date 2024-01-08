package main

import (
	"context"
	"fmt"
	"log"
	"mime/multipart"
	"os"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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

func saveFile(c *fiber.Ctx, file *multipart.FileHeader) (string, error) {
	fmt.Println(file.Filename, file.Size, file.Header["Content-Type"][0])
	//only part after dot
	splits := strings.Split(file.Filename, ".")
	fileExtension := splits[len(splits)-1]
	println(fileExtension)

	snowflake := newSnowflake("0110")

	newFileName := strconv.FormatInt(snowflake.ID, 10) + "." + fileExtension
	// Save the files to disk:
	if err := c.SaveFile(file, fmt.Sprintf("C:\\uploads\\"+newFileName)); err != nil {
		logger.Println(err)
		return "", err
	}
	return newFileName, nil
}

func uploadTest(c *fiber.Ctx) error {
	logger.Println("UPLOAD TEST")

	file, err := c.FormFile("file") // *multipart.FileHeader
	if err != nil {
		logger.Println(err)
		return err
	}
	filename, err := saveFile(c, file)
	if err != nil {
		logger.Println(err)
		return err
	}
	logger.Println("FILE SAVED", filename)
	return c.Status(200).JSON(fiber.Map{
		"message":  "File uploaded!",
		"filename": filename,
	})

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

	app.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin,Authorization",
		AllowOrigins:     "*",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))
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
	app.Post("/signup", signUpUser)
	app.Get("/validate/:valId", validateUser)
	app.Post("/setDisplayName", setDisplayName)
	app.Post("/setBio", setBio)
	app.Post("/fileTest", uploadTest)
	app.Post("/setDisplayName", setDisplayName)
	app.Post("/toggleIsFollowingPublic", toggleIsFollowingPublic)
	app.Post("/toggleIsFollowersPublic", toggleIsFollowersPublic)
	app.Post("/toggleIsPostsPublic", toggleIsPostsPublic)
	app.Post("/toggleIsLikesPublic", toggleIsLikesPublic)
	app.Post("/setAvatar", setAvatar)
	app.Post("/setBanner", setBanner)
	app.Get("/profileId/:id", getProfileId)
	app.Get("/profile/:name", getProfileUserName)
	app.Get("/profile", getLoggedInUserProfile)
	app.Post("/post", addPost)
	app.Get("/postsChrono/:page", getPostsChronologically)

	app.Static("/attachment", "C:\\uploads")

	app.Listen("localhost:8080")

}
