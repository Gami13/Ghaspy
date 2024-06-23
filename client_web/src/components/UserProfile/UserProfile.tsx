import stylex from "@stylexjs/stylex";
import { colors, dimensions, transitions } from "../../variables.stylex";
import { useAppState } from "@/AppState";
// import left arrow icon
import { TbArrowLeft, TbDots, TbUserStar } from "solid-icons/tb";
import { useParams } from "@solidjs/router";
import { createEffect, Show } from "solid-js";
import { ProtoFetch } from "@/ProtoFetch";
import { GET_PROFILE_ENDPOINT } from "@/constants";
import { UserAvatar } from "./UserAvatar";
import { getDisplayName } from "@/utils";
import { formatDateNoTime, formatNumber, useTrans } from "@/Translation";
import { UserBanner } from "./UserBanner";
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
		gap: "1em",
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
	headerNav: {
		display: "flex",
		flexDirection: "row",
		gap: "1em",
		padding: "0 0.5em 1em 0.5em",
		alignItems: "center",
		background: "transparent",
		position: "relative",
		zIndex: 10,
		"::before": {
			content: '""',
			background: colors.background50,
			height: "100%",
			width: "100%",
			position: "absolute",
			opacity: 0.5,
			// blur background
			filter: "blur(5px)",
			overflow: "hidden",
			zIndex: -1,
		},
	},
	navIcon: {
		height: "1.5em",
		width: "1.5em",
		fontWeight: "bold",
	},
	navButton: {
		height: "2.5em",
		width: "2.5em",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
		borderRadius: "50%",
		transitionTimingFunction: transitions.timing,
		transitionDuration: transitions.duration,
		":hover": {
			backgroundColor: colors.background100,
		},
	},
	navInfo: {
		display: "flex",
		flexDirection: "column",
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
	const proto = new ProtoFetch(GET_PROFILE_ENDPOINT(params.username));
	createEffect(() => {
		let token = AppState.userToken();
		if (!token) {
			console.log("No token found");
			token = "";
		}
		proto.Query();
	});
	createEffect(() => {
		if (proto.state.isSuccess) {
			console.log(proto.state.data?.profile);
		}
		if (proto.state.isError) {
			console.log(proto.state.error);
		}
		if (proto.state.isLoading) {
			console.log("Loading...");
		}
		console.log("PROTO", proto);
	});
	return (
		<div {...stylex.attrs(styles.main)}>
			<Show when={proto.state.data?.profile} keyed>
				{(profile) => {
					return (
						<>
							<header>
								<div {...stylex.attrs(styles.headerNav)}>
									<button type="button" {...stylex.attrs(styles.navButton)} onClick={() => history.back()}>
										{/* @ts-ignore */}
										<TbArrowLeft {...stylex.attrs(styles.navIcon)} />
									</button>

									<section {...stylex.attrs(styles.names)}>
										<h2 {...stylex.attrs(styles.displayName)}>{getDisplayName(profile)}</h2>
										<h3 {...stylex.attrs(styles.highlight)}>{t.profile.postsCount({ count: formatNumber(profile.countPosts) })}</h3>
									</section>
								</div>
								<UserBanner user={profile} {...stylex.attrs(styles.banner)} />

								<div {...stylex.attrs(styles.bio)}>
									<div {...stylex.attrs(styles.buttons)}>
										<UserAvatar user={profile} styles={styles.avatar} />
										{/* @ts-ignore */}
										<TbDots {...stylex.attrs(styles.buttonsIcons)} />
										{/* @ts-ignore */}
										<TbUserStar {...stylex.attrs(styles.buttonsIcons)} />
										<button type="button" {...stylex.attrs(styles.followBtn)}>
											{t.profile.follow()}
										</button>
									</div>
									<ol {...stylex.attrs(styles.description)}>
										<li {...stylex.attrs(styles.names)}>
											{/* TODO: Marcin niewolniku zrób to */}
											<h2 {...stylex.attrs(styles.displayName)}>{getDisplayName(profile)}</h2>
											<h3 {...stylex.attrs(styles.highlight)}>@{profile.username}</h3>
										</li>
										<li>
											<p>{profile.bio}</p>
										</li>
										<li>
											<h3 {...stylex.attrs(styles.highlight)}>
												{t.profile.joinedAt({ date: formatDateNoTime(profile.joinedAt as string) })}
											</h3>
										</li>
										<li {...stylex.attrs(styles.stats)}>
											<h5>
												<span {...stylex.attrs(styles.statNum)}>{formatNumber(profile.countFollowing)}</span>
												<span {...stylex.attrs(styles.highlight)}>{t.profile.followingCount()}</span>
											</h5>
											<h5>
												<span {...stylex.attrs(styles.statNum)}>{formatNumber(profile.countFollowers)}</span>{" "}
												<span {...stylex.attrs(styles.highlight)}>{t.profile.followersCount()}</span>
											</h5>
											<h5>
												<span {...stylex.attrs(styles.statNum)}>{formatNumber(profile.countLikes)}</span>{" "}
												<span {...stylex.attrs(styles.highlight)}>{t.profile.likesCount()}</span>
											</h5>
										</li>
										{/* //TODO:Implement this */}
										{/* <li {...stylex.attrs(styles.followedBySomeone)}>Is Followed by someone you're following</li> */}
									</ol>
								</div>
							</header>
							<main>
								<div {...stylex.attrs(styles.mainButtons)}>
									{/* //TODO:TRANSLATE */}
									<button type="button" {...stylex.attrs(styles.mainBtn, styles.currentBtn)}>
										{t.profile.posts()}
									</button>
									<button type="button" {...stylex.attrs(styles.mainBtn)}>
										{t.profile.replies()}
									</button>
									<button type="button" {...stylex.attrs(styles.mainBtn)}>
										{t.profile.media()}
									</button>
									<button type="button" {...stylex.attrs(styles.mainBtn)}>
										{t.profile.likes()}
									</button>
								</div>
							</main>
						</>
					);
				}}
			</Show>
		</div>
	);
}
