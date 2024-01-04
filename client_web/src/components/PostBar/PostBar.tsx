import { IconSettings } from '@tabler/icons-solidjs';
import style from './PostBar.module.css';

export default function PostBar(props: { className?: string }) {
	return (
		<main class={[style.content, props.className].join(' ')}>
			<div class={style.content_header}>
				<button>For You</button>
				<button>Following</button>
				<IconSettings />
			</div>
		</main>
	);
}
