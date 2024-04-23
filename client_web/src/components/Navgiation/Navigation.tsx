import { t } from "@/Translation";
import { colors, dimensions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import {
	IconBell,
	IconBookmark,
	IconCompass,
	IconHome,
	IconMail,
	IconSettings,
	IconUser,
} from "@tabler/Icons-solidjs";
import { NavigationListElement } from "./NavigationListElement";

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
				<NavigationListElement Icon={IconHome} text={t.nav.home()} href="/" />
				<NavigationListElement
					Icon={IconCompass}
					text={t.nav.explore()}
					href="/"
				/>
				<NavigationListElement Icon={IconBell} text={t.nav.alerts()} href="/" />
				<NavigationListElement Icon={IconMail} text={t.nav.inbox()} href="/" />
				<NavigationListElement
					Icon={IconBookmark}
					text={t.nav.bookmarks()}
					href="/"
				/>
				<NavigationListElement
					Icon={IconUser}
					text={t.nav.profile()}
					href="/"
				/>
				<NavigationListElement
					Icon={IconSettings}
					text={t.nav.settings()}
					href="/"
				/>
			</ol>
		</nav>
	);
}
