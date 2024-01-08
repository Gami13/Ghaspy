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
const [userFollowersCount, setUserFollowersCount] = createSignal<number | undefined>(undefined);
const [userFollowingCount, setUserFollowingCount] = createSignal<number | undefined>(undefined);
const [userPostsCount, setUserPostsCount] = createSignal<number | undefined>(undefined);
const [userLikesCount, setUserLikesCount] = createSignal<number | undefined>(undefined);
const [userIsFollowersPublic, setUserIsFollowersPublic] = createSignal<boolean | undefined>(undefined);
const [userIsFollowingPublic, setUserIsFollowingPublic] = createSignal<boolean | undefined>(undefined);
const [userIsPostsPublic, setUserIsPostsPublic] = createSignal<boolean | undefined>(undefined);
const [userIsLikesPublic, setUserIsLikesPublic] = createSignal<boolean | undefined>(undefined);

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
	userFollowersCount,
	setUserFollowersCount,
	userFollowingCount,
	setUserFollowingCount,
	userPostsCount,
	setUserPostsCount,
	userLikesCount,
	setUserLikesCount,
	userIsFollowersPublic,
	setUserIsFollowersPublic,
	userIsFollowingPublic,
	setUserIsFollowingPublic,
	userIsPostsPublic,
	setUserIsPostsPublic,
	userIsLikesPublic,
	setUserIsLikesPublic,
};
const AppState = createContext(ContextValue);
export function AppStateProvider(props: { children: JSXElement[] | JSXElement }) {
	return <AppState.Provider value={ContextValue}>{props.children}</AppState.Provider>;
}
export function useAppState() {
	return useContext(AppState);
}
