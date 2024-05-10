import { posts } from "@/MockData";
import { useParams } from "@solidjs/router";
import { Post } from "./Post";
import PostComments from "./PostComments";
import { colors, dimensions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import ReplyToPost from "./ReplyToPost";

const styles = stylex.create({
  main: {
    padding: "0.25em 1em",
    height: "100vh",
    gap: "1em",
    maxWidth: dimensions.comentsMaxWidth,
    minWidth: dimensions.comentsMinWidth,
    backgroundColor: colors.background50,
    flexGrow: 10000,
    display: "flex",
    flexDirection: "column",

    overflowY: "auto",
  },
  header: {
    backgroundColor: colors.background100,
  },
});

export default function PostDetail() {
  const params = useParams();

  console.log(params.username);
  console.log(params);
  const author = params.username;
  const id = params.postID;
  const post = posts.find((x) => x.author?.username == author && x.ID == id);
  if (post == undefined) return;
  const comments = posts.filter((x) => x.replyToID == id);

  return (
    <main {...stylex.attrs(styles.main)}>
      <Post styling={styles.header} post={post} />
      <ReplyToPost post={post} />
      <PostComments coments={comments} />
    </main>
  );
}
