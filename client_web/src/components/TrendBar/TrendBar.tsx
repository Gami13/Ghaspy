import style from './TrendBar.module.css';
export default function TrendBar(props: { className?: string }) {
	return <aside class={[style.banner, props.className].join(' ')}></aside>;
}
