// firebase create user with nickname and password
import { useNavigate } from '@solidjs/router';
import { IconCloudCheck, IconCloudUpload } from '@tabler/icons-solidjs';
import { createSignal } from 'solid-js';
import style from '../CSS/SignUp.module.css';
const Signup = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = createSignal(false);
	const [username, setUsername] = createSignal('');
	const [password, setPassword] = createSignal('');
	const [err, setErr] = createSignal(false);
	const [file_valid, setFileValid] = createSignal(false);
	const [fileName, setFileName] = createSignal('Upload profile picture');
	const handleFile = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			if (file.type === 'image/jpeg' || file.type === 'image/png') {
				setFileValid(true);
				setFileName(file.name);
			} else {
				setFileValid(false);
			}
		}
	};
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		setUsername(e.target[0].value);

		const file = e.target[3].files[0];
		console.log(username, password, file);

		try {
			//Create user
			const res = await fetch('http://localhost:5000/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username,
					password,
				}),
			});
		} catch (err) {
			setErr(true);
			setLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit} class={style.registerForm}>
			{err() && <p>Something went wrong</p>}
			{!loading && !err && (
				<>
					<input
						type="text"
						placeholder="username"
						value={username()}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>

					<input
						type="password"
						placeholder="password"
						value={password()}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<label class={style.customUpload + ' ' + (file_valid() ? style.fileValid : style.fileInvalid)}>
						{file_valid() ? <IconCloudCheck /> : <IconCloudUpload />}
						<p>{fileName()}</p>
					</label>
					<input
						id="file-upload"
						type="file"
						accept="jpg, png"
						onChange={(e) => {
							handleFile(e);
						}}
					/>

					<button type="submit">Register</button>
				</>
			)}
		</form>
	);
};

export default Signup;
