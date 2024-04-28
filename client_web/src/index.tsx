import { render } from "solid-js/web";
import "solid-devtools";
import { Route, Router } from "@solidjs/router";

import "./index.css";

import { AppStateProvider } from "./AppState";

import { Main } from "./components/Main";
import { Pallete } from "./components/Pallete";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
//stylex example
// const styles = stylex.create({
// 	name of class: {
// 		fontFamily: 'Arial, sans-serif',
// 		width: '100vw',
// 		height: '100vh',
// 		margin: 0,
// 		padding: 0,
// 		backgroundColor: 'black',
// 		display: 'flex',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// });
//<div {...stylex.attrs(styles.root)}>
const root = document.getElementsByTagName("body")[0];

const queryClient = new QueryClient();
function App() {
	return (
		<>
			<AppStateProvider>
				<QueryClientProvider client={queryClient}>
					<Router>
						<Route path="/" component={Main} />
						<Route path="pallete" component={Pallete} />
					</Router>
				</QueryClientProvider>
			</AppStateProvider>
		</>
	);
}

render(() => <App />, root);
