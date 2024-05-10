import stylex from "@stylexjs/stylex";
import { colors, transitions } from "../../variables.stylex";

export const NavigationListItemStyle = stylex.create({
	navElement: {
		fontSize: "1em",
		display: "flex",
		width: "100%",
        justifyContent: { default: "flex-start", "@media (max-width: 900px)": "center" },

		alignItems: "center",
		color: colors.text950,
		textDecoration: "none",
		gap: "1em",
		height: "100%",
		backgroundColor: {
			":hover": colors.background100,
		},

		transitionDuration: transitions.duration,
		transitionTimingFunction: transitions.timing,
	
        padding: { default: "0.75em 1.25em", "@media (max-width: 900px)": "0.75em 0.5em" },

		borderRadius: "12em",
        
	},
	navElementWrapper: {
		display: "flex",
		flexDirection: "column",
	},
	navElementIcon: {
		height: "2em",
		width: "2em",
		margin: 0,
		fontSize: "1.2em",
	},
	navElementText: {
		fontSize: "1.5em",
		fontWeight: 500,
		whiteSpace: "nowrap",
		lineHeight: 1.5,
		overflowX: "hidden",
        display: { default: "block", "@media (max-width: 900px)": "none" },

	},
});