import stylex from "@stylexjs/stylex";
import { colors, dimensions } from "../../variables.stylex";
// import { createVirtualizer } from "@tanstack/solid-virtual";
import type { Post as PostType, User } from "@/types/internal";
import { Post } from "../Post/Post";
import { useAppState } from "@/AppState";
import { For, onMount, Show } from "solid-js";
import { useTrans } from "@/Translation";
const styles = stylex.create({
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
	list: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		gap: "0.5em",
		scrollbarGutter: "stable both-edges",

		overflowY: "auto",
	},
});
type BookmarksListProps = {
	posts: PostType[];
};

export function BookmarksList(props: BookmarksListProps) {
	const AppState = useAppState();
	const t = useTrans();

	let listRef: HTMLUListElement | undefined;

	function scrollControl(e: Event) {
		AppState.setScrollPosition((e.target as HTMLElement).scrollTop);
	}

	onMount(() => {
		const scroll = AppState.scrollPostition();
		if (scroll !== undefined && listRef !== undefined) {
			listRef.scrollTop = scroll;
		}
	});
	return (
		<main {...stylex.attrs(styles.main)}>
			<ul {...stylex.attrs(styles.list)} ref={listRef} onScroll={scrollControl}>
				<Show when={props.posts.length === 0}>
					<h3>{t.noBookmarks()}</h3>
				</Show>
				<For each={props.posts}>
					{(post) => (
						<li>
							<Post post={post as PostType & { author: User }} />
						</li>
					)}
				</For>
			</ul>
		</main>
	);
}
