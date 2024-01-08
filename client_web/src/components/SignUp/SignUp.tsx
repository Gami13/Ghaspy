import { useNavigate } from '@solidjs/router';

import { For, Show, Switch, Match, createSignal, onMount } from 'solid-js';
import style from './SignUp.module.css';
import { API_URL } from '../../constants';
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-solidjs';
import { AuthTransKeysT, AuthTransKeys, t } from '@/Translation';
const Signup = () => {
	// panel type

	type Panel = 'username' | 'email' | 'password' | 'repeat' | 'none';

	const [loading, setLoading] = createSignal(false);
	const [username, setUsername] = createSignal('');
	const [password, setPassword] = createSignal('');
	const [passwordRepeat, setPasswordRepeat] = createSignal('');
	const [email, setEmail] = createSignal('');

	const [panel, setPanel] = createSignal<Panel>('none');
	const [filledRequirements, setFilledRequirements] = createSignal<Array<AuthTransKeysT>>([]);
	const [backendErrors, setBackendErrors] = createSignal<Array<AuthTransKeysT>>([]);
	const [err, setErr] = createSignal(false);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (filledRequirements().length != AuthTransKeys.length - 2) return;
		setLoading(true);
		console.log(username, password);
		fetch(API_URL + '/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: username(),
				password: password(),
				email: email(),
			}),
		})
			.then((res) => {
				if (res.status == 200) {
					alert('Account created');
					setLoading(false);
					// navigate('/login');
				} else {
					res.json().then((data) => {
						const backErr = [];
						console.log(data);
						if (data.emailErrors) {
							backErr.push(...data.emailErrors);
						}
						if (data.usernameErrors) {
							backErr.push(...data.usernameErrors);
						}
						if (data.passwordErrors) {
							backErr.push(...data.passwordErrors);
						}
						console.log(backErr);
						setBackendErrors(backErr);

						setLoading(false);
					});
				}
			})
			.catch((err) => {
				console.log(err);
				setErr(true);
			});
	};
	function validate() {
		let validators = [];
		if (username().length >= 3) validators.push('usernameTooShort');
		if (username().length <= 64) validators.push('usernameTooLong');
		// special characters
		if (!username().match(/[^a-zA-Z0-9,._-]/) || username().length == 0) validators.push('usernameNoSpecials');

		if (!username().match(/\s/)) validators.push('usernameNoSpaces');
		if (password().length >= 8) validators.push('passwordTooShort');
		if (password().match(/[A-Z]/)) validators.push('passwordCapital');
		if (password().match(/[a-z]/)) validators.push('passwordLetter');
		if (password().match(/[0-9]/)) validators.push('passwordNumber');
		if (!password().match(/\s/)) validators.push('passwordNoSpaces');
		if (email().length >= 3 && email()[0] != '@' && email()[email().length - 1] != '@' && email().includes('@'))
			validators.push('emailInvalid');
		if (passwordRepeat() == password()) validators.push('passwordRepeat');

		console.log(validators);
		setFilledRequirements(validators as Array<AuthTransKeysT>);
	}

	onMount(() => {
		validate();
	});
	return (
		<div class={style.Signup}>
			<form onSubmit={handleSubmit} class={style.registerForm}>
				<Show when={!loading() && !err()} fallback={<p>Something went wrong</p>}>
					<h1>Rejestracja</h1>
					<input
						type="text"
						placeholder="username"
						oninput={(e) => {
							setUsername(e.target.value);
							validate();
						}}
						onfocus={() => {
							setPanel('username');
						}}
					/>
					<input
						type="text"
						placeholder="email"
						oninput={(e) => {
							setEmail(e.currentTarget.value);
							validate();
						}}
						onfocus={() => {
							setPanel('email');
						}}
					/>

					<input
						type="password"
						placeholder="password"
						oninput={(e) => {
							setPassword(e.currentTarget.value);

							validate();
						}}
						onfocus={() => {
							setPanel('password');
						}}
					/>
					<input
						type="password"
						placeholder="Repeat password"
						oninput={(e) => {
							setPasswordRepeat(e.target.value);

							validate();
						}}
						onfocus={() => {
							setPanel('repeat');
						}}
					/>

					<button type="submit">Register</button>
				</Show>
			</form>

			<div class={style.validators}>
				<h3>Sign Up requirements:</h3>

				<For each={AuthTransKeys}>
					{(item) => {
						console.log('item', item);
						return (
							<Show
								when={
									!filledRequirements().includes(item) && (!item.includes('Taken') || backendErrors().includes(item))
								}
							>
								<div
									classList={{
										[style.error]: true,
										[style.backendError]: backendErrors().includes(item),
										[style.current]: item.includes(panel()),
									}}
								>
									<IconAlertCircle />
									<h3>{t.auth[item]()}</h3>
								</div>
							</Show>
						);
					}}
				</For>
			</div>
		</div>
	);
};

export default Signup;
