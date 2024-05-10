import stylex from "@stylexjs/stylex";
import { colors, dimensions } from "../variables.stylex";
import { posts } from "@/MockData";
import { PostList } from "./Post/PostList";
import { Navigation } from "./Navgiation/Navigation";
import { getTokenFromCookie, saveTokenToCookie, useAppState } from "@/AppState";
import { children, createEffect, onMount } from "solid-js";
import { CURRENT_USER_DATA_ENDPOINT } from "@/constants";
import { ResponseGetProfile } from "@/types/responses";
import { ProtoFetch } from "@/ProtoFetch";

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
		display: { default: "block", "@media (max-width: 950px)": "none" },
	},
});

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
			const proto = new ProtoFetch<undefined, ResponseGetProfile>(undefined, ResponseGetProfile);
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

						return;
					}
					AppState.setUserToken(undefined);
					saveTokenToCookie("");
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
			<aside {...stylex.attrs(styles.aside)} />
		</div>
	);
}
