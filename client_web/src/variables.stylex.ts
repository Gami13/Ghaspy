import * as stylex from "@stylexjs/stylex";

// A constant can be used to avoid repeating the media query
const DARK = "@media (prefers-color-scheme: dark)";

//!THIS IS WRONG CAUSE EVERY GRADIENT GOES TO WHITE
//Intended look https://www.realtimecolors.com/?colors=e8eaee-06070a-0066ff-183281-c549af&fonts=Inter-Poppins
//TODO: FIX
export const colors = stylex.defineVars({
	text50: { default: "#f0f2f4", [DARK]: "#0b0c0f" },
	text100: { default: "#e2e4e9", [DARK]: "#16181d" },
	text200: { default: "#c4c9d4", [DARK]: "#2b303b" },
	text300: { default: "#a7afbe", [DARK]: "#414958" },
	text400: { default: "#8a94a8", [DARK]: "#576175" },
	text500: { default: "#6c7993", [DARK]: "#6c7993" },
	text600: { default: "#576175", [DARK]: "#8a94a8" },
	text700: { default: "#414958", [DARK]: "#a7afbe" },
	text800: { default: "#2b303b", [DARK]: "#c4c9d4" },
	text900: { default: "#16181d", [DARK]: "#e2e4e9" },
	text950: { default: "#0b0c0f", [DARK]: "#f0f2f4" },
	textError: { default: "#ef4444" },

	background50: { default: "#cbcbcb", [DARK]: "#0a0b10" },
	background100: { default: "#b6b9c2", [DARK]: "#131620" },
	background200: { default: "#a0a7b9", [DARK]: "#262d40" },
	background300: { default: "#8b94b1", [DARK]: "#394360" },
	background400: { default: "#7582a8", [DARK]: "#4d5980" },
	background500: { default: "#60709f", [DARK]: "#60709f" },

	primary500: { default: "#0066ff" },
	primary600: { default: "#3688ff" },
	primary700: { default: "#64b2ff" },

	secondary500: { default: "#1831b1" },
	secondary600: { default: "#1c3ba0" },
	secondary700: { default: "#2957cc" },

	accent500: { default: "#c23da9" },
	accent600: { default: "#c649af" },
	accent700: { default: "#ce5fbf" },
	accent800: { default: "#d87dd0" },
});

export const dimensions = stylex.defineVars({
	navMaxWidth: { default: "300px", "@media (max-width: 900px)": "100px" },
	postsMaxWidth: { default: "700px", "@media (max-width: 900px)": "800px" },
	postsMinWidth: "350px",
	asideMaxWidth: "300px",
});

export const transitions = stylex.defineVars({
	duration: "150ms",
	timing: "cubic-bezier(0,.5,.5,1)",
});
