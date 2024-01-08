package main

import (
	"encoding/json"
	"net/http"

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

func addPost(c *fiber.Ctx) error {
	// 	var token = c.GetReqHeaders()["Authorization"][0]

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

func toggleLikingPost(c *fiber.Ctx) error {
	// 	var token = c.GetReqHeaders()["Authorization"][0]

	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func sendMessage(c *fiber.Ctx) error {
	// 	var token = c.GetReqHeaders()["Authorization"][0]

	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func createChatroom(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func addToChatroom(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func getPosts(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func getChatrooms(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func getChatroomMessages(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func getBookmarks(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func toggleBookmark(c *fiber.Ctx) error {
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

func toggleFollowing(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
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
	responseBody.DisplayName = sqlBody.DisplayName.String
	responseBody.Bio = sqlBody.Bio.String
	responseBody.Avatar = sqlBody.Avatar.String
	responseBody.Banner = sqlBody.Banner.String
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
	responseBody.DisplayName = sqlBody.DisplayName.String
	responseBody.Bio = sqlBody.Bio.String
	responseBody.Avatar = sqlBody.Avatar.String
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

func getProfilePosts(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func getProfileLikes(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func getProfileFollowers(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func getProfileFollowing(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func changeChatroomImage(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}
func changeChatroomName(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}
