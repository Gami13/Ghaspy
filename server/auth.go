package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func loginUser(c *gin.Context) {
}

func registerUser(c *gin.Context) {
	var requestBody RegisterRequestBody

	if err := c.BindJSON(&requestBody); err != nil {
		// DO SOMETHING WITH THE ERROR
		logger.Println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Invalid request body"})
	}

	logger.Println(requestBody.Email)

}
func validateUser(c *gin.Context) {
	valId := c.Param("valId")
	logger.Println("Validating: " + valId)
}
