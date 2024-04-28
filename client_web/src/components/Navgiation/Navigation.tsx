import { t } from "@/Translation";
import { colors, dimensions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";

import { NavigationListLink } from "./NavigationListLink";

import {
	TbBell,
	TbBookmark,
	TbCompass,
	TbHome,
	TbLock,
	TbMail,
	TbSettings,
	TbUser,
} from "solid-icons/tb";
import { createSignal, Show } from "solid-js";
import { useAppState } from "@/AppState";
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
		maxWidth: dimensions.navMaxWidth,
		backgroundColor: colors.background50,
		padding: "0.75em",
	},

	list: {
		display: "flex",
		flexDirection: "column",
		gap: "0.25em",
	},
});

export function Navigation() {
	const AppState = useAppState();
	const [isLoggingIn, setIsLoggingIn] = createSignal(false);
	const [isSigningUp, setIsSigningUp] = createSignal(false);
	return (
		<nav {...stylex.attrs(styles.nav)}>
			<h1> LOGOHERE </h1>
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
					<NavigationListLink
						Icon={TbBookmark}
						text={t.nav.bookmarks()}
						href="/"
					/>
					<NavigationListLink Icon={TbUser} text={t.nav.profile()} href="/" />
				</Show>

				<NavigationListLink
					Icon={TbSettings}
					text={t.nav.settings()}
					href="/"
				/>
			</ol>
		</nav>
	);
}
