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

export default function PostBar(props: { className?: string }) {
	const [text, setText] = createSignal('');

	return (
		<>
			<div class={style.content_header}>
				<button>For You</button>
				<button>Following</button>
			</div>
			<div class={style.postTemplate}>
				<A href="">
					<img alt="" class={style.user_avatar} src="http://fakeimg.pl/512x512?font=lobster"></img>
				</A>
				<div class={style.post}>
					<div
						class={style.post_text}
						role="textbox"
						aria-hidden="true"
						contentEditable="plaintext-only"
						onfocus={(e) => {
							if (e.currentTarget.innerText == "What's happening?") e.currentTarget.innerText = '';
							e.currentTarget.style.color = 'white';
						}}
						onblur={(e) => {
							if (e.currentTarget.innerText == '') {
								e.currentTarget.innerText = "What's happening?";
								e.currentTarget.style.color = 'var(--text2)';
							}
						}}
						oninput={(e) => {
							setText(e.currentTarget.innerText);

							e.currentTarget.style.height = 'auto';

							e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';

							console.log(text());
						}}
						innerText={"What's happening?"}
					></div>
					<hr />
					<div class={style.post_buttons}>
						<IconPhoto></IconPhoto>
						<IconGif></IconGif>
						<IconAdjustmentsHorizontal></IconAdjustmentsHorizontal>
						<IconMoodSmile></IconMoodSmile>
						<IconCalendarClock></IconCalendarClock>
						<IconMapPin></IconMapPin>
						<button class={style.postButton}>Post</button>
					</div>
				</div>
			</div>
		</>
	);
}
