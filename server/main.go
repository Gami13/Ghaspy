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
func loginUser(c *gin.Context) {
}
func registerUser(c *gin.Context) {}
func validateUser(c *gin.Context) {
	valId := c.Param("valId")
	logger.Println("Validating: " + valId)
}

func main() {

	var snowflake = newSnowflake("1")
	var snowflake2 = snowflakeFromInt(snowflake.ID)
	var snowflake3 = newSnowflake("101")
	var snowflake4 = snowflakeFromInt(snowflake3.ID)

	logger.Println("1: ", snowflake.ID, snowflake.IDType.String(), snowflake.Date.Format("02/01/2006 15:04:05.000"), snowflake.NumberInBatch)
	logger.Println("1: ", snowflake2.ID, snowflake2.IDType.String(), snowflake2.Date.Format("02/01/2006 15:04:05.000"), snowflake2.NumberInBatch)
	logger.Println("2: ", snowflake3.ID, snowflake3.IDType.String(), snowflake3.Date.Format("02/01/2006 15:04:05.000"), snowflake3.NumberInBatch)
	logger.Println("2: ", snowflake4.ID, snowflake4.IDType.String(), snowflake4.Date.Format("02/01/2006 15:04:05.000"), snowflake4.NumberInBatch)

	// logger.Println(snowflake2.ID, snowflake2.IDType.String(), snowflake2.Date.String(), snowflake2.Age, snowflake2.NumberInBatch)
	router := gin.Default()
	router.GET("/examples", getExamples)
	router.POST("/login", loginUser)
	router.POST("/register", registerUser)
	router.GET("/validate/:valId", validateUser)

	router.Run("localhost:8080")

}
