package main

import (
	"context"
	"fmt"
	"ghaspy_server/src/endpoints"
	"ghaspy_server/src/queries"
	"mime/multipart"
	"net/http"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func processProfilePicture(file *multipart.FileHeader) (string, error) {

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
func SetLocal[T any](c *fiber.Ctx, key string, value T) {
	c.Locals(key, value)
}
func GetLocal[T any](c *fiber.Ctx, key string) T {
	return c.Locals(key).(T)
}
func main() {
	err := godotenv.Load(".env")
	if err != nil {
		println("Error loading .env file: %s", err)
	}

	ctx := context.Background()
	dbpool, err := pgxpool.New(ctx, os.Getenv("DATABASE_URL"))
	println("Connecting to database...", os.Getenv("DATABASE_URL"))
	if err != nil {
		println("Unable to connect to database: ", err)
		os.Exit(1)
	}
	defer dbpool.Close()

	query := queries.New(dbpool)
	hctx := endpoints.NewEndpointContext(query, ctx)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /profile", hctx.GetLoggedInUserProfileEndpoint)
	mux.HandleFunc("POST /log-in", hctx.PostLogInUserEndpoint)
	mux.HandleFunc("POST /sign-up", hctx.PostSignUpUserEndpoint)
	//Takes in a validation oken
	mux.HandleFunc("GET /validate/", hctx.GetVerifyUserEndpoint)
	mux.HandleFunc("DELETE /log-out", hctx.DeleteLogOutUserEndpoint)
	//Takes in a username
	mux.HandleFunc("GET /profile/", hctx.GetProfileEndpoint)
	//takes in a post type, username, and page int
	mux.HandleFunc("GET /profile-posts/", hctx.GetProfilePostsEndpoint)

	mux.HandleFunc("PATCH /display-name", hctx.PatchDisplayNameEndpoint)
	mux.HandleFunc("PATCH /bio", hctx.PatchBioEndpoint)
	mux.HandleFunc("PATCH /is-following-public", hctx.PatchIsFollowingPublicEndpoint)
	mux.HandleFunc("PATCH /is-followers-public", hctx.PatchIsFollowersPublicEndpoint)
	mux.HandleFunc("PATCH /is-posts-public", hctx.PatchIsPostsPublicEndpoint)
	mux.HandleFunc("PATCH /is-likes-public", hctx.PatchIsLikesPublicEndpoint)
	mux.HandleFunc("PATCH /avatar", hctx.PatchAvatarEndpoint)
	mux.HandleFunc("PATCH /banner", hctx.PatchBannerEndpoint)
	mux.HandleFunc("DELETE /post", hctx.DeletePostEndpoint)
	mux.HandleFunc("PATCH /bookmark", hctx.PatchBookmarkEndpoint)
	mux.HandleFunc("PATCH /like", hctx.PatchLikeEndpoint)
	mux.HandleFunc("PATCH /follow", hctx.PatchFollowEndpoint)
	mux.HandleFunc("POST /post", hctx.PostAddPostEndpoint)
	//Takes in a page int
	mux.HandleFunc("GET /posts-chrono/", hctx.GetPostsChronologicallyEndpoint)
	//Takes in a page int
	mux.HandleFunc("GET /bookmarks/", hctx.GetBookmarksChronologicallyEndpoint)
	mux.Handle("/attachment/", http.StripPrefix("/attachment/", http.FileServer(http.Dir("C:\\uploads"))))
	//Takes in a post id
	mux.HandleFunc("GET /post/", hctx.GetPostEndpoint)
	//Takes in a username and a page int
	//takes in a post id and a page int
	mux.HandleFunc("GET /post-replies/", hctx.GetPostRepliesEndpoint)
	//!Not sure why but only AllowAll works, even if using the same config as fiber
	//TODO: Figure out
	handler := cors.AllowAll().Handler(mux)
	http.ListenAndServe(":8080", handler)
	// app.Get("/pins/:page", getPins)

}
