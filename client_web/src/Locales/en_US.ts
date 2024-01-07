export default {
	appName: 'Beeper',
	hello: 'hello {{ name }}, how are you?',
	nav: {
		home: 'Home',
		explore: 'Explore',
		alerts: 'Alerts',
		inbox: 'Inbox',
		lists: 'Lists',
		pins: 'Pins',
		profile: 'Profile',
		more: 'More',
		logIn: 'Log in',
		signUp: 'Sign up',
	},
	auth: {
		usernameTooShort: 'Username must be at least 3 characters long',
		usernameTooLong: 'Username cannot be longer than 64 characters',
		usernameNoSpecials: 'Only these special characters: , . - _ are allowed',
		usernameNoSpaces: 'Username cannot contain spaces',
		usernameTaken: 'This username is already taken',

		passwordTooShort: 'Password must be at least 8 characters long',
		passwordCapital: 'Password must contain a capital letter',
		passwordLetter: 'Password must contain a letter',
		passwordNumber: 'Password must contain a number',
		passwordNoSpaces: 'Password cannot contain spaces',

		passwordRepeat: 'Passwords must match',

		emailInvalid: 'Invalid email address',
		emailTaken: 'This email address is already taken',
	},
};
