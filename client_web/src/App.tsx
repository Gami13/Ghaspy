import style from './App.module.css';
import { Home, Search, List, User, Bookmark, Mail, Bell, Settings, Users, MoreHorizontalIcon } from 'lucide-solid';
import './assets/logo.png';
function App() {
	return (
		<>
			<div class={style.main}>
				<header>
					<a href="" class={style.logo}></a>{' '}
					<a href="">
						{/* <Home /> */}
						<h3>Home</h3>
					</a>
					<a href="">
						{/* <Search /> */}
						<h3>Explore</h3>
					</a>
					<a href="">
						{/* <Bell /> */}
						<h3>Notifications</h3>
					</a>
					<a href="">
						{/* <Mail /> */}
						<h3>Messages</h3>
					</a>
					<a href="">
						{/* <List /> */}
						<h3>Lists</h3>
					</a>
					<a href="">
						{/* <Bookmark /> */}
						<h3>Bookmarks</h3>
					</a>
					<a href="">
						{/* <Users /> */}
						<h3>Communities</h3>
					</a>
					<a href="">
						{/* <User /> */}
						<h3>Profile</h3>
					</a>
					<a href="">
						{/* <MoreHorizontalIcon /> */}
						<h3>More</h3>
					</a>
					<a href="" class={style.post}>
						Post
					</a>
					<div class={style.user_data}></div>
				</header>
				<div class={style.content}>
					<div class={style.content_header}>
						<button>For You</button>
						<button>Following</button>
						<button>.</button>
					</div>
				</div>
				<div class={style.banner}></div>
			</div>
		</>
	);
}

export default App;
