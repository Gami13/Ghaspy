export const en_US = {
	appName: "Ghaspy",
	hello: "cześć {{ name }}, jak się masz?",
	relativeTime: {
		future: "in {{in}}",
		past: "{{ago}} ago",
		s: "a second",
		ss: "{{x}} seconds",
		m: "a minute",
		mm: "{{x}} minutes",
		h: "an hour",
		hh: "{{x}} hours",
		d: "a day",
		dd: "{{x}} days",
		M: "a month",
		MM: "{{x}} months",
		y: "a year",
		yy: "{{x}} years",
	},
	nav: {
		home: "Strona główna",
		explore: "Odkrywaj",
		alerts: "Powiadomienia",
		inbox: "Wiadomości",
		lists: "Listy",
		bookmarks: "Piny",
		profile: "Profil",
		more: "Więcej",
		logIn: "Zaloguj się",
		signUp: "Zarejestruj się",
		settings: "Ustawienia",
	},

	login: {
		logIn: "Zaloguj się",
		errorLabel: "Błąd:",
		email: "Email",
		password: "Hasło",
		passwordRepeat: "Powtórz hasło",
		username: "Nazwa użytkownika",
	},
	profile: {
		edit: "Edytuj Profil",
		bio: "Opis",
		submit: "Zapisz",
		follow: "Obserwuj",
		unfollow: "Odobserwuj",
		mutual: "Znajomy",
		followsYou: "Obserwuje cie",
		following: "Obserwujących",
		followers: "Obserwowanych",
		posts: "Postów",
		likes: "Polubień",
		you: "Ty",
	},
	signup: {
		signUp: "Zarejestruj się",
		requirements: "Wymagania",
	},
	posts: {
		posts: "Posty",
		likes: "Polubienia",
		whatsHappening: "Co się dzieje?",
		post: "Opublikuj",
	},
	authErrors: {
		signupUsernameTooShort: "Nazwa użytkownika musi mieć minimum 3 znaki",
		signupUsernameTooLong: "Nazwa użytkownika nie może być dłuższa niż 64 znaki",
		signupUsernameNoSpecials: "Tylko te znaki specjalne: , . - _ są dozwolone w nazwie użytkownika",
		signupUsernameNoSpaces: "Nazwa użytkownika nie może zawierać spacji",
		signupUsernameTaken: "Ta nazwa użytkownika jest już zajęta",

		signupPasswordTooShort: "Hasło musi mieć minimum 8 znaków",
		signupPasswordCapital: "Hasło musi zawierać wielką literę",
		signupPasswordLetter: "Hasło musi zawierać literę",
		signupPasswordNumber: "Hasło musi zawierać cyfrę",
		signupPasswordNoSpaces: "Hasło nie może zawierać spacji",

		signupPasswordRepeat: "Hasła muszą być takie same",

		signupEmailInvalid: "Niepoprawny adres email",
		signupEmailTaken: "Ten adres email jest już zajęty",
	},
	errors: {
		loginDataIncorrect: "Email lub hasło jest niepoprawne",
		loginFieldEmpty: "Email lub hasło jest puste",
		loginUnvalidated: "Email nie został jeszcze zweryfikowany",
		loginCantGenerateToken: "Nie można wygenerować tokenu",
		loginCantInsertToken: "Nie można wstawić tokenu",
		invalidRequest: "Niepoprawne zapytanie",
		internalError: "Wewnętrzny błąd serwera",
		internalErrorCrit: "Krytyczny wewnętrzny błąd serwera",
		unauthorized: "Nie masz uprawnień do wykonania tej akcji",
		cantUnmarshal: "Dane zostały wysłane w niepoprawnym formacie",
		invalidToken: "Niepoprawny token",
		verificationCodeInvalid: "Niepoprawny kod weryfikacyjny",
		verificationCodeOutdated: "Kod weryfikacyjny nie jest już prawidłowy, nowy kod został wysłany na pocztę elektroniczną",
		userAlreadyValidated: "Użytkownik jest już zweryfikowany",
		cantReadFile: "Nie można odczytać pliku",
		badRequestNoUsername: "Nie podano nazwy użytkownika",
		badRequestQuoteOf: "Nie można odczytać podanego cytatu",
		badRequestReplyTo: "Nie można odczytać podanej odpowiedzi",
		badRequestContentTooLong: "Treść jest zbyt długa",
		badRequestNoContent: "Treść jest pusta",
		badRequestID: "Podane ID nie jest liczbą",
		badRequestNotNumber: "Podane dane nie są liczbą",
		cantReadForm: "Nie można odczytać formularza",
	},
	success: {
		userRegistered: "Użytkownik zarejestrowany pomyślnie",
		userLoggedIn: "Zalogowano pomyślnie",
		userLoggedOut: "Wylogowano pomyślnie",
		userValidated: "Użytkownik zweryfikowany pomyślnie",
		displayNameChanged: "Nazwa wyświetlana zmieniona pomyślnie",
		bioChanged: "Opis zmieniony pomyślnie",
		isFollowersPublicToggled: "Ustawienia obserwujących zmienione pomyślnie",
		isFollowingPublicToggled: "Ustawienia obserwowanych zmienione pomyślnie",
		isPostsPublicToggled: "Ustawienia postów zmienione pomyślnie",
		isLikesPublicToggled: "Ustawienia polubień zmienione pomyślnie",
		avatarChanged: "Zdjęcie profilowe zmienione pomyślnie",
		bannerChanged: "Baner zmieniony pomyślnie",
		bookmarkAdded: "Dodano do zakładek",
		bookmarkRemoved: "Usunięto z zakładek",
		likeAdded: "Polubiono",
		likeRemoved: "Usunięto polubienie",
		followAdded: "Zacząłeś obserwować",
		followRemoved: "Przestałeś obserwować",
		postAdded: "Dodano post",
		postRemoved: "Usunięto post",
	},
};
