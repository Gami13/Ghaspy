import { CDN_URL } from "@/constants";
import type { User } from "@/types/internal";
import { getDisplayName } from "@/utils";
import type { StyleXStyles } from "@stylexjs/stylex";
import stylex from "@stylexjs/stylex";

type Props = {
	user: User;
	styles?: StyleXStyles;
};
const styles = stylex.create({
	avatar: {
		aspectRatio: "1/1",
		borderRadius: "50%",
		objectFit: "cover",
	},
});
export function UserAvatar(props: Props) {
	return (
		<object data={CDN_URL + props.user.avatar} type="image/png" {...stylex.attrs(styles.avatar, props.styles)}>
			<img
				{...stylex.attrs(styles.avatar, props.styles)}
				src="https://static.printler.com/cache/8/e/1/a/0/c/8e1a0c16bf0c2cfa3bc131c209051cf5b64a2c46.jpg"
				alt={getDisplayName(props.user)}
			/>
		</object>
	);
}
