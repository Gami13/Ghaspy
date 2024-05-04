import stylex from "@stylexjs/stylex";
import { Modal } from "../Modal";
import { colors, transitions } from "../../variables.stylex";
import { ResponseLogInUser } from "@/types/responses";
import { RequestLogInUser } from "@/types/requests";
import { LOG_IN_ENDPOINT } from "@/constants";
import { t, type ErrorTransKeys } from "@/Translation";
import { TbBrandTwitterFilled } from "solid-icons/tb";
import { saveTokenToCookie, useAppState } from "@/AppState";
import { createEffect, Show } from "solid-js";
import { ProtoFetch } from "@/ProtoFetch";
import { LogInInput } from "./LoginInput";

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

type LogInModalProps = {
	onOutsideClick: () => void;
};
export function LogInModal(props: LogInModalProps) {
	const AppState = useAppState();
	const proto = new ProtoFetch<RequestLogInUser, ResponseLogInUser>(RequestLogInUser, ResponseLogInUser);

	function onSubmit(
		event: Event & {
			currentTarget: HTMLFormElement;
		},
	) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		proto.Query(LOG_IN_ENDPOINT, {
			method: "POST",
			body: proto.createBody({
				email: email,
				password: password,
				deviceName: `web${navigator.userAgent}`,
			}),
		});
	}
	createEffect(() => {
		if (proto.state.isSuccess && proto.state.data?.token) {
			console.log("success");
			saveTokenToCookie(proto.state.data.token);
			AppState.setUserToken(proto.state.data.token);
			console.log(proto.state.data.token);
			props.onOutsideClick();
		}
	});
	return (
		<Modal onOutsideClick={props.onOutsideClick}>
			<main {...stylex.attrs(styles.main)}>
				<header {...stylex.attrs(styles.header)}>
					<h2 {...stylex.attrs(styles.title)}>
						<TbBrandTwitterFilled />
						{t.login.logIn()}
					</h2>
					<p {...stylex.attrs(styles.paragraph)}>{t.login.logInDescription()}</p>
				</header>
				<form onsubmit={onSubmit} {...stylex.attrs(styles.form)}>
					<LogInInput type="email" name="email" placeholder={t.login.emailExample()} label={t.login.email()} disabled={proto.state.isLoading} />
					<LogInInput type="password" name="password" placeholder={t.login.password()} label={t.login.password()} disabled={proto.state.isLoading} />

					<Show when={proto.state.isError}>
						{/* @ts-ignore really dumb and cant narrow type even if you try to */}
						<span {...stylex.attrs(styles.error)}>{ t.errors[proto.state.error]()}</span>
					</Show>

					<button disabled={proto.state.isLoading} type="submit" {...stylex.attrs(styles.submit)}>
						<Show when={!proto.state.isLoading} fallback={t.loading()}>
							{t.login.logIn()}
						</Show>
					</button>
				</form>
			</main>
		</Modal>
	);
}
