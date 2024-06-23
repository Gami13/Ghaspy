import { ProtoFetch } from "@/ProtoFetch";
import { GET_BOOKMARKS_ENDPOINT } from "@/constants";
import { useAppState } from "@/AppState";
import { createEffect, Show } from "solid-js";
import type { Post } from "@/types/internal";
import stylex from "@stylexjs/stylex";
import { Logo } from "../Logo";
import { BookmarksList } from "./BookmarksList";

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
});

export function BookmarksRoute() {
	const AppState = useAppState();
	const proto = new ProtoFetch(GET_BOOKMARKS_ENDPOINT(0));

	createEffect(() => {
		const token = AppState.userToken();
		if (!token) {
			console.log("No token found");
			return;
		}
		proto.Query();
	});
	createEffect(() => {
		if (proto.state.isSuccess) {
			console.log(proto.state.data?.posts as Post[]);
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
		<Show
			when={proto.state.isSuccess}
			fallback={
				<div {...stylex.attrs(styles.loadingBox)}>
					<Logo loading={true} stylex={styles.logo} />
				</div>
			}
		>
			<BookmarksList posts={proto.state.data?.posts as Post[]} />
		</Show>
	);
}
