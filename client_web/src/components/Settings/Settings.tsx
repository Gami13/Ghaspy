import style from './Settings.module.css';

export default function Settings(props: { className?: string }) {
	return (
		<main class={[style.content, props.className].join(' ')}>
			<div class={style.content_header}>
				<button>For You</button>
				<button>Setiings</button>
			</div>
		</main>
	);
}
