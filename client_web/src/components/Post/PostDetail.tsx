import { useParams } from "@solidjs/router";
import { Post } from "./Post";
import { colors, dimensions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import { ReplyToPost } from "./ReplyToPost";
import { createEffect, Show } from "solid-js";
import { ProtoFetch } from "@/ProtoFetch";
import { GET_POST_ENDPOINT } from "@/constants";
import type { Post as PostType, User } from "@/types/internal";

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

	comment: {
		backgroundColor: colors.background100,
	},
});

export function PostDetail() {
	const params = useParams();

	console.log(params.username);
	console.log(params.postID);
	const proto = new ProtoFetch(GET_POST_ENDPOINT(params.postID));
	createEffect(() => proto.Query());
	//TODO:Add fetching replies
	return (
		<Show when={proto.state.isSuccess && proto.state.data !== undefined && proto.state.data.post !== undefined}>
			<main {...stylex.attrs(styles.main)}>
				<Post post={proto.state.data?.post as PostType & { author: User }} />
				<ReplyToPost post={proto.state.data?.post as PostType & { author: User }} />
				{/* <For each={comments()}>{(comment) => <Post styling={styles.comment} post={comment} />}</For> */}
			</main>
		</Show>
	);
}
