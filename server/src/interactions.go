package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"slices"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
)

func getExamples(c *fiber.Ctx) error {
	return c.Status(200).JSON(examples)

}

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
		return c.Status(http.StatusGatewayTimeout).JSON(fiber.Map{
			"message": "Gateway Timeout",
		})
	}
	logger.Println(res)
	if res.RowsAffected() == 0 {
		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "Display named changed successfully",
	})

}

func setBio(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := new(SetBioRequestBody)
	if err := json.Unmarshal(c.Body(), requestBody); err != nil {
		logger.Println("ERROR: ", err)
		return err
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
		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "Bio changed successfully",
	})

}
func toggleIsFollowersPublic(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "UPDATE users SET isFollowersPublic = NOT isFollowersPublic FROM tokens WHERE tokens.token = $1 AND users.id = tokens.userId RETURNING users.isFollowersPublic", token)
	var isFollowersPublic bool
	err := row.Scan(&isFollowersPublic)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	if (isFollowersPublic != true) && (isFollowersPublic != false) {

		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "Are followers public toggled successfully",
		"current": isFollowersPublic,
	})
}

func toggleIsFollowingPublic(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "UPDATE users SET isFollowingPublic = NOT isFollowingPublic FROM tokens WHERE tokens.token = $1 AND users.id = tokens.userId RETURNING users.isFollowingPublic", token)
	var isFollowingPublic bool
	err := row.Scan(&isFollowingPublic)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	if (isFollowingPublic != true) && (isFollowingPublic != false) {

		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "Are following people public toggled successfully",
		"current": isFollowingPublic,
	})
}

func toggleIsPostsPublic(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "UPDATE users SET isPostsPublic = NOT isPostsPublic FROM tokens WHERE tokens.token = $1 AND users.id = tokens.userId RETURNING users.isPostsPublic", token)
	var isPostsPublic bool
	err := row.Scan(&isPostsPublic)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	if (isPostsPublic != true) && (isPostsPublic != false) {

		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "Are posts public toggled successfully",
		"current": isPostsPublic,
	})
}

func toggleIsLikesPublic(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "UPDATE users SET isLikesPublic = NOT isLikesPublic FROM tokens WHERE tokens.token = $1 AND users.id = tokens.userId RETURNING users.isLikesPublic", token)
	var isLikesPublic bool
	err := row.Scan(&isLikesPublic)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	if (isLikesPublic != true) && (isLikesPublic != false) {

		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	return c.Status(200).JSON(fiber.Map{
		"message": "Are likes public toggled successfully",
		"current": isLikesPublic,
	})
}

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
		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message":  "Avatar changed successfully",
		"filename": filename,
	})
}

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
		return c.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message":  "Banner changed successfully",
		"filename": filename,
	})
}

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
	responseBody.AreYouFollowing = sqlBody.isFollowingYou
	responseBody.AreYouFollowedBy = sqlBody.isFollowed
	responseBody.JoinedAt = snowflakeFromInt(sqlBody.id).Date.Format("Mon Jan 02 2006 15:04:05 GMT-0700 (MST)")

	responseBody.IsFollowersPublic = sqlBody.isFollowersPublic
	responseBody.IsFollowingPublic = sqlBody.isFollowingPublic
	responseBody.IsPostsPublic = sqlBody.isPostsPublic
	responseBody.IsLikesPublic = sqlBody.isLikesPublic
	responseBody.IsYourProfile = sqlBody.isYourProfile
	return c.Status(200).JSON(responseBody)

}

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
	responseBody.AreYouFollowing = sqlBody.isFollowingYou
	responseBody.AreYouFollowedBy = sqlBody.isFollowed
	responseBody.JoinedAt = snowflakeFromInt(sqlBody.id).Date.Format("Mon Jan 02 2006 15:04:05 GMT-0700 (MST)")

	responseBody.IsFollowersPublic = sqlBody.isFollowersPublic
	responseBody.IsFollowingPublic = sqlBody.isFollowingPublic
	responseBody.IsPostsPublic = sqlBody.isPostsPublic
	responseBody.IsLikesPublic = sqlBody.isLikesPublic
	responseBody.IsYourProfile = sqlBody.isYourProfile
	return c.Status(200).JSON(responseBody)

}
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
	return c.Status(200).JSON(sqlBody)
}
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
	var content sql.NullString
	var quoteOf sql.NullString
	var replyTo sql.NullString
	if len(form.Value["content"]) != 0 {
		content.String = form.Value["content"][0]
	}
	if len(form.Value["quoteOf"]) != 0 {
		quoteOf.String = form.Value["quoteOf"][0]
	}
	if len(form.Value["replyTo"]) != 0 {
		replyTo.String = form.Value["replyTo"][0]
	}
	var fileNames []string
	if len(form.File) == 0 && content.String == "" && quoteOf.String == "" && replyTo.String == "" {
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
	postId := newSnowflake("0010").ID
	println("POST ID", postId)
	println("TOKEN", token)
	println("CONTENT", content.String)
	println("QUOTE OF", quoteOf.String)
	println("REPLY TO", replyTo.String)
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
	// INSERT 1 LIKE
	// _, err = dbpool.Exec(c.Context(), "INSERT INTO likes (id, userId, postId) VALUES ($1, $2, $3)", newSnowflake("0011").ID, 69, postId)
	// if err != nil {
	// 	logger.Println("ERROR: ", err)
	// }

	return c.Status(200).JSON(fiber.Map{
		"message": "Post added successfully",
	})
}

func getPins(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func togglePin(c *fiber.Ctx) error {

	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := new(TogglePinRequestBody)
	if err := json.Unmarshal(c.Body(), requestBody); err != nil {
		logger.Println("ERROR: ", err)
		return err
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	//CHECK IF PIN EXISTS
	row := dbpool.QueryRow(c.Context(), "SELECT COUNT(bookmarks.id) FROM bookmarks WHERE bookmarks.userId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND bookmarks.postId = $2", token, requestBody.PostID)
	var count int
	err := row.Scan(&count)
	if err != nil {
		logger.Println("ERROR: ", err)
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"message": "Unexpected error occured possibly not logged in",
		})
	}
	if count == 0 {
		tag, err := dbpool.Exec(c.Context(), "INSERT INTO bookmarks (id, userId, postId) VALUES ($1, (SELECT tokens.userId FROM tokens WHERE tokens.token = $2), $3)", newSnowflake("0011").ID, token, requestBody.PostID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"message": "Unexpected error occured possibly not logged in",
			})
		}
		logger.Println(tag)
		return c.Status(200).JSON(fiber.Map{
			"message": "Pin added successfully",
			"state":   true,
		})
	} else {
		tag, err := dbpool.Exec(c.Context(), "DELETE FROM bookmarks WHERE bookmarks.userId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND bookmarks.postId = $2", token, requestBody.PostID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"message": "Unexpected error occured possibly not logged in",
			})
		}
		logger.Println(tag)
		return c.Status(200).JSON(fiber.Map{
			"message": "Pin removed successfully",
			"state":   false,
		})
	}

}

func toggleLiking(c *fiber.Ctx) error {
	// 	var token = c.GetReqHeaders()["Authorization"][0]

	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func toggleFollowing(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func getPosts(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func getLikes(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func getFollowers(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func getFollowing(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func deletePost(c *fiber.Ctx) error {
	// 	var token = c.GetReqHeaders()["Authorization"][0]

	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
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

// func getChatroomMessages(c *fiber.Ctx) error {
// 	return c.Status(200).JSON(fiber.Map{
// 		"message": "OK",
// 	})
// }

func getPostsChronologically(c *fiber.Ctx) error {
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
		posts = append(posts, getPost(c, postId))
	}
	//Now we need to get 2 layers of replies for each post and append them to the post and then remove duplicates
	postsWithReplies := []PostNested{}
	for _, post := range posts {
		postsWithReplies = append(postsWithReplies, appendReplyToPost(c, post))

	}
	postsWithRepliesNested := []PostNestedNested{}
	for _, post := range postsWithReplies {
		postsWithRepliesNested = append(postsWithRepliesNested, appendReplyToNestedPost(c, post))
	}
	postsWithRepliesNested = removeDuplicates(postsWithRepliesNested)

	postsWithRepliesNestedAndQuotes := []PostNestedNestedQuote{}
	for _, post := range postsWithRepliesNested {
		postsWithRepliesNestedAndQuotes = append(postsWithRepliesNestedAndQuotes, appendQuote(c, post))
	}

	return c.Status(200).JSON(postsWithRepliesNestedAndQuotes)
}

func getUserShort(c *fiber.Ctx, userId int64) UserShort {
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "SELECT users.id,users.username,users.displayName,users.avatar, users.banner, users.bio FROM users WHERE users.id = $1", userId)
	var sqlBody UserShort
	err := row.Scan(&sqlBody.Id, &sqlBody.UserName, &sqlBody.DisplayName, &sqlBody.Avatar, &sqlBody.Banner, &sqlBody.Bio)
	if err != nil {
		logger.Println("ERROR: ", err)
	}
	return sqlBody
}

func getPost(c *fiber.Ctx, postId int64) Post {
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "SELECT posts.id, users.id as authorId, users.username, users.displayname, users.avatar, users.banner, users.bio, posts.content, posts.replyTo, posts.quoteOf, posts.attachments, (SELECT COUNT(likes.id) FROM likes WHERE likes.postId = $1) as likeCount, (SELECT COUNT(posts.id) FROM posts WHERE posts.quoteof = $1) as quoteCount, (SELECT COUNT(posts.id) FROM posts WHERE posts.replyto = $1) as replyCount FROM posts, users, likes WHERE posts.authorid = users.id AND posts.id = $1", postId)
	var sqlBody Post

	err := row.Scan(&sqlBody.Id, &sqlBody.Author.Id, &sqlBody.Author.UserName, &sqlBody.Author.DisplayName, &sqlBody.Author.Avatar, &sqlBody.Author.Banner, &sqlBody.Author.Bio, &sqlBody.Content, &sqlBody.ReplyTo, &sqlBody.QuouteOf, &sqlBody.Attachments, &sqlBody.LikeCount, &sqlBody.QuoteCount, &sqlBody.ReplyCount)
	logger.Println("attachments", sqlBody.Attachments)

	if err != nil {
		logger.Println("ERROR: ", err)
	}
	return Post{
		Id:          sqlBody.Id,
		Author:      sqlBody.Author,
		Content:     sqlBody.Content,
		ReplyTo:     sqlBody.ReplyTo,
		QuouteOf:    sqlBody.QuouteOf,
		Attachments: sqlBody.Attachments,
		LikeCount:   sqlBody.LikeCount,
		QuoteCount:  sqlBody.QuoteCount,
		ReplyCount:  sqlBody.ReplyCount,
		TimePosted:  snowflakeFromInt(sqlBody.Id).Date.Format("Mon Jan 02 2006 15:04:05 GMT-0700 (MST)"),
	}
}

func getPostIdsChronologically(c *fiber.Ctx, page int64) []int64 {
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	var postIds []int64
	rows, err := dbpool.Query(c.Context(), "SELECT posts.id FROM posts ORDER BY posts.id DESC LIMIT 50 OFFSET $1", 50*page)
	if err != nil {
		logger.Println("ERROR: ", err)
	}
	for rows.Next() {
		var postId int64
		err := rows.Scan(&postId)
		if err != nil {
			logger.Println("ERROR: ", err)
		}
		postIds = append(postIds, postId)
	}
	return postIds
}

func appendReplyToPost(c *fiber.Ctx, post Post) PostNested {
	if post.ReplyTo == 0 {
		return PostNested{
			Id:          post.Id,
			Author:      post.Author,
			Content:     post.Content,
			ReplyTo:     nil,
			QuouteOf:    post.QuouteOf,
			Attachments: post.Attachments,
			LikeCount:   post.LikeCount,
			QuoteCount:  post.QuoteCount,
			ReplyCount:  post.ReplyCount,
			TimePosted:  post.TimePosted,
		}
	}
	var reply = getPost(c, post.ReplyTo)

	return PostNested{
		Id:          post.Id,
		Author:      post.Author,
		Content:     post.Content,
		ReplyTo:     &reply,
		QuouteOf:    post.QuouteOf,
		Attachments: post.Attachments,
		LikeCount:   post.LikeCount,
		QuoteCount:  post.QuoteCount,
		ReplyCount:  post.ReplyCount,
		TimePosted:  post.TimePosted,
	}
}

func appendReplyToNestedPost(c *fiber.Ctx, post PostNested) PostNestedNested {
	if post.ReplyTo == nil {
		return PostNestedNested{
			Id:          post.Id,
			Author:      post.Author,
			Content:     post.Content,
			ReplyTo:     nil,
			QuouteOf:    post.QuouteOf,
			Attachments: post.Attachments,
			LikeCount:   post.LikeCount,
			QuoteCount:  post.QuoteCount,
			ReplyCount:  post.ReplyCount,
			TimePosted:  post.TimePosted,
		}
	}
	if post.ReplyTo.ReplyTo == 0 {
		return PostNestedNested{
			Id:      post.Id,
			Author:  post.Author,
			Content: post.Content,
			ReplyTo: &PostNested{
				Id:          post.ReplyTo.Id,
				Author:      post.ReplyTo.Author,
				Content:     post.ReplyTo.Content,
				ReplyTo:     nil,
				QuouteOf:    post.ReplyTo.QuouteOf,
				Attachments: post.ReplyTo.Attachments,
				LikeCount:   post.ReplyTo.LikeCount,
				QuoteCount:  post.ReplyTo.QuoteCount,
				ReplyCount:  post.ReplyTo.ReplyCount,
				TimePosted:  post.ReplyTo.TimePosted,
			},
			QuouteOf:    post.QuouteOf,
			Attachments: post.Attachments,
			LikeCount:   post.LikeCount,
			QuoteCount:  post.QuoteCount,
			ReplyCount:  post.ReplyCount,
			TimePosted:  post.TimePosted,
		}
	}

	replyReply := getPost(c, post.ReplyTo.ReplyTo)
	return PostNestedNested{
		Id:      post.Id,
		Author:  post.Author,
		Content: post.Content,
		ReplyTo: &PostNested{
			Id:          post.ReplyTo.Id,
			Author:      post.ReplyTo.Author,
			Content:     post.ReplyTo.Content,
			ReplyTo:     &replyReply,
			QuouteOf:    post.ReplyTo.QuouteOf,
			Attachments: post.ReplyTo.Attachments,
			LikeCount:   post.ReplyTo.LikeCount,
			QuoteCount:  post.ReplyTo.QuoteCount,
			ReplyCount:  post.ReplyTo.ReplyCount,
			TimePosted:  post.ReplyTo.TimePosted,
		},
		QuouteOf:    post.QuouteOf,
		Attachments: post.Attachments,
		LikeCount:   post.LikeCount,
		QuoteCount:  post.QuoteCount,
		ReplyCount:  post.ReplyCount,
		TimePosted:  post.TimePosted,
	}
}

func appendQuote(c *fiber.Ctx, post PostNestedNested) PostNestedNestedQuote {
	if post.QuouteOf == 0 {
		return PostNestedNestedQuote{
			Id:          post.Id,
			Author:      post.Author,
			Content:     post.Content,
			ReplyTo:     post.ReplyTo,
			QuouteOf:    nil,
			Attachments: post.Attachments,
			LikeCount:   post.LikeCount,
			QuoteCount:  post.QuoteCount,
			ReplyCount:  post.ReplyCount,
			TimePosted:  post.TimePosted,
		}
	}
	var quote = getPost(c, post.QuouteOf)
	return PostNestedNestedQuote{
		Id:          post.Id,
		Author:      post.Author,
		Content:     post.Content,
		ReplyTo:     post.ReplyTo,
		QuouteOf:    &quote,
		Attachments: post.Attachments,
		LikeCount:   post.LikeCount,
		QuoteCount:  post.QuoteCount,
		ReplyCount:  post.ReplyCount,
		TimePosted:  post.TimePosted,
	}
}

func removeDuplicates(posts []PostNestedNested) []PostNestedNested {
	var newPosts []PostNestedNested
	var replyIds []int64
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
