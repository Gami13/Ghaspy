import stylex from "@stylexjs/stylex";
import { Post } from "./Post/Post";
import type { Post as PostType, User } from "@/types/internal";
import { colors } from "../variables.stylex";
import { posts } from "@/MockData";
import { For } from "solid-js";

const styles = stylex.create({
	main: {
		height: "100%",
		maxWidth: "600px",
		backgroundColor: colors.background50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		gap: "1em",
		overflowY: "auto",
	},
});

export function Main() {
	return (
		<div {...stylex.attrs(styles.main)}>
			<For each={posts}>{(post: PostType) => <Post post={post} />}</For>
		</div>
	);
}
