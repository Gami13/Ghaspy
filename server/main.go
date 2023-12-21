package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var examples = []struct {
	TEXT string `json:"text"`
}{
	{TEXT: "SEBA LUBI PLACKI"},
	{TEXT: "GAMI LUBI PLACKI"},
}

func getExamples(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, examples)
}

func main() {
	router := gin.Default()
	router.GET("/examples", getExamples)

	router.Run("localhost:8080")
}
