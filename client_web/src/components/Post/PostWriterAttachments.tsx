import stylex from "@stylexjs/stylex";
import { For, type Setter } from "solid-js";
import { Attachment } from "./Attachment";
import type { UploadFile } from "../Editor";
import { colors, transitions } from "../../variables.stylex";
import { TbFileDescription, TbTrash } from "solid-icons/tb";

type AttachmentListProps = {
	attachments: UploadFile[];
	attachmentsSetter: Setter<UploadFile[]>;
};
const styles = stylex.create({
	attachments: {
		display: "flex",
		flexWrap: "wrap",
		gap: "0.5em",
		width: "100%",
		minHeight: "6em",
		overflow: "hidden",
		flexShrink: 0,
		// flexBasis: "50%",
		backgroundColor: "rgba(0,0,0,0.3)",
		padding: "0.5em",
		borderRadius: "0.5em",
	},
	attachmentsRow: {
		gap: "0.25em",
		display: "flex",
	},

	attachment: {
		height: "6em",
		objectFit: "cover",
		borderRadius: "0.5em",
		position: "relative",
	},

	attachmentBtn: {
		cursor: "pointer",
		position: "absolute",
		top: 0,
		right: 0,
		width: "2em",
		height: "2em",
		borderTopRightRadius: "0.5em",
		borderBottomLeftRadius: "0.5em",
		transition: "all 0.1s",
		transitionTimingFunction: transitions.duration,
		backgroundColor: colors.background200,
		zIndex: 11,
		":hover": {
			backgroundColor: colors.textError,
		},
	},
	attachmentContent: {
		position: "relative",
		height: "100%",
		width: "5em",
		padding: "0.5em",
		borderRadius: "0.5em",
		backgroundColor: colors.background100,
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
});
export function PostWriterAttachmentList(props: AttachmentListProps) {
	return (
		<ul {...stylex.attrs(styles.attachments)}>
			<For each={props.attachments}>
				{(attachment) => {
					if (typeof attachment === "string") {
						return (
							<li {...stylex.attrs(styles.attachment)}>
								<button
									onClick={() =>
										props.attachmentsSetter((files) => files.filter((file) => file !== attachment))
									}
									type="button"
									{...stylex.attrs(styles.attachmentBtn)}
								>
									<TbTrash />
								</button>
								<Attachment link={attachment} />
							</li>
						);
					}
					if (
						typeof attachment === "object" &&
						attachment.blob &&
						["image/png", "image/jpeg", "image/webp"].includes(attachment.blob.type)
					) {
						return (
							<li {...stylex.attrs(styles.attachment)}>
								<button
									onClick={() =>
										props.attachmentsSetter((files) => files.filter((file) => file !== attachment))
									}
									type="button"
									{...stylex.attrs(styles.attachmentBtn)}
								>
									<TbTrash />
								</button>
								<img
									src={URL.createObjectURL(attachment.blob)}
									{...stylex.attrs(styles.attachment)}
									alt="attachment"
								/>
							</li>
						);
					}
					//TODO: MAKE PRETTY LIKE DISCORD https://user-images.githubusercontent.com/20058379/191418459-0050ba3e-ee19-4383-b0e4-0c55ee48a1dd.png
					return (
						<li {...stylex.attrs(styles.attachment)}>
							<button
								onClick={() =>
									props.attachmentsSetter((files) => files.filter((file) => file !== attachment))
								}
								type="button"
								{...stylex.attrs(styles.attachmentBtn)}
							>
								<TbTrash />
							</button>
							<div {...stylex.attrs(styles.attachmentContent)}>
								{/* @ts-ignore */}
								<TbFileDescription {...stylex.attrs(styles.attachmentFile)} />
								<span {...stylex.attrs(styles.fileName)}>
									.{attachment.name.split(".").pop()?.toUpperCase() ?? ".file"}
								</span>
							</div>
						</li>
					);
				}}
			</For>
		</ul>
	);
}
