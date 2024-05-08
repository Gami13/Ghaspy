import type { Post as PostType, User } from "@/types/internal";
import stylex from "@stylexjs/stylex";
import { Match, Show, Switch } from "solid-js";
import { PostQuoteBig } from "./PostQuoteBig";
import { PostQuoteSmall } from "./PostQuoteSmall";
import { colors } from "../../variables.stylex";
import { formatDate, timeSince } from "@/Translation";

import { InteractionButton, InteractionButtonStyle } from "./InteractionButton";
import { AttachmentList } from "./AttachmentList";
import {
  TbBookmark,
  TbDownload,
  TbHeart,
  TbLink,
  TbMessage,
  TbRepeat,
} from "solid-icons/tb";
import { StyleXStyles } from "@stylexjs/stylex";
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
    // paddingHorizontal: "1em",
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
    fontSize: "2em",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "color 0.2s",
    color: colors.text500,
    ":hover": {
      color: colors.primary500,
    },
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5em",
    paddingHorizontal: "1em",
  },
});
//! Use Small quote if original and quote have media, otherwise use Big quote
export function Post(props: { post: PostType; styling?: StyleXStyles }) {
  const quote = () =>
    props.post.quoted != null
      ? props.post.attachments.length === 0
        ? "big"
        : "small"
      : null;
  //stupid protobuf generates as optional even tho its required and will always be there
  props.post.author = props.post.author as User;

  return (
    <article {...stylex.attrs(styles.post, props.styling)}>
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
      <footer>
        <ol {...stylex.attrs(styles.statistics)}>
          <InteractionButton
            isToggled={props.post.isLiked}
            icon={<TbHeart />}
            text={props.post.countLikes}
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
            isToggled={props.post.isBookmarked}
            icon={<TbBookmark />}
          />
          <InteractionButton icon={<TbLink />} />
          <li {...stylex.attrs(InteractionButtonStyle.activityWrapper)}>
            <a {...stylex.attrs(InteractionButtonStyle.activityButton)}>
              <TbDownload />
            </a>
          </li>
        </ol>
      </footer>
    </article>
  );
}
