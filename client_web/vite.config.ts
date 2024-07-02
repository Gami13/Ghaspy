import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import styleX from "vite-plugin-stylex";
import solid from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
export default defineConfig({
	plugins: [
		tsconfigPaths(),
		solid(),
		styleX(),
		devtools({
			autoname: true,
		}),
	],
	server: {
		port: 3000,
	},
});
