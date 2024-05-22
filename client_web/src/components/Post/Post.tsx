import type { Post as PostType, User } from "@/types/internal";
import stylex from "@stylexjs/stylex";
import { createSignal, Match, Show, Switch } from "solid-js";
import { PostQuoteBig } from "./PostQuoteBig";
import { PostQuoteSmall } from "./PostQuoteSmall";
import { colors } from "../../variables.stylex";
import { formatDate, timeSince } from "@/Translation";

import { InteractionButton, InteractionButtonStyle } from "./InteractionButton";
import { AttachmentList } from "./AttachmentList";
import {
	TbBookmark,
	TbBookmarkFilled,
	TbDownload,
	TbHeart,
	TbHeartFilled,
	TbLink,
	TbMessage,
	TbRepeat,
} from "solid-icons/tb";
import type { StyleXStyles } from "@stylexjs/stylex";
import { A } from "@solidjs/router";
import { UserAvatar } from "../UserAvatar";
import { getDisplayName } from "@/utils";
const styles = stylex.create({
	post: {
		width: "100%",
		height: "fit-content",
		color: colors.text900,
		display: "flex",
		backgroundColor: colors.background100,
		padding: "1em",
		borderRadius: "1em",
		flexDirection: "column",
		gap: "0.75em",
	},
	header: {
		gap: "0.5em",
		display: "flex",
		alignItems: "center",
		paddingHorizontal: "1em",
	},
	avatar: {
		flexShrink: 0,
		width: "3.5em",
		height: "3.5em",
		borderRadius: "50%",
		aspectRatio: "1/1",
	},
	names: {
		display: "flex",
		gap: "0.1em",
		flexDirection: "column",
		justifyContent: "center",
	},
	username: {
		fontSize: "1em",
		color: colors.text500,
		fontWeight: 500,
	},
	time: {
		fontSize: "0.9em",
		color: colors.text500,
		height: "2.6em",
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	displayName: {
		fontSize: "1.3em",
	},
	content: {
		textDecoration: "none",
	},
	statistics: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr 0.5fr 0.5fr 0.5fr",
		gap: "0.5em",
		paddingHorizontal: "1em",
		color: colors.text500,
		fontSize: "0.9em",
	},

	main: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5em",
		paddingHorizontal: "1em",
		paddingTop: "0.5em",
	},
	link: {
		textDecoration: "none",
		color: "inherit",
	},
});

export function Post(props: {
	post: PostType & { author: User };
	styling?: StyleXStyles;
}) {
	const quote = () =>
		props.post.quoted != null
			? props.post.attachments.length === 0
				? "big"
				: "small"
			: null;
	const [isLiked, setIsLiked] = createSignal(props.post.isLiked);
	const [isBookmarked, setIsBookmarked] = createSignal(props.post.isBookmarked);
	const [likeCount, setLikeCount] = createSignal(props.post.countLikes);

	function toggleLike() {
		//TODO: Add like functionality
		setIsLiked(!isLiked());
		if (props.post.isLiked) {
			setLikeCount(
				isLiked() ? props.post.countLikes : props.post.countLikes - 1,
			);
		} else {
			setLikeCount(
				isLiked() ? props.post.countLikes + 1 : props.post.countLikes,
			);
		}
	}
	function toggleBookmark() {
		//TODO: Add bookmark functionality
		setIsBookmarked(!isBookmarked());
	}

	return (
		<article {...stylex.attrs(styles.post, props.styling)}>
			<A
				href={`/${props.post.author?.username}/${props.post.ID}`}
				{...stylex.attrs(styles.link)}
			>
				<header {...stylex.attrs(styles.header)}>
					<UserAvatar user={props.post.author} styles={styles.avatar} />
					<section {...stylex.attrs(styles.names)}>
						<h2 {...stylex.attrs(styles.displayName)}>
							{getDisplayName(props.post.author)}
						</h2>
						<h3 {...stylex.attrs(styles.username)}>
							@{props.post.author.username}
						</h3>
					</section>
					<time
						title={formatDate(props.post.timePosted)}
						{...stylex.attrs(styles.time)}
					>
						○ {timeSince(props.post.timePosted)}
					</time>
				</header>
				<main {...stylex.attrs(styles.main)}>
					<p {...stylex.attrs(styles.content)}>{props.post.content}</p>
					<Show when={props.post.attachments.length > 0}>
						<AttachmentList attachments={props.post.attachments} />
					</Show>
					<Switch>
						<Match when={quote() === "big"}>
							<PostQuoteBig post={props.post.quoted as PostType} />
						</Match>
						<Match when={quote() === "small"}>
							<PostQuoteSmall post={props.post.quoted as PostType} />
						</Match>
					</Switch>
				</main>
			</A>
			<footer>
				<ol {...stylex.attrs(styles.statistics)}>
					<InteractionButton
						onClick={toggleLike}
						isToggled={isLiked()}
						icon={<TbHeart />}
						iconToggled={<TbHeartFilled />}
						text={likeCount()}
					/>
					<InteractionButton
						icon={<TbMessage />}
						text={props.post.countReplies}
					/>
					<InteractionButton
						icon={<TbRepeat />}
						text={props.post.countQuotes}
					/>
					<InteractionButton
						isRight={true}
						isToggled={isBookmarked()}
						onClick={toggleBookmark}
						icon={<TbBookmark />}
						iconToggled={<TbBookmarkFilled />}
					/>
					<InteractionButton isRight={true} icon={<TbLink />} />
					<li
						{...stylex.attrs(
							InteractionButtonStyle.activityWrapper,
							InteractionButtonStyle.right,
						)}
					>
						<a {...stylex.attrs(InteractionButtonStyle.activityButton)}>
							<TbDownload />
						</a>
					</li>
				</ol>
			</footer>
		</article>
	);
}
