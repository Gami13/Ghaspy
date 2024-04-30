import { colors, transitions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import { A } from "@solidjs/router";
import type { TbBeach } from "solid-icons/tb";

export const NavigationListItemStyle = stylex.create({
	navElement: {
		fontSize: "1em",
		display: "flex",
		width: "100%",
		justifyContent: "flex-start",
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
		padding: "0.75em",
		paddingHorizontal: "1.25em",
		borderRadius: "12em",
	},
	navElementWrapper: {
		display: "flex",
		flexDirection: "column",
	},
	navElementIcon: {
		height: "1.75em",
		width: "1.75em",
		margin: 0,
		fontSize: "1.2em",
	},
	navElementText: {
		fontSize: "1.75em",
		fontWeight: 500,
		whiteSpace: "nowrap",
		lineHeight: 1.5,
		overflowX: "hidden",
	},
});

export function NavigationListLink(props: {
	Icon: typeof TbBeach;
	text: string;
	href: string;
}) {
	return (
		<li {...stylex.attrs(NavigationListItemStyle.navElementWrapper)}>
			<A
				{...stylex.attrs(NavigationListItemStyle.navElement)}
				href={props.href}
			>
				<props.Icon {...stylex.attrs(NavigationListItemStyle.navElementIcon)} />
				<span {...stylex.attrs(NavigationListItemStyle.navElementText)}>
					{props.text}
				</span>
			</A>
		</li>
	);
}
