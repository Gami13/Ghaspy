package endpoints

import (
	"ghaspy_server/src/protoUtils"
	protoutils "ghaspy_server/src/protoUtils"
	"ghaspy_server/src/queries"
	"ghaspy_server/src/snowflake"
	"ghaspy_server/src/types"
	"ghaspy_server/src/utils"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/jackc/pgx/v5/pgtype"
	"google.golang.org/protobuf/proto"
)

func (ec *EndpointContext) PostAddPostEndpoint(w http.ResponseWriter, r *http.Request) {
	//!take a second look and check if it auths

	println("ADD POST")
	var token = r.Header.Get("Authorization")
	r.ParseMultipartForm(36 * 1024 * 1024) //36MB max = 8MB per file * 4 files + 4MB for rest

	var content = ""
	var quoteOf uint64 = 0
	var replyTo uint64 = 0
	var err error
	if len(r.FormValue("content")) != 0 {
		content = r.FormValue("content")
	}
	if len(r.FormValue("quoteOf")) != 0 {
		quoteOf, err = strconv.ParseUint(r.FormValue("quoteOf"), 10, 64)
		if err != nil {
			println("ERROR: ", err)
			protoUtils.ProtoError(w, http.StatusBadRequest, "badRequestQuoteOf")
			return
		}
	}
	if len(r.FormValue("replyTo")) != 0 {
		replyTo, err = strconv.ParseUint(r.FormValue("replyTo"), 10, 64)
		if err != nil {
			println("ERROR: ", err)
			protoUtils.ProtoError(w, http.StatusBadRequest, "badRequestReplyTo")
			return
		}

	}

	if len(content) > 360 {
		protoUtils.ProtoError(w, http.StatusBadRequest, "badRequestContentTooLong")
		return
	}
	if len(r.MultipartForm.File) == 0 && content == "" && quoteOf == 0 && replyTo == 0 {
		protoUtils.ProtoError(w, http.StatusBadRequest, "badRequestNoContent")
		return
	}

	var fileNames []string
	//PROCESSING FILES
	for _, fileHeaders := range r.MultipartForm.File {
		for _, fileHeader := range fileHeaders {

			fileName, err := utils.SaveFile(fileHeader)
			if err != nil {
				println(err)
				protoUtils.ProtoError(w, http.StatusInternalServerError, "internalError")
				return
			}
			fileNames = append(fileNames, fileName)

		}
	}
	postId := snowflake.New(snowflake.POST)
	println("POST ID", postId)
	println("TOKEN", token)
	println("CONTENT", content)
	println("QUOTE OF", quoteOf)
	println("REPLY TO", replyTo)
	threadStart := postId
	if replyTo != 0 {
		start, err := ec.Query.SelectThreadStart(ec.Ctx, int64(replyTo))
		threadStart = snowflake.Snowflake(start.Int64)
		if err != nil {
			println("ERROR: ", err)
			protoUtils.ProtoError(w, http.StatusInternalServerError, "internalError")
			return
		}
	}
	for _, fileName := range fileNames {
		println("FILE NAME", fileName)
	}
	affectedRows, err := ec.Query.InsertNewPost(ec.Ctx, queries.InsertNewPostParams{
		ID:          int64(postId),
		Token:       token,
		Content:     pgtype.Text{String: content},
		Quoteof:     pgtype.Int8{Int64: int64(quoteOf)},
		Replyto:     pgtype.Int8{Int64: int64(replyTo)},
		Threadstart: pgtype.Int8{Int64: int64(threadStart)},
		Attachments: fileNames,
	})
	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	if affectedRows == 0 {
		protoUtils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	protoUtils.ProtoSuccess(w, http.StatusOK, &types.ResponseAddPost{Message: "postAdded", PostID: int64(postId)})

}

func (ec *EndpointContext) PatchBookmarkEndpoint(w http.ResponseWriter, r *http.Request) {

	token := r.Header.Get("Authorization")
	requestBody := types.RequestToggleBookmark{}
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
	postIdInt, err := strconv.ParseInt(requestBody.PostID, 10, 64)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "badRequestID")
		return
	}
	newState, err := ec.Query.ToggleBookmark(ec.Ctx, queries.ToggleBookmarkParams{
		ID:     int64(snowflake.New(snowflake.BOOKMARK)),
		Postid: postIdInt,
		Token:  token,
	})
	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseToggleBookmark{Message: "bookmarkToggled", State: newState})

}
func (ec *EndpointContext) PatchLikeEndpoint(w http.ResponseWriter, r *http.Request) {

	token := r.Header.Get("Authorization")
	requestBody := types.RequestToggleLike{}
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
	println("Request body: ", requestBody.PostID)
	postIdInt, err := strconv.ParseInt(requestBody.PostID, 10, 64)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "badRequestID")
		return
	}
	newState, err := ec.Query.ToggleLike(ec.Ctx, queries.ToggleLikeParams{
		ID:     int64(snowflake.New(snowflake.BOOKMARK)),
		Postid: postIdInt,
		Token:  token,
	})
	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseToggleBookmark{Message: "likeToggled", State: newState})

}

func (ec *EndpointContext) PatchFollowEndpoint(w http.ResponseWriter, r *http.Request) {

	token := r.Header.Get("Authorization")
	requestBody := types.RequestToggleFollow{}
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
	followedIdInt, err := strconv.ParseInt(requestBody.UserID, 10, 64)
	if err != nil {
		println("ERROR: ", err)
		protoutils.ProtoError(w, http.StatusBadRequest, "badRequestID")
		return
	}
	newState, err := ec.Query.ToggleFollow(ec.Ctx, queries.ToggleFollowParams{
		ID:         int64(snowflake.New(snowflake.BOOKMARK)),
		Followedid: followedIdInt,
		Token:      token,
	})
	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}
	protoutils.ProtoSuccess(w, http.StatusOK, &types.ResponseToggleBookmark{Message: "followToggled", State: newState})

}
func (ec *EndpointContext) DeletePostEndpoint(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	requestBody := types.RequestDeletePost{}
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

	PostID, err := strconv.Atoi(requestBody.PostID)
	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusBadRequest, "badRequestID")
		return
	}
	affectedCount, err := ec.Query.DeletePost(ec.Ctx, queries.DeletePostParams{
		ID:    int64(PostID),
		Token: token,
	})

	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	if affectedCount == 0 {
		protoUtils.ProtoError(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	protoUtils.ProtoSuccess(w, http.StatusOK, &types.ResponseDeletePost{Message: "postRemoved"})

}

func (ec *EndpointContext) GetPostsChronologicallyEndpoint(w http.ResponseWriter, r *http.Request) {

	println("Getting posts chrono")
	token := ""
	if len(r.Header.Get("Authorization")) > 0 {
		token = r.Header.Get("Authorization")
	}
	println("TOKEN: ", token)
	page := strings.TrimPrefix(r.URL.Path, "/posts-chrono/")
	pageInt, err := strconv.ParseUint(page, 10, 32)
	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusBadRequest, "badRequestNotNumber")
		return

	}
	println("Requesting chronological posts, page number: ", pageInt)

	rows, err := ec.Query.SelectPostsChronologically(ec.Ctx, queries.SelectPostsChronologicallyParams{
		Tokenin: token,
		Offset:  int64(pageInt) * 50,
	})

	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	var posts []*types.Post
	println("Fetched from db")
	for _, row := range rows {
		println("ROW: ", row.ID.Int64, "IS LIKED:", row.Ispostliked.Bool)
		post := types.Post{
			ID: row.ID.Int64,
			Author: &types.User{
				ID:             row.Authorid.Int64,
				Username:       row.Username.String,
				DisplayName:    row.Username.String,
				Bio:            row.Bio.String,
				Avatar:         row.Avatar.String,
				Banner:         row.Banner.String,
				CountLikes:     uint32(row.Countlikes.Int64),
				CountPosts:     uint32(row.Countposts.Int64),
				CountFollowers: uint32(row.Countfollowedby.Int64),
				CountFollowing: uint32(row.Countisfollowing.Int64),

				JoinedAt:          snowflake.Snowflake(row.Authorid.Int64).GetJSTime(),
				IsFollowersPublic: row.Isfollowerspublic.Bool,
				IsFollowingPublic: row.Isfollowingpublic.Bool,
				IsPostsPublic:     row.Ispostspublic.Bool,
				IsLikesPublic:     row.Islikespublic.Bool,
			},
			Content:      row.Content.String,
			ReplyToID:    &row.Replyto.Int64,
			QuotedID:     &row.Quoteof.Int64,
			Attachments:  row.Attachments,
			CountLikes:   uint32(row.Postcountlikes.Int64),
			CountQuotes:  uint32(row.Postcountquotes.Int64),
			CountReplies: uint32(row.Postcountreplies.Int64),
			IsLiked:      row.Ispostliked.Bool,
			IsBookmarked: row.Ispostbookmarked.Bool,
			ThreadStart:  row.Threadstart.Int64,
			TimePosted:   snowflake.Snowflake(row.ID.Int64).GetJSTime(),
		}
		posts = append(posts, &post)
	}
	//TODO: FILL IN QUOTED and REPLYTO LATER
	//Merge posts that are replies to posts that have that post as a reply

	protoUtils.ProtoSuccess(w, http.StatusOK, &types.ResponseGetPostsChronologically{
		Posts:      posts,
		Message:    "postsRetrievedSuccessfully",
		PageNumber: uint32(pageInt),
	})

}

func (ec *EndpointContext) GetPostEndpoint(w http.ResponseWriter, r *http.Request) {
	//check if post is posted by someone with private posts
	//if yes then check if accessing user has permissions to view it
	//	if yes, send post
	//  if not, send error with message unauthorized
	//if not send post
	println("Getting post")
	token := ""
	if len(r.Header.Get("Authorization")) > 0 {
		token = r.Header.Get("Authorization")
	}
	postId := strings.TrimPrefix(r.URL.Path, "/post/")

	postIdInt, err := strconv.ParseUint(postId, 10, 64)
	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusBadRequest, "badRequestNotNumber")
		return

	}
	println("PAGE: ", postIdInt)

	row, err := ec.Query.SelectPostByID(ec.Ctx, queries.SelectPostByIDParams{
		Token:  token,
		Postid: int64(postIdInt),
	})

	if err != nil {
		println("ERROR: ", err)

		protoUtils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}

	println("Fetched from db")

	post := types.Post{
		ID: row.ID.Int64,
		Author: &types.User{
			ID:             row.Authorid.Int64,
			Username:       row.Username.String,
			DisplayName:    row.Username.String,
			Bio:            row.Bio.String,
			Avatar:         row.Avatar.String,
			Banner:         row.Banner.String,
			CountLikes:     uint32(row.Countlikes.Int64),
			CountPosts:     uint32(row.Countposts.Int64),
			CountFollowers: uint32(row.Countfollowedby.Int64),
			CountFollowing: uint32(row.Countisfollowing.Int64),

			JoinedAt:          snowflake.Snowflake(row.Authorid.Int64).GetJSTime(),
			IsFollowersPublic: row.Isfollowerspublic.Bool,
			IsFollowingPublic: row.Isfollowingpublic.Bool,
			IsPostsPublic:     row.Ispostspublic.Bool,
			IsLikesPublic:     row.Islikespublic.Bool,
		},
		Content:      row.Content.String,
		ReplyToID:    &row.Replyto.Int64,
		QuotedID:     &row.Quoteof.Int64,
		Attachments:  row.Attachments,
		CountLikes:   uint32(row.Postcountlikes.Int64),
		CountQuotes:  uint32(row.Postcountquotes.Int64),
		CountReplies: uint32(row.Postcountreplies.Int64),
		IsLiked:      row.Ispostliked.Bool,
		IsBookmarked: row.Ispostbookmarked.Bool,
		ThreadStart:  row.Threadstart.Int64,
		TimePosted:   snowflake.Snowflake(row.ID.Int64).GetJSTime(),
	}

	println(post.TimePosted)

	protoUtils.ProtoSuccess(w, http.StatusOK, &types.ResponseGetPost{
		Post:    &post,
		Message: "postRetrievedSuccessfully",
	})

}

func (ec *EndpointContext) GetUserPostsChronologicallyEndpoint(w http.ResponseWriter, r *http.Request) {
	token := ""
	if len(r.Header.Get("Authorization")) > 0 {
		token = r.Header.Get("Authorization")
	}

	pathParams := strings.TrimPrefix(r.URL.Path, "/posts-profile/")
	splits := strings.Split(pathParams, "/")
	username := splits[0]
	page := splits[1]

	pageInt, err := strconv.ParseInt(page, 10, 32)
	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusBadRequest, "badRequestNotNumber")
		return

	}

	if username == "" {
		protoUtils.ProtoError(w, http.StatusBadRequest, "badRequestNoUsername")
		return
	}

	rows, err := ec.Query.SelectPostsByUserChronologically(ec.Ctx, queries.SelectPostsByUserChronologicallyParams{
		Token:    token,
		Offset:   int64(pageInt) * 50,
		Username: username,
	})

	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	var posts []*types.Post
	for _, row := range rows {
		post := types.Post{
			ID: row.ID.Int64,
			Author: &types.User{
				ID:             row.Authorid.Int64,
				Username:       row.Username.String,
				DisplayName:    row.Username.String,
				Bio:            row.Bio.String,
				Avatar:         row.Avatar.String,
				Banner:         row.Banner.String,
				CountLikes:     uint32(row.Countlikes.Int64),
				CountPosts:     uint32(row.Countposts.Int64),
				CountFollowers: uint32(row.Countfollowedby.Int64),
				CountFollowing: uint32(row.Countisfollowing.Int64),

				JoinedAt:          snowflake.Snowflake(row.Authorid.Int64).GetJSTime(),
				IsFollowersPublic: row.Isfollowerspublic.Bool,
				IsFollowingPublic: row.Isfollowingpublic.Bool,
				IsPostsPublic:     row.Ispostspublic.Bool,
				IsLikesPublic:     row.Islikespublic.Bool,
			},
			Content:      row.Content.String,
			ReplyToID:    &row.Replyto.Int64,
			QuotedID:     &row.Quoteof.Int64,
			Attachments:  row.Attachments,
			CountLikes:   uint32(row.Postcountlikes.Int64),
			CountQuotes:  uint32(row.Postcountquotes.Int64),
			CountReplies: uint32(row.Postcountreplies.Int64),
			IsLiked:      row.Ispostliked.Bool,
			IsBookmarked: row.Ispostbookmarked.Bool,
			ThreadStart:  row.Threadstart.Int64,
			TimePosted:   snowflake.Snowflake(row.ID.Int64).GetJSTime(),
		}
		posts = append(posts, &post)
	}

	//TODO: FILL IN QUOTED and REPLYTO LATER
	//Merge posts that are replies to posts that have that post as a reply

	protoUtils.ProtoSuccess(w, http.StatusOK, &types.ResponseGetPostsChronologicallyByUser{
		Posts:      posts,
		Message:    "postsRetrievedSuccessfully",
		PageNumber: uint32(pageInt),
	})

}

func (ec *EndpointContext) GetPostRepliesEndpoint(w http.ResponseWriter, r *http.Request) {
	//!This doesnt really do what i want
	token := ""
	if len(r.Header.Get("Authorization")) > 0 {
		token = r.Header.Get("Authorization")
	}

	pathParams := strings.TrimPrefix(r.URL.Path, "/post-replies/")
	splits := strings.Split(pathParams, "/")
	postId := splits[0]
	page := splits[1]

	postIdInt, err := strconv.ParseInt(postId, 10, 64)
	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusBadRequest, "badRequestNotNumber")
		return
	}
	pageInt, err := strconv.ParseInt(page, 10, 32)
	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusBadRequest, "badRequestNotNumber")
		return

	}

	rows, err := ec.Query.SelectThreadReplies(ec.Ctx, queries.SelectThreadRepliesParams{
		Token:      pgtype.Text{String: token},
		Postid:     pgtype.Int8{Int64: postIdInt},
		Pagenumber: pgtype.Int4{Int32: int32(pageInt) * 50},
	})
	if err != nil {
		println("ERROR: ", err)
		protoUtils.ProtoError(w, http.StatusInternalServerError, "internalError")
		return
	}
	var posts []*types.Post
	for _, row := range rows {
		post := types.Post{ID: row.ID.Int64,
			Author: &types.User{
				ID:             row.Authorid.Int64,
				Username:       row.Username.String,
				DisplayName:    row.Username.String,
				Bio:            row.Bio.String,
				Avatar:         row.Avatar.String,
				Banner:         row.Banner.String,
				CountLikes:     uint32(row.Countlikes.Int64),
				CountPosts:     uint32(row.Countposts.Int64),
				CountFollowers: uint32(row.Countfollowedby.Int64),
				CountFollowing: uint32(row.Countisfollowing.Int64),

				JoinedAt:          snowflake.Snowflake(row.Authorid.Int64).GetJSTime(),
				IsFollowersPublic: row.Isfollowerspublic.Bool,
				IsFollowingPublic: row.Isfollowingpublic.Bool,
				IsPostsPublic:     row.Ispostspublic.Bool,
				IsLikesPublic:     row.Islikespublic.Bool,
			},
			Content:      row.Content.String,
			ReplyToID:    &row.Replyto.Int64,
			QuotedID:     &row.Quoteof.Int64,
			Attachments:  row.Attachments,
			CountLikes:   uint32(row.Postcountlikes.Int64),
			CountQuotes:  uint32(row.Postcountquotes.Int64),
			CountReplies: uint32(row.Postcountreplies.Int64),
			IsLiked:      row.Ispostliked.Bool,
			IsBookmarked: row.Ispostbookmarked.Bool,
			ThreadStart:  row.Threadstart.Int64,
			TimePosted:   snowflake.Snowflake(row.ID.Int64).GetJSTime(),
		}
		posts = append(posts, &post)
	}

	protoUtils.ProtoSuccess(w, http.StatusOK, &types.ResponseGetPostReplies{
		Posts:      posts,
		Message:    "postsRetrievedSuccessfully",
		PageNumber: uint32(pageInt),
	})
}
