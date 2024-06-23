import { CDN_URL } from "@/constants";
import type { User } from "@/types/internal";
import { getDisplayName } from "@/utils";
import type { StyleXStyles } from "@stylexjs/stylex";
import stylex, { create } from "@stylexjs/stylex";
import { JSX } from "solid-js";
import { createEffect } from "solid-js/types/server/reactive.js";

type Props = {
	user: User;
	styles?: StyleXStyles;
};
const styles = stylex.create({
	avatar: {
		aspectRatio: "1/1",
		borderRadius: "50%",
		objectFit: "cover",
	},
});

function onError(e: Event & { currentTarget: HTMLImageElement }) {
	e.currentTarget.src =
		"https://static.printler.com/cache/8/e/1/a/0/c/8e1a0c16bf0c2cfa3bc131c209051cf5b64a2c46.jpg";
}

export function UserAvatar(props: Props) {
	return (
		<img
			{...stylex.attrs(styles.avatar, props.styles)}
			src={CDN_URL + props.user.avatar}
			onerror={onError}
			alt={getDisplayName(props.user)}
			//
		/>
	);
}
