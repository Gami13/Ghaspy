import stylex from "@stylexjs/stylex";
import { colors, dimensions, transitions } from "../../variables.stylex";
import { useAppState } from "@/AppState";
import { TbHammer, TbLink, TbMessage, TbShield } from "solid-icons/tb";
import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createSignal, Match, Show, Suspense, Switch } from "solid-js";
import { ProtoFetch } from "@/ProtoFetch";
import {
	GET_PROFILE_ENDPOINT,
	GET_PROFILE_POSTS_ENDPOINT,
	type ProfilePostsType,
} from "@/constants";
import { UserAvatar } from "./UserAvatar";
import { formatNumberFallback, getDisplayName, getDisplayNameFallback } from "@/utils";
import { formatDateNoTime, formatNumber, useTrans } from "@/Translation";
import { UserBanner } from "./UserBanner";
import type { Post as PostType } from "@/types/internal";
import { PostList } from "../Post/PostList";
import { TopNavigation } from "../TopNavigation";
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
	bio: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
	},
	buttons: {
		display: "flex",
		flexDirection: "row",
		gap: "0.65em",
		padding: "0.5em",
		justifyContent: "flex-end",
		minHeight: "3.75em",
		alignItems: "center",
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

	banner: {
		width: "100%",
		height: "200px",
		objectFit: "cover",
		backgroundColor: colors.secondary500,
	},
	avatar: {
		width: "8em",
		height: "8em",
		borderRadius: "50%",
		position: "absolute",
		left: "1em",
		transform: "translateY(-25%)",
		positoin: "relative",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary500,

		borderColor: colors.background50,
		borderWidth: "0.3em",
		borderStyle: "solid",
	},
	buttonsIcons: {
		cursor: "pointer",
		height: "2.5em",
		width: "2.5em",
		fontWeight: "bold",
		borderRadius: "50%",
		borderColor: colors.accent500,
		borderWidth: "0.1em",
		borderStyle: "solid",
		padding: "0.5em",
		color: colors.accent500,
	},
	followBtn: {
		cursor: "pointer",
		backgroundColor: colors.primary500,
		color: colors.text950,
		borderRadius: "1em",
		letterSpacing: "0.1em",
		padding: "0.5em 1.25em",
		fontWeight: "bold",
		transitionDuration: transitions.duration,
		transitionTimingFunction: transitions.timing,
		userSelect: "none",
		":hover": {
			backgroundColor: colors.primary600,
		},
	},
	names: {
		display: "flex",
		gap: "0.1em",
		flexDirection: "column",
		justifyContent: "center",
	},
	highlight: {
		fontSize: "1em",
		color: "#71767b",
		fontWeight: 300,
	},
	displayName: {
		fontSize: "1.3em",
		fontWeight: 700,
	},
	description: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5em",
		padding: "0.5em",
		backgroundColor: colors.background50,
		borderRadius: "1em",
		overflow: "hidden",
	},
	stats: {
		display: "flex",
		gap: "1em",
		flexDirection: "row",
	},
	statNum: {
		backgroundColor: colors.background100,
		borderRadius: "0.5em",
		padding: "0.25em 0.5em",
		fontSize: "0.9em",
	},
	followedBySomeone: {
		borderRadius: "0.5em",
		padding: "0.25em 0.5em",
		fontSize: "0.9em",
		textAlign: "center",
		color: colors.text300,
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
	const protoPosts = new ProtoFetch(GET_PROFILE_POSTS_ENDPOINT(type(), params.username, 0));
	createEffect(() => {
		let token = AppState.userToken();
		if (!token) {
			console.log("No token found");
			token = "";
		}
		protoProfile.Query();
		protoPosts.Query();
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

	createEffect(() => {
		if (protoPosts.state.isSuccess) {
			console.log(protoPosts.state.data.posts);
		}
		if (protoPosts.state.isError) {
			console.log(protoPosts.state.error);
		}
		if (protoPosts.state.isLoading) {
			console.log("Loading...");
		}
		console.log("PROTO", protoProfile);
	});

	return (
		<div {...stylex.attrs(styles.main)}>
			<header>
				<TopNavigation
					primaryText={getDisplayNameFallback(protoProfile.state.data?.profile)}
					secondaryText={t.profile.postsCount({
						count: formatNumberFallback(protoProfile.state.data?.profile?.countPosts),
					})}
				/>
				<Show when={protoProfile.state.data?.profile} keyed>
					{(profile) => {
						return (
							<>
								<UserBanner user={profile} {...stylex.attrs(styles.banner)} />

								<div {...stylex.attrs(styles.bio)}>
									<div {...stylex.attrs(styles.buttons)}>
										<UserAvatar user={profile} styles={styles.avatar} />
										<button
											type="button"
											title={t.profile.copyLink()}
											onclick={() => {
												navigator.clipboard.writeText(window.location.href);
												//TODO: Add a toast to show that the link has been copied
											}}
										>
											{/* @ts-ignore */}
											<TbLink {...stylex.attrs(styles.buttonsIcons)} />
										</button>
										{/*NOT IMPLEMENTED YET*/}

										{/*<button type="button" title={t.profile.report()}>
											@ts-ignore
											<TbHammer {...stylex.attrs(styles.buttonsIcons)} />
										</button> */}
										{/* <button type="button" title={t.profile.block()}>
										
											<TbShield {...stylex.attrs(styles.buttonsIcons)} />
										</button> */}
										{/* <button type="button" title={t.profile.message()}>
											
											<TbMessage {...stylex.attrs(styles.buttonsIcons)} />
										</button> */}
										<Show
											when={!profile.isYourProfile}
											fallback={
												<button
													type="button"
													{...stylex.attrs(styles.followBtn)}
												>
													{t.profile.edit()}
												</button>
											}
										>
											<Show
												when={
													profile.isFollowingYou &&
													!profile.isFollowedByYou
												}
											>
												<button
													type="button"
													{...stylex.attrs(styles.followBtn)}
												>
													{t.profile.followBack()}
												</button>
											</Show>
											<Show when={profile.isFollowedByYou}>
												<button
													type="button"
													{...stylex.attrs(styles.followBtn)}
												>
													{t.profile.unfollow()}
												</button>
											</Show>
											<button
												type="button"
												{...stylex.attrs(styles.followBtn)}
											>
												{t.profile.follow()}
											</button>
										</Show>
									</div>
									<ol {...stylex.attrs(styles.description)}>
										<li {...stylex.attrs(styles.names)}>
											<h2 {...stylex.attrs(styles.displayName)}>
												{getDisplayName(profile)}
											</h2>
											<h3 {...stylex.attrs(styles.highlight)}>
												@{profile.username}
											</h3>
										</li>
										<li>
											<p>{profile.bio}</p>
										</li>
										<li>
											<h3 {...stylex.attrs(styles.highlight)}>
												{t.profile.joinedAt({
													date: formatDateNoTime(
														profile.joinedAt as string,
													),
												})}
											</h3>
										</li>
										<li {...stylex.attrs(styles.stats)}>
											<h5>
												<span {...stylex.attrs(styles.statNum)}>
													{formatNumber(profile.countFollowing)}
												</span>
												<span {...stylex.attrs(styles.highlight)}>
													{t.profile.followingCount()}
												</span>
											</h5>
											<h5>
												<span {...stylex.attrs(styles.statNum)}>
													{formatNumber(profile.countFollowers)}
												</span>
												<span {...stylex.attrs(styles.highlight)}>
													{t.profile.followersCount()}
												</span>
											</h5>
											<h5>
												<span {...stylex.attrs(styles.statNum)}>
													{formatNumber(profile.countLikes)}
												</span>
												<span {...stylex.attrs(styles.highlight)}>
													{t.profile.likesCount()}
												</span>
											</h5>
										</li>
										{/* //TODO:Implement this */}
										{/* <li {...stylex.attrs(styles.followedBySomeone)}>Is Followed by someone you're following</li> */}
									</ol>
								</div>
							</>
						);
					}}
				</Show>
			</header>
			<main>
				<nav {...stylex.attrs(styles.mainButtons)}>
					<button
						type="button"
						{...stylex.attrs(
							styles.mainBtn,
							type() === "posts" ? styles.currentBtn : null,
						)}
						onclick={() => {
							window.history.pushState({}, "", `/${params.username}?t=posts`);
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
							window.history.pushState({}, "", `/${params.username}?t=replies`);
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
							window.history.pushState({}, "", `/${params.username}?t=media`);
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
							window.history.pushState({}, "", `/${params.username}?t=likes`);
							setType("likes");
						}}
					>
						{t.profile.likes()}
					</button>
				</nav>
				<ol>
					<Suspense fallback={<p>Loading posts placeholder (put a spinner here)...</p>}>
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
								<UserProfileReplies username={params.username} />
							</Match>
						</Switch>
					</Suspense>
				</ol>
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
