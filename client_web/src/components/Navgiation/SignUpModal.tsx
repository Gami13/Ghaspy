import stylex from "@stylexjs/stylex";
import { Modal } from "../Modal";
import { colors, transitions } from "../../variables.stylex";
import { createMutation, createQuery } from "@tanstack/solid-query";
import { ResponseError, ResponsesignUpUser } from "@/types/responses";
import { RequestSignUpUser } from "@/types/requests";
import { createStore, produce } from "solid-js/store";
import { SIGN_UP_ENDPOINT } from "@/constants";
import { t, type SignUpTransKeysT } from "@/Translation";
import { TbBrandTwitter, TbBrandTwitterFilled } from "solid-icons/tb";
import { saveTokenToCookie, useAppState } from "@/AppState";
import { Show } from "solid-js";

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

type RequestStatus = {
	isLoading: boolean;
	isError: boolean;
	error: SignUpTransKeysT | undefined;
	isSuccess: boolean;
};

type signUpModalProps = {
	onOutsideClick: () => void;
};
export function signUpModal(props: signUpModalProps) {
	const AppState = useAppState();
	const [status, setStatus] = createStore<RequestStatus>({
		isLoading: false,
		isError: false,
		error: undefined,
		isSuccess: false,
	});
	async function onSubmit(
		event: Event & {
			currentTarget: HTMLFormElement;
		},
	) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		setStatus("isLoading", true);

		const body = RequestSignUpUser.encode(
			RequestSignUpUser.create({
				email,
				password,
				deviceName: `web${navigator.userAgent}`,
			}),
		).finish();
		console.log("fetching");
		const response = await fetch(SIGN_UP_ENDPOINT, {
			method: "POST",
			body: body,
		});
		console.log("fetched");
		const data = new Uint8Array(await response.arrayBuffer());
		if (!response.ok) {
			console.log("error");
			const error = ResponseError.decode(data);
			setStatus(
				produce((status: RequestStatus) => {
					status.isLoading = false;
					status.isError = true;
					status.error = error.message as SignUpTransKeysT;
				}),
			);
			return;
		}
		console.log("success");
		const success = ResponsesignUpUser.decode(data);
		setStatus(
			produce((status: RequestStatus) => {
				status.isLoading = false;
				status.isSuccess = true;
			}),
		);
		//TODO: use success
		AppState.setUserToken(success.token);

		saveTokenToCookie(success.token);
		props.onOutsideClick();
	}

	return (
		<Modal onOutsideClick={props.onOutsideClick}>
			<main {...stylex.attrs(styles.main)}>
				<header {...stylex.attrs(styles.header)}>
					<h2 {...stylex.attrs(styles.title)}>
						<TbBrandTwitterFilled />
						{t.signUp.signUp()}
					</h2>
					<p {...stylex.attrs(styles.paragraph)}>{t.signUp.description()}</p>
				</header>
				<form onsubmit={onSubmit} {...stylex.attrs(styles.form)}>
					<label for="email" {...stylex.attrs(styles.label)}>
						{t.signUp.email()}
						<input
							disabled={status.isLoading}
							type="email"
							name="email"
							id="email"
							{...stylex.attrs(styles.input)}
							placeholder={t.signUp.emailExample()}
						/>
					</label>

					<label for="password" {...stylex.attrs(styles.label)}>
						{t.signUp.password()}
						<input
							disabled={status.isLoading}
							type="password"
							id="password"
							name="password"
							{...stylex.attrs(styles.input)}
							placeholder={t.signUp.password()}
						/>
					</label>
					{/* TODO: STYLE ERROR */}
					<Show when={status.isError}>
						<span {...stylex.attrs(styles.error)}>
							{t.authErrors[status.error as SignUpTransKeysT]()}
						</span>
					</Show>

					<button
						disabled={status.isLoading}
						type="submit"
						{...stylex.attrs(styles.submit)}
					>
						<Show when={!status.isLoading} fallback={t.loading()}>
							{t.signUp.signUp()}
						</Show>
					</button>
				</form>
			</main>
		</Modal>
	);
}