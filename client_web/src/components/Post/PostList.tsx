import stylex from "@stylexjs/stylex";
import { colors, dimensions } from "../../variables.stylex";
import { createVirtualizer } from "@tanstack/solid-virtual";
import type { Post as PostType, User } from "@/types/internal";
import { Post } from "./Post";
import { PostWriter } from "./PostWriter";
import { useAppState } from "@/AppState";
import { For, Show } from "solid-js";
const styles = stylex.create({
	main: {
		paddingTop: "0.25em",
		height: "100vh",
		maxWidth: dimensions.postsMaxWidth,
		minWidth: dimensions.postsMinWidth,
		backgroundColor: colors.background50,
		flexGrow: 10000,

		overflowY: "auto",
	},
});
type PostListProps = {
	posts: PostType[];
};

export function PostList(props: PostListProps) {
	let parentRef!: HTMLDivElement;
	const count = props.posts.length;
	const virtualizer = createVirtualizer({
		count,
		getScrollElement: () => parentRef,
		estimateSize: () => 300,
		overscan: 0,
	});
	const AppState = useAppState();

	const items = virtualizer.getVirtualItems();
	/*PUT THIS ON TOP OF LIST SOMEHOW :3
	 <Show when={AppState.user() !== undefined}>
	<PostWriter user={AppState.user() as User} />
	</Show>; */

	return (
		<main {...stylex.attrs(styles.main)}>
			<Show when={AppState.isLoggedIn()}>
				<PostWriter user={AppState.user() as User} />
			</Show>
			<For each={posts}>{(post) => <Post post={post} />}</For>
			{/* <div
				style={{
					height: `${virtualizer.getTotalSize()}px`,
					width: "100%",
					position: "relative",
				}}
			>
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						transform: `translateY(${items[0] ? items[0].start : 0}px)`,
					}}
				>
					{items.map((virtualRow) => (
						<div
							data-index={virtualRow.index}
							ref={(el) => queueMicrotask(() => virtualizer.measureElement(el))}
						>
							<Post post={props.posts[virtualRow.index]} />
						</div>
					))}
				</div>
			</div> */}
		</div>
	);
}
