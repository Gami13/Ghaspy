import {
	type Accessor,
	type JSXElement,
	type Setter,
	createContext,
	createSignal,
	useContext,
} from "solid-js";
import type { Locales } from "./Translation";
import { User } from "./types/internal";
import { createStore, type SetStoreFunction } from "solid-js/store";
type AppStateType = {
	isLoggedIn: () => boolean;
	locale: Accessor<Locales>;
	setLocale: Setter<Locales>;
	userToken: Accessor<string | undefined>;
	setUserToken: Setter<string | undefined>;
	user: User;
	setUser: SetStoreFunction<User>;
	scrollPostition: Accessor<number>;
	setScrollPosition: Setter<number>;
};
const AppState = createContext<AppStateType>();

export function AppStateProvider(props: {
	children: JSXElement[] | JSXElement;
}) {
	const [locale, setLocale] = createSignal<Locales>("pl-PL");
	const [userToken, setUserToken] = createSignal<string | undefined>(undefined);
	const [user, setUser] = createStore<User>(User.create({}));
	const [scrollPostition, setScrollPosition] = createSignal(0);

	const ContextValue = {
		isLoggedIn: () => user.username.length > 0,
		locale,
		setLocale,
		userToken,
		setUserToken,
		user,
		setUser,
		scrollPostition,
		setScrollPosition,
	};
	return <AppState.Provider value={ContextValue}>{props.children}</AppState.Provider>;
}
export function useAppState() {
	const context = useContext(AppState);
	if (!context) {
		throw new Error("useAppState must be used within an AppStateProvider");
	}
	return context;
}

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
