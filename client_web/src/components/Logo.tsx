import stylex, { type StyleXStyles } from "@stylexjs/stylex";
import Logo128x from "@/Logos/logo128x";

type LogoProps = {
	loading?: boolean;
	stylex?: StyleXStyles;
};
const move = stylex.keyframes({
	"0%": {
		offsetDistance: "0%",
	},

	"100%": {
		offsetDistance: "100%",
	},
});
const styles = stylex.create({
	logo: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	},
	loading: {
		animationName: move,
		animationDuration: "4s",
		animationIterationCount: "infinite",
		animationTimingFunction: "linear",
		offsetPath:
			'path("M66.4834 28.5593C76.9512 18.0702 84.963 1.17525 101.848 1.00145C116.898 0.846554 129 13.0837 129 28.109C129 43.1343 116.898 55.2166 101.848 55.2166C87.1745 55.2166 80.1706 42.8464 66.4547 28.588C56.2291 17.9579 44.5886 1.00145 28.1515 1.00145C13.1018 1.00145 1 13.0837 1 28.109C1 43.1343 13.1018 55.2166 28.1515 55.2166C42.7873 55.2166 53.1677 41.8854 66.4278 28.615")',
		offsetRotate: "0deg",
		transform: "translate(50%, 50%)",
	},
});

export function Logo(props: LogoProps) {
	4;
	return (
		<div {...stylex.attrs(styles.logo, props.loading ? styles.loading : undefined, props.stylex)}>
			<Logo128x />
		</div>
	);
}
