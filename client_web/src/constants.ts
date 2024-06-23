export const API_URL = "http://localhost:8080";
export const CDN_URL = "http://localhost:8080/attachment/";
export const LOG_IN_ENDPOINT = `${API_URL}/log-in`;
export const SIGN_UP_ENDPOINT = `${API_URL}/sign-up`;
export const LOG_OUT_ENDPOINT = `${API_URL}/log-out`;
export const CURRENT_USER_DATA_ENDPOINT = `${API_URL}/profile`;
export const POST_ENDPOINT = `${API_URL}/post`;
export const POSTS_CHRONO_ENDPOINT = `${API_URL}/posts-chrono`;
export const TOGGLE_LIKE_ENDPOINT = { url: `${API_URL}/like`, method: "PATCH", contentType: "application/x-protobuf" } as const;
export const TOGGLE_BOOKMARK_ENDPOINT = { url: `${API_URL}/bookmark`, method: "PATCH", contentType: "application/x-protobuf" } as const;
export const GET_BOOKMARKS_ENDPOINT = { url: `${API_URL}/bookmarks`, method: "GET", contentType: "application/x-protobuf" } as const;
export const GET_PROFILE_ENDPOINT = {
	url: (username: string) => `${API_URL}/profile/${username}`,
	method: "GET",
	contentType: "application/x-protobuf",
} as const;
