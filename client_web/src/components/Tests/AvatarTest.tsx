import { API_URL, CDN_URL } from '@/constants';
import { Show, createSignal } from 'solid-js';

export default function AvatarTest() {
	const [filePath, setFilePath] = createSignal('');
	function handleUpload(e: any) {
		e.preventDefault();
		let file = e.target.uploadFile.files[0];
		console.log(file);
		let token = e.target.token.value;
		let formData = new FormData();
		formData.append('file', file);

		fetch(API_URL + '/setAvatar', {
			headers: {
				Authorization: `${token}`,
			},
			method: 'POST',
			body: formData,
		}).then((res) => res.json().then((data) => setFilePath(data.filename)));
	}
	return (
		<form onsubmit={handleUpload}>
			<input type="text" name="token" id="token" />
			<input type="file" name="uploadFile" id="uploadFile" />
			<input type="submit" value="Upload" />
			<Show when={filePath().length > 1}>
				<img src={CDN_URL + filePath()} alt="Uploaded Image" />
			</Show>
		</form>
	);
}
