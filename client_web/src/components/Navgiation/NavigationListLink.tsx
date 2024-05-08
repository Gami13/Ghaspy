import stylex from "@stylexjs/stylex";
import { A } from "@solidjs/router";
import type { TbBeach } from "solid-icons/tb";
import { NavigationListItemStyle } from "./style";

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
