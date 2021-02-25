
import urlconfig from '../common/urlConfig.js'

// 完整链接请求
export function request(row) {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title: "Loading..."
        })
        uni.request({
            url: row.url, //仅为示例，并非真实接口地址。
            method: row.method,
            data: row.query,
            // header: {
            //     'Content-Type':"application/json" //自定义请求头信息
            // },
            success: (res) => {
                console.log('res', res.data);
                if (res.statusCode === 200) {
                    resolve(res.data)
                }
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                uni.hideLoading()
            }
        });
    })
}
/**
 * @description: 
 * @param {url,method,data,type} 
 * @return {Promise res} 
 * @author: 曹建勇
 */
const language=urlconfig.apiLangeuage // 中文：?l=zh_CN，英文：?l=en_US
export function common(row) {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title: `loading...`
        })
		console.log("urlconfig: ",urlconfig.ServerUrl+row.url);
        uni.request({
            url: `${urlconfig.ServerUrl}${row.url}?l=${language}`,
            method: row.method,
            header: {
				'accessToken':uni.getStorageSync('token') || '',
                'Content-Type': row.method == 'GET' ? 'application/x-www-form-urlencoded' : "application/json" //自定义请求头信息
            },
            data: row.query,
            dataType: 'json',
            success: (res) => {
                console.log('res', res.data);
                uni.showToast({
					icon:"none",
                    title: res.statusCode
                })
                switch (res.statusCode) {
                case 200:
					if(res.data.code==200){
						resolve(res.data)
					}else{
						uni.showToast({
							icon:"none",
						    title: res.data.msg
						})
						if(res.data.code==401){
							setTimeout(() => {
							    uni.reLaunch({
							        url: '/pages/login/index'
							    })
							}, 1000)
						}else{
							reject(res.data)
						}
					}
                    break
                case 401:
                    uni.showToast({
						icon:"none",
                        title: res.data.msg
                    })
                    setTimeout(() => {
                        uni.reLaunch({
                            url: '/pages/login/index'
                        })
                    }, 1000)
                    break
                case 404:
                    uni.showToast({
						icon:"none",
                        title: res.data.msg //`The resource does not exist on the server`
                    })
                    break
                }
            },
            fail: (err) => {
				console.log("err: ",err);
                uni.showToast({
					icon:"none",
                    title: `Busy network`
                })
                reject(err)
            },
            complete: () => {
                uni.hideLoading()
            }
        });
    })
}
