import stylex from "@stylexjs/stylex";
import { colors, dimensions } from "../variables.stylex";
import { Navigation } from "./Navgiation/Navigation";
import { getTokenFromCookie, useAppState } from "@/AppState";
import { children, createEffect, onMount } from "solid-js";
import { CURRENT_USER_DATA_ENDPOINT } from "@/constants";
import { ResponseGetProfile } from "@/types/responses";
import { ProtoFetch } from "@/ProtoFetch";
import type { Locales } from "@/Translation";

const styles = stylex.create({
	wrapper: {
		height: "100vh",
		width: "100%",

		display: "flex",
		gridTemplateColumns: "4fr 6fr 4fr",
		maxWidth: `calc(${dimensions.navMaxWidth} + ${dimensions.postsMaxWidth} + ${dimensions.asideMaxWidth})`,
	},
	aside: {
		width: "1px",
		height: "100vh",
		flexGrow: 120,
		maxWidth: dimensions.asideMaxWidth,
		backgroundColor: colors.background50,
		display: { default: "flex", "@media (max-width: 950px)": "none" },
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center",
		gap: "1em",
	},
	asideBtn: {
		width: "50%",
		height: "2.5em",
		backgroundColor: colors.background100,
		color: colors.text900,
		border: `1px solid ${colors.text900}`,
		borderRadius: "1em",
		cursor: "pointer",
	},
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function NavWrapper(props: any) {
	const c = children(() => props.children);
	const AppState = useAppState();
	onMount(() => {
		const token = getTokenFromCookie();
		if (token) {
			console.log("TOKEN", token);
			AppState.setUserToken(token);
		}
	});
	createEffect(() => {
		if (AppState.userToken()) {
			const proto = new ProtoFetch<undefined, ResponseGetProfile>(
				undefined,
				ResponseGetProfile,
			);
			proto
				.Query(CURRENT_USER_DATA_ENDPOINT, {
					method: "GET",
					headers: {
						// biome-ignore lint/style/noNonNullAssertion: <didnt wanna do it other way>
						Authorization: AppState.userToken()!,
					},
				})
				.then((data) => {
					if (data?.isSuccess && data.data?.profile !== undefined) {
						AppState.setUser(data.data.profile);
						AppState.setLocale(data.data.profile.prefferedLanguage as Locales);
						console.log("USER", data.data.profile.prefferedLanguage);
						//!TYPE IS MISSING PREFFERED LANGUAGE
						//TODO: ADD TYPE
						return;
					}
					AppState.setUserToken(undefined);
					// saveTokenToCookie("");
					alert("TODO: You have been logged out due to an invalid token");
				})
				.catch((err) => {
					console.log("ERR", err);
				});
		}
	});

	return (
		<div {...stylex.attrs(styles.wrapper)}>
			<Navigation />
			{c()}
			<aside {...stylex.attrs(styles.aside)}>
				<button
					{...stylex.attrs(styles.asideBtn)}
					type="button"
					onClick={() => AppState.setLocale("pl_PL")}
				>
					pl_PL
				</button>
				<button
					{...stylex.attrs(styles.asideBtn)}
					type="button"
					onClick={() => AppState.setLocale("en_US")}
				>
					en_US
				</button>
			</aside>
		</div>
	);
}
