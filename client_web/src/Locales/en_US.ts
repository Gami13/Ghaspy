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
	auth:{
		usernameTooShort: 'Username must be at least 3 characters long',
		usernameTooLong:'Username must be at most 64 characters long',
		usernameNoSpaces:'Username must not contain spaces',
		usernameNoSpecials: "Username must not contain special characters other than: , . - _",
		
		passwordTooShort: 'Password must be at least 8 characters long',
		passwordCapitalLetter: 'Password must contain at least one capital letter',
		passwordLetter: 'Password must contain at least one letter',
		passwordNumber: 'Password must contain at least one number',
		passwordNoSpaces: 'Password can`t contain spaces',

	}
};
