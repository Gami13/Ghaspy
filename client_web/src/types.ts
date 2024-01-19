export type UserShortT = {
	id: string;
	userName: string;
	displayName: string;
	avatar: string;
	banner: string;
	bio: string;
};
export type PostT = {
	id: string;
	author: UserShortT;
	content: string;
	replyTo: PostT | null;
	quoteOf: PostT | null;
	attachments: string[];
	likeCount: number;
	quoteCount: number;
	replyCount: number;
	timePosted: string;
	isLiked: boolean;
	isBookmarked: boolean;
};
