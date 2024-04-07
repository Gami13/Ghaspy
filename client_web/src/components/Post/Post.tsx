import type { Post as PostType, User } from "@/types/internal";
import stylex from "@stylexjs/stylex";
import { For, Show } from "solid-js";
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
import { Attachment } from "./Attachment";

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
	attachments: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		gap: "0.5em",
		paddingHorizontal: "1em",
		width: "100%",
	},
	attachment: {
		width: "100%",
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
				<ul {...stylex.attrs(styles.attachments)}>
					<For each={props.post.attachments}>
						{(attachment) => (
							<li {...stylex.attrs(styles.attachment)}>
								<Attachment link={attachment} />
							</li>
						)}
					</For>
				</ul>
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
				<li {...stylex.attrs(styles.activityWrapper)}>
					<button type="button" {...stylex.attrs(styles.activityButton)}>
						<IconHeart />
					</button>
					{props.post.countLikes}
				</li>
				<li {...stylex.attrs(styles.activityWrapper)}>
					<button type="button" {...stylex.attrs(styles.activityButton)}>
						<IconMessage />
					</button>
					{props.post.countReplies}
				</li>
				<li {...stylex.attrs(styles.activityWrapper)}>
					<button type="button" {...stylex.attrs(styles.activityButton)}>
						<IconRepeat />
					</button>
					{props.post.countQuotes}
				</li>
				<li {...stylex.attrs(styles.activityWrapper)}>
					<button type="button" {...stylex.attrs(styles.activityButton)}>
						<IconBookmark />
					</button>
				</li>
				<li {...stylex.attrs(styles.activityWrapper)}>
					<button type="button" {...stylex.attrs(styles.activityButton)}>
						<IconLink />
					</button>
				</li>
				<li {...stylex.attrs(styles.activityWrapper)}>
					<button type="button" {...stylex.attrs(styles.activityButton)}>
						<IconDownload />
					</button>
				</li>
			</ol>
		</article>
	);
}
