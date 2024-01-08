import { useNavigate } from '@solidjs/router';

import { For, Show, createSignal } from 'solid-js';

import style from './Login.module.css';
import { IconAlertCircle } from '@tabler/icons-solidjs';
import { AuthTransKeysT, AuthTransKeys, t, LoginTransKeysT } from '@/Translation';
const Login = () => {
	const navigate = useNavigate();
	type Panel = 'email' | 'password' | 'none';
	const [panel, setPanel] = createSignal<Panel>('none');
	const [password, setPassword] = createSignal('');
	const [email, setEmail] = createSignal('');

	const [err, setErr] = createSignal<LoginTransKeysT>();
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!email() || !password()) return setErr('empty');

		console.log(email, password);
	};

	return (
		<div class={style.Login}>
			<div class={style.magicBorder}>
				<form onSubmit={handleSubmit} class={style.registerForm}>
					<h1>Logowanie</h1>

					<input
						type="text"
						placeholder="email"
						value={email()}
						oninput={(e) => {
							setEmail(e.currentTarget.value);
						}}
						onfocus={() => {
							setPanel('email');
						}}
					/>

					<input
						type="password"
						placeholder="password"
						value={password()}
						oninput={(e) => {
							setPassword(e.currentTarget.value);
						}}
						onFocus={() => {
							setPanel('password');
						}}
					/>

					<button type="submit">Zaloguj</button>
				</form>
			</div>

			<Show when={err()}>
				<div class={style.validators}>
					<h3>Błąd:</h3>

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
