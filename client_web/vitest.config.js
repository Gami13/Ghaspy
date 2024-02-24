import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import solidPlugin from 'vite-plugin-solid';
import styleX from 'vite-plugin-stylex';
export default defineConfig({
	plugins: [solidPlugin(), tsconfigPaths(), styleX()],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
	test: {
		environment: 'jsdom',
		globals: true,
		testTransformMode: { web: ['/.[jt]sx?$/'] },
	},
});
