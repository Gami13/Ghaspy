import { colors } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import { Show, type JSX } from "solid-js";
export const InteractionButtonStyle = stylex.create({
	activityWrapper: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		gap: "0.3em",
	},
	activityButton: {
		display: "flex",
		alignItems: "center",
		gap: "0.5em",
		border: "none",
		backgroundColor: "transparent",
		cursor: "pointer",
		transition: "color 0.2s",
		fontSize: "2em",
		color: colors.text500,
		":hover": {
			color: colors.primary500,
		},
	},
	toggled: {
		color: colors.primary500,
	},
	right: {
		flexDirection: "row-reverse",
	},
});
export function InteractionButton(props: {
	icon: JSX.Element | Node;
	iconToggled?: JSX.Element | Node;
	text?: string | number;
	isToggled?: boolean;
	isRight?: boolean;
	onClick?: () => void;
}) {
	return (
		<li {...stylex.attrs(InteractionButtonStyle.activityWrapper, props.isRight && InteractionButtonStyle.right)}>
			<button
				type="button"
				onclick={props.onClick}
				{...stylex.attrs(InteractionButtonStyle.activityButton, props.isToggled && InteractionButtonStyle.toggled)}
			>
				<Show when={props.isToggled}>{props.iconToggled}</Show>
				<Show when={!props.isToggled}>{props.icon}</Show>
			</button>
			{props.text}
		</li>
	);
}
