import { JSXElement, createContext, createSignal, useContext } from 'solid-js';
import { Locale } from './Translation';

const [isLoggedIn, setIsLoggedIn] = createSignal(false);
const [locale, setLocale] = createSignal<Locale>('pl_PL');
const [userToken, setUserToken] = createSignal<string | undefined>(undefined); // TODO: [userToken, setUserToken] = [null, null
const [userName, setUserName] = createSignal<string | undefined>(undefined);
const [userDisplayName, setUserDisplayName] = createSignal<string | undefined>(undefined);
const [userAvatar, setUserAvatar] = createSignal<string | undefined>(undefined);
const [userBanner, setUserBanner] = createSignal<string | undefined>(undefined);
const [userBio, setUserBio] = createSignal<string | undefined>(undefined);
const [userId, setUserId] = createSignal<string | undefined>(undefined);

const localeJsFromat = () => {
	const locale = useAppState().locale();
	return locale.replace('_', '-');
};

const ContextValue = {
	isLoggedIn,
	setIsLoggedIn,
	locale,
	setLocale,
	localeJsFromat,
	userToken,
	setUserToken,
	userName,
	setUserName,
	userDisplayName,
	setUserDisplayName,
	userAvatar,
	setUserAvatar,
	userBanner,
	setUserBanner,
	userBio,
	setUserBio,
	userId,
	setUserId,
};
const AppState = createContext(ContextValue);
export function AppStateProvider(props: { children: JSXElement[] | JSXElement }) {
	return <AppState.Provider value={ContextValue}>{props.children}</AppState.Provider>;
}
export function useAppState() {
	return useContext(AppState);
}
