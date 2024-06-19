CREATE TABLE IF NOT EXISTS users (
	id bigint NOT NULL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	salt VARCHAR(255) NOT NULL,
	isValidated BOOLEAN NOT NULL DEFAULT '0',
	isBanned BOOLEAN NOT NULL DEFAULT '0',
	displayName VARCHAR(255) DEFAULT '',
	bio TEXT DEFAULT '',
	avatar VARCHAR(255) DEFAULT '',
	banner VARCHAR(255) DEFAULT '',
	prefferedLanguage VARCHAR(255) NOT NULL DEFAULT 'en_US',
	isFollowingPublic BOOLEAN NOT NULL DEFAULT '1',
	isFollowersPublic BOOLEAN NOT NULL DEFAULT '1',
	isPostsPublic BOOLEAN NOT NULL DEFAULT '1',
	isLikesPublic BOOLEAN NOT NULL DEFAULT '1'
);

CREATE INDEX usersIdIdx ON users (id);

CREATE INDEX usernameIdx ON users (username);

CREATE TABLE IF NOT EXISTS posts (
	id bigint NOT NULL PRIMARY KEY,
	authorId bigint NOT NULL,
	content TEXT DEFAULT '',
	replyTo bigint DEFAULT '0',
	threadStart bigint DEFAULT '0',
	quoteOf bigint DEFAULT '0',
	attachments VARCHAR [] DEFAULT '{[]}'
);

CREATE INDEX postsIdIdx ON posts (id);

CREATE INDEX postsAuthorIdIdx ON posts (authorId);

CREATE INDEX postsReplyToIdx ON posts (replyTo);

CREATE TABLE IF NOT EXISTS likes (
	id bigint NOT NULL PRIMARY KEY,
	userId bigint NOT NULL,
	postId bigint NOT NULL,
	isEnabled BOOLEAN NOT NULL DEFAULT '1',
	UNIQUE(userId, postId)
);

CREATE INDEX likesUserIdx ON likes (userId);

CREATE INDEX likesPostIdIdx ON likes (postId);

CREATE TABLE IF NOT EXISTS follows (
	id bigint NOT NULL PRIMARY KEY,
	followerId bigint NOT NULL,
	followedId bigint NOT NULL,
	isEnabled BOOLEAN NOT NULL DEFAULT '1',
	UNIQUE(followerId, followedId)
);

CREATE INDEX followsFollowerIdx ON follows (followerId);

CREATE INDEX followsFollowedIdx ON follows (followedId);

CREATE TABLE IF NOT EXISTS messages (
	id bigint NOT NULL PRIMARY KEY,
	senderId bigint NOT NULL,
	chatId bigint NOT NULL,
	content TEXT DEFAULT '',
	attachments VARCHAR [] DEFAULT '{}'
);

CREATE INDEX msgsSenderIdx ON messages (senderId);

CREATE INDEX msgsChatIdx ON messages (chatId);

CREATE TABLE IF NOT EXISTS chats (
	id bigint NOT NULL PRIMARY KEY,
	name VARCHAR(255) NOT NULL DEFAULT '',
	members bigint [],
	coverImage VARCHAR(255) DEFAULT '{}'
);

CREATE INDEX chatsIdIdx ON chats (id);

CREATE TABLE IF NOT EXISTS bookmarks (
	id bigint NOT NULL PRIMARY KEY,
	userId bigint NOT NULL,
	postId bigint NOT NULL,
	isEnabled BOOLEAN NOT NULL DEFAULT '1',
	UNIQUE(userId, postId)
);

CREATE INDEX bookmarksUserIdx ON bookmarks (userId);

CREATE INDEX bookmarksPostIdx ON bookmarks (postId);

CREATE TABLE IF NOT EXISTS tokens (
	id bigint NOT NULL PRIMARY KEY,
	userId bigint NOT NULL,
	token VARCHAR(255) NOT NULL,
	device VARCHAR(255) NOT NULL
);

CREATE INDEX tokensUserIdx ON tokens (userId);

CREATE INDEX tokensTokenIdx ON tokens (token);

CREATE TABLE IF NOT EXISTS verifications (
	id bigint NOT NULL PRIMARY KEY,
	userId bigint NOT NULL,
	code VARCHAR(255) NOT NULL,
	validUntil timestamp NOT NULL
);

CREATE INDEX verifUserIdx ON verifications (userId);

CREATE INDEX verifCodeIdx ON verifications (code);

ALTER TABLE IF EXISTS public.bookmarks
ADD CONSTRAINT "userRestrict" FOREIGN KEY (userid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.bookmarks
ADD CONSTRAINT "postRestrict" FOREIGN KEY (postid) REFERENCES public.posts (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.follows
ADD CONSTRAINT "followerRestrict" FOREIGN KEY (followerid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.follows
ADD CONSTRAINT "followedRestrict" FOREIGN KEY (followedid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.likes
ADD CONSTRAINT "userRestrict" FOREIGN KEY (userid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.likes
ADD CONSTRAINT "postRestrict" FOREIGN KEY (postid) REFERENCES public.posts (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.messages
ADD CONSTRAINT "senderRestrict" FOREIGN KEY (senderid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.messages
ADD CONSTRAINT "chatRestrict" FOREIGN KEY (chatid) REFERENCES public.chats (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.posts
ADD CONSTRAINT "authorRestrict" FOREIGN KEY (authorid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.tokens
ADD CONSTRAINT "userRestrict" FOREIGN KEY (userid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.verifications
ADD CONSTRAINT "userRestrict" FOREIGN KEY (userid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

CREATE VIEW public.usersDetails AS
SELECT id,
	username,
	displayname,
	bio,
	avatar,
	banner,
	isfollowerspublic,
	isfollowingpublic,
	ispostspublic,
	islikespublic,
	(
		SELECT count(l1.*) AS count
		FROM likes l1
		WHERE l1.userid = users.id
	) AS countlikes,
	(
		SELECT count(p1.*) AS count
		FROM posts p1
		WHERE p1.authorid = users.id
	) AS countposts,
	(
		SELECT count(f1.*) AS count
		FROM follows f1
		WHERE f1.followerid = users.id
	) AS countisfollowing,
	(
		SELECT count(f2.*) AS count
		FROM follows f2
		WHERE f2.followedid = users.id
	) AS countfollowedby,
	prefferedLanguage
FROM users;

SELECT usersDetails.id,
	usersDetails.username,
	usersDetails.displayname,
	usersDetails.bio,
	usersDetails.avatar,
	usersDetails.banner,
	usersDetails.isfollowerspublic,
	usersDetails.isfollowingpublic,
	usersDetails.ispostspublic,
	usersDetails.islikespublic,
	usersDetails.countlikes,
	usersDetails.countposts,
	usersDetails.countisfollowing,
	usersDetails.countfollowedby,
	usersDetails.prefferedLanguage
FROM usersDetails
	JOIN tokens ON tokens.userid = usersDetails.id;

CREATE VIEW public."postsExtra" AS
SELECT posts.id,
	usersDetails.id as authorId,
	usersDetails.username,
	usersDetails.displayname,
	usersDetails.bio,
	usersDetails.avatar,
	usersDetails.banner,
	usersDetails.isfollowerspublic,
	usersDetails.isfollowingpublic,
	usersDetails.ispostspublic,
	usersDetails.islikespublic,
	usersDetails.countlikes,
	usersDetails.countposts,
	usersDetails.countisfollowing,
	usersDetails.countfollowedby,
	posts.content,
	posts.replyTo,
	posts.quoteOf,
	posts.attachments,
	(
		SELECT COUNT(*)
		FROM likes l1
		WHERE l1.postid = posts.id
			AND l1.isenabled = true
	) as postCountLikes,
	(
		SELECT COUNT(*)
		FROM posts p1
		WHERE p1.quoteof = posts.id
	) AS postCountQuotes,
	(
		SELECT COUNT(*)
		FROM posts p2
		WHERE p2.replyto = posts.id
	) AS postCountReplies,
	posts.threadStart
FROM posts
	JOIN usersDetails ON posts.authorid = usersDetails.id
ORDER BY posts.id DESC;

CREATE OR REPLACE FUNCTION getPosts(tokenIn VARCHAR(255)) RETURNS TABLE(
		id bigint,
		authorId bigint,
		username VARCHAR(255),
		displayname VARCHAR(255),
		bio TEXT,
		avatar VARCHAR(255),
		banner VARCHAR(255),
		isfollowerspublic BOOLEAN,
		isfollowingpublic BOOLEAN,
		ispostspublic BOOLEAN,
		islikespublic BOOLEAN,
		countlikes bigint,
		countposts bigint,
		countisfollowing bigint,
		countfollowedby bigint,
		content TEXT,
		replyTo bigint,
		quoteOf bigint,
		attachments VARCHAR [],
		postCountLikes bigint,
		postCountQuotes bigint,
		postCountReplies bigint,
		isPostLiked BOOLEAN,
		isPostBookmarked BOOLEAN,
		threadStart bigint
	) AS $$
SELECT "postsExtra".id,
	"postsExtra".authorId,
	"postsExtra".username,
	"postsExtra".displayname,
	"postsExtra".bio,
	"postsExtra".avatar,
	"postsExtra".banner,
	"postsExtra".isfollowerspublic,
	"postsExtra".isfollowingpublic,
	"postsExtra".ispostspublic,
	"postsExtra".islikespublic,
	"postsExtra".countlikes,
	"postsExtra".countposts,
	"postsExtra".countisfollowing,
	"postsExtra".countfollowedby,
	"postsExtra".content,
	"postsExtra".replyTo,
	"postsExtra".quoteOf,
	"postsExtra".attachments,
	"postsExtra".postCountLikes,
	"postsExtra".postCountQuotes,
	"postsExtra".postCountReplies,
	(
		SELECT likes.isenabled
		FROM likes
			JOIN tokens ON tokens.userid = likes.userid
		WHERE likes.postid = "postsExtra".id
			AND tokens.token = tokenIn
	) AS isPostLiked,
	(
		SELECT bookmarks.isenabled
		FROM bookmarks
			JOIN tokens ON tokens.userid = bookmarks.userid
		WHERE bookmarks.postid = "postsExtra".id
			AND tokens.token = tokenIn
	) AS isPostBookmarked,
	"postsExtra".threadStart
FROM "postsExtra"
ORDER BY "postsExtra".id $$ LANGUAGE SQL;