package main

import (
	"context"
	"fmt"
	"ghaspy_server/src/queries"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var logger = log.New(os.Stdout, "INFO: ", log.Ldate|log.Ltime)

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

	snowflake := newSnowflake(SnowflakeType(SF_ATTACHMENT))

	newFileName := snowflake.String() + "." + fileExtension
	// Save the files to disk:
	if err := c.SaveFile(file, fmt.Sprintf("C:\\uploads\\"+newFileName)); err != nil {
		logger.Println(err)
		return "", err
	}
	return newFileName, nil
}

func processProfilePicture(c *fiber.Ctx, file *multipart.FileHeader) (string, error) {

	splits := strings.Split(file.Filename, ".")
	//!DONT USE FILE EXTENSION, USE MIME TYPE
	fileExtension := splits[len(splits)-1]
	if fileExtension != "png" && fileExtension != "jpg" && fileExtension != "jpeg" && fileExtension != "webp" {
		return "", fmt.Errorf("invalid file type")
	}

	if file.Size > 4*1024*1024 {
		return "", fmt.Errorf("file too large")
	}

	panic("Not implemented")

}

// func main() {
// 	err := godotenv.Load(".env")
// 	if err != nil {
// 		logger.Fatalf("Error loading .env file: %s", err)
// 	}

// 	app := fiber.New()
// 	ctx := context.Background()
// 	dbpool, err := pgxpool.New(ctx, os.Getenv("DATABASE_URL"))
// 	if err != nil {
// 		logger.Println("Unable to connect to database: ", err)
// 		os.Exit(1)
// 	}
// 	defer dbpool.Close()
// 	query := queries.New(dbpool)
// 	logger.Println("Connecting to database...", os.Getenv("DATABASE_URL"))

// 	app.Use(func(c *fiber.Ctx) error {
// 		SetLocal[*pgxpool.Pool](c, "dbpool", dbpool)
// 		SetLocal[*queries.Queries](c, "query", query)
// 		return c.Next()
// 	})

// 	app.Use(cors.New(cors.Config{
// 		AllowHeaders: "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin,Authorization",
// 		AllowOrigins: "*",
// 		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
// 	}))

// 	app.Post("/log-in", logInUser)
// 	app.Delete("/log-out", logOutUser)
// 	app.Post("/sign-up", signUpUser)
// 	app.Get("/validate/:valId", validateUser)
// 	app.Patch("/display-name", setDisplayName)
// 	app.Patch("/bio", setBio)
// 	app.Patch("/display-name", setDisplayName)
// 	app.Patch("/is-following-public", toggleIsFollowingPublic)
// 	app.Patch("/is-followers-public", toggleIsFollowersPublic)
// 	app.Patch("/is-posts-public", toggleIsPostsPublic)
// 	app.Patch("/is-likes-public", toggleIsLikesPublic)
// 	app.Patch("/avatar", setAvatar)
// 	app.Patch("/banner", setBanner)
// 	app.Get("/profile/:name", getProfile)
// 	app.Get("/profile", getLoggedInUserProfileEndpoint)
// 	app.Patch("/pin", togglePin)
// 	app.Patch("/like", toggleLike)
// 	app.Patch("/follow", toggleFollow)
// 	// app.Get("/pins/:page", getPins)
// 	app.Get("post/:id", getPost)
// 	app.Get("post-replies/:id/:page", getPostReplies)
// 	app.Post("/post", addPost)
// 	app.Delete("/post", deletePost)
// 	app.Get("/posts-chrono/:page", getPostsChronologically)
// 	app.Get("/posts-profile/:username/:page", getUserPostsChronologically)

// 	app.Static("/attachment", "C:\\uploads")

// 	app.Listen("localhost:8080")

// }

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		logger.Fatalf("Error loading .env file: %s", err)
	}

	ctx := context.Background()
	dbpool, err := pgxpool.New(ctx, os.Getenv("DATABASE_URL"))
	logger.Println("Connecting to database...", os.Getenv("DATABASE_URL"))
	if err != nil {
		logger.Println("Unable to connect to database: ", err)
		os.Exit(1)
	}
	defer dbpool.Close()

	query := queries.New(dbpool)

	hctx := NewEndpointContext(query, ctx)

	mux := http.NewServeMux()
	mux.HandleFunc("GET /profile", hctx.GetLoggedInUserProfileEndpoint)

	logger.Fatal(http.ListenAndServe(":8080", mux))

}
