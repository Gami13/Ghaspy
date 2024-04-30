import stylex from "@stylexjs/stylex";
import { Modal } from "../Modal";

const styles = stylex.create({
	form: {},
});

type SignUpModalProps = {
	onOutsideClick: () => void;
};
export function SignUpModal(props: SignUpModalProps) {
	return (
		<Modal onOutsideClick={props.onOutsideClick}>
			<form {...stylex.attrs(styles.form)}>hello</form>
		</Modal>
	);
}
