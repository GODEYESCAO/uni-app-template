import urlconfig from './urlConfig.js'
// 完整链接请求
export function request(url,method,query){
    return new Promise((resolve,reject)=>{
        uni.request({
            url: url,
            method:method,
            data:query,
            header: {
                'Content-Type': 'application/json' //自定义请求头信息
            },
            success: (res) => {
                console.log('res',res.data);
                if(res.statusCode===200){
                    resolve(res.data)
                }
            },
            fail:(err)=>{
                reject(err)
            }
        });
    })
} 
// 公共链接请求
export function common(val){
    return new Promise((resolve,reject)=>{
        uni.request({ 
            url: `${urlconfig.ServerUrl}${val.url}`,
            method:val.method,
            data:val.query,
            header: {
                'Content-Type': val.method=='POST' || 'post'?'application/x-www-form-urlencoded':'application/json' //自定义请求头信息
            },
            success: (res) => {
				console.log("res: ",res);
                if(res.statusCode===200){
                    resolve(res.data)
                }
            },
            fail:(err)=>{
				console.log("err: ",err);
                reject(err)
            }
        });
    })
} 