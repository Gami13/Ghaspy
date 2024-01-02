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
		usernameTooShort: 'At least 3 characters long',
		usernameTooLong:'At most 64 characters long',
		usernameNoSpecials: "Only: , . - _ special characters allowed",
		usernameNoSpaces:'Username must not contain spaces',

		passwordTooShort: 'At least 8 characters long',
		passwordCapitalLetter: 'At least one capital letter',
		passwordLetter: 'At least one letter',
		passwordNumber: 'At least one number',
		passwordNoSpaces: 'No spaces',

		repeatPassord: 'Passwords must match',	

		emailTooShort: 'At least 5 characters long',
		emailNoSpaces: 'No spaces',
		emailNoSpecials: "No special characters other than @ and .",
		emailNotTaken: 'Email available',
		emailAt: 'Has @',
		emailDot: 'Has .',
		emailPattern: 'Has valid pattern',



	}
};
