import { type JSXElement, createContext, createSignal, useContext } from "solid-js";
import type { Locales } from "./Translation";
import { User } from "./types/internal";
import { user0 } from "./MockData";
import { ProtoFetch } from "./ProtoFetch";
import { ResponseLogOutUser } from "./types/responses";
import { LOG_OUT_ENDPOINT } from "./constants";
import { createStore } from "solid-js/store";

export function saveTokenToCookie(token: string) {
	document.cookie = `token=${token}; path=/; max-age=31536000; SameSite=Strict`;
}
export function getTokenFromCookie(): string | undefined {
	const cookies = document.cookie.split("; ");
	const token = cookies.find((cookie) => cookie.startsWith("token="));
	if (token) {
		return token.split("=")[1];
	}
	return undefined;
}

export function logOut() {
	const AppState = useAppState();
	const token = AppState.userToken();
	if (token === undefined) return;
	const proto = new ProtoFetch<undefined, ResponseLogOutUser>(undefined, ResponseLogOutUser);
	console.log("logging out");
	proto
		.Query(LOG_OUT_ENDPOINT, {
			method: "DELETE",
			headers: {
				Authorization: token,
			},
		})
		.then((x) => {
			if (x?.isSuccess) {
				AppState.setUser(User.create({}));
				AppState.setUserToken(undefined);
				saveTokenToCookie("");
			}
		});
}

//TODO: use store instead of signals
const [locale, setLocale] = createSignal<Locales>("en_US");
const [userToken, setUserToken] = createSignal<string | undefined>(undefined);
const [user, setUser] = createStore<User>(User.create({}));

const localeJsFromat = () => {
	const locale = useAppState().locale();
	return locale.replace("_", "-");
};

const ContextValue = {
	isLoggedIn: () => user.username.length > 0,
	locale,
	setLocale,
	localeJsFromat,
	userToken,
	setUserToken,
	user,
	setUser,
};
const AppState = createContext(ContextValue);
export function AppStateProvider(props: {
	children: JSXElement[] | JSXElement;
}) {
	return <AppState.Provider value={ContextValue}>{props.children}</AppState.Provider>;
}
export function useAppState() {
	return useContext(AppState);
}
