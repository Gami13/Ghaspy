package main

import (
	"log"
	"net/http"
	"os"

	"regexp"

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

	println("TEST", regexp.MustCompile(`[a-zA-Z]`).MatchString("1234567"))
	//TESTING PASSWORD VALIDATION
	logger.Println("INVALID", isPasswordValid("12345678"))
	logger.Println("INVALID", isPasswordValid("1234567a"))
	logger.Println("INVALID", isPasswordValid("1234567A"))
	logger.Println("VALID", isPasswordValid("1234567Aa"))

	//TESTING USERNAME VALIDATION
	logger.Println("VALID", isUsernameValid("12345678"))
	logger.Println("VALID", isUsernameValid("1234567a"))
	logger.Println("VALID", isUsernameValid("1234567A"))
	logger.Println("VALID", isUsernameValid("1234567Aa"))
	logger.Println("VALID", isUsernameValid("1234567Aa.,"))
	logger.Println("INVALID", isUsernameValid("12345 67Aa., "))
	logger.Println("INVALID", isUsernameValid("12345 67Aa.,!-_"))
	logger.Println("VALID", isUsernameValid("1234567Aa.,-_"))

	router := gin.Default()
	router.GET("/examples", getExamples)
	router.POST("/login", loginUser)
	router.POST("/register", registerUser)
	router.GET("/validate/:valId", validateUser)
	router.POST("/setDisplayName", setDisplayName)
	router.POST("/setBio", setBio)

	router.Run("localhost:8080")

}
