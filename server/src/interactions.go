package main

import "github.com/gofiber/fiber/v2"

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

func setAvatar(c *fiber.Ctx) error {
	// var token = c.Request.Header.Get("Authorization")
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func setBanner(c *fiber.Ctx) error {
	// var token = c.Request.Header.Get("Authorization")
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func addPost(c *fiber.Ctx) error {
	// var token = c.Request.Header.Get("Authorization")
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func deletePost(c *fiber.Ctx) error {
	// var token = c.Request.Header.Get("Authorization")
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func toggleLikingPost(c *fiber.Ctx) error {
	// var token = c.Request.Header.Get("Authorization")
	return c.Status(200).JSON(fiber.Map{
		"message": "OK",
	})
}

func sendMessage(c *fiber.Ctx) error {
	// var token = c.Request.Header.Get("Authorization")
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
