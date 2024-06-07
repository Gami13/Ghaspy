-- name: GetLoggedInUserProfile :one
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