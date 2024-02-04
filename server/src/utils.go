package main

import (
	"beeper_server/src/types"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/protobuf/proto"
)

func protoError(c *fiber.Ctx, status int, message string) error {
	logger.Println("ERROR: ", message)
	marshaled, err := proto.Marshal(&types.ResponseError{Message: message})
	if err != nil {
		logger.Println("ERROR: ", err)
		return (c.Status(http.StatusInternalServerError).SendString("internalErrorCrit"))
	}

	return c.Status(status).Send(marshaled)
}

func protoSuccess(c *fiber.Ctx, status int, data proto.Message) error {
	marshaled, err := proto.Marshal(data)
	if err != nil {
		logger.Println("ERROR: ", err)
		return (c.Status(http.StatusInternalServerError).SendString("internalErrorCrit"))
	}

	return c.Status(status).Send(marshaled)
}
