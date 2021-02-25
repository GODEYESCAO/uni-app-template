<!--
 * @Author: 曹建勇
 * @Date: 2020-09-23 09:17:12
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-09-23 09:49:53
 * @Description: 顶部栏
 * @FilePath: \extension-system\compoents\headers.vue
-->
<template>
	<u-navbar :is-back="isback" titleWidth="500" back-icon-color="#333" :title="title" title-color="#333" title-size="36" :custom-back="toBack">
		<view slot="right" class="rights"><slot name="right"></slot></view>
	</u-navbar>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		isback: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			
		};
	},
	methods:{
		toBack(){
			this.goBack(1)
			// // #ifdef  APP-PLUS
			// uni.navigateBack({
			//     delta: 1
			// });
			// // #endif
			// // #ifdef H5
			// this.$router.go(-1)
			// // window.history.back(-1)
			// // #endif
		}
	}
};
</script>

<style lang="scss">
.rights {
	margin-right: 24rpx;
}
</style>
