package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

var logger = log.New(os.Stdout, "INFO: ", log.Ldate|log.Ltime)

var examples = []struct {
	TEXT string `json:"text"`
}{
	{TEXT: "SEBA LUBI PLACKI"},
	{TEXT: "GAMI LUBI PLACKI"},
}

func getExamples(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, examples)
}

func setDisplayName(c *gin.Context) {
	// var token = c.Request.Header.Get("Authorization")
}

func setBio(c *gin.Context) {
	// var token = c.Request.Header.Get("Authorization")
}

func main() {

	router := gin.Default()
	router.GET("/examples", getExamples)
	router.POST("/login", loginUser)
	router.POST("/register", registerUser)
	router.GET("/validate/:valId", validateUser)
	router.POST("/setDisplayName", setDisplayName)
	router.POST("/setBio", setBio)

	router.Run("localhost:8080")

}
