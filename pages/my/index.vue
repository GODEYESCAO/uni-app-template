<template>
	<view class="my-pages">
		<view >
			<headers title="My" :isback="false" :isbg="true" />
			<u-cell-group :border="false">
				<!-- 语言切换后面迭代 -->
				<u-cell-item title="Change the nation and language" @click="toNav({url:'/pages/my/language'})" class="cell_items" hover-class="cell-hover-class" :arrow="true">
					<view class="flex mr_12" slot="icon"><u-image src="/static/img/index/my4.png" width="50rpx" height="50rpx"></u-image></view>
					<view class="flex flex_end"><u-image src="/static/img/common/gana.png" width="80rpx" height="50rpx"></u-image></view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<!-- 更新弹框 -->
		<appupdate ref="appUpdate"></appupdate>
	</view>
</template>

<script>
import appupdate from '@/compoents/app-update.vue';
import urlconfig from '@/common/urlConfig.js';
export default {
	components: { appupdate },
	data() {
		return {
			list: [
				{ img: '', name: 'Statement of branch', url: '', value: '' },
				{ img: '', name: 'My scan', url: '', value: '' },
				{ img: '', name: 'Current version', url: '', value: '' },
				{ img: '', name: 'Change the nation and language', url: '', value: '' },
				{ img: '', name: 'Set up', url: '', value: '' }
			],
			user: '',
			version: 'v ' + urlconfig.version
		};
	},
	onShow() {
		this.user = uni.getStorageSync('user') || '';
	},
	methods: {
		// 检测更新
		checkUpdate(){
			this.$refs['appUpdate'].CanUpdate()
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.my-pages {
	padding: 86rpx 30rpx;
	.user_header {
		font-size: 28rpx;
		font-weight: 700;
		color: #b3c2e2;
		margin-bottom: 62rpx;
	}
	.cell_items {
		padding: 29rpx 10rpx;
	}
}
</style>
