CREATE TABLE IF NOT EXISTS users (
	id bigint NOT NULL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	salt VARCHAR(255) NOT NULL,
	isValidated BOOLEAN NOT NULL DEFAULT '0',
	isBanned BOOLEAN NOT NULL DEFAULT '0',
	displayName VARCHAR(255),
	bio TEXT,
	avatar varchar,
	banner varchar,
	isFollowersPublic BOOLEAN NOT NULL DEFAULT '1',
	isFollowingPublic BOOLEAN NOT NULL DEFAULT '1',
	isPostsPublic BOOLEAN NOT NULL DEFAULT '1',
	isLikesPublic BOOLEAN NOT NULL DEFAULT '1'
);

CREATE TABLE IF NOT EXISTS posts (
	id bigint NOT NULL PRIMARY KEY,
	authorId bigint NOT NULL,
	content TEXT,
	replyTo bigint,
	quoteOf bigint,
	score integer NOT NULL DEFAULT '0',
	attachments varchar []
);

CREATE TABLE IF NOT EXISTS likes (
	id bigint NOT NULL PRIMARY KEY,
	userId bigint NOT NULL,
	postId bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS follows (
	id bigint NOT NULL PRIMARY KEY,
	followerId bigint NOT NULL,
	followedId bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
	id bigint NOT NULL PRIMARY KEY,
	senderId bigint NOT NULL,
	chatId bigint NOT NULL,
	content TEXT,
	attachments varchar []
);

CREATE TABLE IF NOT EXISTS chats (
	id bigint NOT NULL PRIMARY KEY,
	members bigint [],
	coverImage varchar
);

CREATE TABLE IF NOT EXISTS bookmarks (
	id bigint NOT NULL PRIMARY KEY,
	userId bigint NOT NULL,
	postId bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS tokens (
	id bigint NOT NULL PRIMARY KEY,
	userId bigint NOT NULL,
	token VARCHAR(255) NOT NULL,
	device VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS verifications (
	id bigint NOT NULL PRIMARY KEY,
	userId bigint NOT NULL,
	code VARCHAR(255) NOT NULL,
	validUntil timestamp NOT NULL
);