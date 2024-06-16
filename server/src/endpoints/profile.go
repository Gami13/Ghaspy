package endpoints

import (
	protoutils "ghaspy_server/src/protoUtils"
	"ghaspy_server/src/queries"
	"ghaspy_server/src/snowflake"
	"ghaspy_server/src/types"
	"ghaspy_server/src/utils"
	"strings"

	"io"
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"google.golang.org/protobuf/proto"
)

func (ec *EndpointContext) GetLoggedInUserProfileEndpoint(w http.ResponseWriter, r *http.Request) {
	println("Getting logged in user profile")
	token := r.Header.Get("Authorization")
	if token == "" {
		println("ERROR: ", "unauthorized")
		protoutils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	user, err := ec.Query.SelectLoggedInUserProfile(ec.Ctx, token)
	if user.ID == 0 {
		println("ERROR: ", "unauthorized")

		protoutils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}

	println("USER PROFILE: ", user.ID)

	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseGetProfile{
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
			JoinedAt:          snowflake.Snowflake(user.ID).GetJSTime(),
			IsYourProfile:     true,
			IsFollowingYou:    false,
			IsFollowedByYou:   false,
		},
	})
}

func (ec *EndpointContext) PatchDisplayNameEndpoint(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	requestBody := types.RequestSetDisplayName{}
	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "cantReadBody")
		return
	}
	err = proto.Unmarshal(bodyBytes, &requestBody)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "cantUnmarshal")
		return
	}
	newName, err := ec.Query.UpdateDisplayName(ec.Ctx, queries.UpdateDisplayNameParams{
		Displayname: pgtype.Text{
			String: requestBody.DisplayName,
		},
		Token: token,
	})
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	println("DISPLAY NAME CHANGED: ", newName.String)
	if requestBody.DisplayName != newName.String {
		protoutils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return

	}
	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseSetDisplayName{Message: "displayNameChanged"})

}

func (ec *EndpointContext) PatchBioEndpoint(w http.ResponseWriter, r *http.Request) {

	token := r.Header.Get("Authorization")
	requestBody := types.RequestSetBio{}
	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "cantReadBody")
		return
	}
	err = proto.Unmarshal(bodyBytes, &requestBody)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "cantUnmarshal")
		return
	}

	newBio, err := ec.Query.UpdateBio(ec.Ctx, queries.UpdateBioParams{
		Bio:   pgtype.Text{String: requestBody.Bio},
		Token: token,
	})
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	println("New bio: ", newBio.String)

	if newBio.String != requestBody.Bio {
		protoutils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseSetBio{Message: "bioChanged"})
}
func (ec *EndpointContext) PatchIsFollowersPublicEndpoint(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")

	currentState, err := ec.Query.UpdateToggleIsFollowersPublic(ec.Ctx, token)

	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseToggleFollowersPublic{Message: "isFollowersPublicToggled", State: currentState})
}

func (ec *EndpointContext) PatchIsFollowingPublicEndpoint(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")

	currentState, err := ec.Query.UpdateToggleIsFollowingPublic(ec.Ctx, token)

	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseToggleFollowingPublic{Message: "isFollowingPublicToggled", State: currentState})
}

func (ec *EndpointContext) PatchIsPostsPublicEndpoint(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")

	currentState, err := ec.Query.UpdateToggleIsPostsPublic(ec.Ctx, token)

	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseTogglePostsPublic{Message: "isPostsPublicToggled", State: currentState})
}

func (ec *EndpointContext) PatchIsLikesPublicEndpoint(w http.ResponseWriter, r *http.Request) {

	token := r.Header.Get("Authorization")

	currentState, err := ec.Query.UpdateToggleIsLikesPublic(ec.Ctx, token)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseToggleLikesPublic{Message: "isLikesPublicToggled", State: currentState})

}

func (ec *EndpointContext) PatchAvatarEndpoint(w http.ResponseWriter, r *http.Request) {

	var token = r.Header.Get("Authorization")

	file, fileHeader, err := r.FormFile("file")
	if err != nil {
		println(err)
		protoutils.ProtoError(w, http.StatusBadRequest, "cantReadFile")
		return

	}
	defer file.Close()

	filename, err := utils.SaveFile(fileHeader)
	if err != nil {
		println(err)
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
	}

	avatarPath, err := ec.Query.UpdateAvatar(ec.Ctx, queries.UpdateAvatarParams{
		Avatar: pgtype.Text{String: filename},
		Token:  token,
	})
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	println(avatarPath.String)
	if avatarPath.String == "" {
		protoutils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseSetAvatar{Message: "avatarChanged", Url: filename})
}

func (ec *EndpointContext) PatchBannerEndpoint(w http.ResponseWriter, r *http.Request) {

	var token = r.Header.Get("Authorization")

	file, fileHeader, err := r.FormFile("file")

	if err != nil {
		println(err)
		protoutils.ProtoError(w, http.StatusBadRequest, "cantReadFile")
		return

	}
	defer file.Close()

	filename, err := utils.SaveFile(fileHeader)
	if err != nil {
		println(err)
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
	}

	bannerPath, err := ec.Query.UpdateBanner(ec.Ctx, queries.UpdateBannerParams{
		Banner: pgtype.Text{String: filename},
		Token:  token,
	})
	if err != nil {
		println("ERROR: ", err)
		// return protoUtils.ProtoErrorOld(c, http.StatusInternalServerError, "internalError")
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	println(bannerPath.String)
	if bannerPath.String == "" {
		protoutils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseSetBanner{Message: "bannerChanged", Url: filename})
}

func (ec *EndpointContext) GetProfileEndpoint(w http.ResponseWriter, r *http.Request) {

	var token = "0"

	if len(r.Header.Get("Authorization")) != 0 {
		token = r.Header.Get("Authorization")
	}
	userName := strings.TrimPrefix(r.URL.Path, "/profile/")
	println("USERNAME: ", userName)

	if userName == "" {
		protoutils.ProtoError(w, http.StatusBadRequest, "badRequestNoUsername")
		return
	}
	user, err := ec.Query.SelectUser(ec.Ctx, queries.SelectUserParams{
		Username: userName,
		Token:    token})
	if err != nil {
		println("DATBASE ERROR: ", err.Error())
		protoutils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}

	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseGetProfile{
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
			JoinedAt:          snowflake.Snowflake(user.ID).GetJSTime(),
		},
	},
	)

}
