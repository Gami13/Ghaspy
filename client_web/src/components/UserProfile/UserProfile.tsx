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
		gap: "1em",
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
	mainButtons: {},
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
		color: colors.text500,
		fontWeight: 500,
	},
	displayName: {
		fontSize: "1.3em",
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
					<ol>
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
							<h3 {...stylex.attrs(styles.username)}>
								signup date Joined May 2024
							</h3>
						</li>
						<li>
							<h5>
								<span>000</span>
								<span {...stylex.attrs(styles.username)}>Following</span>
							</h5>
							<h5>
								<span>000</span>{" "}
								<span {...stylex.attrs(styles.username)}>Followers</span>
							</h5>
							<h5>
								<span>000</span>{" "}
								<span {...stylex.attrs(styles.username)}>Likes</span>
							</h5>
						</li>
						<li>Is Followed by someone you'r folowing</li>
					</ol>
				</div>
			</header>
			<main>
				<div {...stylex.attrs(styles.mainButtons)}>
					<button type="button">Posts</button>
					<button type="button">Replies</button>
					<button type="button">Subs</button>
					<button type="button">Highlights</button>

					<button type="button">Media</button>
					<button type="button">Likes</button>
				</div>
			</main>
		</div>
	);
}
