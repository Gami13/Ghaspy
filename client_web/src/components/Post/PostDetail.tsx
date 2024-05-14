import { posts } from "@/MockData";
import { useParams } from "@solidjs/router";
import { Post } from "./Post";
import { colors, dimensions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import { ReplyToPost } from "./ReplyToPost";
import { createEffect, createResource, createSignal, For, Show } from "solid-js";

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

	const [data, postUtils] = createResource(() => posts.find((x) => x.author?.username === params.username && x.ID === params.postID));

	const [comments, commentsUtils] = createResource(() => posts.filter((x) => x.replyToID === params.postID));
	createEffect(() => {
		//!LOAD BEARING COMMENT

		console.log(params.postID);
		postUtils.refetch();
		commentsUtils.refetch();
	});
	//!ZADANIE BOJOWE DLA @pietruszka123
	//Post doesnt refresh author avatar for some reason

	return (
		<main {...stylex.attrs(styles.main)}>
			<Post styling={styles.header} post={data()} />
			<ReplyToPost post={data()} />
			<For each={comments()}>{(comment) => <Post styling={styles.comment} post={comment} />}</For>
		</main>
	);
}
