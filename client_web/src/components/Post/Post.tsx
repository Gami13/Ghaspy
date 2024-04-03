import type { Post as PostType, User } from "@/types/internal";
import stylex from "@stylexjs/stylex";
import { Show } from "solid-js";
import { PostQuoteBig } from "./PostQuoteBig";
import { PostQuoteSmall } from "./PostQuoteSmall";
import { colors } from "../../variables.stylex";
const styles = stylex.create({
	post: {
		width: "100%",
		height: "fit-content",
		color: colors.text900,
		display: "flex",
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
			<img src={props.post.author.avatar} alt={props.post.author.displayName} />
			<h2>{props.post.author.displayName}</h2>
			<h3>{props.post.author.username}</h3>
			<p>{props.post.content}</p>
			<Show when={props.post.attachments.length > 0}>
				<ul>{/* !TODO: implement */}</ul>
			</Show>
			<Show when={hasQuote()}>
				<Show when={isBigQuote()}>
					<PostQuoteBig post={props.post.quoted} />
				</Show>
				<Show when={!isBigQuote()}>
					<PostQuoteSmall post={props.post.quoted} />
				</Show>
			</Show>
			<ol>
				<li>{props.post.countLikes} Likes</li>
				<li>{props.post.countReplies} Replies</li>
				<li>{props.post.countQuotes} Quotes</li>
				<li>
					<button type="button">Bookmark</button>
				</li>
				<li>
					<button type="button">Share</button>
				</li>
				<li>
					<button type="button">Download</button>
				</li>
			</ol>
		</article>
	);
}
