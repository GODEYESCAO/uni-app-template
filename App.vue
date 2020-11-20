<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		this.browserRedirect();
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		// 判断是否进行跳转
		browserRedirect() {
			var sUserAgent = navigator.userAgent.toLowerCase();

			var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';

			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os';

			var bIsMidp = sUserAgent.match(/midp/i) == 'midp';

			var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';

			var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';

			var bIsAndroid = sUserAgent.match(/android/i) == 'android';

			var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';

			var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';

			if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
				console.log('手机站链接');
				// window.location.href = '手机站链接';
			} else {
				console.log('PC站链接');
				window.location = 'http://localhost:8889';
			}
		}
	}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
@import './static/style/style.scss' /*每个页面公共css */ /* 解决头条小程序组件内引入字体不生效的问题 */ /* #ifdef MP-TOUTIAO */ @font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
