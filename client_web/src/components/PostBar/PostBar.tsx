import {
	IconSettings,
	IconPhoto,
	IconGif,
	IconAdjustmentsHorizontal,
	IconMoodSmile,
	IconCalendarClock,
	IconMapPin,
} from '@tabler/icons-solidjs';
import { A } from '@solidjs/router';
import style from './PostBar.module.css';
import { createSignal } from 'solid-js';
import { CDN_URL } from '@/constants';
import { useAppState } from '@/AppState';
import PostWriter from './PostWriter';

export default function PostBar() {
	return (
		<>
			<div class={style.content_header}>
				<button>For You</button>
				<button>Following</button>
			</div>
			<PostWriter />
		</>
	);
}
