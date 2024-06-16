package protoUtils

import (
	"ghaspy_server/src/types"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/protobuf/proto"
)

func ProtoErrorOld(c *fiber.Ctx, status int, message string) error {
	marshalled, err := proto.Marshal(&types.ResponseError{Message: message})
	if err != nil {
		println("CRITICAL ERROR: ", err)

		return (c.Status(http.StatusInternalServerError).SendString("internalErrorCrit"))
	}

	return c.Status(status).Send(marshalled)
}

func ProtoSuccessOld(c *fiber.Ctx, status int, data proto.Message) error {
	marshalled, err := proto.Marshal(data)
	if err != nil {

		return (c.Status(http.StatusInternalServerError).SendString("internalErrorCrit"))
	}

	return c.Status(status).Send(marshalled)
}

func ProtoError(w http.ResponseWriter, status int, message string) {

	marshalled, err := proto.Marshal(&types.ResponseError{Message: message})
	if err != nil {
		println("CRITICAL ERROR: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("internalErrorCrit"))
		return
	}

	w.WriteHeader(status)
	w.Header().Set("Content-Type", "application/x-protobuf")
	w.Write(marshalled)
}

func ProtoSuccess(w http.ResponseWriter, status int, data proto.Message) {
	marshalled, err := proto.Marshal(data)
	if err != nil {
		println("CRITICAL ERROR: ", err)

		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("internalErrorCrit"))
		return
	}

	w.WriteHeader(status)
	w.Header().Set("Content-Type", "application/x-protobuf")
	w.Write(marshalled)
}
