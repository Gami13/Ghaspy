import { posts } from "@/MockData";
import { useParams } from "@solidjs/router";
import { For } from "solid-js";
import { Post } from "./Post";
import type { Post as PostType } from "@/types/internal";
import stylex from "@stylexjs/stylex";
import { colors } from "../../variables.stylex";

const styles = stylex.create({
  coments: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "1em",
  }, //pierwszy post zostaje w miejscu, po usunięciu scroluje sie razem z komentarzami
  coment: {
    backgroundColor: colors.background100,
  },
});
type CommentListProps = {
  coments: PostType[];
};

export default function PostComments(props: CommentListProps) {
  return (
    <article {...stylex.attrs(styles.coments)}>
      <For each={props.coments}>
        {(coment) => <Post styling={styles.coment} post={coment} />}
      </For>
    </article>
  );
}
