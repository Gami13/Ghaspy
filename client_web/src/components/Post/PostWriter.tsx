import type { Post as PostType, User } from "@/types/internal";
import stylex from "@stylexjs/stylex";
import { createSignal, onMount, Show } from "solid-js";
import { PostQuoteSmall } from "./PostQuoteSmall";
import { colors } from "../../variables.stylex";
import { PostWriterAttachmentList } from "./PostWriterAttachments";
import { TbPhoto } from "solid-icons/tb";
import { InteractionButton } from "./InteractionButton";
import { UserAvatar } from "../UserProfile/UserAvatar";
import { getDisplayName } from "@/utils";
import { Editor, type UploadFile } from "../Editor";
import { ADD_POST_ENDPOINT } from "@/constants";
import { useAppState } from "@/AppState";
import { ResponseError } from "@/types/responses";
import { useTrans } from "@/Translation";

const styles = stylex.create({
	post: {
		width: "100%",
		height: "fit-content",
		color: colors.text900,
		display: "flex",
		backgroundColor: colors.background100,
		padding: "1em",
		borderRadius: "1em",
		flexDirection: "column",
		gap: "0.75em",
	},
	header: {
		gap: "0.5em",
		display: "flex",
		alignItems: "center",
		paddingHorizontal: "1em",
	},
	avatar: {
		flexShrink: 0,
		width: "3.5em",
		height: "3.5em",
		borderRadius: "50%",
		aspectRatio: "1/1",
	},
	names: {
		display: "flex",
		gap: "0.1em",
		flexDirection: "column",
		justifyContent: "center",
	},
	username: {
		fontSize: "1em",
		color: colors.text500,
		fontWeight: 500,
	},
	time: {
		fontSize: "0.9em",
		color: colors.text500,
		height: "2.3em",
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	displayName: {
		fontSize: "1.3em",
	},
	content: {
		minHeight: "2em",
		border: "none",
		outline: "none",
		fontSize: "1.3em",
		wordBreak: "break-word",
	},
	placeholder: {
		color: colors.text500,
		position: "absolute",
		pointerEvents: "none",
		fontSize: "1.3em",
	},
	statistics: {
		display: "flex",
		justifyContent: "space-between",
		paddingHorizontal: "1em",
		color: colors.text500,
		fontSize: "0.9em",
	},
	activityWrapper: {
		display: "flex",
		alignItems: "center",
		gap: "0.3em",
	},
	send: {},
	sendButton: {
		fontWeight: 700,
		fontSize: "1.2em",
		height: "2.5em",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		verticalAlign: "middle",
		backgroundColor: colors.primary500,
		border: "none",
		width: "fit-content",
		padding: "0.5em 1.25em",
		borderRadius: "2.5em",
		cursor: "pointer",
		color: colors.text950,
		lineHeight: 1,
	},
	main: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5em",
		paddingHorizontal: "1em",
		position: "relative",
	},
	blur: {
		filter: "blur(3px)",

		opacity: 0.5,
	},
});
//! Use Small quote if original and quote have media, otherwise use Big quote
export function PostWriter(props: { user: User; quote?: PostType }) {
	//stupid protobuf generates as optional even tho its required and will always be
	const AppState = useAppState();
	const t = useTrans();
	const [text, setText] = createSignal("");
	const [files, setFiles] = createSignal<UploadFile[]>([]);
	const [isDragging, setIsDragging] = createSignal(false);
	let article!: HTMLElement;
	async function sendPost() {
		if (text().length !== 0 || files().length !== 0) {
			console.log("SENDING");
			const formData = new FormData();
			formData.append("content", text());
			formData.append("quoteOf", props.quote?.ID || "0");
			formData.append("replyTo", "0");
			for (const file of files()) {
				if (typeof file === "object" && file.blob) {
					formData.append("attachments", file.blob);
				}
			}

			const response = await fetch(ADD_POST_ENDPOINT.url, {
				method: ADD_POST_ENDPOINT.method,
				body: formData,
				headers: {
					Authorization: AppState.userToken() || "",
				},
			});
			if (response.ok) {
				console.log("Post sent successfully");

				setText("");

				setFiles([]);

				return;
			}
			const errorData = ResponseError.decode(new Uint8Array(await response.arrayBuffer()));
			alert(errorData.message);
		}
	}
	onMount(() => {
		article.ondragenter = (e) => {
			e.preventDefault();
			if (article.contains(e.relatedTarget as Node)) {
				console.log("disable blur");

				setIsDragging(true);
			}
		};
		article.ondragend = (e) => {
			e.preventDefault();
			console.log("end");
			if (!article.contains(e.relatedTarget as Node)) {
				console.log("disable blur");

				setIsDragging(false);
			}
		};

		article.ondragleave = (e) => {
			e.preventDefault();
			console.log("leave");
			if (!article.contains(e.relatedTarget as Node)) {
				console.log("disable blur");

				setIsDragging(false);
			}
		};
	});
	return (
		<article
			{...stylex.attrs(styles.post, isDragging() && styles.blur)}
			ref={article}
			onDrop={(e) => {
				e.preventDefault();
				console.log("DROP", e);
				setIsDragging(false);
				if (e.dataTransfer == null) return;
				const files = e.dataTransfer.files;
				for (let i = 0; i < files.length; i++) {
					const blob = files[i];
					const fileName = blob.name;
					setFiles((files) => [...files, { name: fileName, blob: blob }]);
				}
			}}
		>
			<header {...stylex.attrs(styles.header)}>
				<UserAvatar user={props.user} styles={styles.avatar} />

				<section {...stylex.attrs(styles.names)}>
					<h2 {...stylex.attrs(styles.displayName)}>{getDisplayName(props.user)}</h2>
					<h3 {...stylex.attrs(styles.username)}>@{props.user.username}</h3>
				</section>
			</header>
			<main {...stylex.attrs(styles.main)}>
				<Editor
					contentStyle={styles.content}
					placeholderStyle={styles.placeholder}
					setterText={setText}
					placeholder={t.posts.whatsHappening()}
					setterFiles={setFiles}
					text={text}
				/>
				<Show when={files().length > 0}>
					<PostWriterAttachmentList attachments={files()} attachmentsSetter={setFiles} />
				</Show>
				<Show when={props.quote?.quoted}>
					<PostQuoteSmall post={props.quote as PostType} />
				</Show>
			</main>
			<footer>
				<ol {...stylex.attrs(styles.statistics)}>
					<InteractionButton
						icon={<TbPhoto />}
						onClick={() => {
							const input = document.createElement("input");
							input.type = "file";
							input.accept = "image/*";
							input.multiple = true;
							input.click();
							input.onchange = () => {
								if (input.files == null) return;
								for (let i = 0; i < input.files.length; i++) {
									const blob = input.files[i];
									const fileName = blob.name;
									setFiles((files) => [...files, { name: fileName, blob: blob }]);
								}
							};
						}}
					/>
					<li>
						<button onclick={sendPost} type="button" {...stylex.attrs(styles.sendButton)}>
							{t.posts.post()}
						</button>
					</li>
				</ol>
			</footer>
		</article>
	);
}
