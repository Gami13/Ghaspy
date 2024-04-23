import { t } from "@/Translation";
import { colors, dimensions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";

import { NavigationListElement } from "./NavigationListElement";

import { TbBell, TbBookmark, TbCompass, TbHome, TbMail, TbSettings, TbUser } from "solid-icons/tb";
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
	return (
		<nav {...stylex.attrs(styles.nav)}>
			<h1> LOGOHERE </h1>
			<ol {...stylex.attrs(styles.list)}>
				<NavigationListElement Icon={TbHome} text={t.nav.home()} href="/" />
				<NavigationListElement Icon={TbCompass} text={t.nav.explore()} href="/" />
				<NavigationListElement Icon={TbBell} text={t.nav.alerts()} href="/" />
				<NavigationListElement Icon={TbMail} text={t.nav.inbox()} href="/" />
				<NavigationListElement Icon={TbBookmark} text={t.nav.bookmarks()} href="/" />
				<NavigationListElement Icon={TbUser} text={t.nav.profile()} href="/" />
				<NavigationListElement Icon={TbSettings} text={t.nav.settings()} href="/" />
			</ol>
		</nav>
	);
}
