import { colors } from "../variables.stylex";
import stylex from "@stylexjs/stylex";
import { type JSXElement, onCleanup, onMount } from "solid-js";

const styles = stylex.create({
	modal: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.5)",
		backdropFilter: "blur(3px)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	main: {
		backgroundColor: colors.background100,
		width: "clamp(320px, 50%, 450px)",
		height: "fit-content",
		minHeight: "300px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.5)",
		borderRadius: "1em",
	},
});

type ModalProps = {
	onOutsideClick: () => void;
	children: JSXElement;
};
export function Modal(props: ModalProps) {
	let dialogRef: HTMLDivElement | undefined;
	function clickOutside(event: MouseEvent) {
		console.log("click");
		if (!dialogRef?.contains(event.target as Node)) {
			console.log("outside");
			props.onOutsideClick();
		}
	}
	onMount(() => {
		document.addEventListener("click", clickOutside);
	});
	onCleanup(() => {
		document.removeEventListener("click", clickOutside);
	});
	return (
		<dialog open {...stylex.attrs(styles.modal)}>
			<div ref={dialogRef} {...stylex.attrs(styles.main)}>
				{props.children}
			</div>
		</dialog>
	);
}
