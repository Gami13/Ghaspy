package main

import (
	"beeper_server/src/types"
	"encoding/json"
	"net/http"
	"slices"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
)

// TODO: TRANSLATE

func setDisplayName(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := new(SetDisplayNameRequestBody)
	if err := json.Unmarshal(c.Body(), requestBody); err != nil {
		logger.Println("ERROR: ", err)
		return err
	}
	// SELECT users.displayName, tokens.device FROM users,tokens WHERE tokens.token = $1 AND users.id = tokens.userId
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	res, err := dbpool.Exec(c.Context(), "UPDATE users SET displayName = $1 FROM tokens WHERE tokens.token = $2 AND users.id = tokens.userId", requestBody.DisplayName, token)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	logger.Println(res)
	if res.RowsAffected() == 0 {
		return protoError(c, http.StatusUnauthorized, "unautohirized")

	}
	return protoSuccess(c, http.StatusOK, &types.ResponseSetDisplayName{Message: "Display name changed successfully"})

}

// TODO: TRANSLATE

func setBio(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := new(SetBioRequestBody)
	if err := json.Unmarshal(c.Body(), requestBody); err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Bad Request",
		})
	}

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	res, err := dbpool.Exec(c.Context(), "UPDATE users SET bio = $1 FROM tokens WHERE tokens.token = $2 AND users.id = tokens.userId", requestBody.Bio, token)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusGatewayTimeout).JSON(fiber.Map{
			"message": "Gateway Timeout",
		})
	}
	logger.Println(res)
	if res.RowsAffected() == 0 {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Bio changed successfully",
	})

}

// TODO: TRANSLATE

func toggleIsFollowersPublic(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "UPDATE users SET isFollowersPublic = NOT isFollowersPublic FROM tokens WHERE tokens.token = $1 AND users.id = tokens.userId RETURNING users.isFollowersPublic", token)
	var isFollowersPublic bool
	err := row.Scan(&isFollowersPublic)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	if (isFollowersPublic != true) && (isFollowersPublic != false) {

		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Are followers public toggled successfully",
		"current": isFollowersPublic,
	})
}

// TODO: TRANSLATE

func toggleIsFollowingPublic(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "UPDATE users SET isFollowingPublic = NOT isFollowingPublic FROM tokens WHERE tokens.token = $1 AND users.id = tokens.userId RETURNING users.isFollowingPublic", token)
	var isFollowingPublic bool
	err := row.Scan(&isFollowingPublic)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	if (isFollowingPublic != true) && (isFollowingPublic != false) {

		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Are following people public toggled successfully",
		"current": isFollowingPublic,
	})
}

// TODO: TRANSLATE

func toggleIsPostsPublic(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "UPDATE users SET isPostsPublic = NOT isPostsPublic FROM tokens WHERE tokens.token = $1 AND users.id = tokens.userId RETURNING users.isPostsPublic", token)
	var isPostsPublic bool
	err := row.Scan(&isPostsPublic)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	if (isPostsPublic != true) && (isPostsPublic != false) {

		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Are posts public toggled successfully",
		"current": isPostsPublic,
	})
}

// TODO: TRANSLATE

func toggleIsLikesPublic(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "UPDATE users SET isLikesPublic = NOT isLikesPublic FROM tokens WHERE tokens.token = $1 AND users.id = tokens.userId RETURNING users.isLikesPublic", token)
	var isLikesPublic bool
	err := row.Scan(&isLikesPublic)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	if (isLikesPublic != true) && (isLikesPublic != false) {

		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Are likes public toggled successfully",
		"current": isLikesPublic,
	})
}

// TODO: TRANSLATE

func setAvatar(c *fiber.Ctx) error {
	var token = c.GetReqHeaders()["Authorization"][0]

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

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	res, err := dbpool.Exec(c.Context(), "UPDATE users SET avatar = $1 FROM tokens WHERE tokens.token = $2 AND users.id = tokens.userId", filename, token)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusGatewayTimeout).JSON(fiber.Map{
			"message": "Gateway Timeout",
		})
	}
	logger.Println(res)
	if res.RowsAffected() == 0 {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message":  "Avatar changed successfully",
		"filename": filename,
	})
}

// TODO: TRANSLATE

func setBanner(c *fiber.Ctx) error {
	var token = c.GetReqHeaders()["Authorization"][0]

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

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	res, err := dbpool.Exec(c.Context(), "UPDATE users SET banner = $1 FROM tokens WHERE tokens.token = $2 AND users.id = tokens.userId", filename, token)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusGatewayTimeout).JSON(fiber.Map{
			"message": "Gateway Timeout",
		})
	}
	logger.Println(res)
	if res.RowsAffected() == 0 {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message":  "Banner changed successfully",
		"filename": filename,
	})
}

// TODO: TRANSLATE

func getProfileId(c *fiber.Ctx) error {
	var token = "0"

	if len(c.GetReqHeaders()["Authorization"]) != 0 {
		token = c.GetReqHeaders()["Authorization"][0]
	}
	var userID = c.Params("id")
	if userID == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Bad Request, no user id provided",
		})
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "SELECT users.id,users.username, users.displayName, users.bio,users.avatar,users.banner, users.isFollowersPublic,users.isFollowingPublic,users.isPostsPublic,users.isLikesPublic,(SELECT COUNT(likes.id) FROM likes WHERE likes.userId = $1) AS likeCount, (SELECT COUNT(posts.id) FROM posts WHERE posts.authorID = $1) AS postCount, (SELECT COUNT(follows.id) FROM follows WHERE follows.followerid = $1) AS countFollows, (SELECT COUNT(follows.id) FROM follows WHERE follows.followedid = $1) AS countFollowers, (SELECT CASE WHEN COUNT(follows.id) > 0 THEN true ELSE false END AS isFollowed FROM follows WHERE follows.followedid = $1 AND follows.followerId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $2)) AS isFollowed, (SELECT CASE WHEN COUNT(follows.id) > 0 THEN true ELSE false END AS isFollowingYou FROM follows WHERE follows.followerId = $1 AND follows.followedid = (SELECT tokens.userId FROM tokens WHERE tokens.token = $2)) AS isFollowingYou, (SELECT CASE WHEN COUNT(tokens.id) > 0 THEN true ELSE false END AS isYou FROM tokens WHERE tokens.userId = $1 AND tokens.token = $2) AS isYou FROM users WHERE users.id = $1", userID, token)
	var sqlBody GetProfileSQLBody
	err := row.Scan(&sqlBody.id, &sqlBody.UserName, &sqlBody.DisplayName, &sqlBody.Bio, &sqlBody.Avatar, &sqlBody.Banner, &sqlBody.isFollowersPublic, &sqlBody.isFollowingPublic, &sqlBody.isPostsPublic, &sqlBody.isLikesPublic, &sqlBody.likeCount, &sqlBody.postCount, &sqlBody.countFollows, &sqlBody.countFollowers, &sqlBody.isFollowed, &sqlBody.isFollowingYou, &sqlBody.isYourProfile)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "Unexpected error occured",
		})
	}
	var responseBody GetProfileResponseBody
	responseBody.UserName = sqlBody.UserName
	responseBody.DisplayName = sqlBody.DisplayName
	responseBody.Bio = sqlBody.Bio
	responseBody.Avatar = sqlBody.Avatar
	responseBody.Banner = sqlBody.Banner
	responseBody.LikeCount = sqlBody.likeCount
	responseBody.PostCount = sqlBody.postCount
	responseBody.FollowerCount = sqlBody.countFollowers
	responseBody.FollowingCount = sqlBody.countFollows
	responseBody.AreYouFollowing = sqlBody.isFollowed
	responseBody.AreYouFollowedBy = sqlBody.isFollowingYou
	responseBody.JoinedAt = snowflakeFromInt(sqlBody.id).Date.Format("Mon Jan 02 2006 15:04:05 GMT-0700 (MST)")

	responseBody.IsFollowersPublic = sqlBody.isFollowersPublic
	responseBody.IsFollowingPublic = sqlBody.isFollowingPublic
	responseBody.IsPostsPublic = sqlBody.isPostsPublic
	responseBody.IsLikesPublic = sqlBody.isLikesPublic
	responseBody.IsYourProfile = sqlBody.isYourProfile
	return c.Status(http.StatusOK).JSON(responseBody)

}

// TODO: TRANSLATE

func getProfileUserName(c *fiber.Ctx) error {
	var token = "0"

	if len(c.GetReqHeaders()["Authorization"]) != 0 {
		token = c.GetReqHeaders()["Authorization"][0]
	}
	var userName = c.Params("name")
	if userName == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Bad Request, no user name provided",
		})
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "SELECT users.id,users.username,users.displayName,users.bio,users.avatar,users.isFollowersPublic,users.isFollowingPublic,users.isPostsPublic,users.isLikesPublic,(SELECT COUNT(likes.id) FROM likes, users WHERE likes.userId = users.id AND users.username = $1) AS likeCount,(SELECT COUNT(posts.id) FROM posts,users WHERE posts.authorID = users.id AND users.username = $1) AS postCount, (SELECT COUNT(follows.id) FROM follows,users WHERE follows.followerid = users.id AND users.username = $1) AS countFollows, (SELECT COUNT(follows.id) FROM follows,users  WHERE follows.followedid =users.id AND users.username = $1) AS countFollowers, (SELECT CASE WHEN COUNT(follows.id) > 0 THEN true ELSE false END AS isFollowed FROM follows, users WHERE follows.followedid = users.id AND users.username = $1 AND follows.followerId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $2)) AS isFollowed, (SELECT CASE WHEN COUNT(follows.id) > 0 THEN true ELSE false END AS isFollowingYou FROM follows, users WHERE follows.followerId = users.id AND users.username = $1 AND follows.followedid = (SELECT tokens.userId FROM tokens WHERE tokens.token = $2)) AS isFollowingYou, (SELECT CASE WHEN COUNT(tokens.id) > 0 THEN true ELSE false END AS isYou FROM tokens, users WHERE tokens.userId = users.id AND users.username = $1 AND tokens.token = $2) AS isYou FROM users WHERE users.username = $1", userName, token)
	var sqlBody GetProfileSQLBody
	err := row.Scan(&sqlBody.id, &sqlBody.UserName, &sqlBody.DisplayName, &sqlBody.Bio, &sqlBody.Avatar, &sqlBody.isFollowersPublic, &sqlBody.isFollowingPublic, &sqlBody.isPostsPublic, &sqlBody.isLikesPublic, &sqlBody.likeCount, &sqlBody.postCount, &sqlBody.countFollows, &sqlBody.countFollowers, &sqlBody.isFollowed, &sqlBody.isFollowingYou, &sqlBody.isYourProfile)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "Unexpected error occured",
		})
	}
	var responseBody GetProfileResponseBody
	responseBody.UserName = sqlBody.UserName
	responseBody.DisplayName = sqlBody.DisplayName
	responseBody.Bio = sqlBody.Bio
	responseBody.Avatar = sqlBody.Avatar
	responseBody.LikeCount = sqlBody.likeCount
	responseBody.PostCount = sqlBody.postCount
	responseBody.FollowerCount = sqlBody.countFollowers
	responseBody.FollowingCount = sqlBody.countFollows
	responseBody.AreYouFollowing = sqlBody.isFollowed
	responseBody.AreYouFollowedBy = sqlBody.isFollowingYou
	responseBody.JoinedAt = snowflakeFromInt(sqlBody.id).Date.Format("Mon Jan 02 2006 15:04:05 GMT-0700 (MST)")

	responseBody.IsFollowersPublic = sqlBody.isFollowersPublic
	responseBody.IsFollowingPublic = sqlBody.isFollowingPublic
	responseBody.IsPostsPublic = sqlBody.isPostsPublic
	responseBody.IsLikesPublic = sqlBody.isLikesPublic
	responseBody.IsYourProfile = sqlBody.isYourProfile
	return c.Status(http.StatusOK).JSON(responseBody)

}

// TODO: TRANSLATE

func getLoggedInUserProfile(c *fiber.Ctx) error {
	logger.Println("GET LOGGED IN USER PROFILE")
	var token = c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "SELECT users.id,users.username,users.displayName,users.bio,users.avatar, users.banner,users.isFollowersPublic,users.isFollowingPublic,users.isPostsPublic,users.isLikesPublic,(SELECT COUNT(likes.id) FROM likes, tokens WHERE likes.userId = tokens.userId AND tokens.token = $1) AS likeCount,(SELECT COUNT(posts.id) FROM posts,tokens WHERE posts.authorID = tokens.userId AND tokens.token = $1) AS postCount, (SELECT COUNT(follows.id) FROM follows,tokens WHERE follows.followerid = tokens.userId AND tokens.token = $1) AS countFollows,(SELECT COUNT(follows.id) FROM follows,tokens  WHERE follows.followedid =tokens.userId AND tokens.token = $1) AS countFollowers FROM users, tokens WHERE users.id = tokens.userId AND tokens.token = $1", token)
	var sqlBody GetLoggedInUserProfileResponseBody
	err := row.Scan(&sqlBody.Id, &sqlBody.UserName, &sqlBody.DisplayName, &sqlBody.Bio, &sqlBody.Avatar, &sqlBody.Banner, &sqlBody.IsFollowersPublic, &sqlBody.IsFollowingPublic, &sqlBody.IsPostsPublic, &sqlBody.IsLikesPublic, &sqlBody.LikeCount, &sqlBody.PostCount, &sqlBody.FollowerCount, &sqlBody.FollowingCount)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "Unexpected error occured",
		})
	}
	return c.Status(http.StatusOK).JSON(sqlBody)
}

// TODO: TRANSLATE

func addPost(c *fiber.Ctx) error {
	logger.Println("ADD POST")
	var token = c.GetReqHeaders()["Authorization"][0]
	form, err := c.MultipartForm()
	if err != nil { /* handle error */
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "Unexpected error occured",
		})

	}
	var content = ""
	var quoteOf = 0
	var replyTo = 0
	if len(form.Value["content"]) != 0 {
		content = form.Value["content"][0]
	}
	// if len(form.Value["quoteOf"]) != 0 {
	// 	quoteOf = form.Value["quoteOf"][0]
	// }
	// if len(form.Value["replyTo"]) != 0 {
	// 	replyTo = form.Value["replyTo"][0]
	// }
	if len(content) > 360 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Bad Request, content is too long",
		})
	}

	var fileNames []string
	if len(form.File) == 0 && content == "" && quoteOf == 0 && replyTo == 0 {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Bad Request, no content provided",
		})
	}
	for _, fileHeaders := range form.File {
		for _, fileHeader := range fileHeaders {
			// process uploaded file here
			fileName, err := saveFile(c, fileHeader)
			if err != nil {
				logger.Println(err)
				return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
					"message": "Unexpected error occured",
				})
			}
			fileNames = append(fileNames, fileName)

		}
	}
	postId := newSnowflake(SF_POST).ID
	println("POST ID", postId)
	println("TOKEN", token)
	println("CONTENT", content)
	println("QUOTE OF", quoteOf)
	println("REPLY TO", replyTo)
	for _, fileName := range fileNames {
		println("FILE NAME", fileName)
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	_, err = dbpool.Exec(c.Context(), "INSERT INTO posts (id, authorId, content, quoteOf, replyTo, attachments) VALUES ($1, (SELECT tokens.userId FROM tokens WHERE tokens.token = $2), $3, $4, $5, $6)", postId, token, content, quoteOf, replyTo, fileNames)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "Unexpected error occured",
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Post added successfully",
	})
}

// TODO: TRANSLATE

func getPins(c *fiber.Ctx) error {
	var token = c.GetReqHeaders()["Authorization"][0]

	page := c.Params("page")
	pageInt, err := strconv.ParseInt(page, 10, 64)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Bad Request, page is not a number",
		})
	}
	postIds := getPinIdsChronologically(c, pageInt, token)
	var posts []Post
	for _, postId := range postIds {
		posts = append(posts, getPost(c, postId, token))
	}

	return c.Status(http.StatusOK).JSON(posts)
}

// TODO: TRANSLATE

func togglePin(c *fiber.Ctx) error {

	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := new(TogglePinRequestBody)

	if err := json.Unmarshal(c.Body(), requestBody); err != nil {
		logger.Println("ERROR: ", err)
		return err
	}
	PostID, err := strconv.Atoi(requestBody.PostID)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Bad Request, post id is not a number",
		})
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	//CHECK IF PIN EXISTS
	row := dbpool.QueryRow(c.Context(), "SELECT COUNT(bookmarks.id) FROM bookmarks WHERE bookmarks.userId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND bookmarks.postId = $2", token, PostID)
	var count int
	err = row.Scan(&count)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "Unexpected error occured possibly not logged in",
		})
	}
	if count == 0 {
		tag, err := dbpool.Exec(c.Context(), "INSERT INTO bookmarks (id, userId, postId) VALUES ($1, (SELECT tokens.userId FROM tokens WHERE tokens.token = $2), $3)", newSnowflake(SF_BOOKMARK).ID, token, PostID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"message": "Unexpected error occured possibly not logged in",
			})
		}
		logger.Println(tag)
		return c.Status(http.StatusOK).JSON(fiber.Map{
			"message": "Pin added successfully",
			"state":   true,
		})
	} else {
		tag, err := dbpool.Exec(c.Context(), "DELETE FROM bookmarks WHERE bookmarks.userId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND bookmarks.postId = $2", token, PostID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"message": "Unexpected error occured possibly not logged in",
			})
		}
		logger.Println(tag)
		return c.Status(http.StatusOK).JSON(fiber.Map{
			"message": "Pin removed successfully",
			"state":   false,
		})
	}

}

// TODO: TRANSLATE

func toggleLike(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := new(ToggleLikeRequestBody)
	if err := json.Unmarshal(c.Body(), requestBody); err != nil {
		logger.Println("ERROR: ", err)
		return err
	}

	PostID, err := strconv.Atoi(requestBody.PostID)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Bad Request, post id is not a number",
		})
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")

	row := dbpool.QueryRow(c.Context(), "SELECT COUNT(likes.id) FROM likes WHERE likes.userId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND likes.postId = $2", token, PostID)
	var count int
	err = row.Scan(&count)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "Unexpected error occured possibly not logged in",
		})
	}
	if count == 0 {
		tag, err := dbpool.Exec(c.Context(), "INSERT INTO likes (id, userId, postId) VALUES ($1, (SELECT tokens.userId FROM tokens WHERE tokens.token = $2), $3)", newSnowflake(SF_LIKE).ID, token, PostID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"message": "Unexpected error occured possibly not logged in",
			})
		}
		logger.Println(tag)
		return c.Status(http.StatusOK).JSON(fiber.Map{
			"message": "Like added successfully",
			"state":   true,
		})
	} else {
		tag, err := dbpool.Exec(c.Context(), "DELETE FROM likes WHERE likes.userId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND likes.postId = $2", token, PostID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"message": "Unexpected error occured possibly not logged in",
			})
		}
		logger.Println(tag)
		return c.Status(http.StatusOK).JSON(fiber.Map{
			"message": "Like removed successfully",
			"state":   false,
		})
	}
}

// TODO: TRANSLATE

func toggleFollow(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := new(ToggleFollowRequestBody)
	if err := json.Unmarshal(c.Body(), requestBody); err != nil {
		logger.Println("ERROR: ", err)
		return err
	}
	UserID, err := strconv.Atoi(requestBody.UserID)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Bad Request, post id is not a number",
		})
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	//CHECK IF PIN EXISTS
	row := dbpool.QueryRow(c.Context(), "SELECT COUNT(follows.id) FROM follows WHERE follows.followerId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND follows.followedId = $2", token, UserID)
	var count int
	err = row.Scan(&count)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "Unexpected error occured possibly not logged in",
		})
	}
	if count == 0 {
		tag, err := dbpool.Exec(c.Context(), "INSERT INTO follows (id, followerId, followedId) VALUES ($1, (SELECT tokens.userId FROM tokens WHERE tokens.token = $2), $3)", newSnowflake(SF_FOLLOW).ID, token, UserID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"message": "Unexpected error occured possibly not logged in",
			})
		}
		logger.Println(tag)
		return c.Status(http.StatusOK).JSON(fiber.Map{
			"message": "Follow added successfully",
			"state":   true,
		})
	} else {
		tag, err := dbpool.Exec(c.Context(), "DELETE FROM follows WHERE follows.followerId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND follows.followedId = $2", token, UserID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"message": "Unexpected error occured possibly not logged in",
			})
		}
		logger.Println(tag)
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Follow removed successfully",
			"state":   false,
		})
	}
}

// func getLikes(c *fiber.Ctx) error {
// 	return c.Status(200).JSON(fiber.Map{
// 		"message": "OK",
// 	})
// }

// func getFollowers(c *fiber.Ctx) error {
// 	return c.Status(200).JSON(fiber.Map{
// 		"message": "OK",
// 	})
// }

// func getFollowing(c *fiber.Ctx) error {
// 	return c.Status(200).JSON(fiber.Map{
// 		"message": "OK",
// 	})
// }
// TODO: TRANSLATE

func deletePost(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := new(DeletePostRequestBody)
	if err := json.Unmarshal(c.Body(), requestBody); err != nil {
		logger.Println("ERROR: ", err)
		return err
	}
	PostID, err := strconv.Atoi(requestBody.PostID)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Bad Request, post id is not a number",
		})
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")

	tag, err := dbpool.Exec(c.Context(), "DELETE FROM posts WHERE posts.id = $1 AND posts.authorId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $2)", PostID, token)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "Unexpected error occured possibly not logged in",
		})
	}
	logger.Println(tag)
	if tag.RowsAffected() == 0 {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Post deleted successfully",
	})

}

// func changeChatroomImage(c *fiber.Ctx) error {
// 	return c.Status(200).JSON(fiber.Map{
// 		"message": "OK",
// 	})
// }
// func changeChatroomName(c *fiber.Ctx) error {
// 	return c.Status(200).JSON(fiber.Map{
// 		"message": "OK",
// 	})
// }

// func sendMessage(c *fiber.Ctx) error {
// 	// 	var token = c.GetReqHeaders()["Authorization"][0]

// 	return c.Status(200).JSON(fiber.Map{
// 		"message": "OK",
// 	})
// }

// func createChatroom(c *fiber.Ctx) error {
// 	return c.Status(200).JSON(fiber.Map{
// 		"message": "OK",
// 	})
// }

// func addToChatroom(c *fiber.Ctx) error {
// 	return c.Status(200).JSON(fiber.Map{
// 		"message": "OK",
// 	})
// }

// func getChatrooms(c *fiber.Ctx) error {
// 	return c.Status(200).JSON(fiber.Map{
// 		"message": "OK",
// 	})
// }

//	func getChatroomMessages(c *fiber.Ctx) error {
//		return c.Status(200).JSON(fiber.Map{
//			"message": "OK",
//		})
//	}

// TODO: TRANSLATE

func getPosts(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]
	if len(token) == 0 {
		token = ""
	}
	page := c.Params("page")
	username := c.Params("username")
	pageInt, err := strconv.ParseInt(page, 10, 64)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Bad Request, page is not a number",
		})
	}
	postIds := getUserPostsChronologically(c, pageInt, username)
	var posts []Post
	for _, postId := range postIds {
		posts = append(posts, getPost(c, postId, token))
	}

	return c.Status(http.StatusOK).JSON(posts)
}

// TODO: TRANSLATE

func getPostsChronologically(c *fiber.Ctx) error {
	token := ""
	if len(c.GetReqHeaders()["Authorization"]) > 0 {
		token = c.GetReqHeaders()["Authorization"][0]
	}
	page := c.Params("page")
	pageInt, err := strconv.ParseInt(page, 10, 64)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"message": "Bad Request, page is not a number",
		})
	}
	postIds := getPostIdsChronologically(c, pageInt)
	var posts []Post
	for _, postId := range postIds {
		posts = append(posts, getPost(c, postId, token))
	}
	//Now we need to get 2 layers of replies for each post and append them to the post and then remove duplicates
	postsWithReplies := []PostNested{}
	for _, post := range posts {
		postsWithReplies = append(postsWithReplies, appendReplyToPost(c, post, token))

	}
	postsWithRepliesNested := []PostNestedNested{}
	for _, post := range postsWithReplies {
		postsWithRepliesNested = append(postsWithRepliesNested, appendReplyToNestedPost(c, post, token))
	}
	postsWithRepliesNested = removeDuplicates(postsWithRepliesNested)

	postsWithRepliesNestedAndQuotes := []PostNestedNestedQuote{}
	for _, post := range postsWithRepliesNested {
		postsWithRepliesNestedAndQuotes = append(postsWithRepliesNestedAndQuotes, appendQuote(c, post, token))
	}

	return c.Status(http.StatusOK).JSON(postsWithRepliesNestedAndQuotes)
}

func getUserShort(c *fiber.Ctx, userId int64) (UserShort, error) {
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "SELECT users.id,users.username,users.displayName,users.avatar, users.banner, users.bio FROM users WHERE users.id = $1", userId)
	var sqlBody UserShort
	err := row.Scan(&sqlBody.Id, &sqlBody.UserName, &sqlBody.DisplayName, &sqlBody.Avatar, &sqlBody.Banner, &sqlBody.Bio)
	if err != nil {
		logger.Println("ERROR: ", err)
		return UserShort{}, err
	}
	return sqlBody, nil
}

func getPost(c *fiber.Ctx, postId int64, token string) (Post, error) {

	if len(token) == 0 {
		token = ""
	}
	logger.Println("token", token)
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "SELECT posts.id, users.id as authorId, users.username, users.displayname, users.avatar, users.banner, users.bio, posts.content, posts.replyTo, posts.quoteOf, posts.attachments, (SELECT COUNT(likes.id) FROM likes WHERE likes.postId = $1) as likeCount, (SELECT COUNT(posts.id) FROM posts WHERE posts.quoteof = $1) as quoteCount, (SELECT COUNT(posts.id) FROM posts WHERE posts.replyto = $1) as replyCount, (SELECT CASE WHEN COUNT(likes.id) > 0 THEN true ELSE false END FROM likes, tokens WHERE likes.postid = $1 and likes.userid = tokens.userId AND tokens.token = $2) AS isLiked, (SELECT CASE WHEN COUNT(bookmarks.id) > 0 THEN true ELSE false END FROM bookmarks, tokens WHERE bookmarks.postid = $1 and bookmarks.userid = tokens.userId AND tokens.token = $2) AS isBookmarked FROM posts, users, likes WHERE posts.authorid = users.id AND posts.id = $1", postId, token)
	var sqlBody Post

	err := row.Scan(&sqlBody.Id, &sqlBody.Author.Id, &sqlBody.Author.UserName, &sqlBody.Author.DisplayName, &sqlBody.Author.Avatar, &sqlBody.Author.Banner, &sqlBody.Author.Bio, &sqlBody.Content, &sqlBody.ReplyTo, &sqlBody.QuouteOf, &sqlBody.Attachments, &sqlBody.LikeCount, &sqlBody.QuoteCount, &sqlBody.ReplyCount, &sqlBody.IsLiked, &sqlBody.IsBookmarked)
	logger.Println("attachments", sqlBody.Attachments)
	logger.Println("isLiked", sqlBody.IsLiked)
	logger.Println("isBookmarked", sqlBody.IsBookmarked)

	if err != nil {
		logger.Println("ERROR: ", err)
		return Post{}, err
	}
	idInt, _ := strconv.Atoi(sqlBody.Id)
	return Post{
		Id:           sqlBody.Id,
		Author:       sqlBody.Author,
		Content:      sqlBody.Content,
		ReplyTo:      sqlBody.ReplyTo,
		QuouteOf:     sqlBody.QuouteOf,
		Attachments:  sqlBody.Attachments,
		LikeCount:    sqlBody.LikeCount,
		QuoteCount:   sqlBody.QuoteCount,
		ReplyCount:   sqlBody.ReplyCount,
		TimePosted:   snowflakeFromInt(int64(idInt)).Date.Format("Mon Jan 02 2006 15:04:05 GMT-0700 (MST)"),
		IsLiked:      sqlBody.IsLiked,
		IsBookmarked: sqlBody.IsBookmarked,
	}, nil
}

func getPostIdsChronologically(c *fiber.Ctx, page int64) ([]int64, error) {
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	var postIds []int64
	rows, err := dbpool.Query(c.Context(), "SELECT posts.id FROM posts ORDER BY posts.id DESC LIMIT 50 OFFSET $1", 50*page)
	if err != nil {
		logger.Println("ERROR: ", err)
		return []int64{}, err
	}
	for rows.Next() {
		var postId int64
		err := rows.Scan(&postId)
		if err != nil {
			logger.Println("ERROR: ", err)
			return []int64{}, err
		}
		postIds = append(postIds, postId)
	}
	return postIds, nil
}

func getPinIdsChronologically(c *fiber.Ctx, page int64, token string) ([]int64, error) {
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	var postIds []int64
	rows, err := dbpool.Query(c.Context(), "SELECT posts.id FROM posts, bookmarks WHERE posts.id = bookmarks.postId AND bookmarks.userid = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) ORDER BY bookmarks.id DESC LIMIT 50 OFFSET $2", token, 50*page)
	if err != nil {
		logger.Println("ERROR: ", err)
		return []int64{}, err
	}
	for rows.Next() {
		var postId int64
		err := rows.Scan(&postId)
		if err != nil {
			logger.Println("ERROR: ", err)
			return []int64{}, err

		}
		postIds = append(postIds, postId)
	}
	return postIds, nil
}

func getUserPostsChronologically(c *fiber.Ctx, page int64, userName string) ([]int64, error) {
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	var postIds []int64
	rows, err := dbpool.Query(c.Context(), "SELECT posts.id FROM posts WHERE posts.authorId = (SELECT users.id FROM users WHERE users.username = $1) ORDER BY posts.id DESC LIMIT 50 OFFSET $2", userName, 50*page)
	if err != nil {
		logger.Println("ERROR: ", err)
		return []int64{}, err

	}
	for rows.Next() {
		var postId int64
		err := rows.Scan(&postId)
		if err != nil {
			logger.Println("ERROR: ", err)
			return []int64{}, err

		}
		postIds = append(postIds, postId)
	}
	return postIds, nil
}

// TODO: REPLACE THIS BULLSHIT
func appendReplyToPost(c *fiber.Ctx, post Post, token string) PostNested {
	if post.ReplyTo == 0 {
		return PostNested{
			Id:           post.Id,
			Author:       post.Author,
			Content:      post.Content,
			ReplyTo:      nil,
			QuouteOf:     post.QuouteOf,
			Attachments:  post.Attachments,
			LikeCount:    post.LikeCount,
			QuoteCount:   post.QuoteCount,
			ReplyCount:   post.ReplyCount,
			TimePosted:   post.TimePosted,
			IsLiked:      post.IsLiked,
			IsBookmarked: post.IsBookmarked,
		}
	}
	var reply = getPost(c, post.ReplyTo, token)

	return PostNested{
		Id:           post.Id,
		Author:       post.Author,
		Content:      post.Content,
		ReplyTo:      &reply,
		QuouteOf:     post.QuouteOf,
		Attachments:  post.Attachments,
		LikeCount:    post.LikeCount,
		QuoteCount:   post.QuoteCount,
		ReplyCount:   post.ReplyCount,
		TimePosted:   post.TimePosted,
		IsLiked:      post.IsLiked,
		IsBookmarked: post.IsBookmarked,
	}
}

func appendReplyToNestedPost(c *fiber.Ctx, post PostNested, token string) PostNestedNested {
	if post.ReplyTo == nil {
		return PostNestedNested{
			Id:           post.Id,
			Author:       post.Author,
			Content:      post.Content,
			ReplyTo:      nil,
			QuouteOf:     post.QuouteOf,
			Attachments:  post.Attachments,
			LikeCount:    post.LikeCount,
			QuoteCount:   post.QuoteCount,
			ReplyCount:   post.ReplyCount,
			TimePosted:   post.TimePosted,
			IsLiked:      post.IsLiked,
			IsBookmarked: post.IsBookmarked,
		}
	}
	if post.ReplyTo.ReplyTo == 0 {
		return PostNestedNested{
			Id:      post.Id,
			Author:  post.Author,
			Content: post.Content,
			ReplyTo: &PostNested{
				Id:           post.ReplyTo.Id,
				Author:       post.ReplyTo.Author,
				Content:      post.ReplyTo.Content,
				ReplyTo:      nil,
				QuouteOf:     post.ReplyTo.QuouteOf,
				Attachments:  post.ReplyTo.Attachments,
				LikeCount:    post.ReplyTo.LikeCount,
				QuoteCount:   post.ReplyTo.QuoteCount,
				ReplyCount:   post.ReplyTo.ReplyCount,
				TimePosted:   post.ReplyTo.TimePosted,
				IsLiked:      post.ReplyTo.IsLiked,
				IsBookmarked: post.ReplyTo.IsBookmarked,
			},
			QuouteOf:     post.QuouteOf,
			Attachments:  post.Attachments,
			LikeCount:    post.LikeCount,
			QuoteCount:   post.QuoteCount,
			ReplyCount:   post.ReplyCount,
			TimePosted:   post.TimePosted,
			IsLiked:      post.IsLiked,
			IsBookmarked: post.IsBookmarked,
		}
	}

	replyReply := getPost(c, post.ReplyTo.ReplyTo, token)
	return PostNestedNested{
		Id:      post.Id,
		Author:  post.Author,
		Content: post.Content,
		ReplyTo: &PostNested{
			Id:           post.ReplyTo.Id,
			Author:       post.ReplyTo.Author,
			Content:      post.ReplyTo.Content,
			ReplyTo:      &replyReply,
			QuouteOf:     post.ReplyTo.QuouteOf,
			Attachments:  post.ReplyTo.Attachments,
			LikeCount:    post.ReplyTo.LikeCount,
			QuoteCount:   post.ReplyTo.QuoteCount,
			ReplyCount:   post.ReplyTo.ReplyCount,
			TimePosted:   post.ReplyTo.TimePosted,
			IsLiked:      post.ReplyTo.IsLiked,
			IsBookmarked: post.ReplyTo.IsBookmarked,
		},
		QuouteOf:     post.QuouteOf,
		Attachments:  post.Attachments,
		LikeCount:    post.LikeCount,
		QuoteCount:   post.QuoteCount,
		ReplyCount:   post.ReplyCount,
		TimePosted:   post.TimePosted,
		IsLiked:      post.IsLiked,
		IsBookmarked: post.IsBookmarked,
	}
}

func appendQuote(c *fiber.Ctx, post PostNestedNested, token string) PostNestedNestedQuote {
	if post.QuouteOf == 0 {
		return PostNestedNestedQuote{
			Id:           post.Id,
			Author:       post.Author,
			Content:      post.Content,
			ReplyTo:      post.ReplyTo,
			QuouteOf:     nil,
			Attachments:  post.Attachments,
			LikeCount:    post.LikeCount,
			QuoteCount:   post.QuoteCount,
			ReplyCount:   post.ReplyCount,
			TimePosted:   post.TimePosted,
			IsLiked:      post.IsLiked,
			IsBookmarked: post.IsBookmarked,
		}
	}
	var quote = getPost(c, post.QuouteOf, token)
	return PostNestedNestedQuote{
		Id:           post.Id,
		Author:       post.Author,
		Content:      post.Content,
		ReplyTo:      post.ReplyTo,
		QuouteOf:     &quote,
		Attachments:  post.Attachments,
		LikeCount:    post.LikeCount,
		QuoteCount:   post.QuoteCount,
		ReplyCount:   post.ReplyCount,
		TimePosted:   post.TimePosted,
		IsLiked:      post.IsLiked,
		IsBookmarked: post.IsBookmarked,
	}
}

func removeDuplicates(posts []PostNestedNested) []PostNestedNested {
	var newPosts []PostNestedNested
	var replyIds []string
	for _, post := range posts {
		if post.ReplyTo != nil {
			replyIds = append(replyIds, post.ReplyTo.Id)
			if post.ReplyTo.ReplyTo != nil {
				replyIds = append(replyIds, post.ReplyTo.ReplyTo.Id)
			}
		}

	}
	for _, post := range posts {
		if post.ReplyTo == nil || !slices.Contains(replyIds, post.Id) {
			newPosts = append(newPosts, post)
		}
	}
	return newPosts
}
