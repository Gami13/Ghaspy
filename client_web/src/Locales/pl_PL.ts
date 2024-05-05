export const pl_PL = {
	appName: "Ghaspy",
	hello: "cześć {{ name }}, jak się masz?",
	loading: "Ładowanie...",

	relativeTime: {
		future: "w {{in}}",
		past: "{{ago}} temu",
		s: "sekunde",
		ss: "{{x}} sekund",

		m: "minute",
		mm: "{{x}} minut",
		h: "godzine",
		hh: "{{x}} godzin",
		d: "dzień",
		dd: "{{x}} dni",
		M: "miesiąc",
		MM: "{{x}} miesięcy",
		y: "rok",
		yy: "{{x}} lat",
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
		logOut: "Wyloguj",
	},

	auth: {
		logIn: "Zaloguj się",
		logInDescription: "Zaloguj się do swojego konta używając swojego adresu email i hasła",
		errorLabel: "Błąd:",
		passwordRepeat: "Powtórz hasło",
		username: "Nazwa użytkownika",
		usernameExample: "JohnDoe",
		email: "Email",
		password: "Hasło",
		emailExample: "przyklad@email.com",
		signUp: "Zarejestruj się",
		signUpDescription: "Zarejestruj się, aby korzystać z naszej platformy",
		signUpSuccessful: "Zarejestrowano",
		signUpSuccessfulDescription: "Potwierdź swoje konto używajając linku w wiadomości, które otrzymałeś na swój adres email",
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

	posts: {
		posts: "Posty",
		likes: "Polubienia",
		whatsHappening: "Co się dzieje?",
		post: "Opublikuj",
	},

	errors: {
		usernameTooShort: "Nazwa użytkownika musi mieć minimum 3 znaki",
		usernameTooLong: "Nazwa użytkownika nie może być dłuższa niż 64 znaki",
		usernameNoSpecials: "Tylko te znaki specjalne: , . - _ są dozwolone w nazwie użytkownika",
		usernameNoSpaces: "Nazwa użytkownika nie może zawierać spacji",
		usernameTaken: "Ta nazwa użytkownika jest już zajęta",

		passwordTooShort: "Hasło musi mieć minimum 8 znaków",
		passwordCapital: "Hasło musi zawierać wielką literę",
		passwordLetter: "Hasło musi zawierać literę",
		passwordNumber: "Hasło musi zawierać cyfrę",
		passwordNoSpaces: "Hasło nie może zawierać spacji",

		passwordRepeat: "Hasła muszą być takie same",

		emailInvalid: "Niepoprawny adres email",
		emailTaken: "Ten adres email jest już zajęty",
		loginDataIncorrect: "Email lub hasło jest niepoprawne",
		loginFieldEmpty: "Email lub hasło jest puste",
		loginUnvalidated: "Email nie został jeszcze zweryfikowany",
		loginCantGenerateToken: "Nie można wygenerować tokenu",
		loginCantInsertToken: "Nie można wstawić tokenu",
		invalidRequest: "Niepoprawne zapytanie",

		unauthorized: "Nie masz uprawnień do wykonania tej akcji",
		cantUnmarshal: "Dane zostały wysłane w niepoprawnym formacie",
		invalidToken: "Niepoprawny token",
		verificationCodeInvalid: "Niepoprawny kod weryfikacyjny",
		verificationCodeOutdated: "Provided verification code is outdated, a new one has been sent to your email",
		userAlreadyValidated: "Użytkownik jest już zweryfikowany",
		cantReadFile: "Nie można odczytać pliku",
		badRequestNoUsername: "Nie podano nazwy użytkownika",
		badRequestQuoteOf: "Nie można odczytać podanego cytatu",
		badRequestReplyTo: "Nie można odczytać podanej odpowiedzi",
		badRequestContentTooLong: "Provided content is too long",
		badRequestNoContent: "Provided content is empty",
		badRequestID: "Provided ID is not a valid ID",
		badRequestNotNumber: "Provided value is not a number",
		cantReadForm: "Cant read form data",
		internalError: "Internal Server Error Occured",
		internalErrorCrit: "We awe vewy sowwy but ouw sewvews have a big oopsie woopsie, pwease twy again watew, we awe sowwy fow the inconvenience",
	},
	success: {
		userSignedUp: "Użytkownik zarejestrowany pomyślnie",
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
