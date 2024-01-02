import { useNavigate } from '@solidjs/router';

import { For, Show, Switch, Match, createSignal } from 'solid-js';
import style from './SignUp.module.css';
import { API_URL } from '../../constants';
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-solidjs';
import { AuthTransKeysT, AuthTransKeys, t } from '@/Translation';
const Signup = () => {
	type Panel = 'Username' | 'Email' | 'Password' | 'Repeat' | 'none';
	const [panel, setPanel] = createSignal<Panel>('none');
	const navigate = useNavigate();
	const [loading, setLoading] = createSignal(false);
	const [username, setUsername] = createSignal('');
	const [password, setPassword] = createSignal('');
	const [password2, setPassword2] = createSignal('');
	const [email, setEmail] = createSignal('');

	const [validationErrors, setValidationErrors] = createSignal<Array<AuthTransKeysT>>([
		'usernameNoSpaces',
		'passwordNoSpaces',
		'emailNoSpaces',
		'usernameNoSpecials',
	]);
	const [err, setErr] = createSignal(false);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);

		console.log(username, password);
		fetch(API_URL + '/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				password,
			}),
		}).then((res) => {
			if (res.ok) {
				navigate('/login');
			} else {
				setErr(true);
				setLoading(false);
			}
		});
	};
	function validateUsername(username: string) {
		let validators = [];
		if (username.length >= 3) validators.push('usernameTooShort');
		if (username.length < 64) validators.push('usernameTooLong');
		// special characters
		if (username.match(/[^a-zA-Z0-9,._-]/)) validators.filter((item) => item !== 'usernameNoSpecials');
		else validators.push('usernameNoSpecials');
		if (username.match(/\s/)) validators = validators.filter((item) => item !== 'usernameNoSpaces');
		else validators.push('usernameNoSpaces');
		console.log(validators);
		setValidationErrors(validators as Array<AuthTransKeysT>);
	}
	function validatePassword(password: string) {
		let validators = [];
		if (password.length >= 8) validators.push('passwordTooShort');
		if (password.match(/[A-Z]/)) validators.push('passwordCapitalLetter');
		if (password.match(/[a-z]/)) validators.push('passwordLetter');
		if (password.match(/[0-9]/)) validators.push('passwordNumber');
		if (password.match(/\s/)) validators = validators.filter((item) => item !== 'passwordNoSpaces');
		else validators.push('passwordNoSpaces');
		console.log(validators);
		setValidationErrors(validators as Array<AuthTransKeysT>);
	}
	function validateEmail(email: string) {
		let validators = [];
		if (email.length >= 5) validators.push('emailTooShort');
		if (email.match(/\s/)) validators = validators.filter((item) => item !== 'emailNoSpaces');
		else validators.push('emailNoSpaces');
		if (email.match(/[^a-zA-Z0-9@.]/)) validators.filter((item) => item !== 'emailNoSpecials');
		else validators.push('emailNoSpecials');
		if (email.match(/@/)) validators.push('emailAt');
		if (email.match(/\./)) validators.push('emailDot');
		// if email is valid pattern
		if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) validators.push('emailPattern');
		else validators = validators.filter((item) => item !== 'emailPattern');
		console.log(validators);
		setValidationErrors(validators as Array<AuthTransKeysT>);
	}
	return (
		<div class={style.Signup}>
			<div class={style.magicBorder}>
				<form onSubmit={handleSubmit} class={style.registerForm}>
					<Show when={!loading() && !err()} fallback={<p>Something went wrong</p>}>
						<h1>Rejestracja</h1>
						<input
							type="text"
							placeholder="username"
							value={username()}
							oninput={(e) => {
								setUsername(e.target.value);
								validateUsername(e.currentTarget.value);
							}}
							onFocus={() => {
								setPanel('Username');
								validateUsername(username());
							}}
						/>
						<input
							type="text"
							placeholder="email"
							value={email()}
							onFocus={() => setPanel('Email')}
							oninput={(e) => {
								setEmail(e.currentTarget.value);
								validateEmail(e.currentTarget.value);
							}}
							onfocus={() => {
								validateEmail(email());
								setPanel('Email');
							}}
						/>

						<input
							type="password"
							placeholder="password"
							value={password()}
							oninput={(e) => {
								setPassword(e.currentTarget.value);
								console.log(e.currentTarget.value);
								validatePassword(e.currentTarget.value);
							}}
							onFocus={() => {
								validatePassword(password());
								setPanel('Password');
							}}
						/>
						<input
							type="password"
							placeholder="Repeat password"
							value={password2()}
							oninput={(e) => {
								setPassword2(e.target.value);
								let validators = [];
								if (password2() == password()) validators.push('passwordsMatch');

								console.log(validators);
								setValidationErrors(validators as Array<AuthTransKeysT>);
							}}
							onFocus={() => setPanel('Repeat')}
						/>

						<button type="submit">Register</button>
					</Show>
				</form>
			</div>

			<div class={style.validators}>
				<h3>{panel()} requairements:</h3>

				<For each={AuthTransKeys}>
					{(item) => (
						<Switch fallback="">
							<Match when={panel() === 'Username' && item.startsWith('username')}>
								<Show
									when={validationErrors().includes(item)}
									fallback={
										<div class={style.error}>
											<IconAlertCircle />
											<h3>{t.auth[item]()}</h3>
										</div>
									}
								>
									<div class={[style.valid, style.error].join(' ')}>
										<IconCircleCheck />
										<h3>{t.auth[item]()}</h3>
									</div>
								</Show>
							</Match>
							<Match when={panel() === 'Email' && item.startsWith('email')}>
								<Show
									when={validationErrors().includes(item)}
									fallback={
										<div class={style.error}>
											<IconAlertCircle />
											<h3>{t.auth[item]()}</h3>
										</div>
									}
								>
									<div class={[style.valid, style.error].join(' ')}>
										<IconCircleCheck />
										<h3>{t.auth[item]()}</h3>
									</div>
								</Show>
							</Match>
							<Match when={panel() === 'Password' && item.startsWith('password')}>
								<Show
									when={validationErrors().includes(item)}
									fallback={
										<div class={style.error}>
											<IconAlertCircle />
											<h3>{t.auth[item]()}</h3>
										</div>
									}
								>
									<div class={[style.valid, style.error].join(' ')}>
										<IconCircleCheck />
										<h3>{t.auth[item]()}</h3>
									</div>
								</Show>
							</Match>
							<Match when={panel() === 'Repeat' && item.startsWith('repeat')}>
								<Show
									when={validationErrors().includes(item)}
									fallback={
										<div class={style.error}>
											<IconAlertCircle />
											<h3>{t.auth[item]()}</h3>
										</div>
									}
								>
									<div class={[style.valid, style.error].join(' ')}>
										<IconCircleCheck />
										<h3>{t.auth[item]()}</h3>
									</div>
								</Show>
							</Match>
						</Switch>
					)}
				</For>
			</div>
		</div>
	);
};

export default Signup;
