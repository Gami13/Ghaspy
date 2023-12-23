package main

import (
	"math/rand"
	"time"
)

// epoch is int64 1638316800000, which is 2021-12-01 00:00:00 UTC
// time.Date(2022, 0, 1, 0, 0, 0, 0, time.UTC).UnixMilli()
const epoch = 1638316800000

var numberInBatch int64 = 0

type SnowflakeType int

const (
	USER SnowflakeType = iota
	VERIFICATION
	POST
	LIKE
	FOLLOW
	MESSAGE
	RESERVED
	BOOKMARK
)

func (s SnowflakeType) String() string {
	return [...]string{"USER", "VERIFICATION", "POST", "LIKE", "FOLLOW", "MESSAGE", "RESERVED", "BOOKMARK"}[s]
}
func (s SnowflakeType) Int() int64 {
	return [...]int64{0, 1, 2, 3, 4, 5, 6, 7}[s]
}

func newSnowflakeType(input string) SnowflakeType {
	switch input {
	case "000":
		return USER
	case "001":
		return VERIFICATION
	case "010":
		return POST
	case "011":
		return LIKE
	case "100":
		return FOLLOW
	case "101":
		return MESSAGE
	case "110":
		return RESERVED
	case "111":
		return BOOKMARK
	default:
		return USER
	}
}

type Snowflake struct {
	ID            int64
	Date          time.Time
	Age           int64
	NumberInBatch int64
	IDType        SnowflakeType
}

func newSnowflake(idType string) Snowflake {
	var currentDate = time.Now().UnixMilli()
	var IDType = newSnowflakeType(idType)
	var ID = (currentDate-epoch)<<22 | numberInBatch<<14 | IDType.Int()<<11 | rand.Int63n(2048)
	var snowflake = Snowflake{ID: ID,
		Date:          time.UnixMilli(currentDate),
		Age:           (currentDate - epoch) / (1000 * 60 * 60 * 24),
		NumberInBatch: numberInBatch,
		IDType:        IDType}
	numberInBatch++
	return snowflake

}
