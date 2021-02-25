<template>
	<view class="CountryLanguage-pages">
		<headers :title="$t('language.seleteTitle')" :isback="true"></headers>
		<view class="cont">
			<view class="cont_item flex flex_space" @click="show = true">
				<view class="flex_col">
					<text class="title">{{ $t('language.title') }}</text>
					<text class="mt_8 desc">
						{{
							value === 'zh'
								? $t('language.county')
								: value === 'en'
								? $t('language.Ghana')
								: value === 'vi'
								? $t('language.Vietnamese')
								: $t('language.china1')
						}}
					</text>
				</view>
				<view class="flex">
					<u-image v-show="value == 'zh' || value == 'ch'" src="/static/img/my/china.png" width="48rpx" height="34rpx" class="mr_15"></u-image>
					<u-image v-show="value == 'en'" src="/static/img/my/country_gana.png" width="48rpx" height="34rpx" class="mr_15"></u-image>
					<u-image v-show="value == 'vi'" src="/static/img/my/vi.png" width="48rpx" height="34rpx" class="mr_15"></u-image>
					<u-icon name="arrow-right" size="30" color="#999"></u-icon>
				</view>
			</view>
			<view class="cont_item flex flex_space" @click="show1 = true">
				<view class="flex_col">
					<text class="title">{{ $t('language.Language') }}</text>
					<text class="mt_8 desc">
						{{
							value === 'zh'
								? $t('language.LanguageType')
								: value === 'en'
								? $t('language.English')
								: value === 'vi'
								? $t('language.Vietnamese')
								: $t('language.LanguageType1')
						}}
					</text>
				</view>
				<u-icon name="arrow-right" size="30" color="#999"></u-icon>
			</view>
		</view>
		<!-- 选择国家及语言 -->
		<u-popup v-model="show" mode="bottom" border-radius="0" height="600rpx" :closeable="true">
			<view class="pop_title flex">{{ $t('language.seleteTitle') }}</view>
			<view class="pop_cont">
				<u-radio-group v-model="value" @change="radioGroupChange">
					<view class="flex_col pop_cont_items">
						<view class="flex flex_space w100">
							<view class="flex">
								<u-image src="/static/img/common/china.png" width="56rpx" height="40rpx"></u-image>
								<text class="title">{{ $t('language.china') }}</text>
							</view>
							<u-radio @change="radioChange" name="zh" active-color="#16BC84"></u-radio>
						</view>
						<view class="flex flex_space w100">
							<view class="flex">
								<u-image src="/static/img/common/china.png" width="56rpx" height="40rpx"></u-image>
								<text class="title">{{ $t('language.china1') }}</text>
							</view>
							<u-radio @change="radioChange" name="ch" active-color="#16BC84"></u-radio>
						</view>
						<view class="flex flex_space w100">
							<view class="flex">
								<u-image src="/static/img/common/country_gana.png" width="56rpx" height="40rpx"></u-image>
								<text class="title">{{ $t('language.Ghana') }}</text>
							</view>
							<u-radio @change="radioChange" name="en" active-color="#16BC84"></u-radio>
						</view>
						<view class="flex flex_space w100">
							<view class="flex">
								<u-image src="/static/img/common/vi.png" width="56rpx" height="40rpx"></u-image>
								<text class="title">{{ $t('language.Vietnamese') }}</text>
							</view>
							<u-radio @change="radioChange" name="vi" active-color="#16BC84"></u-radio>
						</view>
					</view>
				</u-radio-group>
			</view>
		</u-popup>
		<!-- 选择语言 -->
		<u-popup v-model="show1" mode="bottom" border-radius="0" height="600rpx" :closeable="true">
			<view class="pop_title flex">{{ $t('language.Choose') }}</view>
			<view class="pop_cont">
				<u-radio-group v-model="value" @change="radioGroupChange">
					<view class="flex_col pop_cont_items">
						<view class="flex flex_space w100">
							<text class="title">{{ $t('language.LanguageType') }}</text>
							<u-radio @change="radioChange" name="zh" active-color="#16BC84"></u-radio>
						</view>
						<view class="flex flex_space w100">
							<text class="title">{{ $t('language.LanguageType1') }}</text>
							<u-radio @change="radioChange" name="ch" active-color="#16BC84"></u-radio>
						</view>
						<view class="flex flex_space w100">
							<text class="title">{{ $t('language.English') }}</text>
							<u-radio @change="radioChange" name="en" active-color="#16BC84"></u-radio>
						</view>
						<view class="flex flex_space w100">
							<text class="title">{{ $t('language.Vietnamese') }}</text>
							<u-radio @change="radioChange" name="vi" active-color="#16BC84"></u-radio>
						</view>
					</view>
				</u-radio-group>
			</view>
		</u-popup>
	</view>
</template>

<script>
import urlconfig from '@/common/urlConfig.js';
export default {
	data() {
		return {
			show: false,
			value: urlconfig.language,
			show1: false
		};
	},
	onLoad() {
		this.value = this.$i18n.locale;
	},
	onShow() {
		this.value = this.$i18n.locale;
	},
	methods: {
		// 选中某个单选框时，由radio时触发
		radioChange(e) {
			// console.log(e);
		},
		// 选中任一radio时，由radio-group触发
		radioGroupChange(e) {
			this.$i18n.locale = e;
			uni.setStorageSync('i18n', e);
			this.value=e
			uni.setTabBarItem({
				index: 0,
				text: this.$t('tabbar.t1')
			});
			uni.setTabBarItem({
				index: 1,
				text: this.$t('tabbar.t2')
			});
			uni.setTabBarItem({
				index: 2,
				text: this.$t('tabbar.t3')
			});
			uni.setTabBarItem({
				index: 3,
				text: this.$t('tabbar.t4')
			});
			this.show1 = false;
			this.show = false;
		}
	}
};
</script>

<style lang="scss">
.CountryLanguage-pages {
	background: $uni-bg-color;
	padding: 20rpx 24rpx;
	.w100 {
		// width: 650rpx;
		height: 96rpx;
	}
	.cont {
		background: #fff;
		.cont_item {
			border-bottom: 1rpx solid #eee;
			font-size: 30rpx;
			padding: 0 40rpx;
			height: 136rpx;
			.title {
				color: #333333;
			}
			.desc {
				color: #999999;
			}
			&:last-child {
				border-bottom: none;
			}
		}
	}
	.pop_title {
		height: 96rpx;
		padding: 0 40rpx;
		border-bottom: 1rpx solid #eee;
	}
	.pop_cont {
		padding: 40rpx;
		width: 750rpx;
		.pop_cont_items {
			width: 670rpx;
		}
		.title {
			color: #333333;
			font-size: 30rpx;
			margin-left: 24rpx;
		}
	}
}
</style>
