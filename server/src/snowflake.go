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

var numberInBatch uint64 = 0

type SnowflakeType uint16

const (
	SF_USER SnowflakeType = iota
	SF_VERIFICATION
	SF_POST
	SF_LIKE
	SF_FOLLOW
	SF_MESSAGE
	SF_ATTACHMENT
	SF_BOOKMARK
	SF_CHAT
	SF_TOKEN
	SF_ELEVEN
	SF_TWELVE
	SF_THIRTEEN
	SF_FOURTEEN
	SF_FIFTEEN
	SF_OTHER
)

func (s SnowflakeType) String() string {
	return [...]string{"USER", "VERIFICATION", "POST", "LIKE", "FOLLOW", "MESSAGE", "ATTACHMENT", "BOOKMARK", "CHAT", "TOKEN", "OTHER", "OTHER", "OTHER", "OTHER", "OTHER", "OTHER"}[s]
}

type Snowflake struct {
	ID            uint64
	Date          time.Time
	NumberInBatch uint64
	IDType        SnowflakeType
}

func (s Snowflake) StringIDBin() string {
	return strconv.FormatUint(s.ID, 2)
}
func (s Snowflake) StringIDDec() string {
	return strconv.FormatUint(s.ID, 10)
}

func newSnowflake(IDType SnowflakeType) Snowflake {
	var currentDate = time.Now().UnixMilli()

	var ID = ((uint64((currentDate-epoch)<<BATCH_BITS) | numberInBatch) << TYPE_BITS) | uint64(IDType)

	var snowflake = Snowflake{ID: ID,
		Date: time.UnixMilli(currentDate),

		NumberInBatch: numberInBatch,
		IDType:        IDType}

	numberInBatch++
	if numberInBatch == MAX_BATCH+1 {
		numberInBatch = 0
	}
	println("GENERATED: ", snowflake.StringIDDec())

	return snowflake

}

func snowflakeFromInt(input uint64) Snowflake {
	return Snowflake{ID: input,
		Date:          time.UnixMilli(int64(input>>(TYPE_BITS+BATCH_BITS)) + epoch),
		NumberInBatch: input >> TYPE_BITS & MAX_BATCH,
		IDType:        SnowflakeType(input & MAX_TYPE)}
}
