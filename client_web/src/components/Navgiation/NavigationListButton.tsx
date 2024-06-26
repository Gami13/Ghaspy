import stylex from "@stylexjs/stylex";
import type { TbBeach } from "solid-icons/tb";
import { NavigationListItemStyle } from "./style";

export function NavigationListButton(props: {
	Icon: typeof TbBeach;
	text: string;
	onClick: () => void;
}) {
	return (
		<li {...stylex.attrs(NavigationListItemStyle.navElementWrapper)}>
			<button {...stylex.attrs(NavigationListItemStyle.navElement)} onclick={props.onClick}>
				{/* @ts-ignore */}
				<props.Icon {...stylex.attrs(NavigationListItemStyle.navElementIcon)} />
				<span {...stylex.attrs(NavigationListItemStyle.navElementText)}>{props.text}</span>
			</button>
		</li>
	);
}
