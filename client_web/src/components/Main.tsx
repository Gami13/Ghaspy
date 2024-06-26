import { PostList } from "./Post/PostList";
import { ProtoFetch } from "@/ProtoFetch";
import { ResponseGetPostsChronologically } from "@/types/responses";
import { POSTS_CHRONO_ENDPOINT } from "@/constants";
import { useAppState } from "@/AppState";
import { createEffect, Show } from "solid-js";
import type { Post } from "@/types/internal";
import stylex from "@stylexjs/stylex";

import { Logo } from "./Logo";
import { colors, dimensions } from "../variables.stylex";
const styles = stylex.create({
	loadingBox: {
		height: "100vh",
		width: "650px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		borderRight: "2px solid #c23da9",
		borderLeft: "2px solid #0066ff",
	},
	logo: {
		width: "7em",
		height: "7em",
		transform: "translate(0,0)",
	},
	main: {
		padding: "0.25em 0.5em",
		height: "100vh",
		maxWidth: dimensions.postsMaxWidth,
		minWidth: dimensions.postsMinWidth,
		backgroundColor: colors.background50,
		flexGrow: 10000,
		// borderRight: "2px solid #c23da9",
		// borderLeft: "2px solid #0066ff",
	},
});

export function Main() {
	const AppState = useAppState();
	const proto = new ProtoFetch(POSTS_CHRONO_ENDPOINT(0));
	//!Posts should probably be kept in state and not fetched when changing route, should also modify the state optimistically on interactions
	//TODO: Do the above
	createEffect(() => {
		let token = AppState.userToken();
		if (!token) {
			console.log("No token found");
			token = "";
		}
		proto.Query();
	});
	createEffect(() => {
		if (proto.state.isSuccess) {
			console.log(proto.state.data.posts as Post[]);
		}
		if (proto.state.isError) {
			console.log(proto.state.error);
		}
		if (proto.state.isLoading) {
			console.log("Loading...");
		}
		console.log("PROTO", proto);
	});

	return (
		<main {...stylex.attrs(styles.main)}>
			<Show
				when={proto.state.isSuccess}
				fallback={
					<div {...stylex.attrs(styles.loadingBox)}>
						<Logo loading={true} stylex={styles.logo} />
					</div>
				}
			>
				<PostList posts={proto.state.data?.posts as Post[]} />
			</Show>
		</main>
	);
}
