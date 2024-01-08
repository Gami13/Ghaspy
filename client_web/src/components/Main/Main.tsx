import style from './Main.module.css';

import TrendBar from '../TrendBar/TrendBar';
import Navbar from '../Navbar/Navbar';

import { JSXElement } from 'solid-js';
function Main(props: { children: Element | Element[] }) {
	return (
		<div class={style.main}>
			<Navbar className={style.navbar} />
			{/* <PostBar className={style.postbar} /> */}
			<main class={[style.mainBar].join(' ')}>{props.children}</main>
			<TrendBar className={style.trendbar} />
		</div>
	);
}

export default Main;
