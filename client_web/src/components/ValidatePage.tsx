import { useParams } from "@solidjs/router";
import { onMount } from "solid-js";

export function ValidatePage() {
	const token=useParams().token;

	onMount(() => {
		//VALIDATE HERE
	});

	return (
		<main>
			<h1>ValidatePage</h1>
			<p>Token: {token}</p>
		</main>
	);
}
