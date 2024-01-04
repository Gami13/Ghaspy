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
import style from './Navbar.module.css';
import { t } from '@/Translation';
import { useAppState } from '@/AppState';
import { Show, createSignal } from 'solid-js';
import { A } from '@solidjs/router';
export default function Navbar(props: { className?: string }) {
	const AppState = useAppState();

	return (
		<nav class={[style.nav, props.className].join(' ')}>
			<div>
				<A href="/" class={style.logo} onClick={() => setActiveComponent('postbar')}>
					<img src="logo_nobg.png" alt="" />
				</A>
				<A href="/" onClick={() => setActiveComponent('postbar')}>
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
					<A href="">
						<IconBell />
						<h3>{t.nav.alerts()}</h3>
					</A>
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
					<A href="">
						<IconUser />
						<h3>{t.nav.profile()}</h3>
					</A>
				</Show>

				<button class={style.post}>Post</button>
			</div>
			<div class={style.user}>
				<img alt="" class={style.user_avatar} src="http://fakeimg.pl/512x512?font=lobster"></img>
				<div class={style.user_data}>
					<h3>Username</h3>
					<p>@username</p>
				</div>
				<IconDotsVertical onClick={() => setActiveComponent('settings')} />
			</div>
		</nav>
	);
}

export const [activeComponent, setActiveComponent] = createSignal('postbar');
