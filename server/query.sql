-- name: SelectLoggedInUserProfile :one
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
	JOIN tokens ON tokens.userid = usersDetails.id
WHERE tokens.token = $1;

-- name: SelectAuthData :one
SELECT id,
	salt,
	password,
	isValidated
FROM users
WHERE email = $1;

-- name: InsertToken :one
INSERT INTO tokens (id, userId, token, device)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: SelectTakenUsername :one
SELECT COUNT(id)
FROM users
WHERE username = $1;

-- name: SelectTakenEmail :one
SELECT COUNT(id)
FROM users
WHERE email = $1;

-- name: InsertNewUser :execrows
INSERT INTO users (id, username, email, password, salt, isValidated)
VALUES ($1, $2, $3, $4, $5, $6);

-- name: InsertVerificationToken :execrows
INSERT INTO verifications (id, userId, code, validUntil)
VALUES ($1, $2, $3, $4);

-- name: SelectVerificationToken :one
SELECT id,
	userId,
	code,
	validUntil
FROM verifications
WHERE code LIKE $1;

-- name: SelectEmailFromID :one
SELECT email
FROM users
WHERE id = $1;

-- name: SelectIsVerified :one
SELECT isValidated
FROM users
WHERE id = $1;

-- name: UpdateIsVerified :execrows
UPDATE users
SET isValidated = true
WHERE id = $1;

-- name: DeleteToken :execrows
DELETE FROM tokens
WHERE token = $1;

-- name: UpdateDisplayName :one
UPDATE users
SET displayName = $1
FROM tokens
WHERE tokens.token = $2
	AND users.id = tokens.userId
RETURNING displayName;

-- name: UpdateBio :one
UPDATE users
SET bio = $1
FROM tokens
WHERE tokens.token = $2
	AND users.id = tokens.userId
RETURNING bio;

-- name: UpdateToggleIsFollowersPublic :one
UPDATE users
SET isFollowersPublic = NOT isFollowersPublic
FROM tokens
WHERE tokens.token = $1
	AND users.id = tokens.userId
RETURNING users.isFollowersPublic;

-- name: UpdateToggleIsFollowingPublic :one
UPDATE users
SET isFollowingPublic = NOT isFollowingPublic
FROM tokens
WHERE tokens.token = $1
	AND users.id = tokens.userId
RETURNING users.isFollowingPublic;

-- name: UpdateToggleIsPostsPublic :one
UPDATE users
SET isPostsPublic = NOT isPostsPublic
FROM tokens
WHERE tokens.token = $1
	AND users.id = tokens.userId
RETURNING users.isPostsPublic;

-- name: UpdateToggleIsLikesPublic :one
UPDATE users
SET isLikesPublic = NOT isLikesPublic
FROM tokens
WHERE tokens.token = $1
	AND users.id = tokens.userId
RETURNING users.isLikesPublic;

-- name: UpdateAvatar :one
UPDATE users
SET avatar = $1
FROM tokens
WHERE tokens.token = $2
	AND users.id = tokens.userId
RETURNING avatar;

-- name: UpdateBanner :one
UPDATE users
SET banner = $1
FROM tokens
WHERE tokens.token = $2
	AND users.id = tokens.userId
RETURNING banner;

-- name: SelectUser :one
SELECT usersDetails.id,
	usersDetails.username,
	usersDetails.displayName,
	usersDetails.bio,
	usersDetails.avatar,
	usersDetails.banner,
	usersDetails.isFollowersPublic,
	usersDetails.isFollowingPublic,
	usersDetails.isPostsPublic,
	usersDetails.isLikesPublic,
	usersDetails.countlikes,
	usersDetails.countposts,
	usersDetails.countisfollowing,
	usersDetails.countfollowedby,
	(
		SELECT CASE
				WHEN COUNT(follows.id) > 0 THEN true
				ELSE false
			END AS isFollowed
		FROM follows,
			usersDetails
		WHERE follows.followedid = usersDetails.id
			AND usersDetails.username = $1
			AND follows.followerId = (
				SELECT tokens.userId
				FROM tokens
				WHERE tokens.token = $2
			)
	) AS isFollowed,
	(
		SELECT CASE
				WHEN COUNT(follows.id) > 0 THEN true
				ELSE false
			END AS isFollowingYou
		FROM follows,
			usersDetails
		WHERE follows.followerId = usersDetails.id
			AND usersDetails.username = $1
			AND follows.followedid = (
				SELECT tokens.userId
				FROM tokens
				WHERE tokens.token = $2
			)
	) AS isFollowingYou,
	(
		SELECT CASE
				WHEN COUNT(tokens.id) > 0 THEN true
				ELSE false
			END AS isYou
		FROM tokens,
			usersDetails
		WHERE tokens.userId = usersDetails.id
			AND usersDetails.username = $1
			AND tokens.token = $2
	) AS isYou
FROM usersDetails
WHERE usersDetails.username = $1;

-- name: SelectThreadStart :one
SELECT posts.threadStart
FROM posts
WHERE posts.id = $1;

-- name: InsertNewPost :execrows
INSERT INTO posts (
		id,
		authorId,
		content,
		quoteOf,
		replyTo,
		attachments,
		threadStart
	)
VALUES (
		$1,
		(
			SELECT tokens.userId
			FROM tokens
			WHERE tokens.token = $2
		),
		$3,
		$4,
		$5,
		$6,
		$7
	);

-- name: ToggleBookmark :one
INSERT INTO bookmarks(id, userid, postid, isenabled)
VALUES(
		$1,
		(
			SELECT tokens.userId
			FROM tokens
			WHERE tokens.token = $2
		),
		$3,
		true
	) ON CONFLICT(userid, postid) DO
UPDATE
SET isenabled = NOT bookmarks.isenabled
RETURNING isenabled;

-- name: ToggleLike :one
INSERT INTO likes(id, userid, postid, isenabled)
VALUES(
		$1,
		(
			SELECT tokens.userId
			FROM tokens
			WHERE tokens.token = $2
		),
		$3,
		true
	) ON CONFLICT(userid, postid) DO
UPDATE
SET isenabled = NOT likes.isenabled
RETURNING isenabled;

-- name: ToggleFollow :one
INSERT INTO follows(id, followerid, followedid, isenabled)
VALUES(
		$1,
		(
			SELECT tokens.userId
			FROM tokens
			WHERE tokens.token = $2
		),
		$3,
		true
	) ON CONFLICT(followerid, followedid) DO
UPDATE
SET isenabled = NOT follows.isenabled
RETURNING isenabled;

-- name: DeletePost :execrows
DELETE FROM posts
WHERE posts.id = $1
	AND posts.authorId = (
		SELECT tokens.userId
		FROM tokens
		WHERE tokens.token = $2
	);

-- name: SelectPostsChronologically :many
SELECT id,
	authorId,
	username,
	displayname,
	bio,
	avatar,
	banner,
	isfollowerspublic,
	isfollowingpublic,
	ispostspublic,
	islikespublic,
	countlikes,
	countposts,
	countisfollowing,
	countfollowedby,
	content,
	replyTo,
	quoteOf,
	attachments,
	postCountLikes,
	postCountQuotes,
	postCountReplies,
	isPostLiked,
	isPostBookmarked,
	threadStart
FROM getPosts($1) as p
LIMIT 50 OFFSET $2;

-- name: SelectPostByID :one
SELECT id,
	authorId,
	username,
	displayname,
	bio,
	avatar,
	banner,
	isfollowerspublic,
	isfollowingpublic,
	ispostspublic,
	islikespublic,
	countlikes,
	countposts,
	countisfollowing,
	countfollowedby,
	content,
	replyTo,
	quoteOf,
	attachments,
	postCountLikes,
	postCountQuotes,
	postCountReplies,
	isPostLiked,
	isPostBookmarked,
	threadStart
FROM getPosts(@Token::text) as p
WHERE p.id = (@PostID::bigint);

-- name: SelectPostsByUserChronologically :many
SELECT id,
	authorId,
	username,
	displayname,
	bio,
	avatar,
	banner,
	isfollowerspublic,
	isfollowingpublic,
	ispostspublic,
	islikespublic,
	countlikes,
	countposts,
	countisfollowing,
	countfollowedby,
	content,
	replyTo,
	quoteOf,
	attachments,
	postCountLikes,
	postCountQuotes,
	postCountReplies,
	isPostLiked,
	isPostBookmarked,
	threadStart
FROM getPosts(@Token::text) as p
WHERE p.username = (@Username::text)
ORDER BY p.id DESC
LIMIT 50 OFFSET $3;

-- name: SelectThreadReplies :many
SELECT id,
	authorId,
	username,
	displayname,
	bio,
	avatar,
	banner,
	isfollowerspublic,
	isfollowingpublic,
	ispostspublic,
	islikespublic,
	countlikes,
	countposts,
	countisfollowing,
	countfollowedby,
	content,
	replyTo,
	quoteOf,
	attachments,
	postCountLikes,
	postCountQuotes,
	postCountReplies,
	isPostLiked,
	isPostBookmarked,
	threadStart
FROM getPosts(@token) as p
WHERE p.threadStart = @postID
	AND p.id != @postID
ORDER BY p.id DESC
LIMIT 50 OFFSET sqlc.arg(pageNumber)::integer;