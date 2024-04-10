import type { Post as PostType, User } from "@/types/internal";
import stylex from "@stylexjs/stylex";
import { Show } from "solid-js";
import { PostQuoteBig } from "./PostQuoteBig";
import { PostQuoteSmall } from "./PostQuoteSmall";
import { colors } from "../../variables.stylex";
import { timeSince } from "@/Translation";
import {
	IconBookmark,
	IconDownload,
	IconHeart,
	IconLink,
	IconMessage,
	IconRepeat,
} from "@tabler/icons-solidjs";
import { InteractionButton, InteractionButtonStyle } from "./InteractionButton";
import { AttachmentList } from "./AttachmentList";

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
		height: "2.3em",
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	displayName: {
		fontSize: "1.3em",
	},
	content: {
		paddingHorizontal: "1em",
	},
	statistics: {
		display: "flex",
		justifyContent: "space-between",
		paddingHorizontal: "1em",
		color: colors.text500,
		fontSize: "0.9em",
	},
	activityWrapper: {
		display: "flex",
		alignItems: "center",
		gap: "0.3em",
	},
	activityButton: {
		display: "flex",
		alignItems: "center",
		gap: "0.5em",
		border: "none",
		backgroundColor: "transparent",
		cursor: "pointer",
		transition: "color 0.2s",
		color: colors.text500,
		":hover": {
			color: colors.primary500,
		},
	},
});
//! Use Small quote if original and quote have media, otherwise use Big quote
export function Post(props: { post: PostType }) {
	const isBigQuote = () => props.post.attachments.length === 0;
	const hasQuote = () => props.post.quotedID !== undefined;
	//stupid protobuf generates as optional even tho its required and will always be there
	props.post.author = props.post.author as User;
	return (
		<article {...stylex.attrs(styles.post)}>
			<header {...stylex.attrs(styles.header)}>
				<img
					{...stylex.attrs(styles.avatar)}
					src={props.post.author.avatar}
					alt={props.post.author.displayName}
				/>
				<section {...stylex.attrs(styles.names)}>
					<h2 {...stylex.attrs(styles.displayName)}>
						{props.post.author.displayName}
					</h2>
					<h3 {...stylex.attrs(styles.username)}>
						@{props.post.author.username}
					</h3>
				</section>
				<time {...stylex.attrs(styles.time)}>
					○ {timeSince(props.post.timePosted)}
				</time>
			</header>
			<p {...stylex.attrs(styles.content)}>{props.post.content}</p>
			<Show when={props.post.attachments.length > 0}>
				<AttachmentList attachments={props.post.attachments} />
			</Show>
			<Show when={hasQuote()}>
				<Show when={isBigQuote()}>
					<PostQuoteBig post={props.post.quoted} />
				</Show>
				<Show when={!isBigQuote()}>
					<PostQuoteSmall post={props.post.quoted} />
				</Show>
			</Show>
			<ol {...stylex.attrs(styles.statistics)}>
				<InteractionButton icon={<IconHeart />} text={props.post.countLikes} />
				<InteractionButton
					icon={<IconMessage />}
					text={props.post.countReplies}
				/>
				<InteractionButton
					icon={<IconRepeat />}
					text={props.post.countQuotes}
				/>
				<InteractionButton icon={<IconBookmark />} />
				<InteractionButton icon={<IconLink />} />
				<li {...stylex.attrs(InteractionButtonStyle.activityWrapper)}>
					<a {...stylex.attrs(InteractionButtonStyle.activityButton)}>
						<IconDownload />
					</a>
				</li>
			</ol>
		</article>
	);
}
