<template>
<div class="share-container relative">
    <div class="mask" v-show="maskShow" @click="hideMask"><img @click.prevent src="../assets/images/toShare.png"></div>
	<div class="share-top">
		<img  src="static/images/course/share-banner.jpg">
		<img  src="static/images/course/video-bg-top.jpg">
		<div class="video_box">
			<div class="video">
				<video id="video" controls="controls" :src="videoUrl" poster="../assets/images/video-preview.jpg"></video>
			</div>
		</div>
	</div>
	<div class="text">
		<p>万圣节即将到来，故事中的主角Biscuit 和他的小伙伴要一同讨糖果去。让我们一起看看会发生什么有趣的事情呢？</p>
		<p>Biscuit and the little girl are going trick-or-treating on his first Halloween. What kinds of silly surprises are in store for them?</p>
	</div>
	<div class="btn-wrapper">
        <router-link to="/">
		    <div class="course-btn box-center text-center">立即参与</div>
        </router-link>
	</div>
</div>
</template>

<script>
import constant from '@/js/common/constant'
import utils from '@/js/common/utils'
import shareImg from '@/assets/images/share_img.jpg'
// import shareVideo from '@/assets/images/happy_halloween_final.mp4'
import wx from 'weixin-js-sdk'
import mixin from '@/js/common/wxshare_mixin'

export default {
    data() {
        return {
            userData: null,
            videoUrl: 'https://www.chel-c.com/wx/static/media/happy_halloween_final.a339296.mp4',
            maskShow: false,
            shareImg: shareImg,
        }
    },
    mounted() {
        this.getUserInfo()
    },
    mixins: [mixin],
    methods: {
        showMask() {
            this.maskShow = true;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            document.body.style = 'overflow: hidden';
        },
        hideMask() {
            this.maskShow = false;
            document.body.style = 'overflow: inherit';
        },
        setShareData() {
            let self = this;
            let openId = self.userData.data && self.userData.data !== null ? self.userData.data.openId : '';
            wx.ready(function () {
                // 微信分享的数据
                var shareData = {
                    "imgUrl": location.origin + '/wx/index/' + self.shareImg, // 需要绝对地址，否则无法显示。分享显示的缩略图地址    imgUrl:"./static/img/share_img.ebc8a25.jpg"
                    "link": location.origin + '/wx/index?sharePage=activityPage', // 分享地址
                    "title": '乔希家阅读馆', // 分享标题
                    "desc": '万圣节即将到来，故事中的主角Biscuit 和他的小伙伴要一同讨糖果去。让我们一起看看会发生什么有趣的事情呢？', // 分享描述
                }
                wx.onMenuShareTimeline(shareData)
                wx.onMenuShareAppMessage(shareData)
            })
        },
    }
}
</script>

<style scoped>
html,
body {
    height: 100%;
    min-height: 100%;
}

.video_box {
    background: url(../assets/images/video-bg-repeat.jpg) repeat-y;
    background-size: 100% auto;
    width: 100%;
    padding-bottom: 10px;
}

.video_box .video {
    width: 90%;
    background: #000;
    margin: 0 auto;
    height: 100%;
    overflow: hidden;
}

.video_box .video video {
    width: 100%;
    object-fit: contain;
}

.text {
    width: 90%;
    margin: 0 auto;
    font-size: 16px;
    line-height: 24px;
}

.text p {
    color: #767575;
    margin-top: 10px;
}

.btn-wrapper {
    margin: 30px 0;
}

</style>
