import type { Post } from "@/types/internal";
import stylex, { type StyleXStyles } from "@stylexjs/stylex";
import { For } from "solid-js";
import { Attachment } from "./Attachment";
import { TbTrash, TbFileDescription } from "solid-icons/tb";
import { colors } from "../../variables.stylex";
import { imageExtensions } from "@/imageExtensions";

type AttachmentListProps = {
	attachments: Post["attachments"];
	styling?: StyleXStyles;
	border?: boolean;
};
const styles = stylex.create({
	attachments: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		gap: "0.5em",
		width: "100%",
	},
	attachment: {
		width: "100%",
	},
	attachmentContent: {
		position: "relative",
		height: "100%",
		width: "5em",
		padding: "0.5em",
		borderRadius: "0.5em",
		backgroundColor: colors.background100,
	},
	fileName: {
		fontSize: "1.25em",
		position: "absolute",
		bottom: "0.25ch",
		left: 0,
		width: "100%",
		textAlign: "center",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",

		colors: colors.text500,
	},
	attachmentFile: {
		cursor: "search",
		width: "100%",
		height: "100%",
		padding: "0.5em",
		display: "flex",
		fontSize: "3em",
		// backgroundColor: colors.background100,

		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		borderRadius: "0.15em",
	},
});
export function AttachmentList(props: AttachmentListProps) {
	return (
		<ul {...stylex.attrs(styles.attachments, props.styling)}>
			<For each={props.attachments}>
				{(attachment) => {
					const ext = attachment.split(".").pop()?.toLowerCase();
					console.log(ext);

					if (ext !== undefined && imageExtensions.includes(ext)) {
						return (
							<li {...stylex.attrs(styles.attachment)}>
								<Attachment link={attachment} />
							</li>
						);
					}

					// //TODO: MAKE PRETTY LIKE DISCORD https://user-images.githubusercontent.com/20058379/191418459-0050ba3e-ee19-4383-b0e4-0c55ee48a1dd.png
					return (
						<li {...stylex.attrs(styles.attachment)}>
							<div {...stylex.attrs(styles.attachmentContent)}>
								{/* @ts-ignore */}
								<TbFileDescription {...stylex.attrs(styles.attachmentFile)} />
								<span {...stylex.attrs(styles.fileName)}>.{attachment.split(".").pop()?.toUpperCase()}</span>
							</div>
						</li>
					);
				}}
			</For>
		</ul>
	);
}
