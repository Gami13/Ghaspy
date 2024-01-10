import style from './Main.module.css';
import { Match, Show } from 'solid-js';
import TrendBar from '../TrendBar/TrendBar';
import Navbar from '../Navbar/Navbar';
import { useLocation } from '@solidjs/router';

import { JSXElement } from 'solid-js';
type MainProps = {
	children: Element | Element[] | JSXElement | JSXElement[];
};
function Main(props: MainProps) {
	const location = useLocation();
	console.log(location);
	return (
		<div class={style.main}>
			<Navbar className={style.navbar} />
			{/* <PostBar className={style.postbar} /> */}
			<main class={[style.mainBar, location.pathname.toString() === '/signup' ? style.noBanner : ''].join(' ')}>
				{props.children}
			</main>
			<Show when={location.pathname.toString() !== '/signup'}>
				<TrendBar className={style.trendbar} />
			</Show>
		</div>
	);
}

export default Main;
