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

	var snowflake = newSnowflake("000")
	var snowflake2 = newSnowflake("001")

	println(snowflake.ID, snowflake.IDType.String(), snowflake.Date.String(), snowflake.Age, snowflake.NumberInBatch, "\n")
	println(snowflake2.ID, snowflake2.IDType.String(), snowflake2.Date.String(), snowflake2.Age, snowflake2.NumberInBatch)
	router := gin.Default()
	router.GET("/examples", getExamples)

	router.Run("localhost:8080")
}
