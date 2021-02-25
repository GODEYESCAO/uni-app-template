/*
 * @Author: 曹建勇
 * @Date: 2020-07-10 14:01:37
 * @LastEditTime: 2020-08-17 10:23:25
 * @LastEditors: 曹建勇
 * @Description: In User Settings Edit
 * @FilePath: \extension-system\mixins\index.js
 */
import { setClipboardData, getClipboardData } from '@/js_sdk/u-clipboard'
export default {
    data() {
        return {
            webUrl:"https://tpfile.tospino.com/",
            barStyles: { // u-tabs 滑动条样式
			    background: '#5680FA',
            },
        }
    },
    created() {
    },
    methods: {
        toRouter(path, params) { // 路径传参 val : 路径值 params : 参数
            this.$u.route(path, params)
        },
        /*
        	* 路由跳转
        	* url URL跳转链接
        	* type 跳转类型
        		* navigateTo 保留当前页面，跳转到应用内的某个页面
        		* redirectTo 关闭当前页面，跳转到应用内的某个页面。
        		* switchTab 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
        		* reLaunch 关闭所有页面，打开到应用内的某个页面。
        	* 
        	*   slide-in-right	slide-out-right	新窗体从右侧进入
        		slide-in-left	slide-out-left	新窗体从左侧进入
        		slide-in-top	slide-out-top	新窗体从顶部进入
        		slide-in-bottom	slide-out-bottom	新窗体从底部进入
        		pop-in	pop-out	新窗体从左侧进入，且老窗体被挤压而出
        		fade-in	fade-out	新窗体从透明到不透明逐渐显示
        		zoom-out	zoom-in	新窗体从小到大缩放显示
        		zoom-fade-out	zoom-fade-in	新窗体从小到大逐渐放大并且从透明到不透明逐渐显示
        		none	none	无动画
        */
        toNav(obj) { // {type,url,params,delta}
            this.$u.route(obj)
        },
        // 返回上一页
        goBack(num) {
            // #ifdef  APP-PLUS
            let nums=1
            num?nums=num:''
            uni.navigateBack({
                delta: nums
            });
            // #endif
            // #ifdef H5
            this.$router.go(-1)
            // window.history.back(-num)
            // #endif
        },
        open2(title,duration=2000) { // 成功消息提醒 {title,type='success',url}
            this.$u.toast(title,duration)
        },
        // 复制
        copy(val) {
			setClipboardData(val).then(res=>{
				this.open2(`Copy success`);
			})
        },
        // 扫码
        handleScan() {
            // #ifdef H5
            this.open2(`please use app`);
            // #endif
            // #ifdef APP-PLUS
			return new Promise((resolve,reject)=>{
				uni.scanCode({
				    success: function(res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						resolve(res.result)
				    },
					fail(err) {
						this.open2(`扫码错误，请重新扫码！`)
						reject(err)
					}
				});
			})
            // #endif
        },
    }
}