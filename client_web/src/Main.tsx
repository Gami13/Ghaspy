import style from './Main.module.css';

import TrendBar from './components/TrendBar/TrendBar';
import Navbar from './components/Navbar/Navbar';
import PostBar from './components/PostBar/PostBar';
import Settings from './components/Settings/Settings';
import { activeComponent } from './components/Navbar/Navbar';
function Main() {
	return (
		<div class={style.main}>
			<Navbar className={style.navbar} />
			{activeComponent() === 'postbar' ? <PostBar className={style.pageContent} /> : null}
			{activeComponent() === 'settings' ? <Settings className={style.pageContent} /> : null}
			<TrendBar className={style.trendbar} />
		</div>
	);
}

export default Main;
