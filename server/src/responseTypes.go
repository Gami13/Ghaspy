package main

import "database/sql"

// Booleans could be replaces with an uint8 bitfield
type GetProfileResponseBody struct {
	UserName          string `json:"userName"`
	DisplayName       string `json:"displayName"`
	Bio               string `json:"bio"`
	Avatar            string `json:"avatar"`
	Banner            string `json:"banner"`
	LikeCount         int    `json:"likeCount"`
	PostCount         int    `json:"postCount"`
	FollowerCount     int    `json:"followerCount"`
	FollowingCount    int    `json:"followingCount"`
	AreYouFollowing   bool   `json:"areYouFollowing"`
	AreYouFollowedBy  bool   `json:"areYouFollowedBy"`
	JoinedAt          string `json:"joinedAt"`
	IsFollowersPublic bool   `json:"isFollowersPublic"`
	IsFollowingPublic bool   `json:"isFollowingPublic"`
	IsPostsPublic     bool   `json:"isPostsPublic"`
	IsLikesPublic     bool   `json:"isLikesPublic"`
	IsYourProfile     bool   `json:"isYourProfile"`
}

type GetProfileSQLBody struct {
	id                int64
	UserName          string
	DisplayName       sql.NullString
	Bio               sql.NullString
	Avatar            sql.NullString
	Banner            sql.NullString
	isFollowersPublic bool
	isFollowingPublic bool
	isPostsPublic     bool
	isLikesPublic     bool
	likeCount         int
	postCount         int
	countFollows      int
	countFollowers    int
	isFollowed        bool
	isFollowingYou    bool
	isYourProfile     bool
}

type GetLoggedInUserProfileResponseBody struct {
	Id                int64          `json:"id"`
	UserName          string         `json:"userName"`
	DisplayName       sql.NullString `json:"displayName"`
	Bio               sql.NullString `json:"bio"`
	Avatar            sql.NullString `json:"avatar"`
	Banner            sql.NullString `json:"banner"`
	LikeCount         int            `json:"likeCount"`
	PostCount         int            `json:"postCount"`
	FollowerCount     int            `json:"followerCount"`
	FollowingCount    int            `json:"followingCount"`
	IsFollowersPublic bool           `json:"isFollowersPublic"`
	IsFollowingPublic bool           `json:"isFollowingPublic"`
	IsPostsPublic     bool           `json:"isPostsPublic"`
	IsLikesPublic     bool           `json:"isLikesPublic"`
}
