import { t } from "@/Translation";
import { colors, dimensions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";

import { NavigationListLink } from "./NavigationListLink";

import { TbBell, TbBookmark, TbCompass, TbDoorExit, TbHome, TbLock, TbMail, TbSettings, TbUser } from "solid-icons/tb";
import { createSignal, Show } from "solid-js";
import { logOut, useAppState } from "@/AppState";
import { NavigationListButton } from "./NavigationListButton";
import { Portal } from "solid-js/web";
import { LogInModal } from "./LogInModal";
import { SignUpModal } from "./SignUpModal";
const styles = stylex.create({
	nav: {
		flexShrink: 0,
		width: "1px",
		height: "100vh",
		flexGrow: 500,
		minWidth: "75px",
		maxWidth: dimensions.navMaxWidth,
		backgroundColor: colors.background50,
		padding: { default: "0.75em", "@media (max-width: 900px)": "0.75em 0" },

		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
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
	navElementWrapper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	navElementIcon: {
		height: "2em",
		width: "2em",
		aspectRatio: "1/1",
		margin: 0,
	},
	navElementText: {
		fontSize: "1.5em",
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
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	settings: {
		position: "absolute",

		height: "fit-content",
		width: "fit-content",
		bottom: 0,
	},
	currentPageIconColor: {},
});

export function Navigation() {
	const AppState = useAppState();
	const [isLoggingIn, setIsLoggingIn] = createSignal(false);
	const [isSigningUp, setIsSigningUp] = createSignal(false);
	return (
		<nav {...stylex.attrs(styles.nav)}>
			<h1 {...stylex.attrs(styles.logo)}>G</h1>
			<ol {...stylex.attrs(styles.list)}>
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
					<NavigationListLink Icon={TbBookmark} text={t.nav.bookmarks()} href="/" />
					<NavigationListLink Icon={TbUser} text={t.nav.profile()} href={`/${AppState.user.username}`} />
					<NavigationListButton
						Icon={TbDoorExit}
						text={t.nav.logOut()}
						onClick={() => {
							console.log("starting");
							logOut();
						}}
					/>
				</Show>

				<NavigationListLink Icon={TbSettings} {...stylex.attrs(styles.settings)} text={t.nav.settings()} href="/" />
				<button type="button" onClick={() => AppState.setLocale("pl_PL")}>
					pl_PL
				</button>
				<button type="button" onClick={() => AppState.setLocale("en_US")}>
					en_US
				</button>
			</ol>
		</nav>
	);
}
