import type { Post as PostType, User } from "@/types/internal";
import stylex from "@stylexjs/stylex";
import { Show } from "solid-js";
import { colors } from "../../variables.stylex";
import { useAppState } from "@/AppState";
import { UserAvatar } from "../UserAvatar";

const styles = stylex.create({
	replyBox: {
		width: "100%",
		backgroundColor: colors.background100,
		borderRadius: "1em",
		gap: "0.5em",
		maxHeight: "fit-content",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0.5em",
	},
	avatar: {
		aspectRatio: "1/1",
		minHeight: "2.5em",
		minWidth: "2.5em",
		height: "2.5em",
		width: "2.5em",
		backgroundColor: colors.accent500,
	},
	replyContent: {
		backgroundColor: colors.background200,
		borderRadius: "1em",
		padding: "0.5em",
		fontSize: "1em",
		fontWeight: 500,
		color: colors.text500,
		height: "100%",
	},
	replyBtn: {
		backgroundColor: colors.primary500,
		minWidth: "fit-content",
		height: "fit-content",
		padding: "0.5em",
		borderRadius: "0.75em",
		fontSize: "1em",
		fontWeight: 500,
		letterSpacing: "0.025em",
	},
});
export function ReplyToPost(props: { post: PostType }) {
	//user image is wrong
	//todo: replace with that from appstate
	return (
		<div {...stylex.attrs(styles.replyBox)}>
			<UserAvatar user={props.post.author as User} styles={styles.avatar} />
			<span {...stylex.attrs(styles.replyContent)}>
				Placeholder, enter reply Lorem ipsum dolor sit amet, consectetur
				adipisicing elit.
			</span>
			{/* TODO: Gami zrób to niewolniku */}
			<button {...stylex.attrs(styles.replyBtn)}>Reply</button>
		</div>
	);
}
