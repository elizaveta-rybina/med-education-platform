import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	build: {
		outDir: 'dist', // Фронтенд-сборка в отдельную папку
		emptyOutDir: true,
		sourcemap: true, // Карты кода для дебага
		rollupOptions: {
			output: {
				assetFileNames: 'assets/[name]-[hash][extname]', // Оптимизация имен файлов
				chunkFileNames: 'js/[name]-[hash].js',
				entryFileNames: 'js/[name]-[hash].js'
			}
		}
	},
	plugins: [
		react(),
		tailwindcss(),
		svgr({
			svgrOptions: {
				icon: true,
				exportType: 'named',
				namedExport: 'ReactComponent'
			}
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			app: path.resolve(__dirname, './src/app'),
			components: path.resolve(__dirname, './src/components'),
			pages: path.resolve(__dirname, './src/pages'),
			assets: path.resolve(__dirname, './src/assets')
		}
	},
	server: {
		port: 5173,
		strictPort: true, // Не менять порт автоматически
		proxy: {
			'/api': {
				target: 'https://ogarev-lab.mrsu.ru',
				changeOrigin: true,
				secure: true,
				rewrite: path => path.replace(/^\/api/, '/api/v1')
			}
		}
	},
	css: {
		postcss: {
			plugins: [require('tailwindcss'), require('autoprefixer')]
		}
	}
})
