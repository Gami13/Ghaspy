import stylex from "@stylexjs/stylex";
import { colors, transitions } from "../variables.stylex";
import { TbArrowLeft } from "solid-icons/tb";
import { textFallback } from "@/utils";

type Props = {
	primaryText: Readonly<string | undefined>;
	secondaryText: Readonly<string | undefined>;
};
const styles = stylex.create({
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
});
export function TopNavigation(props: Props) {
	return (
		<nav {...stylex.attrs(styles.headerNav)}>
			<button
				type="button"
				{...stylex.attrs(styles.navButton)}
				onClick={() => history.back()}
			>
				{/* @ts-ignore */}
				<TbArrowLeft {...stylex.attrs(styles.navIcon)} />
			</button>

			<section {...stylex.attrs(styles.names)}>
				<h2 {...stylex.attrs(styles.displayName)}>{props.primaryText}</h2>
				<h3 {...stylex.attrs(styles.highlight)}>{props.secondaryText}</h3>
			</section>
		</nav>
	);
}
