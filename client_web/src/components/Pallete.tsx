import stylex from "@stylexjs/stylex";

import { colors } from "../variables.stylex";

const styles = stylex.create({
	pallete: {
		display: "flex",
		width: "100vw",
		justifyContent: "center",
		backgroundColor: "black",
		alignItems: "center",
	},
	section: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "start",
		alignItems: "center",
		height: "100vh",
	},
	block: {
		height: "100px",
		width: "100px",
		backgroundColor: colors.primary500,
	},
	inverse: {
		filter: "invert(1)",
	},
	bg50: {
		backgroundColor: colors.background50,
	},
	bg100: {
		backgroundColor: colors.background100,
	},
	bg200: {
		backgroundColor: colors.background200,
	},
	bg300: {
		backgroundColor: colors.background300,
	},
	bg400: {
		backgroundColor: colors.background400,
	},
	bg500: {
		backgroundColor: colors.background500,
	},
	primary500: {
		backgroundColor: colors.primary500,
	},
	primary600: {
		backgroundColor: colors.primary600,
	},
	primary700: {
		backgroundColor: colors.primary700,
	},

	secondary500: {
		backgroundColor: colors.secondary500,
	},
	secondary600: {
		backgroundColor: colors.secondary600,
	},
	secondary700: {
		backgroundColor: colors.secondary700,
	},

	accent500: {
		backgroundColor: colors.accent500,
	},
	accent600: {
		backgroundColor: colors.accent600,
	},
	accent700: {
		backgroundColor: colors.accent700,
	},
	accent800: {
		backgroundColor: colors.accent800,
	},
});

export function Pallete() {
	return (
		<div {...stylex.attrs(styles.pallete)}>
			<section {...stylex.attrs(styles.section)}>
				<div {...stylex.attrs(styles.block, styles.bg50)} />
				<div {...stylex.attrs(styles.block, styles.bg100)} />
				<div {...stylex.attrs(styles.block, styles.bg200)} />
				<div {...stylex.attrs(styles.block, styles.bg300)} />
				<div {...stylex.attrs(styles.block, styles.bg400)} />
				<div {...stylex.attrs(styles.block, styles.bg500)} />
			</section>
			<section {...stylex.attrs(styles.section)}>
				<div {...stylex.attrs(styles.block, styles.primary500)} />
				<div {...stylex.attrs(styles.block, styles.primary600)} />
				<div {...stylex.attrs(styles.block, styles.primary700)} />
			</section>
			<section {...stylex.attrs(styles.section)}>
				<div {...stylex.attrs(styles.block, styles.secondary500)} />
				<div {...stylex.attrs(styles.block, styles.secondary600)} />
				<div {...stylex.attrs(styles.block, styles.secondary700)} />
			</section>
			<section {...stylex.attrs(styles.section)}>
				<div {...stylex.attrs(styles.block, styles.accent500)} />
				<div {...stylex.attrs(styles.block, styles.accent600)} />
				<div {...stylex.attrs(styles.block, styles.accent700)} />
				<div {...stylex.attrs(styles.block, styles.accent800)} />
			</section>
		</div>
	);
}
