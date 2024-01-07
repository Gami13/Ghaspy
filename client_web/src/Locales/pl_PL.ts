export default {
	appName: 'Beeper',
	hello: 'cześć {{ name }}, jak się masz?',
	nav: {
		home: 'Strona główna',
		explore: 'Odkrywaj',
		alerts: 'Powiadomienia',
		inbox: 'Wiadomości',
		lists: 'Listy',
		pins: 'Piny',
		profile: 'Profil',
		more: 'Więcej',
		logIn: 'Zaloguj się',
		signUp: 'Zarejestruj się',
	},
	auth: {
		usernameTooShort: 'Nazwa użytkownika musi mieć minimum 3 znaki',
		usernameTooLong: 'Nazwa użytkownika nie może być dłuższa niż 64 znaki',
		usernameNoSpecials: 'Tylko te znaki specjalne: , . - _ są dozwolone w nazwie użytkownika',
		usernameNoSpaces: 'Nazwa użytkownika nie może zawierać spacji',
		usernameTaken: 'Ta nazwa użytkownika jest już zajęta',

		passwordTooShort: 'Hasło musi mieć minimum 8 znaków',
		passwordCapital: 'Hasło musi zawierać wielką literę',
		passwordLetter: 'Hasło musi zawierać literę',
		passwordNumber: 'Hasło musi zawierać cyfrę',
		passwordNoSpaces: 'Hasło nie może zawierać spacji',

		passwordRepeat: 'Hasła muszą być takie same',

		emailInvalid: 'Niepoprawny adres email',
		emailTaken: 'Ten adres email jest już zajęty',
	},
		emailOrPasswordIncorrect: 'Email lub hasło niepoprawne',
		emailOrPasswordEmpty: 'Email lub hasło puste',
};
