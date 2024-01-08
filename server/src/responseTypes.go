package main

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
	DisplayName       string
	Bio               string
	Avatar            string
	Banner            string
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
	Id                int64  `json:"id"`
	UserName          string `json:"userName"`
	DisplayName       string `json:"displayName"`
	Bio               string `json:"bio"`
	Avatar            string `json:"avatar"`
	Banner            string `json:"banner"`
	LikeCount         int    `json:"likeCount"`
	PostCount         int    `json:"postCount"`
	FollowerCount     int    `json:"followerCount"`
	FollowingCount    int    `json:"followingCount"`
	IsFollowersPublic bool   `json:"isFollowersPublic"`
	IsFollowingPublic bool   `json:"isFollowingPublic"`
	IsPostsPublic     bool   `json:"isPostsPublic"`
	IsLikesPublic     bool   `json:"isLikesPublic"`
}
type UserShort struct {
	Id          int64  `json:"id"`
	UserName    string `json:"userName"`
	DisplayName string `json:"displayName"`
	Avatar      string `json:"avatar"`
	Banner      string `json:"banner"`
	Bio         string `json:"bio"`
}

type Post struct {
	Id          int64     `json:"id"`
	Author      UserShort `json:"author"`
	Content     string    `json:"content"`
	ReplyTo     int64     `json:"replyTo"`
	QuouteOf    int64     `json:"quouteOf"`
	Attachments []string  `json:"attachments"`
	LikeCount   int       `json:"likeCount"`
	QuoteCount  int       `json:"quoteCount"`
	ReplyCount  int       `json:"replyCount"`
	TimePosted  string    `json:"timePosted"`
}
