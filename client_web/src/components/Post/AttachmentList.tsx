import type { Post } from "@/types/internal";
import stylex, { type StyleXStyles } from "@stylexjs/stylex";
import { For } from "solid-js";
import { Attachment } from "./Attachment";

type AttachmentListProps = {
	attachments: Post["attachments"];
	styling?: StyleXStyles;
};
const styles = stylex.create({
	attachments: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		gap: "0.5em",
		// paddingHorizontal: "1em",
		width: "100%",
	},
	attachment: {
		width: "100%",
	},
});
export function AttachmentList(props: AttachmentListProps) {
	return (
		<ul {...stylex.attrs(styles.attachments, props.styling)}>
			<For each={props.attachments}>
				{(attachment) => (
					<li {...stylex.attrs(styles.attachment)}>
						<Attachment link={attachment} />
					</li>
				)}
			</For>
		</ul>
	);
}
