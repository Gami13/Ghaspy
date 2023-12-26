CREATE TABLE IF NOT EXISTS users (
	id bigint NOT NULL,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	salt VARCHAR(255) NOT NULL,
	token VARCHAR(255) NOT NULL,
	isValidated BOOLEAN NOT NULL DEFAULT '0',
	isBanned BOOLEAN NOT NULL DEFAULT '0',
	displayName VARCHAR(255),
	bio TEXT
);

CREATE TABLE IF NOT EXISTS posts (
	id bigint NOT NULL,
	authorId bigint NOT NULL,
	content TEXT,
	replyTo bigint,
	score integer NOT NULL DEFAULT '0',
	attachments integer []
);

CREATE TABLE IF NOT EXISTS likes (
	id bigint NOT NULL,
	userId bigint NOT NULL,
	postId bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS follows (
	id bigint NOT NULL,
	followerId bigint NOT NULL,
	followedId bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
	id bigint NOT NULL,
	senderId bigint NOT NULL,
	chatId bigint NOT NULL,
	content TEXT,
	attachments bigint []
);

CREATE TABLE IF NOT EXISTS chats (
	id bigint NOT NULL,
	members bigint [],
	coverImage bigint
);

CREATE TABLE IF NOT EXISTS attachments (
	id bigint NOT NULL,
	userId bigint NOT NULL,
	type VARCHAR(255) NOT NULL,
	url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS bookmarks (
	id bigint NOT NULL,
	userId bigint NOT NULL,
	postId bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS tokens (
	id bigint NOT NULL,
	userId bigint NOT NULL,
	token VARCHAR(255) NOT NULL,
	validUntil timestamp NOT NULL,
	device VARCHAR(255) NOT NULL

);