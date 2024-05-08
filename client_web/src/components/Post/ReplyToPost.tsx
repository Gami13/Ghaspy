import type { Post as PostType, User } from "@/types/internal";
import stylex from "@stylexjs/stylex";

import { colors } from "../../variables.stylex";

const styles = stylex.create({
  replyBox: {
    width: "100%",
    height: "fit-content",
    lineHeight: "1em",
    padding: "1em",
    backgroundColor: colors.background100,
    borderRadius: "1em",
    gap: "0.5em",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: "1.5em",
    minWidth: "3.5em",
    minHeight: "3.5em",
    height: "1.5em",
    aspectRatio: 1 / 1,
    borderRadius: "50%",
    marginRight: "0.5em",

    backgroundColor: colors.accent500,
  },
  replyContent: {
    backgroundColor: colors.background200,
    borderRadius: "1em",
    padding: "0.5em",
    fontSize: "1em",
    fontWeight: 500,
    color: colors.text500,
  },
  reply: {
    backgroundColor: colors.primary500,
    width: "10em",
    height: "fit-content",
    padding: "1em",
    borderRadius: "1em",
    fontSize: "1em",
    fontWeight: 600,
  },
});
export default function ReplyToPost(props: { post: PostType }) {
  props.post.author = props.post.author as User;

  return (
    <div {...stylex.attrs(styles.replyBox)}>
      <img
        {...stylex.attrs(styles.avatar)}
        src={props.post.author.avatar}
        alt={props.post.author.displayName}
      />
      <span {...stylex.attrs(styles.replyContent)}>
        Placeholder, enter reply Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Excepturi quos nemo optio a ratione animi deleniti. Ea
        adipisci voluptatum iusto, est in nobis quam. Quasi quisquam voluptatem
        fugit iste consequatur!
      </span>
      {/* TODO: Gami zrób to niewolniku */}
      <button {...stylex.attrs(styles.reply)}>Reply</button>
    </div>
  );
}
