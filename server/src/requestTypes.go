package main

type setDisplayNameRequestBody struct {
	UserId      int64  `json:"userId"`
	DisplayName string `json:"displayName"`
}
type setBioRequestBody struct {
	UserId int64  `json:"userId"`
	Bio    string `json:"bio"`
}
type RegisterRequestBody struct {
	Nickname string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}
