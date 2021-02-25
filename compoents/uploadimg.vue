<!--
 * @Author: 曹建勇
 * @Date: 2020-08-12 11:49:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-13 11:03:53
 * @Description: 
 * @FilePath: \extension-system\compoents\uploadimg.vue
-->
<template>
	<view class="uploadimg">
		<u-upload
			width="160"
			:action="uploadimg"
			:max-count="maxCount"
			:header="upload_header"
			:form-data="formdata"
			:custom-btn="true"
			upload-text="Select Image"
			:file-list="fileList"
			@on-success="handleSuccess"
			@on-remove="handleRemove"
			@on-uploaded="handleUploaded"
			:show-progress="true"
			:multiple="true"
			:i18n="$t('uview')"
		>
			<view slot="addBtn" class="slot-btn flex_col_center2" hover-class="slot-btn__hover" hover-stay-time="150">
				<u-image src="/static/img/index/photo.png" width="50rpx" height="50rpx"></u-image>
				<text class="desc">{{filePathList.length}}/{{maxCount}}</text>
			</view>
		</u-upload>
	</view>
</template>

<script>
import urlconfig from '@/common/urlConfig.js'
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		maxCount: {
			type: [Number, String],
			default: 1
		},
		formdata: {
			type: Object,
			default: {
				type:1
			}
		}
	},
	data() {
		return {
			fileList: [],
			filePathList: [],
			upload_header: {
				accessToken: uni.getStorageSync('token')
			},
			uploadimg: urlconfig.UploadUrl
			
		};
	},
	methods: {
		async handleSuccess(data, index, lists, name) {
			console.log("lists: ",lists);
			const arr = await lists.map(v => {
				return { imgUrl: v.response.data.url };
			});
			this.filePathList = arr;
		},
		// 图片移除
		async handleRemove(index, lists, name) {
			const arr = await lists.map(v => {
				return { imgUrl: v.response.data.url };
			});
			this.filePathList = arr;
		},
		// 返回图片资源
		getImg() {
			this.$emit('getImg', this.filePathList);
		},
		handleUploaded(){
			this.open2(`Image uploading completed`)
		}
	}
};
</script>

<style lang="scss" scoped>
.uploadimg {
	background-color: #fff;
	.title {
		color: #333333;
		font-size: 30rpx;
	}
	.gray {
		font-size: 28rpx;
		color: #666666;
	}
	.end_flex {
		display: flex;
		align-items: flex-end;
	}

	.wrap {
		padding: 24rpx;
	}

	.slot-btn {
		width: 160rpx;
		height: 160rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	}

	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}
	.desc{
		font-size: 26rpx;
		color: #b2cbff;
		margin-top: 16rpx;
	}
}
</style>
