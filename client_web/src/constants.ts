import type { DeepPartial, Exact } from "./types/internal";
import type _m0 from "protobufjs/minimal";
import {
	ResponseAddPost,
	ResponseGetBookmarksChronologically,
	ResponseGetPost,
	ResponseGetPostsChronologically,
	ResponseGetPostsChronologicallyByUser,
	ResponseGetProfile,
	ResponseLogInUser,
	ResponseLogOutUser,
	ResponseSignUpUser,
	ResponseToggleBookmark,
	ResponseToggleLike,
} from "./types/responses";
import {
	RequestLogInUser,
	RequestSignUpUser,
	RequestToggleBookmark,
	RequestToggleLike,
} from "./types/requests";

export const API_URL = "http://localhost:8080";
export const CDN_URL = "http://localhost:8080/attachment/";
export const IMAGE_URL = (image: string) => `${CDN_URL}${image}`;

export const LOG_IN_ENDPOINT = createEndpoint(
	`${API_URL}/log-in`,
	"POST",
	"application/x-protobuf",
	RequestLogInUser,
	ResponseLogInUser,
);

export const SIGN_UP_ENDPOINT = createEndpoint(
	`${API_URL}/sign-up`,
	"POST",
	"application/x-protobuf",
	RequestSignUpUser,
	ResponseSignUpUser,
);

export const LOG_OUT_ENDPOINT = createEndpoint(
	`${API_URL}/log-out`,
	"DELETE",
	"application/x-protobuf",
	undefined,
	ResponseLogOutUser,
);

export const CURRENT_USER_DATA_ENDPOINT = createEndpoint(
	`${API_URL}/profile`,
	"GET",
	"application/x-protobuf",
	undefined,
	ResponseGetProfile,
);

//encoder is multipart form data
export const ADD_POST_ENDPOINT = createEndpoint(
	`${API_URL}/post`,
	"POST",
	"application/x-protobuf",
	undefined,
	ResponseAddPost,
);
export const GET_POST_ENDPOINT = (postID: string) =>
	createEndpoint(
		`${API_URL}/post/${postID}`,
		"GET",
		"application/x-protobuf",
		undefined,
		ResponseGetPost,
	);

export const POSTS_CHRONO_ENDPOINT = (offset: number) =>
	createEndpoint(
		`${API_URL}/posts-chrono/${offset}`,
		"GET",
		"application/x-protobuf",
		undefined,
		ResponseGetPostsChronologically,
	);

export const TOGGLE_LIKE_ENDPOINT = createEndpoint(
	`${API_URL}/like`,
	"PATCH",
	"application/x-protobuf",
	RequestToggleLike,
	ResponseToggleLike,
);

export const TOGGLE_BOOKMARK_ENDPOINT = createEndpoint(
	`${API_URL}/bookmark`,
	"PATCH",
	"application/x-protobuf",
	RequestToggleBookmark,
	ResponseToggleBookmark,
);
export const GET_BOOKMARKS_ENDPOINT = (offset: number) =>
	createEndpoint(
		`${API_URL}/bookmarks/${offset}`,
		"GET",
		"application/x-protobuf",
		undefined,
		ResponseGetBookmarksChronologically,
	);

export const GET_PROFILE_ENDPOINT = (username: string) =>
	createEndpoint(
		`${API_URL}/profile/${username}`,
		"GET",
		"application/x-protobuf",
		undefined,
		ResponseGetProfile,
	);
export type ProfilePostsType = "posts" | "likes" | "replies" | "media";
export const GET_PROFILE_POSTS_ENDPOINT = (
	type: ProfilePostsType,
	username: string,
	offset: number,
) =>
	createEndpoint(
		`${API_URL}/profile-posts/${type}/${username}/${offset}`,
		"GET",
		"application/x-protobuf",
		undefined,
		ResponseGetPostsChronologicallyByUser,
	);

type Coder<Type> = {
	encode(message: Type, writer?: _m0.Writer): _m0.Writer;
	decode(input: _m0.Reader | Uint8Array, length?: number): Type;
	create<I extends Exact<DeepPartial<Type>, I>>(base?: I): Type;
};
export type Endpoint<A, B> = {
	readonly url: string;
	readonly method: string;
	readonly contentType: string;
	encoder: Coder<A> | undefined;
	decoder: Coder<B>;
};

function createEndpoint<A, B>(
	url: string,
	method: string,
	contentType: string,
	encoder: Coder<A> | undefined,
	decoder: Coder<B>,
): Endpoint<A, B> {
	return { url, method, contentType, encoder, decoder };
}
