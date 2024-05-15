import { posts } from "@/MockData";
import { useParams } from "@solidjs/router";
import { Post } from "./Post";
import { colors, dimensions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import { ReplyToPost } from "./ReplyToPost";
import {
	createEffect,
	createMemo,
	createResource,
	createSignal,
	For,
	Show,
} from "solid-js";

const styles = stylex.create({
	main: {
		padding: "0.25em 0.5em",
		height: "100vh",
		gap: "0.5em",
		maxWidth: dimensions.postsMaxWidth,
		minWidth: dimensions.postsMinWidth,
		backgroundColor: colors.background50,
		flexGrow: 10000,
		display: "flex",
		flexDirection: "column",

		overflowY: "auto",
		scrollbarGutter: "stable both-edges",
	},
	header: {
		borderColor: colors.background200,
		borderWidth: "5px 3px 5px 3px",
		borderStyle: "solid",
		backgroundColor: colors.background100,
	},
	comment: {
		backgroundColor: colors.background100,
	},
});

export function PostDetail() {
	const params = useParams();

	console.log(params.username);
	console.log(params);

	const data = createMemo(() =>
		posts.find(
			(x) => x.author?.username === params.username && x.ID === params.postID,
		),
	);

	const comments = createMemo(() =>
		posts.filter((x) => x.replyToID === params.postID),
	);

	return (
		<main {...stylex.attrs(styles.main)}>
			<Post styling={styles.header} post={data()} />
			<ReplyToPost post={data()} />
			<For each={comments()}>
				{(comment) => <Post styling={styles.comment} post={comment} />}
			</For>
		</main>
	);
}
