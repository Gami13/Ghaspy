import stylex from "@stylexjs/stylex";
import { For, type Setter } from "solid-js";
import { Attachment } from "./Attachment";
import type { UploadFile } from "../Editor";

type AttachmentListProps = {
	attachments: UploadFile[];
	attachmentsSetter: Setter<UploadFile[]>;
};
const styles = stylex.create({
	attachments: {
		display: "flex",
		flexWrap: "wrap",
		gap: "0.15em",
		width: "100%",
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
		height: "6em",
		objectFit: "cover",
	},
});
export function PostWriterAttachmentList(props: AttachmentListProps) {
	return (
		<ul {...stylex.attrs(styles.attachments)}>
			<For each={props.attachments}>
				{(attachment) => {
					if (typeof attachment === "string") {
						return (
							<li>
								<button onClick={() => props.attachmentsSetter((files) => files.filter((file) => file !== attachment))} type="button">
									X
								</button>
								<Attachment link={attachment} />
							</li>
						);
					}
					if (typeof attachment === "object" && attachment.blob && ["image/png", "image/jpeg", "image/webp"].includes(attachment.blob.type)) {
						return (
							<li>
								<button onClick={() => props.attachmentsSetter((files) => files.filter((file) => file !== attachment))} type="button">
									X
								</button>
								<img src={URL.createObjectURL(attachment.blob)} {...stylex.attrs(styles.attachment)} alt="attachment" />
							</li>
						);
					}
					//TODO: MAKE PRETTY LIKE DISCORD https://user-images.githubusercontent.com/20058379/191418459-0050ba3e-ee19-4383-b0e4-0c55ee48a1dd.png
					return (
						<li>
							<button onClick={() => props.attachmentsSetter((files) => files.filter((file) => file !== attachment))} type="button">
								X
							</button>
							Attachment {attachment.name.split(".").slice(-1).pop() && ".file"}
						</li>
					);
				}}
			</For>
		</ul>
	);
}
