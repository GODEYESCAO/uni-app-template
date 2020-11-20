<template>
	<view class="siders-pages">
		<!-- <u-image class="mt50" @click="toTop" src='/static/img/index/to-top-one.png' width='78rpx' height='78rpx'></u-image> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods:{
			// 置顶
			toTop(){
				uni.pageScrollTo({
					duration: 300,
					scrollTop:0,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.siders-pages{
	background-color: #fff;
	position: fixed;
	right: 23rpx;
	bottom: 274rpx;
	.mt50{
		border: 1rpx solid #eee;
		box-shadow: 0 5px 5px #eee;
	}
}
</style>
