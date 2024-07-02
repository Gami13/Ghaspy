import type { User } from "@/types/internal";
import { colors, dimensions, transitions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import { formatDateNoTime, formatNumber, useTrans } from "@/Translation";
import { UserAvatar } from "./UserAvatar";
import { UserBanner } from "./UserBanner";
import { TbLink } from "solid-icons/tb";
import { Show } from "solid-js";
import type { Params } from "@solidjs/router";
import { getDisplayName } from "@/utils";

const styles = stylex.create({
	bio: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
	},
	buttons: {
		display: "flex",
		flexDirection: "row",
		gap: "0.65em",
		padding: "0.5em",
		justifyContent: "flex-end",
		minHeight: "3.75em",
		alignItems: "center",
	},

	banner: {
		width: "100%",
		height: "200px",
		objectFit: "cover",
		backgroundColor: colors.secondary500,
	},
	avatar: {
		width: "8em",
		height: "8em",
		borderRadius: "50%",
		position: "absolute",
		left: "1em",
		transform: "translateY(-25%)",
		positoin: "relative",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary500,

		borderColor: colors.background50,
		borderWidth: "0.3em",
		borderStyle: "solid",
	},
	buttonsIcons: {
		cursor: "pointer",
		height: "2.5em",
		width: "2.5em",
		fontWeight: "bold",
		borderRadius: "50%",
		borderColor: colors.accent500,
		borderWidth: "0.1em",
		borderStyle: "solid",
		padding: "0.5em",
		color: colors.accent500,
	},
	followBtn: {
		cursor: "pointer",
		backgroundColor: colors.primary500,
		color: colors.text950,
		borderRadius: "1em",
		letterSpacing: "0.1em",
		padding: "0.5em 1.25em",
		fontWeight: "bold",
		transitionDuration: transitions.duration,
		transitionTimingFunction: transitions.timing,
		userSelect: "none",
		":hover": {
			backgroundColor: colors.primary600,
		},
	},
	names: {
		display: "flex",
		gap: "0.1em",
		flexDirection: "column",
		justifyContent: "center",
	},
	highlight: {
		fontSize: "1em",
		color: "#71767b",
		fontWeight: 300,
	},
	displayName: {
		fontSize: "1.3em",
		fontWeight: 700,
	},
	description: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5em",
		padding: "0.5em",
		backgroundColor: colors.background50,
		borderRadius: "1em",
		overflow: "hidden",
	},
	stats: {
		display: "flex",
		gap: "1em",
		flexDirection: "row",
	},
	statNum: {
		backgroundColor: colors.background100,
		borderRadius: "0.5em",
		padding: "0.25em 0.5em",
		fontSize: "0.9em",
	},
	followedBySomeone: {
		borderRadius: "0.5em",
		padding: "0.25em 0.5em",
		fontSize: "0.9em",
		textAlign: "center",
		color: colors.text300,
	},
});
type UserProfileHeaderProps = {
	profile: User;
	params: Params;
	startEditing: () => void;
};
export function UserProfileHeader(props: UserProfileHeaderProps) {
	const t = useTrans();
	return (
		<section>
			<UserBanner user={props.profile} {...stylex.attrs(styles.banner)} />

			<div {...stylex.attrs(styles.bio)}>
				<div {...stylex.attrs(styles.buttons)}>
					<UserAvatar user={props.profile} styles={styles.avatar} />
					<button
						type="button"
						title={t.profile.copyLink()}
						onclick={() => {
							navigator.clipboard.writeText(window.location.href);
							//TODO: Add a toast to show that the link has been copied
						}}
					>
						{/* @ts-ignore */}
						<TbLink {...stylex.attrs(styles.buttonsIcons)} />
					</button>
					{/*NOT IMPLEMENTED YET*/}

					{/*<button type="button" title={t.profile.report()}>
											@ts-ignore
											<TbHammer {...stylex.attrs(styles.buttonsIcons)} />
										</button> */}
					{/* <button type="button" title={t.profile.block()}>
										
											<TbShield {...stylex.attrs(styles.buttonsIcons)} />
										</button> */}
					{/* <button type="button" title={t.profile.message()}>
											
											<TbMessage {...stylex.attrs(styles.buttonsIcons)} />
										</button> */}
					<Show
						when={!props.profile.isYourProfile}
						fallback={
							<button
								type="button"
								{...stylex.attrs(styles.followBtn)}
								onclick={() => {
									window.history.pushState(
										{},
										"",
										`/${props.params.username}?t=editing`,
									);
									props.startEditing();
								}}
							>
								{t.profile.edit()}
							</button>
						}
					>
						<Show when={props.profile.isFollowingYou && !props.profile.isFollowedByYou}>
							<button type="button" {...stylex.attrs(styles.followBtn)}>
								{t.profile.followBack()}
							</button>
						</Show>
						<Show when={props.profile.isFollowedByYou}>
							<button type="button" {...stylex.attrs(styles.followBtn)}>
								{t.profile.unfollow()}
							</button>
						</Show>
						<button type="button" {...stylex.attrs(styles.followBtn)}>
							{t.profile.follow()}
						</button>
					</Show>
				</div>
				<ol {...stylex.attrs(styles.description)}>
					<li {...stylex.attrs(styles.names)}>
						<h2 {...stylex.attrs(styles.displayName)}>
							{getDisplayName(props.profile)}
						</h2>
						<h3 {...stylex.attrs(styles.highlight)}>@{props.profile.username}</h3>
					</li>
					<li>
						<p>{props.profile.bio}</p>
					</li>
					<li>
						<h3 {...stylex.attrs(styles.highlight)}>
							{t.profile.joinedAt({
								date: formatDateNoTime(props.profile.joinedAt as string),
							})}
						</h3>
					</li>
					<li {...stylex.attrs(styles.stats)}>
						<h5>
							<span {...stylex.attrs(styles.statNum)}>
								{formatNumber(props.profile.countFollowing)}
							</span>
							<span {...stylex.attrs(styles.highlight)}>
								{t.profile.followingCount()}
							</span>
						</h5>
						<h5>
							<span {...stylex.attrs(styles.statNum)}>
								{formatNumber(props.profile.countFollowers)}
							</span>
							<span {...stylex.attrs(styles.highlight)}>
								{t.profile.followersCount()}
							</span>
						</h5>
						<h5>
							<span {...stylex.attrs(styles.statNum)}>
								{formatNumber(props.profile.countLikes)}
							</span>
							<span {...stylex.attrs(styles.highlight)}>
								{t.profile.likesCount()}
							</span>
						</h5>
					</li>
					{/* //TODO:Implement this */}
					{/* <li {...stylex.attrs(styles.followedBySomeone)}>Is Followed by someone you're following</li> */}
				</ol>
			</div>
		</section>
	);
}
