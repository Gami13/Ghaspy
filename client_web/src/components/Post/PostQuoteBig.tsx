import { timeSince } from "@/Translation";
import type { Post as PostType, User } from "@/types/internal";
import stylex from "@stylexjs/stylex";
import { Show } from "solid-js";
import { AttachmentList } from "./AttachmentList";
import { colors } from "../../variables.stylex";
import { A } from "@solidjs/router";
import { getDisplayName } from "@/utils";
import { UserAvatar } from "../UserProfile/UserAvatar";
//! Post is safe to be asserted as defined
const styles = stylex.create({
	post: {
		width: "100%",
		height: "fit-content",
		color: colors.text900,
		display: "flex",
		backgroundColor: colors.background100,
		padding: "0.5em",
		paddingTop: "0.75em",
		paddingBottom: "0em",
		borderRadius: "1em",
		flexDirection: "column",
		gap: "0.4em",

		border: "1px solid",
		borderColor: colors.text300,
	},
	header: {
		gap: "0.5em",
		display: "flex",
		alignItems: "center",
		paddingHorizontal: "0.5em",
	},
	avatar: {
		flexShrink: 0,
		width: "2em",
		height: "2em",
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
		fontSize: "0.7em",
		color: colors.text500,
		fontWeight: 500,
	},
	time: {
		fontSize: "0.7em",
		color: colors.text500,
		height: "2.3em",
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	displayName: {
		fontSize: "0.8em",
	},
	content: {
		// paddingHorizontal: "0.5em",
		fontSize: "0.9em",
	},
	// attachments: {
	// 	paddingHorizontal: "0.5em",
	// },
	main: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5em",
		paddingHorizontal: "0.5em",
	},
	link: {
		textDecoration: "none",
	},
});

export function PostQuoteBig(props: { post: PostType }) {
	props.post.author = props.post.author as User;
	return (
		<A href={`/${props.post.author.username}/${props.post.ID}`} {...stylex.attrs(styles.link)}>
			<article {...stylex.attrs(styles.post)}>
				<header {...stylex.attrs(styles.header)}>
					<UserAvatar user={props.post.author} styles={styles.avatar} />
					<section {...stylex.attrs(styles.names)}>
						<h2 {...stylex.attrs(styles.displayName)}>{getDisplayName(props.post.author)}</h2>
						<h3 {...stylex.attrs(styles.username)}>@{props.post.author.username}</h3>
					</section>
					<time {...stylex.attrs(styles.time)}>○ {timeSince(props.post.timePosted)}</time>
				</header>
				<main {...stylex.attrs(styles.main)}>
					<p {...stylex.attrs(styles.content)}>{props.post.content}</p>
					<Show when={props.post.attachments.length > 0}>
						<AttachmentList attachments={props.post.attachments} border={false} />
					</Show>
				</main>
			</article>
		</A>
	);
}
