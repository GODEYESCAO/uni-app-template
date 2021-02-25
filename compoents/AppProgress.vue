<template>
	<view v-if="appUpdata">
		<u-popup v-model="update_show" mode="bottom" :mask-close-able="false" :closeable="appUpdata.isCompelUpdate == 1 ? false : true">
			<view class="update_warp">
				<view class="title flex_center2">{{$t('update.title')}}</view>
				<view class="mandatort mt_20">{{ appUpdata.isCompelUpdate == 1 ? $t('update.t3') : $t('update.t4') }}</view>
				<view class="version flex">
					<view>
						{{$t('update.t1')}}：
						<text class="red">{{ version_show }}</text>
					</view>
					<view class="ml_15">
						{{$t('update.t2')}}：
						<text class="red">{{ appUpdata.versionCode }}</text>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 400rpx;"><view class="cont" v-html="appUpdata.describe"></view></scroll-view>
				<u-button type="primary" class="bot_btn-style mb_20" @click="VersionToLoadUpdate">{{$t('update.t5')}}</u-button>
			</view>
		</u-popup>
		<u-popup
			v-model="showProgress"
			width="500rpx"
			@close="HandleClose"
			height="480rpx"
			:mask-close-able="false"
			:safe-area-inset-bottom="true"
			:closeable="appUpdata.isCompelUpdate == 1?false:true"
			mode="center"
			class="app-update"
		>
			<view class="flex_col_center2 Progress_warp">
				<u-image src="/static/img/update.png" width="246rpx" height="246rpx" />
				<u-line-progress :percent="percentageVal" :striped="true" :striped-active="true" :show-percent="true" active-color="#5680fa" />
				<view class="msg">{{ $t('update.download') }}</view>
			</view>
		</u-popup>
		<view class="update_box" @click="showProgress=true" v-show="update_box">
			<u-image src='/static/img/update.png' width='100rpx' height='100rpx' class="imgs"></u-image>
		</view>
	</view>
</template>

<script>
// app更新组件 集合版本判断，安装包下载安装，进度条显示
/* 
 * autoUpdate 是否自动更新 默认值 true
 */
import { updateApi } from '@/api/common.js';
export default {
	props:{
		autoUpdate:{
			type:Boolean,
			default:true,
		}
	},
	data() {
		return {
			version: '100', // 当前app 版本号
			version_show: '1.0.0', // 当前app 显示版本号
			appUpdata: null,
			showProgress: false, // 是否开启进度条
			percentageVal: 0, // 进度条的值
			update_show: false,
			update_box:false,
		};
	},
	created() {
		//#ifdef APP-PLUS
		let a = this;
		plus.runtime.getProperty(plus.runtime.appid, function(inf) {
			console.log('this.version: ', inf.version);
			a.version_show =inf.version
			a.$emit('version',a.version_show)
			a.version =
				inf.version
					.toString()
					.split('.')
					.join('') - 0;
			// 是否是安卓
			uni.getSystemInfo({
				success: res => {
					//检测当前平台，如果是安卓则启动安卓更新
					if (res.platform == 'android' && a.autoUpdate) {
						a.AndroidCheckUpdate();
					}
				}
			});
		});
		//#endif
	},
	methods: {
		/**
		 * 安卓应用的检测更新实现
		 */
		AndroidCheckUpdate() {
			let a = this;
			updateApi({}).then(res => {
				let versionCode = res.data.versionId;
				a.$emit('newversion',res.data.versionName)
				console.log('a.version !== res.versionCode: ', a.version !== res.data.versionCode && a.version < versionCode, a.version, versionCode);
				if (a.version !== res.data.versionCode && a.version < versionCode) {
					this.$emit('isCanUpate',true)
					this.appUpdata = res.data;
					if(this.autoUpdate){
						this.update_show=true
						if(this.appUpdata.isCompelUpdate==1){
							// 隐藏底部栏
							uni.hideTabBar()
						}
					}
				}else{
					this.$emit('isCanUpate',false)
				}
			});
		},
		// 版本更新
		VersionToLoadUpdate() {
			let a = this;
			a.update_show = false;
			//设置 最新版本apk的下载链接
			const downloadApkUrl = a.appUpdata.apkUrl;
			var dtask = plus.downloader.createDownload(downloadApkUrl, {}, function(d, status) {
				// 下载完成
				console.log(73, d);
				uni.hideLoading();
				if (status == 200) {
					plus.nativeUI.showWaiting(a.$t('update.c2'));
					plus.runtime.install(
						plus.io.convertLocalFileSystemURL(d.filename),
						{},
						// 安装成功
						function() {
							uni.showTabBar()
							plus.nativeUI.closeWaiting();
							plus.runtime.restart();
						},
						function(error) {
							plus.nativeUI.closeWaiting();
							a.open2(a.$t('update.c3'))
						}
					);
				} else {
					a.open2(a.$t('update.c4'))
				}
			});
			try {
				dtask.start(); // 开启下载的任务
				uni.hideLoading();
				a.showProgress = true;
				var prg = 0;
				dtask.addEventListener('statechanged', function(task, status) {
					// 给下载任务设置一个监听 并根据状态  做操作
					switch (task.state) {
						case 1:
							//'正在下载';
							break;
						case 2:
							// '已连接到服务器';
							break;
						case 3:
							prg = parseInt((parseFloat(task.downloadedSize) / parseFloat(task.totalSize)) * 100);
							a.percentageVal = prg;
							break;
						case 4:
							// a.showProgress = false;
							a.open2(`${a.$t('update.c5')} ${err}`)
							break;
					}
				});
			} catch (err) {
				// a.showProgress = false;
				a.open2(`${a.$t('update.c5')} ${err}`)
			}
		},
		HandleClose(){
			this.update_box=true
		}
	}
};
</script>

<style lang="scss">
.update_box{
	position: fixed;
	overflow: hidden;
	right: 40rpx;
	bottom: 50rpx;
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	// background-color: #5680FA;
	color: #fff;
	font-size: 30rpx;
	font-weight: 700;
	line-height: 100rpx;
	text-align: center;
	.imgs{
		border-radius: 50%;
	}
}
.update_warp {
	padding: 88rpx 30rpx 0;
	font-size: 26rpx;
	.title {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		font-size: 30rpx;
		font-weight: 700;
		color: #333;
		height: 88rpx;
		border-bottom: 1rpx solid #eee;
	}
	.mandatort{
		font-size: 28rpx;
		font-weight: 700;
	}
	.version {
		padding: 15rpx 0;
		.red {
			font-weight: 700;
			color: red;
		}
	}
	.cont {
		line-height: 40rpx;
		padding-bottom: 100rpx;
	}
	.bot_btn-style{
		background-color: #5680FA;
	}
}
.Progress_warp {
	padding: 50rpx 30rpx;
}
.app-update {
	border-radius: 12px;
	.msg {
		margin-top: 50rpx;
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
		width: 100%;
		text-align: center;
	}
}
</style>
