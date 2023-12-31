import style from './Main.module.css';

import './assets/logo.png';
import TrendBar from './components/TrendBar/TrendBar';
import Navbar from './components/Navbar/Navbar';
import PostBar from './components/PostBar/PostBar';
function Main() {
	return (
		<div class={style.main}>
			<Navbar className={style.navbar} />
			<PostBar className={style.postbar} />
			<TrendBar className={style.trendbar} />
		</div>
	);
}

export default Main;
