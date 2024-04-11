import type { Post } from "@/types/internal";
import stylex, { type StyleXStyles } from "@stylexjs/stylex";
import { For, Show } from "solid-js";
import { Attachment } from "./Attachment";
import { colors } from "../../variables.stylex";

type AttachmentListProps = {
	attachments: Post["attachments"];
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
export function AttachmentListSmall(props: AttachmentListProps) {
	return (
		<ul {...stylex.attrs(styles.attachments)}>
			<Show when={props.attachments.length > 0}>
				<li {...stylex.attrs(styles.attachmentsRow)}>
					<Show when={props.attachments.length > 0}>
						<img
							{...stylex.attrs(styles.attachment)}
							src={props.attachments[0]}
							alt="Attachment"
						/>
					</Show>
					<Show when={props.attachments.length > 1}>
						<img
							{...stylex.attrs(styles.attachment)}
							src={props.attachments[1]}
							alt="Attachment"
						/>
					</Show>
				</li>
			</Show>
			<Show when={props.attachments.length > 2}>
				<li {...stylex.attrs(styles.attachmentsRow)}>
					<Show when={props.attachments.length > 2}>
						<img
							{...stylex.attrs(styles.attachment)}
							src={props.attachments[2]}
							alt="Attachment"
						/>
					</Show>
					<Show when={props.attachments.length > 3}>
						<img
							{...stylex.attrs(styles.attachment)}
							src={props.attachments[3]}
							alt="Attachment"
						/>
					</Show>
				</li>
			</Show>
		</ul>
	);
}
