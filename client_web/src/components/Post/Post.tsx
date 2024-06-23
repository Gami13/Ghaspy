import type { Post as PostType, User } from "@/types/internal";
import stylex from "@stylexjs/stylex";
import { createSignal, Match, Show, Switch } from "solid-js";
import { PostQuoteBig } from "./PostQuoteBig";
import { PostQuoteSmall } from "./PostQuoteSmall";
import { colors } from "../../variables.stylex";
import { type ErrorTransKeys, formatDateLong, timeSince, useTrans } from "@/Translation";

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
import { UserAvatar } from "../UserProfile/UserAvatar";
import { getDisplayName } from "@/utils";
import { CDN_URL, TOGGLE_BOOKMARK_ENDPOINT, TOGGLE_LIKE_ENDPOINT } from "@/constants";
import { ProtoFetch } from "@/ProtoFetch";
import type { ResponseToggleLike } from "@/types/responses";
import { useAppState } from "@/AppState";

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
		display: "flex",
		flexDirection: "row",
		paddingHorizontal: "1em",
		color: colors.text500,
		fontSize: "0.9em",
		justifyContent: "space-between",
	},
	statisticsGroup: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: "4em",
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
	console.log("POST", props.post);
	const t = useTrans();
	const AppState = useAppState();
	const quote = () => (props.post.quoted != null ? (props.post.attachments.length === 0 ? "big" : "small") : null);
	const [isLiked, setIsLiked] = createSignal(props.post.isLiked);
	const [isBookmarked, setIsBookmarked] = createSignal(props.post.isBookmarked);
	const [likeCount, setLikeCount] = createSignal(props.post.countLikes);
	const likeProto = new ProtoFetch(TOGGLE_LIKE_ENDPOINT);
	const bookmarkProto = new ProtoFetch(TOGGLE_BOOKMARK_ENDPOINT);
	function likeSuccess(data: ResponseToggleLike) {
		setIsLiked(data.state);
		if ((data.state && props.post.isLiked) || !(data.state || props.post.isLiked)) {
			setLikeCount(props.post.countLikes);
			return;
		}
		if (data.state && !props.post.isLiked) {
			setLikeCount(props.post.countLikes + 1);
			return;
		}
		if (!data.state && props.post.isLiked) {
			setLikeCount(props.post.countLikes - 1);
			return;
		}
		return;
	}
	function likeError(error: ErrorTransKeys) {
		console.log(error);
		alert(`Something went wrong${t.errors[error]()}`);
		setIsLiked(!isLiked());
	}
	function toggleLike() {
		if (!AppState.isLoggedIn()) {
			alert("You need to be logged in to like a post");
			return;
		}
		setIsLiked(!isLiked());
		if (props.post.isLiked) {
			setLikeCount(isLiked() ? props.post.countLikes : props.post.countLikes - 1);
		} else {
			setLikeCount(isLiked() ? props.post.countLikes + 1 : props.post.countLikes);
		}
		console.log("POST ID: ", props.post.ID);
		likeProto.Query({ postID: props.post.ID }).then((data) => {
			if (data.isSuccess) {
				likeSuccess(data.data);
			}
			if (data.isError) {
				likeError(data.error);
			}
		});
	}
	function toggleBookmark() {
		if (!AppState.isLoggedIn()) {
			alert("You need to be logged in to bookmark a post");
			return;
		}
		setIsBookmarked(!isBookmarked());

		console.log("POST ID: ", props.post.ID);
		bookmarkProto.Query({ postID: props.post.ID }).then((data) => {
			console.log(data);
			console.log("IS BOOKMARKED", data.data?.state);
			if (data.isSuccess) {
				setIsBookmarked(data.data.state);
			}
			if (data.isError) {
				console.log(data.error);
				alert(`Something went wrong${t.errors[data.error]()}`);
				setIsBookmarked(!isBookmarked());
			}
		});
	}

	return (
		<article {...stylex.attrs(styles.post, props.styling)}>
			<A href={`/${props.post.author?.username}/${props.post.ID}`} {...stylex.attrs(styles.link)}>
				<header {...stylex.attrs(styles.header)}>
					<UserAvatar user={props.post.author} styles={styles.avatar} />
					<section {...stylex.attrs(styles.names)}>
						<h2 {...stylex.attrs(styles.displayName)}>{getDisplayName(props.post.author)}</h2>
						<h3 {...stylex.attrs(styles.username)}>@{props.post.author.username}</h3>
					</section>
					<time title={formatDateLong(props.post.timePosted)} {...stylex.attrs(styles.time)}>
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
					<li {...stylex.attrs(styles.statisticsGroup)}>
						<InteractionButton
							onClick={toggleLike}
							isToggled={isLiked()}
							icon={<TbHeart />}
							iconToggled={<TbHeartFilled />}
							text={likeCount()}
						/>
						<InteractionButton icon={<TbMessage />} text={props.post.countReplies} />
						<InteractionButton icon={<TbRepeat />} text={props.post.countQuotes} />
					</li>

					<li {...stylex.attrs(styles.statisticsGroup)}>
						<InteractionButton
							isRight={true}
							isToggled={isBookmarked()}
							onClick={toggleBookmark}
							icon={<TbBookmark />}
							iconToggled={<TbBookmarkFilled />}
						/>
						<InteractionButton isRight={true} icon={<TbLink />} />
						<Show when={props.post.attachments.length > 0}>
							<InteractionButton
								isRight={true}
								icon={<TbDownload />}
								{...stylex.attrs(InteractionButtonStyle.activityButton)}
								onClick={(e) => {
									e.preventDefault();
									alert("Downloading");
									const link = document.createElement("a");
									link.setAttribute("download", "true");
									link.style.display = "none";
									document.body.appendChild(link);
									for (let i = 0; i < props.post.attachments.length; i++) {
										link.setAttribute("href", CDN_URL + props.post.attachments[i]);
										link.click();
									}
									document.body.removeChild(link);
								}}
							/>
						</Show>
					</li>
				</ol>
			</footer>
		</article>
	);
}
