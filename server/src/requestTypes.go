package main

type RegisterRequestBody struct {
	Nickname string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type LoginRequestBody struct {
	Email      string `json:"email"`
	Password   string `json:"password"`
	DeviceName string `json:"deviceName"`
}

type SetDisplayNameRequestBody struct {
	DisplayName string `json:"displayName"`
}

type SetBioRequestBody struct {
	Bio string `json:"bio"`
}

type GetPinsRequestBody struct {
	Page int `json:"page"`
}

type TogglePinRequestBody struct {
	PostID int `json:"postID"`
}

type ToggleLikeRequestBody struct {
	PostID int `json:"postID"`
}

type ToggleFollowRequestBody struct {
	UserID int `json:"userID"`
}
