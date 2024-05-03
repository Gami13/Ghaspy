import stylex from "@stylexjs/stylex";
import { Modal } from "../Modal";
import { colors, transitions } from "../../variables.stylex";
import { useAppState } from "@/AppState";
import { ProtoFetch } from "@/ProtoFetch";
import { ResponseLogInUser } from "@/types/responses";

import { LOG_IN_ENDPOINT } from "@/constants";
import { RequestLogInUser } from "@/types/requests";
import { onMount } from "solid-js";

const styles = stylex.create({
	main: {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		color: colors.text950,
		padding: "2em",
		gap: "1.5em",
	},
	header: {
		gap: "0.5em",
		display: "flex",
		flexDirection: "column",
	},
	title: {
		display: "flex",
		gap: "0.25em",
		alignItems: "center",
	},
	paragraph: {
		color: colors.text700,
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "1.25em",
	},

	label: {
		display: "flex",
		flexDirection: "column",
		gap: "0.25em",
		width: "100%",
	},
	input: {
		outline: "none",
		padding: "0.5em",
		paddingHorizontal: "1em",
		borderRadius: "0.5em",
		border: "none",
		backgroundColor: {
			default: colors.background200,
			":disabled": colors.background300,
		},

		color: {
			default: colors.text950,
			":disabled": colors.text500,
		},
		cursor: {
			":disabled": "not-allowed",
		},
	},
	submit: {
		fontWeight: 700,
		fontSize: "1.1em",
		height: "2.5em",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		verticalAlign: "middle",
		backgroundColor: {
			default: colors.primary500,
			":hover": colors.primary600,
			":disabled": colors.background300,
			":hover:disabled": colors.background300,
		},
		transitionDuration: transitions.duration,
		transitionTimingFunction: transitions.timing,
		border: "none",
		width: "100%",
		padding: "0.5em 1.25em",
		borderRadius: "0.5em",
		cursor: {
			default: "pointer",
			":disabled": "not-allowed",
		},
		color: {
			default: colors.text950,
			":disabled": colors.text500,
		},

		lineHeight: 1,
	},
	error: {
		color: colors.textError,
	},
});

type SignUpModalProps = {
	onOutsideClick: () => void;
};
export function SignUpModal(props: SignUpModalProps) {
	const AppState = useAppState();

	const proto = new ProtoFetch<RequestLogInUser, ResponseLogInUser>(RequestLogInUser, ResponseLogInUser);
	onMount(() => {
		proto.Query(LOG_IN_ENDPOINT, {
			method: "POST",
			body: proto.createBody({
					email: "gamiofficial0@gmail.com",
					password: "Haslo123",
					deviceName: `web${navigator.userAgent}`,
				})
		
		});
	});
	return (
		<Modal onOutsideClick={props.onOutsideClick}>
			<main {...stylex.attrs(styles.main)}>
				<p>{JSON.stringify(proto.state)}</p>
			</main>
		</Modal>
	);
}
