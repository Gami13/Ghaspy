package main

import (
	"strconv"
	"time"
)

// epoch is int64 1638316800000, which is 2021-12-01 00:00:00 UTC
// time.Date(2022, 0, 1, 0, 0, 0, 0, time.UTC).UnixMilli()
const epoch = 1638316800000
const TYPE_BITS = 4
const MAX_TYPE = 15
const BATCH_BITS = 17
const MAX_BATCH = 131071

var numberInBatch int64 = 0

type SnowflakeType int

const (
	USER SnowflakeType = iota
	VERIFICATION
	POST
	LIKE
	FOLLOW
	MESSAGE
	ATTACHMENT
	BOOKMARK
	CHAT
	TOKEN
	ELEVEN
	TWELVE
	THIRTEEN
	FOURTEEN
	FIFTEEN
	OTHER
)

func (s SnowflakeType) String() string {
	return [...]string{"USER", "VERIFICATION", "POST", "LIKE", "FOLLOW", "MESSAGE", "ATTACHMENT", "BOOKMARK", "CHAT", "TOKEN", "OTHER", "OTHER", "OTHER", "OTHER", "OTHER", "OTHER"}[s]
}
func (s SnowflakeType) Int() int64 {
	return [...]int64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15}[s]
}

func newSnowflakeType(input string) SnowflakeType {

	for len(input) < TYPE_BITS {
		input = "0" + input
	}

	switch input {
	case "0000":
		return USER
	case "0001":
		return VERIFICATION
	case "0010":
		return POST
	case "0011":
		return LIKE
	case "0100":
		return FOLLOW
	case "0101":
		return MESSAGE
	case "0110":
		return ATTACHMENT
	case "0111":
		return BOOKMARK
	case "1000":
		return TOKEN
	case "1001":
		return OTHER
	case "1010":
		return OTHER
	case "1011":
		return OTHER
	case "1100":
		return OTHER
	case "1101":
		return OTHER
	case "1110":
		return OTHER
	case "1111":
		return OTHER
	default:
		return OTHER

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

func newSnowflake(idType string) Snowflake {
	var currentDate = time.Now().UnixMilli()
	var IDType = newSnowflakeType(idType)
	var ID = ((((currentDate - epoch) << BATCH_BITS) | numberInBatch) << TYPE_BITS) | IDType.Int()

	var snowflake = Snowflake{ID: ID,
		Date: time.UnixMilli(currentDate),

		NumberInBatch: numberInBatch,
		IDType:        IDType}

	numberInBatch++
	if numberInBatch == MAX_BATCH+1 {
		numberInBatch = 0
	}
	println("GENERATED: ", snowflake.String())

	return snowflake

}

func snowflakeFromInt(input int64) Snowflake {
	return Snowflake{ID: input,
		Date:          time.UnixMilli((input >> (TYPE_BITS + BATCH_BITS)) + epoch),
		NumberInBatch: input >> TYPE_BITS & MAX_BATCH,
		IDType:        newSnowflakeType(strconv.FormatInt(input&MAX_TYPE, 2))}
}
