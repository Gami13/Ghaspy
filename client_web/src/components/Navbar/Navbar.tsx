import {
	IconMail,
	IconBell,
	IconSearch,
	IconHome,
	IconList,
	IconUser,
	IconUsers,
	IconDotsVertical,
	IconPin,
} from '@tabler/icons-solidjs';
import { CDN_URL } from '@/constants';

import style from './Navbar.module.css';
import { t } from '@/Translation';
import { useAppState } from '@/AppState';
import { Show, createSignal } from 'solid-js';
import { A } from '@solidjs/router';
export default function Navbar(props: { className?: string }) {
	const AppState = useAppState();

	//get user data

	return (
		<nav class={[style.nav, props.className].join(' ')}>
			<div>
				<A href="/" class={style.logo}>
					<img src="logo.png" alt="TEMP" />
				</A>
				<A href="/">
					<IconHome />
					<h3>{t.nav.home()}</h3>
				</A>
				<A href="/">
					<IconSearch />
					<h3>{t.nav.explore()}</h3>
				</A>

				<Show
					when={AppState.isLoggedIn()}
					fallback={
						<>
							<A href="/login">
								<IconUsers />
								<h3>{t.nav.logIn()}</h3>
							</A>
							<A href="/signup">
								<IconUsers />
								<h3>{t.nav.signUp()}</h3>
							</A>
						</>
					}
				>
					{/* <A href="">
						<IconBell />
						<h3>{t.nav.alerts()}</h3>
					</A> */}
					<A href="">
						<IconMail />
						<h3>{t.nav.inbox()}</h3>
					</A>
					<A href="">
						<IconList />
						<h3>{t.nav.lists()}</h3>
					</A>
					<A href="">
						<IconPin />

						<h3>{t.nav.pins()}</h3>
					</A>
					<A href={`/${AppState.userName()}`}>
						<IconUser />
						<h3>{t.nav.profile()}</h3>
					</A>
					<button class={style.post}>Post</button>
				</Show>
			</div>
			<Show when={AppState.isLoggedIn()}>
				<div class={style.user}>
					<img class={style.user_avatar} src={`${CDN_URL}${AppState.userAvatar()}`} alt="TEMP" />
					<div class={style.user_data}>
						<h3>{AppState.userDisplayName()}</h3>
						<p>{AppState.userName()}</p>
					</div>
					<A href={`/${AppState.userName()}`}>
						<IconDotsVertical
							onclick={() => {
								t.nav.profile();
							}}
						/>
					</A>
				</div>
			</Show>
		</nav>
	);
}

export const [activeComponent, setActiveComponent] = createSignal('postbar');
