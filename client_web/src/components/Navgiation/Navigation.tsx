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
import { JSXElement } from "solid-js";

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
				<NavigationListElement
					Icon={IconHome as unknown as () => JSXElement}
					text={t.nav.home()}
					href="/"
				/>
				<NavigationListElement
					Icon={IconCompass as unknown as () => JSXElement}
					text={t.nav.explore()}
					href="/"
				/>
				<NavigationListElement
					Icon={IconBell as unknown as () => JSXElement}
					text={t.nav.alerts()}
					href="/"
				/>
				<NavigationListElement
					Icon={IconMail as unknown as () => JSXElement}
					text={t.nav.inbox()}
					href="/"
				/>
				<NavigationListElement
					Icon={IconBookmark as unknown as () => JSXElement}
					text={t.nav.bookmarks()}
					href="/"
				/>
				<NavigationListElement
					Icon={IconUser as unknown as () => JSXElement}
					text={t.nav.profile()}
					href="/"
				/>
				<NavigationListElement
					Icon={IconSettings as unknown as () => JSXElement}
					text={t.nav.settings()}
					href="/"
				/>
			</ol>
		</nav>
	);
}
