import stylex from "@stylexjs/stylex";
import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";

const style = stylex.create({
	outer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		height: "100%",
		backgroundColor: "blue",
	},
	uploadZone: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		border: "2px dashed red",
		borderRadius: "10px",
	},
	inner: {
		position: "relative",
		width: "50vw",
		height: "50vh",
		backgroundColor: "green",
		overflow: "hidden",
	},
	cropRef: {
		position: "absolute",
		background: "rgba(0,0,0,0.5)",
		zIndex: 10000,
		pointerEvents: "none",
	},
	avatar: {
		maxBlockSize: "9999999999999px",
		maxInlineSize: "9999999999999px",
		zIndex: 1000,
		display: "block",
		position: "absolute",
	},
	slider: {
		position: "absolute",
		bottom: "0",
		left: "0",
		width: "100%",
		zIndex: 10000,
	},
	output: {
		overflow: "visible",
	},
});

export function UserAvatarHandler() {
	const [avatarUpload, setAvatarUpload] = createSignal<Blob | undefined>(undefined);
	let zoom = 1.0;
	let avatarRef: HTMLImageElement | undefined;
	let cropRef: HTMLDivElement | undefined;
	let innerRef: HTMLDivElement | undefined;
	let outputRef: HTMLCanvasElement | undefined;
	let isDragging = false;
	let startingMouseX = 0;
	let startingMouseY = 0;
	let firstWidth = 0;
	let firstHeight = 0;

	onMount(() => {
		document.addEventListener("paste", pasteListener);
		document.addEventListener("mousemove", mouseMoveListener);
		document.addEventListener("mouseup", mouseUpListener);
	});
	onCleanup(() => {
		document.removeEventListener("paste", pasteListener);
		document.removeEventListener("mousemove", mouseMoveListener);
		document.removeEventListener("mouseup", mouseUpListener);
	});

	function mouseUpListener() {
		isDragging = false;
	}

	function pasteListener(event: ClipboardEvent) {
		if (!event.clipboardData) return;
		const items = event.clipboardData.items;

		for (let i = 0; i < items.length; i++) {
			if (items[i].type.indexOf("image") !== -1) {
				const blob = items[i].getAsFile();
				if (blob) {
					setAvatarUpload(blob);
				}
			}
		}
	}
	function boundingBox() {
		if (avatarRef && cropRef) {
			if (Number.parseInt(cropRef.style.left) <= Number.parseInt(avatarRef.style.left)) {
				avatarRef.style.left = cropRef.style.left;
			}
			if (Number.parseInt(cropRef.style.top) <= Number.parseInt(avatarRef.style.top)) {
				avatarRef.style.top = cropRef.style.top;
			}
			if (
				Number.parseInt(cropRef.style.left) + cropRef.clientWidth >=
				Number.parseInt(avatarRef.style.left) + avatarRef.clientWidth
			) {
				const widthDiff = avatarRef.clientWidth - cropRef.clientWidth;
				avatarRef.style.left = `${Number.parseInt(cropRef.style.left) - widthDiff}px`;
			}
			if (
				Number.parseInt(cropRef.style.top) + cropRef.clientHeight >=
				Number.parseInt(avatarRef.style.top) + avatarRef.clientHeight
			) {
				const heightDiff = avatarRef.clientHeight - cropRef.clientHeight;
				avatarRef.style.top = `${Number.parseInt(cropRef.style.top) - heightDiff}px`;
			}
		}
	}
	function mouseMoveListener(event: MouseEvent) {
		if (!isDragging) return;
		console.log("dragging");
		console.log(event.screenX, event.screenY);

		if (!(avatarRef && cropRef && innerRef)) return;
		const deltaX = event.screenX - startingMouseX;
		const deltaY = event.screenY - startingMouseY;
		avatarRef.style.left = `${Number.parseInt(avatarRef.style.left) + deltaX}px`;
		avatarRef.style.top = `${Number.parseInt(avatarRef.style.top) + deltaY}px`;
		startingMouseX = event.screenX;
		startingMouseY = event.screenY;
		boundingBox();
	}

	function setAvatarSize() {
		if (avatarRef) {
			const prevWidth = avatarRef.clientWidth;
			const prevHeight = avatarRef.clientHeight;
			avatarRef.style.width = `${firstWidth * zoom}px`;
			avatarRef.width = firstWidth * zoom;
			avatarRef.style.height = `${firstHeight * zoom}px`;
			avatarRef.height = firstHeight * zoom;
			const widthDiff = avatarRef.clientWidth - prevWidth;
			const heightDiff = avatarRef.clientHeight - prevHeight;
			avatarRef.style.left = `${Number.parseInt(avatarRef.style.left) - widthDiff / 2}px`;
			avatarRef.style.top = `${Number.parseInt(avatarRef.style.top) - heightDiff / 2}px`;
			boundingBox();
		}
	}
	function centerAvatar() {
		if (avatarRef && innerRef) {
			avatarRef.style.left = `${(innerRef.clientWidth - avatarRef.clientWidth) / 2}px`;
			avatarRef.style.top = `${(innerRef.clientHeight - avatarRef.clientHeight) / 2}px`;
		}
	}

	function renderImage() {
		if (avatarRef && cropRef && innerRef && outputRef) {
			const ctx = outputRef.getContext("2d");
			if (!ctx) return;
			ctx.drawImage(
				avatarRef,
				0,
				0,
				avatarRef.width,
				avatarRef.height,
				0,
				0,
				outputRef.width,
				outputRef.height,
			);
		}
	}
	return (
		<div {...stylex.attrs(style.outer)}>
			<Show
				when={avatarUpload()}
				keyed
				fallback={
					<div {...stylex.attrs(style.uploadZone)}>
						<h1>UPLOAD ZONE</h1>
					</div>
				}
			>
				{(avatarUpload) => (
					<div {...stylex.attrs(style.inner)} ref={innerRef}>
						<div ref={cropRef} {...stylex.attrs(style.cropRef)} />
						<img
							draggable={false}
							onMouseDown={(e) => {
								console.log("down");
								isDragging = true;
								startingMouseX = e.screenX;
								startingMouseY = e.screenY;
							}}
							{...stylex.attrs(style.avatar)}
							ref={avatarRef}
							src={URL.createObjectURL(avatarUpload)}
							alt="avatar upload preview"
							onload={(e) => {
								console.log("loaded");
								const aspectRatio = e.currentTarget.width / e.currentTarget.height;
								if (innerRef && cropRef) {
									const cropSize =
										Math.min(innerRef.clientHeight, innerRef.clientWidth) * 0.8;
									cropRef.style.width = `${cropSize}px`;
									cropRef.style.height = `${cropSize}px`;

									cropRef.style.left = `${(innerRef.clientWidth - cropSize) / 2}px`;
									cropRef.style.top = `${(innerRef.clientHeight - cropSize) / 2}px`;

									firstWidth = cropSize * aspectRatio;
									firstHeight = cropSize;

									setAvatarSize();
									centerAvatar();
								}
							}}
						/>

						<input
							{...stylex.attrs(style.slider)}
							type="range"
							min="1"
							max="3"
							step="0.01"
							value={zoom}
							onInput={(e) => {
								zoom = Number.parseFloat(e.currentTarget.value);
								setAvatarSize();
							}}
						/>
					</div>
				)}
			</Show>
			<button type="button" onClick={renderImage}>
				Crop
			</button>
			<canvas {...stylex.attrs(style.output)} ref={outputRef} width={400} height={400} />
		</div>
	);
}
