import stylex from "@stylexjs/stylex";
import { colors } from "../../variables.stylex";
import { posts } from "@/MockData";
import { createVirtualizer } from "@tanstack/solid-virtual";
import type { Post as PostType } from "@/types/internal";
import { Post } from "./Post";
const styles = stylex.create({
	main: {
		height: "100vh",
		maxWidth: "600px",
		width: "100%",
		backgroundColor: colors.background50,

		overflowY: "auto",
	},
	wrapper: {
		paddingBottom: "1em",
		":last-child": {
			paddingBottom: 0,
		},
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

	const items = virtualizer.getVirtualItems();

	return (
		<div {...stylex.attrs(styles.main)} ref={parentRef} style={{}}>
			<div
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
			</div>
		</div>
	);
}
