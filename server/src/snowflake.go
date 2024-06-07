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

var numberInBatch uint32 = 0

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

type Snowflake uint64

func (s Snowflake) String() string {
	return strconv.FormatUint(uint64(s), 10)
}

func (s Snowflake) StringBinary() string {
	return strconv.FormatUint(uint64(s), 2)
}

func newSnowflake(IDType SnowflakeType) Snowflake {
	var currentDate = time.Now().UnixMilli()

	var ID = Snowflake(((uint64((currentDate-epoch)<<BATCH_BITS) | uint64(numberInBatch)) << TYPE_BITS) | uint64(IDType))

	numberInBatch++
	if numberInBatch == MAX_BATCH+1 {
		numberInBatch = 0
	}
	println("GENERATED: ", ID.String())

	return ID

}

func SnowflakeFromInt(ID uint64) Snowflake {
	return Snowflake(ID)
}

func (s Snowflake) GetType() SnowflakeType {
	return SnowflakeType(uint64(s) & MAX_TYPE)
}

func (s Snowflake) GetTime() time.Time {
	return time.UnixMilli(int64(s>>(TYPE_BITS+BATCH_BITS)) + epoch)
}
func (s Snowflake) GetJSTime() string {
	return s.GetTime().Format("Mon Jan 02 2006 15:04:05 GMT-0700 (MST)")
}
func (s Snowflake) GetTimestamp() uint64 {
	return uint64(s>>(TYPE_BITS+BATCH_BITS)) + epoch
}

func (s Snowflake) GetBatch() uint32 {
	return uint32(s >> TYPE_BITS & MAX_BATCH)
}
