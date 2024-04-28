import {
	type JSXElement,
	createContext,
	createSignal,
	useContext,
} from "solid-js";
import type { Locale } from "./Translation";
import type { User } from "./types/internal";
import { user0 } from "./MockData";

export function saveTokenToCookie(token: string) {
	document.cookie = `token=${token}; path=/; max-age=31536000`;
}
export function getTokenFromCookie(): string | undefined {
	const cookies = document.cookie.split("; ");
	const token = cookies.find((cookie) => cookie.startsWith("token="));
	if (token) {
		return token.split("=")[1];
	}
	return undefined;
}

//TODO: use store instead of signals
const [locale, setLocale] = createSignal<Locale>("en_US");
const [userToken, setUserToken] = createSignal<string | undefined>(undefined);
const [user, setUser] = createSignal<User | undefined>(undefined);

const localeJsFromat = () => {
	const locale = useAppState().locale();
	return locale.replace("_", "-");
};

const ContextValue = {
	isLoggedIn: () => userToken() !== undefined,
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
	return (
		<AppState.Provider value={ContextValue}>{props.children}</AppState.Provider>
	);
}
export function useAppState() {
	return useContext(AppState);
}
