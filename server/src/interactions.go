package main

import (
	"ghaspy_server/src/types"
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"google.golang.org/protobuf/proto"
)

func setDisplayName(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := types.RequestSetDisplayName{}
	err := proto.Unmarshal(c.Body(), &requestBody)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "cantUnmarshal")
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	res, err := dbpool.Exec(c.Context(), "UPDATE users SET displayName = $1 FROM tokens WHERE tokens.token = $2 AND users.id = tokens.userId", requestBody.DisplayName, token)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	logger.Println(res)
	if res.RowsAffected() == 0 {
		return protoError(c, http.StatusUnauthorized, "unauthorized")

	}
	return protoSuccess(c, http.StatusOK, &types.ResponseSetDisplayName{Message: "displayNameChanged"})

}

func setBio(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := types.RequestSetBio{}
	err := proto.Unmarshal(c.Body(), &requestBody)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "cantUnmarshal")
	}

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	res, err := dbpool.Exec(c.Context(), "UPDATE users SET bio = $1 FROM tokens WHERE tokens.token = $2 AND users.id = tokens.userId", requestBody.Bio, token)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	logger.Println(res)
	if res.RowsAffected() == 0 {
		return protoError(c, http.StatusUnauthorized, "unauthorized")
	}
	return protoSuccess(c, http.StatusOK, &types.ResponseSetBio{Message: "bioChanged"})

}

func toggleIsFollowersPublic(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "UPDATE users SET isFollowersPublic = NOT isFollowersPublic FROM tokens WHERE tokens.token = $1 AND users.id = tokens.userId RETURNING users.isFollowersPublic", token)
	var isFollowersPublic bool
	err := row.Scan(&isFollowersPublic)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusUnauthorized, "unauthorized")
	}

	if (isFollowersPublic != true) && (isFollowersPublic != false) {

		return protoError(c, http.StatusUnauthorized, "unauthorized")

	}
	return protoSuccess(c, http.StatusOK, &types.ResponseToggleFollowersPublic{Message: "isFollowersPublicToggled", State: isFollowersPublic})
}

func toggleIsFollowingPublic(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "UPDATE users SET isFollowingPublic = NOT isFollowingPublic FROM tokens WHERE tokens.token = $1 AND users.id = tokens.userId RETURNING users.isFollowingPublic", token)
	var isFollowingPublic bool
	err := row.Scan(&isFollowingPublic)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusUnauthorized, "unauthorized")
	}

	if (isFollowingPublic != true) && (isFollowingPublic != false) {

		return protoError(c, http.StatusUnauthorized, "unauthorized")
	}
	return protoSuccess(c, http.StatusOK, &types.ResponseToggleFollowingPublic{Message: "isFollowingPublicToggled", State: isFollowingPublic})
}

func toggleIsPostsPublic(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "UPDATE users SET isPostsPublic = NOT isPostsPublic FROM tokens WHERE tokens.token = $1 AND users.id = tokens.userId RETURNING users.isPostsPublic", token)
	var isPostsPublic bool
	err := row.Scan(&isPostsPublic)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusUnauthorized, "unauthorized")
	}

	if (isPostsPublic != true) && (isPostsPublic != false) {

		return protoError(c, http.StatusUnauthorized, "unauthorized")
	}
	return protoSuccess(c, http.StatusOK, &types.ResponseTogglePostsPublic{Message: "isPostsPublicToggled", State: isPostsPublic})
}

func toggleIsLikesPublic(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "UPDATE users SET isLikesPublic = NOT isLikesPublic FROM tokens WHERE tokens.token = $1 AND users.id = tokens.userId RETURNING users.isLikesPublic", token)
	var isLikesPublic bool
	err := row.Scan(&isLikesPublic)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusUnauthorized, "unauthorized")
	}

	if (isLikesPublic != true) && (isLikesPublic != false) {

		return protoError(c, http.StatusUnauthorized, "unauthorized")
	}
	return protoSuccess(c, http.StatusOK, &types.ResponseToggleLikesPublic{Message: "isLikesPublicToggled", State: isLikesPublic})
}

func setAvatar(c *fiber.Ctx) error {
	var token = c.GetReqHeaders()["Authorization"][0]

	file, err := c.FormFile("file") // *multipart.FileHeader
	if err != nil {
		logger.Println(err)
		return protoError(c, http.StatusBadRequest, "cantReadFile")

	}

	filename, err := saveFile(c, file)
	if err != nil {
		logger.Println(err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	res, err := dbpool.Exec(c.Context(), "UPDATE users SET avatar = $1 FROM tokens WHERE tokens.token = $2 AND users.id = tokens.userId", filename, token)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	logger.Println(res)
	if res.RowsAffected() == 0 {
		return protoError(c, http.StatusUnauthorized, "unauthorized")
	}

	return protoSuccess(c, http.StatusOK, &types.ResponseSetAvatar{Message: "avatarChanged", Url: filename})
}

func setBanner(c *fiber.Ctx) error {
	var token = c.GetReqHeaders()["Authorization"][0]

	file, err := c.FormFile("file") // *multipart.FileHeader
	if err != nil {
		logger.Println(err)
		return protoError(c, http.StatusBadRequest, "cantReadFile")
	}

	filename, err := saveFile(c, file)
	if err != nil {
		logger.Println(err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	res, err := dbpool.Exec(c.Context(), "UPDATE users SET banner = $1 FROM tokens WHERE tokens.token = $2 AND users.id = tokens.userId", filename, token)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	logger.Println(res)
	if res.RowsAffected() == 0 {
		return protoError(c, http.StatusUnauthorized, "unauthorized")
	}

	return protoSuccess(c, http.StatusOK, &types.ResponseSetBanner{Message: "bannerChanged", Url: filename})
}

func getProfile(c *fiber.Ctx) error {
	var token = "0"

	if len(c.GetReqHeaders()["Authorization"]) != 0 {
		token = c.GetReqHeaders()["Authorization"][0]
	}
	var userName = c.Params("name")
	if userName == "" {
		return protoError(c, http.StatusBadRequest, "badRequestNoUsername")
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), "SELECT users.id, users.username,users.displayName,users.bio,users.avatar, users.banner,users.isFollowersPublic,users.isFollowingPublic,users.isPostsPublic,users.isLikesPublic,(SELECT COUNT(likes.id) FROM likes, users WHERE likes.userId = users.id AND users.username = $1) AS likeCount,(SELECT COUNT(posts.id) FROM posts,users WHERE posts.authorID = users.id AND users.username = $1) AS postCount, (SELECT COUNT(follows.id) FROM follows,users WHERE follows.followerid = users.id AND users.username = $1) AS countFollows, (SELECT COUNT(follows.id) FROM follows,users  WHERE follows.followedid =users.id AND users.username = $1) AS countFollowers, (SELECT CASE WHEN COUNT(follows.id) > 0 THEN true ELSE false END AS isFollowed FROM follows, users WHERE follows.followedid = users.id AND users.username = $1 AND follows.followerId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $2)) AS isFollowed, (SELECT CASE WHEN COUNT(follows.id) > 0 THEN true ELSE false END AS isFollowingYou FROM follows, users WHERE follows.followerId = users.id AND users.username = $1 AND follows.followedid = (SELECT tokens.userId FROM tokens WHERE tokens.token = $2)) AS isFollowingYou, (SELECT CASE WHEN COUNT(tokens.id) > 0 THEN true ELSE false END AS isYou FROM tokens, users WHERE tokens.userId = users.id AND users.username = $1 AND tokens.token = $2) AS isYou FROM users WHERE users.username = $1", userName, token)
	var user types.User
	err := row.Scan(&user.ID, &user.Username, &user.DisplayName, &user.Bio, &user.Avatar, &user.Banner, &user.IsFollowersPublic, &user.IsFollowingPublic, &user.IsPostsPublic, &user.IsLikesPublic, &user.CountLikes, &user.CountPosts, &user.CountFollowing, &user.CountFollowers, &user.IsFollowedByYou, &user.IsFollowingYou, &user.IsYourProfile)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	user.JoinedAt = snowflakeFromInt(user.ID).Date.Format("Mon Jan 02 2006 15:04:05 GMT-0700 (MST)")

	return protoSuccess(c, http.StatusOK, &types.ResponseGetProfile{
		Profile: &user,
	})

}

func getLoggedInUserProfile(c *fiber.Ctx) error {
	logger.Println("GET LOGGED IN USER PROFILE")
	var token = c.GetReqHeaders()["Authorization"][0]

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	row := dbpool.QueryRow(c.Context(), `SELECT "usersDetails".id,"usersDetails".username,"usersDetails".displayname,"usersDetails".bio,"usersDetails".avatar,"usersDetails".banner,"usersDetails".isfollowerspublic,"usersDetails".isfollowingpublic, "usersDetails".ispostspublic,"usersDetails".islikespublic,"usersDetails".countlikes,"usersDetails".countposts,"usersDetails".countisfollowing,"usersDetails".countfollowedby FROM "usersDetails" JOIN tokens ON tokens.userid = "usersDetails".id WHERE tokens.token = $1`, token)
	var user types.User
	err := row.Scan(&user.ID, &user.Username, &user.DisplayName, &user.Bio, &user.Avatar, &user.Banner, &user.IsFollowersPublic, &user.IsFollowingPublic, &user.IsPostsPublic, &user.IsLikesPublic, &user.CountLikes, &user.CountPosts, &user.CountFollowing, &user.CountFollowers)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	user.JoinedAt = snowflakeFromInt(user.ID).Date.Format("Mon Jan 02 2006 15:04:05 GMT-0700 (MST)")
	user.IsYourProfile = true
	user.IsFollowingYou = false
	user.IsFollowedByYou = false

	return protoSuccess(c, http.StatusOK, &types.ResponseGetProfile{
		Profile: &user,
	})
}

func addPost(c *fiber.Ctx) error {
	logger.Println("ADD POST")
	var token = c.GetReqHeaders()["Authorization"][0]
	form, err := c.MultipartForm()
	if err != nil { /* handle error */
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "cantReadForm")
	}
	var content = ""
	var quoteOf uint64 = 0
	var replyTo uint64 = 0

	if len(form.Value["content"]) != 0 {
		content = form.Value["content"][0]
	}
	if len(form.Value["quoteOf"]) != 0 {
		quoteOf, err = strconv.ParseUint(form.Value["quoteOf"][0], 10, 64)
		if err != nil {
			logger.Println("ERROR: ", err)
			return protoError(c, http.StatusBadRequest, "badRequestQuoteOf")
		}
	}
	if len(form.Value["replyTo"]) != 0 {
		replyTo, err = strconv.ParseUint(form.Value["replyTo"][0], 10, 64)
		if err != nil {
			logger.Println("ERROR: ", err)
			return protoError(c, http.StatusBadRequest, "badRequestReplyTo")
		}

	}

	if len(content) > 360 {
		return protoError(c, http.StatusBadRequest, "badRequestContentTooLong")
	}

	if len(form.File) == 0 && content == "" && quoteOf == 0 && replyTo == 0 {
		return protoError(c, http.StatusBadRequest, "badRequestNoContent")
	}

	var fileNames []string
	//PROCESSING FILES
	for _, fileHeaders := range form.File {
		for _, fileHeader := range fileHeaders {

			fileName, err := saveFile(c, fileHeader)
			if err != nil {
				logger.Println(err)
				return protoError(c, http.StatusInternalServerError, "internalError")
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
		return protoError(c, http.StatusInternalServerError, "internalError")
	}

	return protoSuccess(c, http.StatusOK, &types.ResponseAddPost{Message: "postAdded", PostID: postId})
}

func togglePin(c *fiber.Ctx) error {

	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := types.RequestToggleBookmark{}
	err := proto.Unmarshal(c.Body(), &requestBody)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "cantUnmarshal")
	}

	PostID, err := strconv.Atoi(requestBody.PostID)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "badRequestID")
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	//CHECK IF PIN EXISTS
	row := dbpool.QueryRow(c.Context(), "SELECT COUNT(bookmarks.id) FROM bookmarks WHERE bookmarks.userId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND bookmarks.postId = $2", token, PostID)
	var count int
	err = row.Scan(&count)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	if count == 0 {
		tag, err := dbpool.Exec(c.Context(), "INSERT INTO bookmarks (id, userId, postId) VALUES ($1, (SELECT tokens.userId FROM tokens WHERE tokens.token = $2), $3)", newSnowflake(SF_BOOKMARK).ID, token, PostID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return protoError(c, http.StatusInternalServerError, "internalError")
		}
		if tag.RowsAffected() == 0 {
			return protoError(c, http.StatusUnauthorized, "unauthorized")
		}
		logger.Println(tag)
		return protoSuccess(c, http.StatusOK, &types.ResponseToggleBookmark{Message: "bookmarkAdded", State: true})
	} else {
		tag, err := dbpool.Exec(c.Context(), "DELETE FROM bookmarks WHERE bookmarks.userId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND bookmarks.postId = $2", token, PostID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return protoError(c, http.StatusInternalServerError, "internalError")
		}
		if tag.RowsAffected() == 0 {
			return protoError(c, http.StatusUnauthorized, "unauthorized")
		}
		logger.Println(tag)
		return protoSuccess(c, http.StatusOK, &types.ResponseToggleBookmark{Message: "bookmarkRemoved", State: false})
	}

}

func toggleLike(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := types.RequestToggleLike{}
	err := proto.Unmarshal(c.Body(), &requestBody)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "cantUnmarshal")
	}

	PostID, err := strconv.Atoi(requestBody.PostID)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "badRequestID")
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")

	row := dbpool.QueryRow(c.Context(), "SELECT COUNT(likes.id) FROM likes WHERE likes.userId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND likes.postId = $2", token, PostID)
	var count int
	err = row.Scan(&count)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	if count == 0 {
		tag, err := dbpool.Exec(c.Context(), "INSERT INTO likes (id, userId, postId) VALUES ($1, (SELECT tokens.userId FROM tokens WHERE tokens.token = $2), $3)", newSnowflake(SF_LIKE).ID, token, PostID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return protoError(c, http.StatusInternalServerError, "internalError")
		}
		logger.Println(tag)
		return protoSuccess(c, http.StatusOK, &types.ResponseToggleLike{Message: "likeAdded", State: true})
	} else {
		tag, err := dbpool.Exec(c.Context(), "DELETE FROM likes WHERE likes.userId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND likes.postId = $2", token, PostID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return protoError(c, http.StatusInternalServerError, "internalError")
		}
		logger.Println(tag)
		return protoSuccess(c, http.StatusOK, &types.ResponseToggleLike{Message: "likeRemoved", State: false})
	}
}

func toggleFollow(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := types.RequestToggleFollow{}
	err := proto.Unmarshal(c.Body(), &requestBody)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "cantUnmarshal")
	}

	UserID, err := strconv.Atoi(requestBody.UserID)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "badRequestID")
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	//CHECK IF PIN EXISTS
	row := dbpool.QueryRow(c.Context(), "SELECT COUNT(follows.id) FROM follows WHERE follows.followerId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND follows.followedId = $2", token, UserID)
	var count int
	err = row.Scan(&count)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	if count == 0 {
		tag, err := dbpool.Exec(c.Context(), "INSERT INTO follows (id, followerId, followedId) VALUES ($1, (SELECT tokens.userId FROM tokens WHERE tokens.token = $2), $3)", newSnowflake(SF_FOLLOW).ID, token, UserID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return protoError(c, http.StatusInternalServerError, "internalError")
		}
		logger.Println(tag)
		return protoSuccess(c, http.StatusOK, &types.ResponseToggleFollow{Message: "followAdded", State: true})
	} else {
		tag, err := dbpool.Exec(c.Context(), "DELETE FROM follows WHERE follows.followerId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $1) AND follows.followedId = $2", token, UserID)
		if err != nil {
			logger.Println("ERROR: ", err)
			return protoError(c, http.StatusInternalServerError, "internalError")
		}
		logger.Println(tag)
		return protoSuccess(c, http.StatusOK, &types.ResponseToggleFollow{Message: "followRemoved", State: false})
	}
}

func deletePost(c *fiber.Ctx) error {
	token := c.GetReqHeaders()["Authorization"][0]
	requestBody := types.RequestDeletePost{}
	err := proto.Unmarshal(c.Body(), &requestBody)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "cantUnmarshal")
	}

	PostID, err := strconv.Atoi(requestBody.PostID)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "badRequestID")
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")

	tag, err := dbpool.Exec(c.Context(), "DELETE FROM posts WHERE posts.id = $1 AND posts.authorId = (SELECT tokens.userId FROM tokens WHERE tokens.token = $2)", PostID, token)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	logger.Println(tag)
	if tag.RowsAffected() == 0 {
		return protoError(c, http.StatusUnauthorized, "unauthorized")
	}
	return protoSuccess(c, http.StatusOK, &types.ResponseDeletePost{Message: "postRemoved"})

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

// TODO: TRANSLATE, REFACTOR

// func getPins(c *fiber.Ctx) error {
// 	var token = c.GetReqHeaders()["Authorization"][0]

// 	page := c.Params("page")
// 	pageInt, err := strconv.ParseInt(page, 10, 32)
// 	if err != nil {
// 		logger.Println("ERROR: ", err)
// 		return protoError(c, http.StatusBadRequest, "badRequestNotNumber")
// 	}
// 	//GET POSTS HERE
// 	return c.Status(http.StatusOK).JSON(posts)
// }

// TODO: TRANSLATE

func getPostsChronologically(c *fiber.Ctx) error {
	token := ""
	if len(c.GetReqHeaders()["Authorization"]) > 0 {
		token = c.GetReqHeaders()["Authorization"][0]
	}
	page := c.Params("page")
	pageInt, err := strconv.ParseUint(page, 10, 32)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "badRequestNotNumber")

	}

	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	rows, err := dbpool.Query(c.Context(), `SELECT posts.id, "usersDetails".id as authorId, "usersDetails".username, "usersDetails".displayname, "usersDetails".bio, "usersDetails".avatar, "usersDetails".banner, "usersDetails".isfollowerspublic, "usersDetails".isfollowingpublic, "usersDetails".ispostspublic, "usersDetails".islikespublic, "usersDetails".countlikes, "usersDetails".countposts, "usersDetails".countisfollowing, "usersDetails".countfollowedby, posts.content, posts.replyTo, posts.quoteOf, posts.attachments, ( SELECT COUNT(*) FROM likes l1 WHERE l1.postid = posts.id ) as postCountLikes, ( SELECT COUNT(*) FROM posts p1 WHERE p1.quoteof = posts.id ) AS postCountQuotes, ( SELECT COUNT(*) FROM posts p2 WHERE p2.replyto = posts.id ) AS postCountReplies, ( SELECT CASE  WHEN COUNT(*) > 0 THEN true  ELSE false  END FROM likes l1  JOIN tokens t1 ON t1.userid = l1.userid WHERE posts.id = l1.postid  AND t1.token = $1 ) AS isPostLiked, ( SELECT CASE  WHEN COUNT(*) > 0 THEN true  ELSE false  END FROM bookmarks b1  JOIN tokens t2 ON t2.userid = b1.userid WHERE posts.id = b1.postid  AND t2.token = $1 ) AS isPostBookmarked FROM posts JOIN "usersDetails" ON posts.authorid = "usersDetails".id ORDER BY posts.id DESC LIMIT 50 OFFSET $2`, token, 50*pageInt)

	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	var posts []*types.Post
	for rows.Next() {
		var post types.Post
		err := rows.Scan(&post.ID, &post.Author.ID, &post.Author.Username, &post.Author.DisplayName, &post.Author.Bio, &post.Author.Avatar, &post.Author.Banner, &post.Author.IsFollowersPublic, &post.Author.IsFollowingPublic, &post.Author.IsPostsPublic, &post.Author.IsLikesPublic, &post.Author.CountLikes, &post.Author.CountPosts, &post.Author.CountFollowing, &post.Author.CountFollowers, &post.Content, &post.ReplyToID, &post.QuotedID, &post.Attachments, &post.CountLikes, &post.CountQuotes, &post.CountReplies, &post.IsLiked, &post.IsBookmarked)
		if err != nil {
			logger.Println("ERROR: ", err)
			return protoError(c, http.StatusInternalServerError, "internalError")
		}
		posts = append(posts, &post)
	}
	//TODO: FILL IN QUOTED and REPLYTO LATER
	//Merge posts that are replies to posts that have that post as a reply

	return protoSuccess(c, http.StatusOK, &types.ResponseGetPostsChronologically{
		Posts:      posts,
		Message:    "postsRetrievedSuccessfully",
		PageNumber: uint32(pageInt),
	})

}

func getUserPostsChronologically(c *fiber.Ctx) error {
	token := ""
	if len(c.GetReqHeaders()["Authorization"]) > 0 {
		token = c.GetReqHeaders()["Authorization"][0]
	}
	page := c.Params("page")
	pageInt, err := strconv.ParseInt(page, 10, 32)
	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusBadRequest, "badRequestNotNumber")

	}
	username := c.Params("username")
	if username == "" {
		return protoError(c, http.StatusBadRequest, "badRequestNoUsername")
	}
	dbpool := GetLocal[*pgxpool.Pool](c, "dbpool")
	rows, err := dbpool.Query(c.Context(), `SELECT posts.id,"usersDetails".id as authorId,"usersDetails".username,"usersDetails".displayname,"usersDetails".bio,"usersDetails".avatar,"usersDetails".banner,"usersDetails".isfollowerspublic,"usersDetails".isfollowingpublic,"usersDetails".ispostspublic,"usersDetails".islikespublic,"usersDetails".countlikes,"usersDetails".countposts,"usersDetails".countisfollowing,"usersDetails".countfollowedby,posts.content,posts.replyTo,posts.quoteOf,posts.attachments,(SELECT COUNT(*) FROM likes l1 WHERE l1.postid = posts.id) as postCountLikes,(SELECT COUNT(*) FROM posts p1 WHERE p1.quoteof = posts.id) AS postCountQuotes,(SELECT COUNT(*) FROM posts p2 WHERE p2.replyto = posts.id) AS postCountReplies,(SELECT CASE WHEN COUNT(*) > 0 THEN true ELSE false END FROM likes l1 JOIN tokens t1 ON t1.userid = l1.userid WHERE posts.id = l1.postid AND t1.token = $1) AS isPostLiked,(SELECT CASE WHEN COUNT(*) > 0 THEN true ELSE false END FROM bookmarks b1 JOIN tokens t2 ON t2.userid = b1.userid WHERE posts.id = b1.postid AND t2.token = $1) AS isPostBookmarked FROM posts JOIN "usersDetails" ON posts.authorid = "usersDetails".id WHERE "usersDetails".username = $2 ORDER BY posts.id DESC LIMIT 50 OFFSET $3`, token, username, 50*pageInt)

	if err != nil {
		logger.Println("ERROR: ", err)
		return protoError(c, http.StatusInternalServerError, "internalError")
	}
	var posts []*types.Post
	for rows.Next() {
		var post types.Post
		err := rows.Scan(&post.ID, &post.Author.ID, &post.Author.Username, &post.Author.DisplayName, &post.Author.Bio, &post.Author.Avatar, &post.Author.Banner, &post.Author.IsFollowersPublic, &post.Author.IsFollowingPublic, &post.Author.IsPostsPublic, &post.Author.IsLikesPublic, &post.Author.CountLikes, &post.Author.CountPosts, &post.Author.CountFollowing, &post.Author.CountFollowers, &post.Content, &post.ReplyToID, &post.QuotedID, &post.Attachments, &post.CountLikes, &post.CountQuotes, &post.CountReplies, &post.IsLiked, &post.IsBookmarked)
		if err != nil {
			logger.Println("ERROR: ", err)
			return protoError(c, http.StatusInternalServerError, "internalError")
		}
		posts = append(posts, &post)
	}
	//TODO: FILL IN QUOTED and REPLYTO LATER
	//Merge posts that are replies to posts that have that post as a reply

	return protoSuccess(c, http.StatusOK, &types.ResponseGetPostsChronologicallyByUser{
		Posts:      posts,
		Message:    "postsRetrievedSuccessfully",
		PageNumber: uint32(pageInt),
	})

}
