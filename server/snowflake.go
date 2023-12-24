package main

import (
	"math/rand"
	"strconv"
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
	NumberInBatch int64
	IDType        SnowflakeType
}

func (s Snowflake) String() string {
	return strconv.FormatInt(s.ID, 2)
}

// 42 bits for timestamp, 10 bits for batch, 3 bits for type, 8 bits for random
func newSnowflake(idType string) Snowflake {
	var currentDate = time.Now().UnixMilli()
	var IDType = newSnowflakeType(idType)
	println("GENERATING: ", strconv.FormatInt(currentDate-epoch, 2))
	var ID = currentDate - epoch
	ID = ID << 10
	ID = ID | numberInBatch
	ID = ID << 3
	ID = ID | IDType.Int()
	ID = ID << 8
	ID = ID | rand.Int63n(255)

	var snowflake = Snowflake{ID: ID,
		Date: time.UnixMilli(currentDate),

		NumberInBatch: numberInBatch,
		IDType:        IDType}

	if numberInBatch == 1023 {
		numberInBatch = 0
	}
	numberInBatch++
	println("GENERATED: ", snowflake.String())
	return snowflake

}

func snowflakeFromInt(input int64) Snowflake {
	var IDType = newSnowflakeType(strconv.FormatInt(input>>8&7, 2))
	var numberInBatch = input >> 11 & 1023
	var date = input >> 21
	date = date + epoch
	var snowflake = Snowflake{ID: input,
		Date:          time.UnixMilli(date),
		NumberInBatch: numberInBatch,
		IDType:        IDType}
	return snowflake
}
