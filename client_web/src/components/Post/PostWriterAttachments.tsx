import type { Post } from "@/types/internal";
import stylex, { type StyleXStyles } from "@stylexjs/stylex";
import { For, Show } from "solid-js";
import { Attachment } from "./Attachment";
import { colors } from "../../variables.stylex";

type AttachmentListProps = {
	attachments: string[];
};
const styles = stylex.create({
	attachments: {
		display: "flex",
		flexWrap: "wrap",
		gap: "0.15em",
		width: "8em",
		height: "6em",
		borderRadius: "1em",
		overflow: "hidden",
		// border: "1px solid red",
		flexShrink: 0,
		// flexBasis: "50%",
	},
	attachmentsRow: {
		gap: "0.25em",
		display: "flex",
	},

	attachment: {
		width: "100%",
		objectFit: "cover",
	},
});
export function PostWriterAttachmentList(props: AttachmentListProps) {
	return (
		<ul {...stylex.attrs(styles.attachments)}>
			<For each={props.attachments}>
				{(attachment) => (
					<li>
						<Attachment link={attachment} />
					</li>
				)}
			</For>
		</ul>
	);
}
