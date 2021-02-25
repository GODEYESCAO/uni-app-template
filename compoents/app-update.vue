<template>
	<view class="" v-show="show">
		<view class="app-update-pages cont_bg" v-if="isCanUpate">
			<view class="cont">
				<u-image src='/static/img/common/update.png' width='373rpx' height='303rpx'></u-image>
				<view class="flex_col_center2">
					<view class="mt_15">
						New version V {{newversion}} found.
					</view>
					<view class="mt_30 update_btn" @click="toUpdate">
						UPDATE NOW
					</view>
				</view>
			</view>
			<view class="close_btn flex_center2" @click="close">
				<u-image src="../static/img/common/close.png" width="60rpx" height="60rpx"></u-image>
			</view>
		</view>
		<AppProgress ref="updateApp" :auto-update="false" @isCanUpate="getisCanUpate" @newversion="getnewversion" @version="getVersion"></AppProgress>
	</view>
</template>

<script>
	import AppProgress from './AppProgress.vue'
	export default {
		components:{AppProgress},
		data() {
			return {
				version:'1.0.0',
				newversion:'1.0.0',
				isCanUpate:false,
				show:false,
			};
		},
		methods:{
			// 获取是否可更新
			CanUpdate(){
				this.$refs['updateApp'].AndroidCheckUpdate()
			},
			close(){
				this.show=false
				this.$emit('close',true)
			},
			// 得到当前版本
			getVersion(val){
				this.version=val
			},
			// 得到最新版本
			getnewversion(val){
				this.newversion=val
			},
			// 得到是否可更新
			getisCanUpate(val){
				if(val && val===true){
					this.show=true
					this.isCanUpate=true
				}else{
					this.open2(`There is no version update yet`)
				}
			},
			// 更新app
			toUpdate(){
				this.$refs['updateApp'].VersionToLoadUpdate()
			}
		}
	}
</script>

<style lang="scss">
.app-update-pages{
	position: fixed;
	top: 20%;
	left: 125rpx;
	z-index: 999;
	.cont{
		width: 500rpx;
		height: 480rpx;
		background: #ffffff;
		box-shadow: 0rpx 30rpx 30rpx 0rpx rgba(34,106,255,0.15); 
		.update_btn{
			width: 340rpx;
			height: 68rpx;
			background: #226aff;
			font-size: 30rpx;
			line-height: 68rpx;
			font-weight: 700;
			text-align: center;
			color: #ffffff;
		}
		
	}
	.close_btn{
		margin-top: 40rpx;
	}
	
}

</style>
