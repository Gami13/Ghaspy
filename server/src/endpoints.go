package main

import (
	"context"
	"ghaspy_server/src/queries"
	"ghaspy_server/src/types"
	"net/http"
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
		protoErrorNew(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	user, err := ec.Query.GetLoggedInUserProfile(ec.Ctx, token)
	if user.ID == 0 {
		protoErrorNew(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	if err != nil {
		logger.Println("ERROR: ", err)
		protoErrorNew(w, http.StatusInternalServerError, "internalError")
		return
	}

	protoSuccessNew(w, http.StatusOK, &types.ResponseGetProfile{
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
