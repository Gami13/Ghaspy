import { useNavigate } from '@solidjs/router';

import { For, Show, createSignal, onMount } from 'solid-js';

import style from './Login.module.css';
import { IconAlertCircle } from '@tabler/icons-solidjs';
import { AuthTransKeysT, AuthTransKeys, t, LoginTransKeysT } from '@/Translation';
import { API_URL } from '@/constants';
import { useAppState } from '@/AppState';
const Login = () => {
	const AppState = useAppState();
	const navigate = useNavigate();

	const [password, setPassword] = createSignal('');
	const [email, setEmail] = createSignal('');

	const [err, setErr] = createSignal<LoginTransKeysT>();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!email() || !password()) return setErr('empty');

		const browser = navigator.userAgent.toLowerCase();
		console.log(browser);
		console.log(email, password);
		fetch(API_URL + '/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email(),
				password: password(),
				deviceName: navigator.userAgent.toLowerCase(),
			}),
		})
			.then((res) => {
				if (res.status == 200) {
					alert('logged in');

					res.json().then((data) => {
						AppState.setIsLoggedIn(true);
						AppState.setUserToken(data.token);
						AppState.setUserId(data.userId);
						window.localStorage.setItem('token', data.token);
						window.localStorage.setItem('userId', data.userId);
						alert('logged in' + data.token);
						navigate('/');
					});
				} else {
					res.json().then((data) => {
						setErr(data.message);
					});
				}
			})
			.catch((err) => {
				console.log(err);
				setErr('error');
			});
	};

	return (
		<div class={style.Login}>
			<form onSubmit={handleSubmit} class={style.registerForm}>
				<h1>{t.login.logIn()}</h1>

				<input
					type="text"
					placeholder={t.login.email()}
					oninput={(e) => {
						setEmail(e.currentTarget.value);
					}}
				/>

				<input
					type="password"
					placeholder={t.login.password()}
					oninput={(e) => {
						setPassword(e.currentTarget.value);
					}}
				/>

				<button type="submit">{t.login.logIn()}</button>
			</form>

			<Show when={err()}>
				<div class={style.validators}>
					<h3>{t.login.errorLabel()}</h3>

					<div class={style.error}>
						<IconAlertCircle />

						<h3>{t.login[err() || 'empty']()}</h3>
					</div>
				</div>
			</Show>
		</div>
	);
};

export default Login;
