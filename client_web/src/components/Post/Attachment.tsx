import { colors } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import { createEffect, onMount } from "solid-js";
import { CDN_URL, IMAGE_URL } from "@/constants";

//! Post is safe to be asserted as defined
const MAX_WIDTH = 510;
const styles = stylex.create({
	attachment: {
		width: "100%",
		height: "fit-content",

		objectFit: "contain",
		borderRadius: "0.5em",
		borderColor: colors.text300,
		// boxShadow: "0px 0px 0.5em rgba(0, 0, 0, 0.5)",
	},
	border: {
		border: "1px solid",
	},
});

export function Attachment(props: { link?: string; border?: boolean }) {
	//TODO: HANDLE OTHER FORMATS HERE
	return (
		<img
			onload={(e) => {
				const img = e.target as HTMLImageElement;
				const width = img.width;
				const height = img.height;

				if (height > MAX_WIDTH) {
					img.style.maxHeight = `${MAX_WIDTH}px`;
					const ratio = MAX_WIDTH / height;
					img.style.width = `${width * ratio}px`;
				}
			}}
			{...stylex.attrs(styles.attachment, props.border ? styles.border : null)}
			src={IMAGE_URL(props.link as string)}
			alt="Attachment"
		/>
	);
}
