import stylex from "@stylexjs/stylex";
import { colors } from "../variables.stylex";
import { posts } from "@/MockData";
import { createVirtualizer } from "@tanstack/solid-virtual";
import { PostList } from "./Post/PostList";

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
	return <PostList posts={posts} />;
}
