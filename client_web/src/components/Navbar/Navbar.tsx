import {
	IconMail,
	IconBell,
	IconSearch,
	IconHome,
	IconList,
	IconBookmark,
	IconUser,
	IconUsers,
	IconDotsCircleHorizontal,
	IconDotsVertical,
	IconPin,
} from '@tabler/icons-solidjs';
import style from './Navbar.module.css';
import { t } from '@/Translation';
export default function Navbar(props: { className?: string }) {
	return (
		<nav class={[style.nav, props.className].join(' ')}>
			<a href="" class={style.logo}>
				<img src="" alt="" />
			</a>
			<div>
				<a href="">
					<IconHome />
					<h3>{t.nav.home()}</h3>
				</a>
				<a href="">
					<IconSearch />
					<h3>{t.nav.explore()}</h3>
				</a>
				<a href="">
					<IconBell />
					<h3>{t.nav.alerts()}</h3>
				</a>
				<a href="">
					<IconMail />
					<h3>{t.nav.inbox()}</h3>
				</a>
				<a href="">
					<IconList />
					<h3>{t.nav.lists()}</h3>
				</a>
				<a href="">
					<IconPin />

					<h3>{t.nav.pins()}</h3>
				</a>
				<a href="">
					<IconUser />
					<h3>{t.nav.profile()}</h3>
				</a>
				<a href="">
					<IconDotsCircleHorizontal />
					<h3>{t.nav.more()}</h3>
				</a>
				<button class={style.post}>Post</button>
			</div>
			<div class={style.user}>
				<img class={style.user_avatar} src="http://fakeimg.pl/512x512?font=lobster"></img>
				<div class={style.user_data}>
					<h3>Username</h3>
					<p>@username</p>
				</div>
				<IconDotsVertical />
			</div>
		</nav>
	);
}
