import stylex from "@stylexjs/stylex";
import { colors } from "../variables.stylex";
import { posts } from "@/MockData";
import { createVirtualizer } from "@tanstack/solid-virtual";

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
const randomNumber = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);

const sentences = new Array(10000).fill(true).map(() => {
	const sentence = posts[randomNumber(0, posts.length - 1)].content;
	return sentence;
});

export function Main() {
	let parentRef!: HTMLDivElement;
	const count = sentences.length;
	const virtualizer = createVirtualizer({
		count,
		getScrollElement: () => parentRef,
		estimateSize: () => 90,
		overscan: 50,
	});

	const items = virtualizer.getVirtualItems();

	return (
		<div
			// {...stylex.attrs(styles.main)}
			ref={parentRef}
			class="List"
			style={{ height: "100vh", width: "400px", "overflow-y": "auto" }}
		>
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
							<div style={{ padding: "10px 0" }}>
								<div>Row {virtualRow.index}</div>
								<div>{sentences[virtualRow.index]}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
