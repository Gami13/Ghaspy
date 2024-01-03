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

func getProfile(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
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
