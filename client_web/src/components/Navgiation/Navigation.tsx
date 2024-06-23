import { colors, dimensions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";

import { NavigationListLink } from "./NavigationListLink";

import { TbBell, TbBookmark, TbCompass, TbDoorExit, TbHome, TbLock, TbMail, TbSettings, TbUser } from "solid-icons/tb";
import { createSignal, Show } from "solid-js";
import { saveTokenToCookie, useAppState } from "@/AppState";
import { NavigationListButton } from "./NavigationListButton";
import { Portal } from "solid-js/web";
import { LogInModal } from "./LogInModal";
import { SignUpModal } from "./SignUpModal";
import { A } from "@solidjs/router";
import { Logo } from "../Logo";
import { useTrans } from "@/Translation";
import { LOG_OUT_ENDPOINT } from "@/constants";
import { ProtoFetch } from "@/ProtoFetch";
import { User } from "@/types/internal";
const styles = stylex.create({
	nav: {
		display: "flex",
		flexShrink: 0,
		width: "1px",
		height: "100vh",
		flexGrow: 500,
		minWidth: "75px",
		maxWidth: dimensions.navMaxWidth,
		backgroundColor: colors.background50,
		padding: { default: "0.75em", "@media (max-width: 900px)": "0.75em 0" },

		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: { default: "flex-start", "@media (max-width: 900px)": "center" },

		overflowY: "auto",
	},
	navElement: {
		fontSize: "1em",
		display: "flex",
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		color: colors.text900,
		textDecoration: "none",
		gap: "0.5em",
	},

	list: {
		display: "flex",
		flexDirection: "column",
		gap: "1em",
		padding: { default: "0.5em", "@media (max-width: 900px)": "0.5em 0" },
		height: "100%",

		// width: 0,
	},
	logo: {
		paddingLeft: { default: "0.5em", "@media (max-width: 900px)": "0px" },
		width: "100%",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		textDecoration: "none",
		gap: "0.5em",
	},
	settings: {
		position: "absolute",

		height: "fit-content",
		width: "fit-content",
		bottom: 0,
	},
	currentPageIconColor: {},
	navLogo: {
		width: "4em",
		height: "4em",
	},
	logoText: {
		color: colors.text950,
		fontSize: "2em",
		display: { default: "block", "@media (max-width: 900px)": "none" },
	},
});

export function Navigation() {
	const AppState = useAppState();
	const t = useTrans();
	const [isLoggingIn, setIsLoggingIn] = createSignal(false);
	const [isSigningUp, setIsSigningUp] = createSignal(false);
	function logOut() {
		const proto = new ProtoFetch(LOG_OUT_ENDPOINT);
		console.log("logging out");
		proto.Query().then((x) => {
			if (x?.isSuccess) {
				AppState.setUser(User.create({}));
				AppState.setUserToken(undefined);
				saveTokenToCookie("");
			}
		});
	}

	return (
		<nav {...stylex.attrs(styles.nav)}>
			<ol {...stylex.attrs(styles.list)}>
				<A href="/" {...stylex.attrs(styles.logo)}>
					<Logo stylex={styles.navLogo} />
					<h1 {...stylex.attrs(styles.logoText)}>Ghaspy</h1>
				</A>
				<NavigationListLink Icon={TbHome} text={t.nav.home()} href="/" />
				<NavigationListLink Icon={TbCompass} text={t.nav.explore()} href="/" />
				<Show when={isLoggingIn()}>
					<Portal>
						<LogInModal
							onOutsideClick={() => {
								setIsLoggingIn(false);
							}}
						/>
					</Portal>
				</Show>
				<Show when={isSigningUp()}>
					<Portal>
						<SignUpModal
							onOutsideClick={() => {
								setIsSigningUp(false);
							}}
						/>
					</Portal>
				</Show>
				<Show
					when={AppState.isLoggedIn()}
					fallback={
						<>
							<NavigationListButton
								Icon={TbUser}
								text={t.nav.logIn()}
								onClick={() => {
									setIsLoggingIn(true);
								}}
							/>
							<NavigationListButton
								Icon={TbLock}
								text={t.nav.signUp()}
								onClick={() => {
									setIsSigningUp(true);
								}}
							/>
						</>
					}
				>
					<NavigationListLink Icon={TbBell} text={t.nav.alerts()} href="/" />
					<NavigationListLink Icon={TbMail} text={t.nav.inbox()} href="/" />
					<NavigationListLink Icon={TbBookmark} text={t.nav.bookmarks()} href="/bookmarks" />
					<NavigationListLink Icon={TbUser} text={t.nav.profile()} href={`/${AppState.user.username}`} />
					<NavigationListLink Icon={TbSettings} {...stylex.attrs(styles.settings)} text={t.nav.settings()} href="/" />
					<NavigationListButton
						Icon={TbDoorExit}
						text={t.nav.logOut()}
						onClick={() => {
							console.log("starting");
							logOut();
						}}
					/>
				</Show>
			</ol>
		</nav>
	);
}
