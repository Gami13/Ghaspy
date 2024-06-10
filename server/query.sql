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