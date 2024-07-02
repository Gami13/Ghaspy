import stylex from "@stylexjs/stylex";
import { colors, dimensions, transitions } from "../../variables.stylex";
import { useAppState } from "@/AppState";
import { useParams } from "@solidjs/router";
import { createEffect, createSignal, Match, Show, Suspense, Switch } from "solid-js";
import { ProtoFetch } from "@/ProtoFetch";
import {
	GET_PROFILE_ENDPOINT,
	GET_PROFILE_POSTS_ENDPOINT,
	type ProfilePostsType,
} from "@/constants";
import { formatNumberFallback, getDisplayNameFallback } from "@/utils";
import { useTrans } from "@/Translation";
import type { Post as PostType } from "@/types/internal";
import { PostList } from "../Post/PostList";
import { TopNavigation } from "../TopNavigation";
import { UserProfileHeader } from "./UserProfileHeader";
import { UserProfileEditor } from "./UserProfileEditor";
const styles = stylex.create({
	main: {
		paddingTop: "0.25em",
		height: "100vh",
		maxWidth: dimensions.postsMaxWidth,
		minWidth: dimensions.postsMinWidth,
		backgroundColor: colors.background50,
		flexGrow: 10000,
		display: "flex",
		flexDirection: "column",
		gap: "0.5em",
		padding: "1em",
		overflowY: "auto",
	},

	mainButtons: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0.5em",
	},
	mainBtn: {
		color: colors.text700,
		flexGrow: 1,
		padding: "0.75em",
		fontWeight: "bold",
		cursor: "pointer",
		userSelect: "none",

		letterSpacing: "0.05em",
		":hover": {
			backgroundColor: colors.background100,
			color: colors.text900,
		},
		":active": {
			backgroundColor: colors.background200,
			color: colors.text950,
		},
		transition: "all 0.2s linear",
		position: "relative",
	},
	currentBtn: {
		"::before": {
			content: '""',
			position: "absolute",
			bottom: "0.2em",
			left: "1.25em",

			width: "calc(100% - 2.5em)",

			height: "0.2em",
			borderRadius: "0.1em",
			backgroundColor: colors.accent500,
		},
	},

	highlight: {
		fontSize: "1em",
		color: "#71767b",
		fontWeight: 300,
	},
});

export function UserProfile() {
	const AppState = useAppState();
	const params = useParams();
	const t = useTrans();
	const protoProfile = new ProtoFetch(GET_PROFILE_ENDPOINT(params.username));
	const pathParams = new URLSearchParams(window.location.search);
	const [type, setType] = createSignal<ProfilePostsType>(
		(pathParams.get("t") as ProfilePostsType) || "posts",
	);

	createEffect(() => {
		let token = AppState.userToken();
		if (!token) {
			console.log("No token found");
			token = "";
		}
		protoProfile.Query();
	});
	createEffect(() => {
		if (protoProfile.state.isSuccess) {
			console.log(protoProfile.state.data?.profile);
		}
		if (protoProfile.state.isError) {
			console.log(protoProfile.state.error);
		}
		if (protoProfile.state.isLoading) {
			console.log("Loading...");
		}
		console.log("PROTO", protoProfile);
	});

	return (
		<div {...stylex.attrs(styles.main)}>
			<header>
				<TopNavigation
					primaryText={getDisplayNameFallback(protoProfile.state.data?.profile)}
					secondaryText={
						type() === "editing"
							? t.profile.gettingEdited()
							: t.profile.postsCount({
									count: formatNumberFallback(
										protoProfile.state.data?.profile?.countPosts,
									),
								})
					}
					resetURL={() => {
						setType((pathParams.get("t") as ProfilePostsType) || "posts");
					}}
				/>
			</header>
			<main>
				<Show when={protoProfile.state.data?.profile} keyed>
					{(profile) => {
						return (
							<Show
								when={type() !== "editing"}
								fallback={
									<UserProfileEditor
										profile={profile}
										onEdited={() => {
											protoProfile.Query();
										}}
									/>
								}
							>
								<UserProfileHeader
									startEditing={() => {
										setType("editing");
									}}
									profile={profile}
									params={params}
								/>
								<section>
									<nav {...stylex.attrs(styles.mainButtons)}>
										<button
											type="button"
											{...stylex.attrs(
												styles.mainBtn,
												type() === "posts" ? styles.currentBtn : null,
											)}
											onclick={() => {
												window.history.replaceState(
													{},
													"",
													`/${params.username}?t=posts`,
												);
												setType("posts");
											}}
										>
											{t.profile.posts()}
										</button>
										<button
											type="button"
											{...stylex.attrs(
												styles.mainBtn,
												type() === "replies" ? styles.currentBtn : null,
											)}
											onclick={() => {
												window.history.replaceState(
													{},
													"",
													`/${params.username}?t=replies`,
												);
												setType("replies");
											}}
										>
											{t.profile.replies()}
										</button>
										<button
											type="button"
											{...stylex.attrs(
												styles.mainBtn,
												type() === "media" ? styles.currentBtn : null,
											)}
											onclick={() => {
												window.history.replaceState(
													{},
													"",
													`/${params.username}?t=media`,
												);
												setType("media");
											}}
										>
											{t.profile.media()}
										</button>
										<button
											type="button"
											{...stylex.attrs(
												styles.mainBtn,
												type() === "likes" ? styles.currentBtn : null,
											)}
											onclick={() => {
												window.history.replaceState(
													{},
													"",
													`/${params.username}?t=likes`,
												);
												setType("likes");
											}}
										>
											{t.profile.likes()}
										</button>
									</nav>
									<ol>
										<Suspense
											fallback={
												<p>
													Loading posts placeholder (put a spinner
													here)...
												</p>
											}
										>
											<Switch>
												<Match when={type() === "posts"}>
													<UserProfilePosts username={params.username} />
												</Match>
												<Match when={type() === "likes"}>
													<UserProfileLikes username={params.username} />
												</Match>
												<Match when={type() === "media"}>
													<UserProfileMedia username={params.username} />
												</Match>
												<Match when={type() === "replies"}>
													<UserProfileReplies
														username={params.username}
													/>
												</Match>
											</Switch>
										</Suspense>
									</ol>
								</section>
							</Show>
						);
					}}
				</Show>
			</main>
		</div>
	);
}

function UserProfilePosts(props: { username: string }) {
	const AppState = useAppState();
	const protoPosts = new ProtoFetch(GET_PROFILE_POSTS_ENDPOINT("posts", props.username, 0));
	createEffect(() => {
		let token = AppState.userToken();
		if (!token) {
			console.log("No token found");
			token = "";
		}

		protoPosts.Query();
	});

	return <PostList posts={protoPosts.state.data?.posts as PostType[]} disableWriter={true} />;
}
function UserProfileLikes(props: { username: string }) {
	const AppState = useAppState();
	const protoPosts = new ProtoFetch(GET_PROFILE_POSTS_ENDPOINT("likes", props.username, 0));
	createEffect(() => {
		let token = AppState.userToken();
		if (!token) {
			console.log("No token found");
			token = "";
		}

		protoPosts.Query();
	});

	return <PostList posts={protoPosts.state.data?.posts as PostType[]} disableWriter={true} />;
}
function UserProfileMedia(props: { username: string }) {
	const AppState = useAppState();
	const protoPosts = new ProtoFetch(GET_PROFILE_POSTS_ENDPOINT("media", props.username, 0));
	createEffect(() => {
		let token = AppState.userToken();
		if (!token) {
			console.log("No token found");
			token = "";
		}

		protoPosts.Query();
	});

	return <PostList posts={protoPosts.state.data?.posts as PostType[]} disableWriter={true} />;
}
function UserProfileReplies(props: { username: string }) {
	const AppState = useAppState();
	const protoPosts = new ProtoFetch(GET_PROFILE_POSTS_ENDPOINT("replies", props.username, 0));
	createEffect(() => {
		let token = AppState.userToken();
		if (!token) {
			console.log("No token found");
			token = "";
		}

		protoPosts.Query();
	});

	return <PostList posts={protoPosts.state.data?.posts as PostType[]} disableWriter={true} />;
}
