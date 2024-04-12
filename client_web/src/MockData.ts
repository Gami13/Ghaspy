import type { User } from "./types/internal";
import type { Post as PostType } from "./types/internal";
export const user0: User = {
	ID: "1",
	username: "oncloud_e",
	displayName: "Cloudy 🌥️ (estrogen angel)",
	bio: "transgender sweetheart, 'belle delpeen' • acab • 18+ • ig: oncloud.e ✨ e-girl on e, and e is for estrogen ✨",
	avatar:
		"https://pbs.twimg.com/profile_images/1587518488704270337/l0Mjwips_400x400.jpg",
	banner:
		"https://pbs.twimg.com/profile_banners/1477117070512898054/1662244386/1500x500",
	countLikes: 8008,
	countPosts: 69,
	countFollowers: 420,
	countFollowing: 2137,
	isFollowingYou: true,
	isFollowedByYou: true,
	joinedAt: "Mon Jan 02 2006 15:04:05 GMT-0700 (MST)",
	isFollowersPublic: true,
	isFollowingPublic: true,
	isLikesPublic: true,
	isPostsPublic: true,
	isYourProfile: false,
} as User;
export const user1: User = {
	ID: "2",
	username: "sapphic_siren",
	displayName: "Sapphic Siren 🌈",
	bio: "cringy little person who likes to write and draw. she/her",
	avatar:
		"https://pbs.twimg.com/profile_images/1711677491142594560/UUZ48b1u_400x400.jpg",
	banner:
		"https://pbs.twimg.com/profile_banners/1477117070512898054/1662244386/1500x500",
	countLikes: 8008,
	countPosts: 69,
	countFollowers: 420,
	countFollowing: 2137,
	isFollowingYou: true,
	isFollowedByYou: true,
	joinedAt: "Mon Jan 02 2006 15:04:05 GMT-0700 (MST)",
	isFollowersPublic: true,
	isFollowingPublic: true,
	isLikesPublic: true,
	isPostsPublic: true,
	isYourProfile: false,
} as User;

export const post0: PostType = {
	ID: "1",
	author: user0,
	content: `i think if a goth girl with big boobs whispered "do you like that?" in my ear while giving me a Denny's syrupy special i would cum so hard that the rest of my life from that moment on would feel like post nut clarity`,
	replyToID: undefined,
	quotedID: undefined,
	replyTo: undefined,
	quoted: undefined,
	attachments: [],
	countLikes: 4800,
	countReplies: 57,
	countQuotes: 293,
	timePosted: "Tue Sep 11 2001 14:14:20 GMT+0200 (CET)",
	isLiked: true,
	isBookmarked: true,
} as PostType;
export const post1: PostType = {
	ID: "2",
	author: user1,
	content:
		"I think we should treat guns like we treat cars, we should be able to buy whatever we want, have places to use them properly as intended, and be taught how to properly and safely use them. Banning either is too unpopular and won’t work",
	replyToID: undefined,
	quotedID: undefined,
	replyTo: undefined,
	quoted: undefined,
	attachments: [],
	countLikes: 4800,
	countReplies: 57,
	countQuotes: 293,
	timePosted: "Mon Jan 02 2023 15:04:05 GMT-0700 (MST)",
	isLiked: true,
	isBookmarked: true,
} as PostType;

//with attachments
export const post2: PostType = {
	ID: "3",
	author: user0,
	content:
		"look at the funny little kitten i love him so so much and i really need some longer text here to test the small quote thingy please please hello",
	replyToID: undefined,
	quotedID: undefined,
	replyTo: undefined,
	quoted: undefined,
	attachments: [
		"https://pbs.twimg.com/media/GKkD0WHWQAAfyaY?format=jpg&name=large",
	],
	countLikes: 4800,
	countReplies: 57,
	countQuotes: 293,
	timePosted: "Mon Jan 02 2023 15:04:05 GMT-0700 (MST)",
	isLiked: true,
	isBookmarked: true,
} as PostType;

//with quote
export const post3: PostType = {
	ID: "4",
	content: "THIS KITTY IS DEADASS SO CUTE",
	author: user1,
	replyToID: undefined,
	quotedID: "3",
	replyTo: undefined,
	quoted: post2,
	attachments: [],
	countLikes: 4800,
	countReplies: 57,
	countQuotes: 293,
	timePosted: "Mon Jan 02 2023 15:04:05 GMT-0700 (MST)",
	isLiked: true,
	isBookmarked: true,
} as PostType;

//with quote and media
export const post4: PostType = {
	ID: "5",
	content: "THIS KITTEN IS EVEN CUTER",
	author: user1,
	replyToID: undefined,
	quotedID: "3",
	replyTo: undefined,
	quoted: post2,
	attachments: [
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1UsseJLum7bkeD5q2e78A5FOb0BBENJSZNMQqy4fQXQ&s",
	],
	countLikes: 4800,
	countReplies: 57,
	countQuotes: 293,
	timePosted: "Mon Jan 02 2023 15:04:05 GMT-0700 (MST)",
	isLiked: true,
	isBookmarked: true,
} as PostType;

export const posts = [post0, post1, post2, post3, post4];
