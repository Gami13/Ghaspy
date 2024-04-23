import { type JSXElement, createContext, createSignal, useContext } from "solid-js";
import type { Locale } from "./Translation";
import type { User } from "./types/internal";
import { user0 } from "./MockData";

//TODO: use store instead of signals
const [locale, setLocale] = createSignal<Locale>("en_US");
const [userToken, setUserToken] = createSignal<string>("");
const [user, setUser] = createSignal<User | undefined>(user0);

const localeJsFromat = () => {
	const locale = useAppState().locale();
	return locale.replace("_", "-");
};

const ContextValue = {
	isLoggedIn: () => user() !== undefined,
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
