package main

import (
	"net/http"
	"regexp"

	"net/mail"

	"github.com/gin-gonic/gin"
)

func loginUser(c *gin.Context) {
}

// PASSWORD REQUIREMENTS
// 8 characters minimum
// 1 uppercase letter
// 1 lowercase letter
// 1 number
func isPasswordValid(password string) []string {
	var errors []string
	if len(password) < 8 {
		errors = append(errors, "Password must be at least 8 characters long")
	}
	if regexp.MustCompile(`\s`).MatchString(password) {
		errors = append(errors, "Password cant contain spaces")
	}
	if !regexp.MustCompile(`[a-z]`).MatchString(password) {
		errors = append(errors, "Password must contain at least one lowercase letter")
	}
	if !regexp.MustCompile(`[0-9]`).MatchString(password) {
		errors = append(errors, "Password must contain at least one number")
	}
	if !regexp.MustCompile(`[A-Z]`).MatchString(password) {
		errors = append(errors, "Password must contain at least one uppercase letter")
	}
	return errors
}

// USERNAME REQUIREMENTS
// 3 characters minimum
// 64 characters maximum
// no spaces
// no special characters except for _ and - and . and ,

func isUsernameValid(username string) []string {
	var errors []string
	if len(username) < 3 {
		errors = append(errors, "Username must be at least 3 characters long")
	}
	if len(username) > 64 {
		errors = append(errors, "Username must be at most 64 characters long")
	}
	if regexp.MustCompile(`\s`).MatchString(username) {
		errors = append(errors, "Username must not contain spaces")
	}
	if !regexp.MustCompile(`[a-zA-Z0-9_.,-]`).MatchString(username) {
		errors = append(errors, "Username must not contain special characters")
	}
	return errors
}

func registerUser(c *gin.Context) {
	var requestBody RegisterRequestBody

	if err := c.BindJSON(&requestBody); err != nil {
		// DO SOMETHING WITH THE ERROR
		logger.Println(err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Invalid request body"})
	}

	logger.Println("REGISTERING: ", requestBody.Email)

	passwordErrors := isPasswordValid(requestBody.Password)
	usernameErrors := isUsernameValid(requestBody.Nickname)
	var emailErrors []string
	_, err := mail.ParseAddress(requestBody.Email)
	if err != nil {

		emailErrors = append(emailErrors, "Invalid email address")
	}

	if len(passwordErrors) > 0 || len(usernameErrors) > 0 || len(emailErrors) > 0 {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"passwordErrors": passwordErrors, "usernameErrors": usernameErrors, "emailErrors": emailErrors})
		return
	}

	//TODO: REGISTER USER HERE

	c.IndentedJSON(http.StatusOK, gin.H{"message": "User registered successfully"})

}
func validateUser(c *gin.Context) {
	valId := c.Param("valId")
	logger.Println("Validating: " + valId)
}
