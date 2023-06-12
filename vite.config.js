import {
	defineConfig
} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'


// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
	// 基准大小 baseSize，需要和rem.js中相同
	remUnit: 16
})

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		uni(),
		AutoImport({
			imports: ['vue', 'vue-router'] //自动导入vue 和vue-router相关的函数 
		}),
	],
	lintOnSave: true,
	css: {
		preprocessorOptions: {
			sass: {
				implementation: require('sass')
			}
		},
		loaderOptions: {
			postcss: {
				plugins: [
					postcss
				]
			}
		}
	}
})
