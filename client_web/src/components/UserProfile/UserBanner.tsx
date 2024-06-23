import { CDN_URL, IMAGE_URL } from "@/constants";
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
		aspectRatio: "3/1",
		objectFit: "cover",
	},
});

function onError(e: Event & { currentTarget: HTMLImageElement }) {
	e.currentTarget.src = "https://pbs.twimg.com/profile_banners/934325439203442689/1718138961/1080x360";
}

export function UserBanner(props: Props) {
	return (
		<img
			{...stylex.attrs(styles.avatar, props.styles)}
			src={IMAGE_URL(props.user.banner)}
			onerror={onError}
			alt={getDisplayName(props.user)}
			//
		/>
	);
}
