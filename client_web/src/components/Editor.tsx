import { getCursorPosition, setCursorPosition } from "@/utils";
import type { StyleXStyles } from "@stylexjs/stylex";
import stylex from "@stylexjs/stylex";
import { type Accessor, createEffect, createSignal, type Setter, Show } from "solid-js";
type Props = {
	contentStyle?: StyleXStyles;
	placeholderStyle?: StyleXStyles;
	placeholder?: string;

	text: Accessor<string>;
	setterText: (value: string) => void;

	setterFiles?: Setter<UploadFile[]>;
};
const DISABLED_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Shift", "Control", "Alt", "Meta"];
const MARKDOWN_KEYS = ["*", "_", "Dead", "`"];
export type UploadFile =
	| string
	| {
			name: string;
			blob?: Blob;
	  };
export function Editor(props: Props) {
	let textarea!: HTMLDivElement;
	const [content, setContent] = createSignal("");

	const [renderPlaceholder, setRenderPlaceholder] = createSignal(true);

	function pasteHandler(e: ClipboardEvent) {
		e.preventDefault();
		if (e.clipboardData === null) return;
		if (!e.clipboardData.files[0]) {
			const text = e.clipboardData.getData("text");

			const selection = window.getSelection();
			if (selection === null) return;
			selection.deleteFromDocument();
			selection.getRangeAt(0).insertNode(document.createTextNode(text));
			selection.collapseToEnd();
			setRenderPlaceholder(false);
		} else {
			if (!props.setterFiles) return;
			for (let i = 0; i < e.clipboardData.files.length; i++) {
				const blob = e.clipboardData.files[i];
				const fileName = blob.name;
				props.setterFiles((files) => [...files, { name: fileName, blob: blob }]);
			}
		}
	}
	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <im smart enough to understand so shut up,i might refactor in the future>
	function typeHandler(e: KeyboardEvent) {
		props.setterText(textarea.innerText);
		setRenderPlaceholder(false);

		if (e.key === "Enter" && e.shiftKey) {
			//newline
		}
		if (e.key === "Enter" && !e.shiftKey) {
			//special enter case???
		} else if (e.key === "Backspace" && textarea.innerText.length < 1) {
			setRenderPlaceholder(true);
		} else if (!(DISABLED_KEYS.includes(e.key) || (e.key === "a" && e.ctrlKey) || (e.key === "v" && e.metaKey))) {
			setRenderPlaceholder(false);

			const sel = window.getSelection();
			if (sel == null) return;
			if (sel.focusNode === null) return;
			const pos = getCursorPosition(textarea, sel.focusNode, sel.focusOffset, { pos: 0, done: false });

			if (sel.focusOffset === 0) pos.pos += 0.5;

			if (MARKDOWN_KEYS.includes(e.key) || e.key === "Backspace") {
				if (sel.focusOffset === 0) pos.pos += 0.5;
				setContent(textarea.innerText);
				//TODO:Add special formatting features markDownPreserve equivalent
				// setEditor(format(textarea.innerText));

				sel.removeAllRanges();
				const range = setCursorPosition(textarea, document.createRange(), {
					pos: pos.pos,
					done: false,
				});
				//SHUT UP TS
				// @ts-ignore
				range.collapse(true);
				// @ts-ignore
				sel.addRange(range);
			} else if (textarea.innerText.length < 1) setRenderPlaceholder(true);
		}
	}
	createEffect(() => {
		if (props.text().length === 0) {
			setContent("");
			textarea.innerText = "";
			setRenderPlaceholder(true);
		}
	});

	return (
		<>
			<Show when={renderPlaceholder()}>
				<span {...stylex.attrs(props.placeholderStyle)}>{props.placeholder}</span>
			</Show>
			<div
				onfocus={() => {
					setRenderPlaceholder(false);
				}}
				onblur={() => {
					if (textarea.innerText.length < 1) {
						setRenderPlaceholder(true);
					}
				}}
				contentEditable={true}
				// @ts-ignore
				onInput={typeHandler}
				ref={textarea}
				role="textbox"
				aria-multiline="true"
				spellcheck={true}
				aria-autocomplete="list"
				onPaste={pasteHandler}
				{...stylex.attrs(props.contentStyle)}
			>
				{content()}
			</div>
		</>
	);
}
