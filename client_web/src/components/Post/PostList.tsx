import stylex from "@stylexjs/stylex";
import { colors, dimensions } from "../../variables.stylex";
// import { createVirtualizer } from "@tanstack/solid-virtual";
import type { Post as PostType } from "@/types/internal";
import { Post } from "./Post";
import { PostWriter } from "./PostWriter";
import { useAppState } from "@/AppState";
import { For, onMount, Show } from "solid-js";
import { A } from "@solidjs/router";
const styles = stylex.create({
	main: {
		padding: "0.25em 0.5em",
		height: "100vh",
		maxWidth: dimensions.postsMaxWidth,
		minWidth: dimensions.postsMinWidth,
		backgroundColor: colors.background50,
		flexGrow: 10000,
	},
	list: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		gap: "0.5em",
		scrollbarGutter: "stable both-edges",

		overflowY: "auto",
	},
	link: {
		textDecoration: "none",
	},
});
type PostListProps = {
	posts: PostType[];
};

export function PostList(props: PostListProps) {
	//   let parentRef!: HTMLDivElement;
	//   const count = props.posts.length;
	//   const virtualizer = createVirtualizer({
	//     count,
	//     getScrollElement: () => parentRef,
	//     estimateSize: () => 300,
	//     overscan: 0,
	//   });
	const AppState = useAppState();

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
				<Show when={AppState.isLoggedIn()}>
					<PostWriter user={AppState.user} />
				</Show>
				<For each={props.posts}>
					{(post) => (
						<li>
							<A href={`/${post.author?.username}/${post.ID}`} {...stylex.attrs(styles.link)}>
								<Post post={post} />
							</A>
						</li>
					)}
				</For>
			</ul>
		</main>
	);
}
