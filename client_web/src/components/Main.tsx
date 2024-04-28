import stylex from "@stylexjs/stylex";
import { colors, dimensions } from "../variables.stylex";
import { posts } from "@/MockData";
import { createVirtualizer } from "@tanstack/solid-virtual";
import { PostList } from "./Post/PostList";
import { Navigation } from "./Navgiation/Navigation";
import { getTokenFromCookie, useAppState } from "@/AppState";
import { createEffect, onMount } from "solid-js";

const styles = stylex.create({
	wrapper: {
		height: "100vh",
		width: "100%",

		display: "flex",
		gridTemplateColumns: "4fr 6fr 4fr",
		maxWidth: `calc(${dimensions.navMaxWidth} + ${dimensions.postsMaxWidth} + ${dimensions.asideMaxWidth})`,
	},
	aside: {
		width: "1px",
		height: "100vh",
		flexGrow: 120,
		maxWidth: dimensions.asideMaxWidth,
		backgroundColor: colors.background50,
		display: { default: "block", "@media (max-width: 900px)": "none" },
	},
});

export function Main() {
	const AppState = useAppState();
	onMount(() => {
		const token = getTokenFromCookie();
		if (token) {
			console.log("TOKEN", token);
			AppState.setUserToken(token);
			//TODO: probably fetch user data here and set it to AppState
		}
	});
	createEffect(() => {
		console.log(`EFFECT${AppState.userToken()}`);
	});

	console.log("WHAT");
	return (
		<div {...stylex.attrs(styles.wrapper)}>
			<Navigation />
			<PostList posts={posts} />
			<aside {...stylex.attrs(styles.aside)} />
		</div>
	);
}
