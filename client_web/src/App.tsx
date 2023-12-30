import style from './App.module.css';
import { IconMail, IconBell, IconSearch, IconHome, IconList, IconBookmark, IconUser } from '@tabler/icons-solidjs';
import './assets/logo.png';
function App() {
	return (
		<div class={style.main}>
			<nav>
				<a href="" class={style.logo}></a>{' '}
				<a href="">
					<h3>
						<IconHome />
						Home
					</h3>
				</a>
				<a href="">
					<h3>
						<IconSearch />
						Explore
					</h3>
				</a>
				<a href="">
					<h3>
						<IconBell />
						Notifications
					</h3>
				</a>
				<a href="">
					<h3>
						<IconMail />
						Messages
					</h3>
				</a>
				<a href="">
					<h3>
						<IconList />
						Lists
					</h3>
				</a>
				<a href="">
					<h3>
						<IconBookmark />
						Bookmarks
					</h3>
				</a>
				<a href="">
					<h3>
						<IconUser />
						Communities
					</h3>
				</a>
				<a href="">
					<h3>
						<IconUser />
						Profile
					</h3>
				</a>
				<a href="">
					{/* <MoreHorizontalIcon /> */}
					<h3>More</h3>
				</a>
				<a href="" class={style.post}>
					Post
				</a>
				<div class={style.user_data}></div>
			</nav>
			<main class={style.content}>
				<div class={style.content_header}>
					<button>For You</button>
					<button>Following</button>
					<button>.</button>
				</div>
			</main>
			<aside class={style.banner}></aside>
		</div>
	);
}

export default App;
