import stylex from "@stylexjs/stylex";
import { Modal } from "../Modal";
import { colors, transitions } from "../../variables.stylex";
import { ResponseSignUpUser } from "@/types/responses";
import { RequestSignUpUser } from "@/types/requests";
import { SIGN_UP_ENDPOINT } from "@/constants";
import { SuccessTransKeys, t, type ErrorTransKeys } from "@/Translation";
import { TbBrandTwitterFilled } from "solid-icons/tb";
import { createEffect, createSignal, Show } from "solid-js";
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
		justifyContent: "flex-start",
		alignItems:"flex-start"
	},
	header: {
		gap: "0.5em",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems:"flex-start"
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

type SignUpModalProps = {
	onOutsideClick: () => void;
};
export function SignUpModal(props: SignUpModalProps) {
	const proto = new ProtoFetch<RequestSignUpUser, ResponseSignUpUser>(RequestSignUpUser, ResponseSignUpUser);
	const [error, setError] = createSignal<ErrorTransKeys | undefined>(undefined);
	const [hasSignedUp, setHasSignedUp] = createSignal(true);

	function onSubmit(
		event: Event & {
			currentTarget: HTMLFormElement;
		},
	) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const passwordRepeat = formData.get("passwordRepeat") as string;
		const username = formData.get("username") as string;
		if (password !== passwordRepeat) {
			setError("passwordRepeat");
			return;
		}

		proto.Query(SIGN_UP_ENDPOINT, {
			method: "POST",
			body: proto.createBody({
				email: email,
				password: password,
				username: username,
			}),
		})
	}
	createEffect(() => {
		console.log("ERROR:",proto.state.error)
		if (proto.state.isSuccess && proto.state.data?.message === ("userRegistered" as SuccessTransKeys)) {
			console.log("success");

			setHasSignedUp(true);
		}
	});
	return (
		<Modal onOutsideClick={props.onOutsideClick}>
			<main {...stylex.attrs(styles.main)}>
				<Show
					when={!hasSignedUp()}
					fallback={
						<>
							<header {...stylex.attrs(styles.header)}>
								<h2 {...stylex.attrs(styles.title)}>
									<TbBrandTwitterFilled />
									{t.auth.signUpSuccessful()}
								</h2>
								<p {...stylex.attrs(styles.paragraph)}>{t.auth.signUpSuccessfulDescription()}</p>
							</header>
					
						</>
					}
				>
					<header {...stylex.attrs(styles.header)}>
						<h2 {...stylex.attrs(styles.title)}>
							<TbBrandTwitterFilled />
							{t.auth.signUp()}
						</h2>
						<p {...stylex.attrs(styles.paragraph)}>{t.auth.signUpDescription()}</p>
					</header>
					<form onsubmit={onSubmit} {...stylex.attrs(styles.form)}>
						<LogInInput
							type="text"
							name="username"
							placeholder={t.auth.usernameExample()}
							label={t.auth.username()}
							disabled={proto.state.isLoading}
						/>
						<LogInInput type="email" name="email" placeholder={t.auth.emailExample()} label={t.auth.email()} disabled={proto.state.isLoading} />

						<LogInInput
							type="password"
							name="password"
							placeholder={t.auth.password()}
							label={t.auth.password()}
							disabled={proto.state.isLoading}
						/>
						<LogInInput
							type="password"
							name="passwordRepeat"
							placeholder={t.auth.password()}
							label={t.auth.passwordRepeat()}
							disabled={proto.state.isLoading}
						/>

						<Show when={proto.state.isError || error() !== undefined || proto.state.error !== undefined}> 
							<span {...stylex.attrs(styles.error)}>
								{
								(t.errors[(proto.state.error !== undefined ? proto.state.error : error()) as ErrorTransKeys]())}
							</span>
						</Show>

						<button disabled={proto.state.isLoading} type="submit" {...stylex.attrs(styles.submit)}>
							<Show when={!proto.state.isLoading} fallback={t.loading()}>
								{t.auth.signUp()}
							</Show>
						</button>
					</form>
				</Show>
			</main>
		</Modal>
	);
}
