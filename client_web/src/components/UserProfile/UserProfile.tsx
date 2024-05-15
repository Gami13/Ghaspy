import stylex from "@stylexjs/stylex";
import { colors, dimensions } from "../../variables.stylex";
import { useAppState } from "@/AppState";
// import left arrow icon
import { TbArrowLeft, TbDots, TbUserStar } from "solid-icons/tb";
import { A } from "@solidjs/router";
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
		letterSpacing: "0.1em",
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
		// textDecoration: "underline",
		// textDecorationStyle: "solid",
		// textUnderlineOffset: "0.75em",
		// textDecorationColor: colors.accent500,
		// textDecorationThickness: "0.2em",
		// textDecorationSkipInk: "none",
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
		cursor: "pointer",
		height: "1.5em",
		width: "1.5em",
		fontWeight: "bold",
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
	folowBtn: {
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
	username: {
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
	// const AppState = useAppState();
	return (
		<div {...stylex.attrs(styles.main)}>
			<header>
				<div {...stylex.attrs(styles.headerNav)}>
					<TbArrowLeft {...stylex.attrs(styles.navIcon)} />

					<section {...stylex.attrs(styles.names)}>
						{/* TODO: Marcin niewolniku zrób to */}
						<h2 {...stylex.attrs(styles.displayName)}>GamiToFurras</h2>
						<h3 {...stylex.attrs(styles.username)}>0,000 posts</h3>
					</section>
				</div>

				<img src="" alt="banner" {...stylex.attrs(styles.banner)} />
				<div {...stylex.attrs(styles.bio)}>
					<div {...stylex.attrs(styles.buttons)}>
						<img src="" alt="ss" {...stylex.attrs(styles.avatar)} />

						<TbDots {...stylex.attrs(styles.buttonsIcons)} />
						<TbUserStar {...stylex.attrs(styles.buttonsIcons)} />
						<button type="button" {...stylex.attrs(styles.folowBtn)}>
							Follow
						</button>
					</div>
					<ol {...stylex.attrs(styles.description)}>
						<li {...stylex.attrs(styles.names)}>
							{/* TODO: Marcin niewolniku zrób to */}
							<h2 {...stylex.attrs(styles.displayName)}>GamiToFurras</h2>
							<h3 {...stylex.attrs(styles.username)}>@GamiToFurras</h3>
						</li>
						<li>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
							necessitatibus quibusdam ullam soluta commodi quis nemo in a
							nulla, modi porro. Odit beatae, inventore voluptates sit facilis
							corrupti. Aliquid, quo.{/* <A href="">View more</A> */}
						</li>
						<li>
							<h3 {...stylex.attrs(styles.username)}>Joined: May 2024</h3>
						</li>
						<li {...stylex.attrs(styles.stats)}>
							<h5>
								<span {...stylex.attrs(styles.statNum)}>000</span>
								<span {...stylex.attrs(styles.username)}>Following</span>
							</h5>
							<h5>
								<span {...stylex.attrs(styles.statNum)}>000</span>{" "}
								<span {...stylex.attrs(styles.username)}>Followers</span>
							</h5>
							<h5>
								<span {...stylex.attrs(styles.statNum)}>000</span>{" "}
								<span {...stylex.attrs(styles.username)}>Likes</span>
							</h5>
						</li>
						<li {...stylex.attrs(styles.followedBySomeone)}>
							Is Followed by someone you'r folowing
						</li>
					</ol>
				</div>
			</header>
			<main>
				<div {...stylex.attrs(styles.mainButtons)}>
					<button
						type="button"
						{...stylex.attrs(styles.mainBtn, styles.currentBtn)}
					>
						Posts
					</button>
					<button type="button" {...stylex.attrs(styles.mainBtn)}>
						Replies
					</button>
					<button type="button" {...stylex.attrs(styles.mainBtn)}>
						Subs
					</button>
					<button type="button" {...stylex.attrs(styles.mainBtn)}>
						Highlights
					</button>

					<button type="button" {...stylex.attrs(styles.mainBtn)}>
						Media
					</button>
					<button type="button" {...stylex.attrs(styles.mainBtn)}>
						Likes
					</button>
				</div>
			</main>
		</div>
	);
}
