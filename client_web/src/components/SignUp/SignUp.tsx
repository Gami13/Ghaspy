import { useNavigate } from '@solidjs/router';

import { For, Show, Switch, Match, createEffect, createSignal } from 'solid-js';
import style from './SignUp.module.css';
import { API_URL } from '../../constants';
import { IconAlertHexagon, IconLock, IconLockOpen } from '@tabler/icons-solidjs';
import { AuthTransKeysT, AuthTransKeys, t } from '@/Translation';
const Signup = () => {
	type Panel = 'Username' | 'Email' | 'Password' | 'none';
	const [panel, setPanel] = createSignal<Panel>('none');
	const navigate = useNavigate();
	const [loading, setLoading] = createSignal(false);
	const [username, setUsername] = createSignal('');
	const [password, setPassword] = createSignal('');
	const [password2, setPassword2] = createSignal('');
	const [email, setEmail] = createSignal('');

	const [validationErrors, setValidationErrors] = createSignal<Array<AuthTransKeysT>>([]);
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
	function validate(password: string) {
		console.log('chuj');

		let errors = [];
		// setValidationErrors((prev) => [...prev, 'passwordTooShort']);
		if (password.length > 8) errors.push('passwordTooShort');
		if (password.match(/[A-Z]/)) errors.push('passwordCapitalLetter');
		if (password.match(/[a-z]/)) errors.push('passwordLetter');
		if (password.match(/[0-9]/)) errors.push('passwordNumber');
		if (password.match(/ /)) errors.push('passwordNoSpaces');

		console.log(errors);
		setValidationErrors(errors as Array<AuthTransKeysT>);
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
							onChange={(e) => {
								setUsername(e.target.value);
							}}
							onFocus={() => setPanel('Username')}
						/>
						<input
							type="text"
							placeholder="email"
							value={email()}
							onFocus={() => setPanel('Email')}
							onChange={(e) => {
								setEmail(e.currentTarget.value);
							}}
						/>

						<input
							type="password"
							placeholder="password"
							value={password()}
							onkeydown={(e) => validate(e.currentTarget.value + e.key)}
							onChange={(e) => {
								setPassword(e.currentTarget.value);
							}}
							onFocus={() => setPanel('Password')}
						/>
						<input
							type="password"
							placeholder="Repeat password"
							value={password2()}
							onChange={(e) => {
								setPassword2(e.target.value);
							}}
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
											<IconLock />
											<h3>{t.auth[item]()}</h3>
										</div>
									}
								>
									<div class={[style.valid, style.error].join(' ')}>
										<IconLockOpen />
										<h3>{t.auth[item]()}</h3>
									</div>
								</Show>
							</Match>
							<Match when={panel() === 'Email' && item.startsWith('email')}>
								<Show
									when={validationErrors().includes(item)}
									fallback={
										<div class={style.error}>
											<IconLock />
											<h3>{t.auth[item]()}</h3>
										</div>
									}
								>
									<div class={[style.valid, style.error].join(' ')}>
										<IconLockOpen />
										<h3>{t.auth[item]()}</h3>
									</div>
								</Show>
							</Match>
							<Match when={panel() === 'Password' && item.startsWith('password')}>
								<Show
									when={validationErrors().includes(item)}
									fallback={
										<div class={style.error}>
											<IconLock />
											<h3>{t.auth[item]()}</h3>
										</div>
									}
								>
									<div class={[style.valid, style.error].join(' ')}>
										<IconLockOpen />
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
