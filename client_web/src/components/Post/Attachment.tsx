import type { Post as PostType } from "@/types/internal";
import { colors } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import { onMount } from "solid-js";

//! Post is safe to be asserted as defined

const styles = stylex.create({
	attachment: {
		width: "100%",
		height: "fit-content",

		objectFit: "contain",
		borderRadius: "0.5em",
		border: "1px solid",
		borderColor: colors.text300,
		// boxShadow: "0px 0px 0.5em rgba(0, 0, 0, 0.5)",
	},
});

export function Attachment(props: { link?: string }) {
	//TODO: HANDLE OTHER FORMATS HERE

	let img: HTMLImageElement | undefined;
	onMount(() => {
		if (img) {
			//resize image to 100% width or 510px height
			const width = img.width;
			const height = img.height;

			if (height > 510) {
				img.style.maxHeight = "510px";
				const ratio = 510 / height;
				img.style.width = `${width * ratio}px`;
			}
		}
	});
	return (
		<img
			ref={img}
			{...stylex.attrs(styles.attachment)}
			src={props.link}
			alt="Attachment"
		/>
	);
}
