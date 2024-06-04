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
	},
	toggledRight: {
		color: colors.accent500,
	},
	toggledLeft: {
		color: colors.primary500,
	},
	right: {
		":hover": {
			color: colors.accent500,
		},
	},
	left: {
		":hover": {
			color: colors.primary500,
		},
	},
});
export function InteractionButton(props: {
	icon: JSX.Element | Node;
	iconToggled?: JSX.Element | Node;
	text?: string | number;
	isToggled?: boolean;
	isRight?: boolean;
	onClick?: (e: MouseEvent) => void;
}) {
	return (
		<li {...stylex.attrs(InteractionButtonStyle.activityWrapper)}>
			<button
				type="button"
				onclick={props.onClick}
				{...stylex.attrs(
					InteractionButtonStyle.activityButton,

					props.isRight ? InteractionButtonStyle.right : InteractionButtonStyle.left,
					props.isToggled ? (props.isRight ? InteractionButtonStyle.toggledRight : InteractionButtonStyle.toggledLeft) : {},
				)}
			>
				<Show when={props.isToggled}>{props.iconToggled}</Show>
				<Show when={!props.isToggled}>{props.icon}</Show>
			</button>
			{props.text}
		</li>
	);
}
