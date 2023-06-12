/*
	加到main.js里面 就可以使用 this.$u.get/post
*/
// import uTool from '@/components/request.js';
// Vue.prototype.$u = uTool
// import COUNTRY from '../setting.js';

const config = {
	"authorization": uni.getStorageSync("token"),
	"lang": uni.getStorageSync("lang")
}

const WEB_URL = COUNTRY.HOST

export default function request(options: any) {

	// 语言包
	let lang = uni.getStorageSync("lang");
	let token = uni.getStorageSync("token");

	// 忽略标识
	// config.ignore.token.forEach((e) => {
	// 	if (options.url.includes(e)) {
	// 		Authorization = "";
	// 	}
	// });

	return new Promise(async (resolve, reject) => {
		// 继续请求
		function next() {
			uni.request({
				...options,

				header: {
					// Authorization,
					'lang': lang,
					'authorization': token
					// ...options.header,
				},
				method: options.methods,
				url: WEB_URL + options.url,
				success(res: any) {
					const { code, data, message } = res.data;

					// 重新登录 
					if (res.data.code === 2000 && res.statusCode == 401) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return reject({
							message: res.data.message,
						});
					}

					// 无权限
					if (res.statusCode === 401) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return
					}

					// 服务异常
					if (res.statusCode === 502) {
						return reject({
							message: "Abnormal service",
						});
					}

					// 未找到
					if (res.statusCode === 404) {
						return reject({
							message: `[404] ${options.url}`,
						});
					}
					// 成功
					if (res.statusCode === 200) {
						switch (code) {
							case 1000:
								resolve(data);
								break;
							default:
								reject({ message, code });
						}
					}
				},
				fail(err) {
					reject({ message: err.errMsg });
				},
			});
		}

		// 刷新token处理
		// if (!options.url.includes("refreshToken")) {
		// 	if (Authorization) {
		// 		// 判断 token 是否过期
		// 		if (storage.isExpired("token")) {
		// 			// 判断 refreshToken 是否过期
		// 			if (storage.isExpired("refreshToken")) {
		// 				// 退出登陆
		// 				return user.logout();
		// 			}

		// 			// 是否在刷新中
		// 			if (!isRefreshing) {
		// 				isRefreshing = true;
		// 				user.refreshToken().then((token) => {
		// 					requests.forEach((cb) => cb(token));
		// 					requests = [];
		// 					isRefreshing = false;
		// 				});
		// 			}

		// 			return new Promise((resolve) => {
		// 				// 继续请求
		// 				requests.push((token: string) => {
		// 					// 重新设置 token
		// 					Authorization = token;
		// 					next();
		// 					resolve();
		// 				});
		// 			});
		// 		}
		// 	}
		// }

		next();
	});
}



