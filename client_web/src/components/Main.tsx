import stylex from '@stylexjs/stylex';
import { Post } from './Post';
import { Post as PostType, User } from '@/types/internal';
import { colors } from '../variables.stylex';

const styles = stylex.create({
	main: {
		maxWidth: '600px',
		backgroundColor: colors.background100,
	},
});
const user: User = {
	ID: '1',
	username: 'oncloud_e',
	displayName: 'Cloudy 🌥️ (estrogen angel)',
	bio: "transgender sweetheart, 'belle delpeen' • acab • 18+ • ig: oncloud.e ✨ e-girl on e, and e is for estrogen ✨",
	avatar: 'https://pbs.twimg.com/profile_images/1587518488704270337/l0Mjwips_400x400.jpg',
	banner: 'https://pbs.twimg.com/profile_banners/1477117070512898054/1662244386/1500x500',
	countLikes: 8008,
	countPosts: 69,
	countFollowers: 420,
	countFollowing: 2137,
	isFollowingYou: true,
	isFollowedByYou: true,
	joinedAt: 'Mon Jan 02 2006 15:04:05 GMT-0700 (MST)',
	isFollowersPublic: true,
	isFollowingPublic: true,
	isLikesPublic: true,
	isPostsPublic: true,
	isYourProfile: false,
} as User;
const post: PostType = {
	ID: '1',
	author: user,
	content: `i think if a goth girl with big boobs whispered "do you like that?" in my ear while giving me a Denny's syrupy special i would cum so hard that the rest of my life from that moment on would feel like post nut clarity`,
	replyToID: undefined,
	quotedID: undefined,
	replyTo: undefined,
	quoted: undefined,
	attachments: [],
	countLikes: 4800,
	countReplies: 57,
	countQuotes: 293,
	timePosted: 'Mon Jan 02 2006 15:04:05 GMT-0700 (MST)',
	isLiked: true,
	isBookmarked: true,
} as PostType;

export function Main() {
	return (
		<div {...stylex.attrs(styles.main)}>
			<Post post={post} />
		</div>
	);
}
