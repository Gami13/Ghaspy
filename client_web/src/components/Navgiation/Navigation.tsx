import { t } from "@/Translation";
import { colors, dimensions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import { A } from "@solidjs/router";
import {
	IconBell,
	IconBookmark,
	IconCompass,
	IconHome,
	IconMail,
	IconSettings,
	IconUser,
} from "@tabler/icons-solidjs";

const styles = stylex.create({
	nav: {
		flexShrink: 0,
		width: "1px",
		height: "100vh",
		flexGrow: 500,
		maxWidth: dimensions.navMaxWidth,
		backgroundColor: colors.background50,
	},
	navElement: {
		fontSize: "1em",
		display: "flex",
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		color: colors.text900,
		textDecoration: "none",
	},
	navElementWrapper: {
		display: "flex",
		flexDirection: "column",
	},
	navElementIcon: {
		height: "2em",
		width: "2em",
		margin: 0,
	},
	navElementText: {
		fontSize: "2em",
	},
	list: {
		display: "flex",
		flexDirection: "column",
		gap: "1em",
	},
});

export function Navigation() {
	return (
		<nav {...stylex.attrs(styles.nav)}>
			<ol {...stylex.attrs(styles.list)}>
				<li {...stylex.attrs(styles.navElementWrapper)}>
					<A {...stylex.attrs(styles.navElement)} href="/">
						<IconHome {...stylex.attrs(styles.navElementIcon)} />
						<h2 {...stylex.attrs(styles.navElementText)}>{t.nav.home()}</h2>
					</A>
				</li>
				<li {...stylex.attrs(styles.navElementWrapper)}>
					<A {...stylex.attrs(styles.navElement)} href="/">
						<IconCompass {...stylex.attrs(styles.navElementIcon)} />
						<h2 {...stylex.attrs(styles.navElementText)}>{t.nav.explore()}</h2>
					</A>
				</li>
				<li {...stylex.attrs(styles.navElementWrapper)}>
					<A {...stylex.attrs(styles.navElement)} href="/">
						<IconBell {...stylex.attrs(styles.navElementIcon)} />
						<h2 {...stylex.attrs(styles.navElementText)}>{t.nav.alerts()}</h2>
					</A>
				</li>
				<li {...stylex.attrs(styles.navElementWrapper)}>
					<A {...stylex.attrs(styles.navElement)} href="/">
						<IconMail {...stylex.attrs(styles.navElementIcon)} />
						<h2 {...stylex.attrs(styles.navElementText)}>{t.nav.inbox()}</h2>
					</A>
				</li>
				<li {...stylex.attrs(styles.navElementWrapper)}>
					<A {...stylex.attrs(styles.navElement)} href="/">
						<IconBookmark {...stylex.attrs(styles.navElementIcon)} />
						<h2 {...stylex.attrs(styles.navElementText)}>
							{t.nav.bookmarks()}
						</h2>
					</A>
				</li>

				<li {...stylex.attrs(styles.navElementWrapper)}>
					<A {...stylex.attrs(styles.navElement)} href="/">
						<IconUser {...stylex.attrs(styles.navElementIcon)} />
						<h2 {...stylex.attrs(styles.navElementText)}>{t.nav.profile()}</h2>
					</A>
				</li>
				<li {...stylex.attrs(styles.navElementWrapper)}>
					<A {...stylex.attrs(styles.navElement)} href="/">
						<IconSettings {...stylex.attrs(styles.navElementIcon)} />
						<h2 {...stylex.attrs(styles.navElementText)}>{t.nav.settings()}</h2>
					</A>
				</li>
			</ol>
		</nav>
	);
}
