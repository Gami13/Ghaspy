import { useNavigate } from '@solidjs/router';

import { For, Show, createSignal } from 'solid-js';

import style from './Login.module.css';
import { IconAlertCircle } from '@tabler/icons-solidjs';
import { AuthTransKeysT, AuthTransKeys, t } from '@/Translation';
const Login = () => {
	const navigate = useNavigate();
	type Panel = 'email' | 'password' | 'none';
	const [panel, setPanel] = createSignal<Panel>('none');
	const [password, setPassword] = createSignal('');
	const [email, setEmail] = createSignal('');

	const [validationErrors, setValidationErrors] = createSignal<Array<AuthTransKeysT>>([]);
	const [err, setErr] = createSignal(false);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setValidationErrors([]);
		if (email().length < 3) setValidationErrors([...validationErrors(), 'emailOrPasswordEmpty']);
		console.log(email, password);
	};

	return (
		<div class={style.Login}>
			<div class={style.magicBorder}>
				<form onSubmit={handleSubmit} class={style.registerForm}>
					<Show when={!err()} fallback={<p>Something went wrong</p>}>
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
					</Show>
				</form>
			</div>

			<Show when={panel() != 'none' && validationErrors().length != 0}>
				<div class={style.validators}>
					<h3>Błąd:</h3>

					<For each={AuthTransKeys}>
						{(item) => (
							<Show when={validationErrors().includes(item)}>
								<div class={style.error}>
									<IconAlertCircle />

									<h3>{t.auth[item]()}</h3>
								</div>
							</Show>
						)}
					</For>
				</div>
			</Show>
		</div>
	);
};

export default Login;
