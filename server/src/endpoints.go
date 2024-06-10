package main

import (
	"context"
	"ghaspy_server/src/queries"
	"ghaspy_server/src/types"
	"io"
	"net/http"

	"google.golang.org/protobuf/proto"
)

type EndpointContext struct {
	Query *queries.Queries
	Ctx   context.Context
}

func NewEndpointContext(query *queries.Queries, ctx context.Context) *EndpointContext {
	if query == nil {
		panic("Query is nil!")
	}
	if ctx == nil {
		panic("Context is nil!")
	}

	return &EndpointContext{Query: query, Ctx: ctx}
}

func (ec *EndpointContext) GetLoggedInUserProfileEndpoint(w http.ResponseWriter, r *http.Request) {
	logger.Println("Getting logged in user profile")
	token := r.Header.Get("Authorization")
	if token == "" {
		logger.Println("ERROR: ", "unauthorized")
		ProtoErrorNew(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	user, err := ec.Query.SelectLoggedInUserProfile(ec.Ctx, token)
	if user.ID == 0 {
		logger.Println("ERROR: ", "unauthorized")

		ProtoErrorNew(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	if err != nil {
		logger.Println("ERROR: ", err)
		ProtoErrorNew(w, http.StatusInternalServerError, "internalError")
		return
	}

	logger.Println("USER PROFILE: ", user.ID)

	ProtoSuccessNew(w, http.StatusOK, &types.ResponseGetProfile{
		Profile: &types.User{
			ID:                user.ID,
			Username:          user.Username,
			DisplayName:       user.Displayname.String,
			Bio:               user.Bio.String,
			Avatar:            user.Avatar.String,
			Banner:            user.Banner.String,
			IsFollowersPublic: user.Isfollowerspublic,
			IsFollowingPublic: user.Isfollowingpublic,
			IsPostsPublic:     user.Ispostspublic,
			IsLikesPublic:     user.Islikespublic,
			CountLikes:        uint32(user.Countlikes),
			CountPosts:        uint32(user.Countposts),
			CountFollowing:    uint32(user.Countisfollowing),
			CountFollowers:    uint32(user.Countfollowedby),
			PrefferedLanguage: user.Prefferedlanguage,
			JoinedAt:          Snowflake(user.ID).GetJSTime(),
			IsYourProfile:     true,
			IsFollowingYou:    false,
			IsFollowedByYou:   false,
		},
	})
}

func (ec *EndpointContext) PostLogInUserEndpoint(w http.ResponseWriter, r *http.Request) {

	requestBody := types.RequestLogInUser{}
	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		logger.Println("ERROR: ", err)
		ProtoErrorNew(w, http.StatusBadRequest, "cantReadBody")
		return
	}

	err = proto.Unmarshal(bodyBytes, &requestBody)
	if err != nil {
		logger.Println("ERROR: ", err)
		ProtoErrorNew(w, http.StatusBadRequest, "cantUnmarshal")
		return
	}
	logger.Println("LOGGING IN: ", requestBody.Email)

	authData, err := ec.Query.SelectAuthData(ec.Ctx, requestBody.Email)

	if err != nil {
		logger.Println("ERROR: ", err)
		ProtoErrorNew(w, http.StatusBadRequest, "dataIncorrect")
		return

	}
	if !authData.Isvalidated {

		logger.Println("ERROR: ", "unvalidated")
		ProtoErrorNew(w, http.StatusBadRequest, "unvalidated")
		return

	}
	match := comparePasswordAndHash(requestBody.Password, authData.Password, authData.Salt)

	if !match {

		logger.Println("ERROR: ", "dataIncorrect")
		ProtoErrorNew(w, http.StatusBadRequest, "dataIncorrect")
		return

	}

	token, snowflake, err := generateToken()
	if err != nil {
		logger.Println("ERROR: ", err)
		ProtoErrorNew(w, http.StatusBadRequest, "cantGenerateToken")
		return

	}

	insertResult, err := ec.Query.InsertToken(ec.Ctx, queries.InsertTokenParams{
		ID:     int64(snowflake),
		Userid: authData.ID,
		Token:  token,
		Device: requestBody.DeviceName,
	})

	if err != nil {

		logger.Println("ERROR: ", err)
		ProtoErrorNew(w, http.StatusBadRequest, "cantInsertToken")

	}
	if insertResult.ID == 0 {
		ProtoErrorNew(w, http.StatusBadRequest, "cantInsertToken")
		return
	}
	logger.Println("USER LOGGED IN: ", requestBody.Email)

	ProtoSuccessNew(w, http.StatusOK, &types.ResponseLogInUser{Token: token, UserID: int64(authData.ID), Message: "userLoggedIn"})

}
