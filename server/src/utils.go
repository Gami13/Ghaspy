package main

import (
	"ghaspy_server/src/types"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/protobuf/proto"
)

func protoError(c *fiber.Ctx, status int, message string) error {
	logger.Println("ERROR: ", message)
	marshalled, err := proto.Marshal(&types.ResponseError{Message: message})
	if err != nil {
		logger.Println("ERROR: ", err)
		return (c.Status(http.StatusInternalServerError).SendString("internalErrorCrit"))
	}

	return c.Status(status).Send(marshalled)
}

func protoSuccess(c *fiber.Ctx, status int, data proto.Message) error {
	marshalled, err := proto.Marshal(data)
	if err != nil {
		logger.Println("ERROR: ", err)
		return (c.Status(http.StatusInternalServerError).SendString("internalErrorCrit"))
	}

	return c.Status(status).Send(marshalled)
}

func protoErrorNew(w http.ResponseWriter, status int, message string) {
	logger.Println("ERROR: ", message)
	marshalled, err := proto.Marshal(&types.ResponseError{Message: message})
	if err != nil {
		logger.Println("ERROR: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("internalErrorCrit"))
		return
	}

	w.WriteHeader(status)
	w.Write(marshalled)
}

func protoSuccessNew(w http.ResponseWriter, status int, data proto.Message) {
	marshalled, err := proto.Marshal(data)
	if err != nil {
		logger.Println("ERROR: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("internalErrorCrit"))
		return
	}

	w.WriteHeader(status)
	w.Write(marshalled)
}
