/*
 * @Author: 曹建勇
 * @Date: 2020-07-10 14:01:37
 * @LastEditTime: 2020-08-17 10:23:25
 * @LastEditors: 曹建勇
 * @Description: In User Settings Edit
 * @FilePath: \extension-system\mixins\index.js
 */
export default {
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        toRouter(path, params) { // 路径传参 val : 路径值 params : 参数
            this.$u.route(path, params)
            // this.$router.push({ path: path, query: params })
        },
        toNav(obj) { // {type,url,params,delta}
            this.$u.route(obj)
        },
        goBack(num){
            uni.navigateBack({
                delta: num || 1
            });
        },
		open2(title) { // 成功消息提醒 {title,type='success',url}
		    this.$u.toast(title)
		},
    }
}