import style from './PostBar.module.css';

export default function PostBar(props: { className?: string }) {
	return (
		<div class={style.content_header}>
			<button>For You</button>
			<button>Following</button>
		</div>
	);
}
