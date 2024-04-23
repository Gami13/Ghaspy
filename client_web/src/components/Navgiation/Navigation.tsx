import { t } from "@/Translation";
import { colors, dimensions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";

import { NavigationListElement } from "./NavigationListElement";

import { TbBell, TbBookmark, TbCompass, TbHome, TbLock, TbMail, TbSettings, TbUser } from "solid-icons/tb";
import { Show } from "solid-js";
import { useAppState } from "@/AppState";
const styles = stylex.create({
	nav: {
		flexShrink: 0,
		width: "1px",
		height: "100vh",
		flexGrow: 500,
		maxWidth: dimensions.navMaxWidth,
		backgroundColor: colors.background50,
		padding: "1.2em",
	},

	list: {
		display: "flex",
		flexDirection: "column",
		gap: "1.5em",
	},
});

export function Navigation() {
	const AppState = useAppState();
	return (
		<nav {...stylex.attrs(styles.nav)}>
			<h1> LOGOHERE </h1>
			<ol {...stylex.attrs(styles.list)}>
				<NavigationListElement Icon={TbHome} text={t.nav.home()} href="/" />
				<NavigationListElement Icon={TbCompass} text={t.nav.explore()} href="/" />

				<Show
					when={AppState.isLoggedIn()}
					fallback={
						<>
							<NavigationListElement Icon={TbUser} text={t.nav.logIn()} href="/login" />
							<NavigationListElement Icon={TbLock} text={t.nav.signUp()} href="/signup" />
						</>
					}
				>
					<NavigationListElement Icon={TbBell} text={t.nav.alerts()} href="/" />
					<NavigationListElement Icon={TbMail} text={t.nav.inbox()} href="/" />
					<NavigationListElement Icon={TbBookmark} text={t.nav.bookmarks()} href="/" />
					<NavigationListElement Icon={TbUser} text={t.nav.profile()} href="/" />
				</Show>

				<NavigationListElement Icon={TbSettings} text={t.nav.settings()} href="/" />
			</ol>
		</nav>
	);
}
