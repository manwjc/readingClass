<template>
<div class="share-container relative">
    <div class="mask" v-show="maskShow" @click="hideMask"><img @click.prevent src="../assets/images/toShare.png"></div>
	<div class="share-top">
		<img  src="static/images/course/share-banner.jpg">
		<img  src="static/images/course/video-bg-top.jpg">
		<div class="video_box">
			<div class="video">
				<video id="video" controls="controls" :src="videoUrl"></video>
			</div>
		</div>
	</div>
	<!-- <div class="course-stars  box-center">
		<img  src="static/images/course/star-light.jpg">
		<img  src="static/images/course/star-light.jpg">
		<img  src="static/images/course/star-light.jpg">
		<img  src="static/images/course/star-light.jpg">
		<img  src="static/images/course/star-light.jpg">		
	</div> -->
	<!-- <div class="text">
		<p>阅读过程中，能够高度专注并有兴趣的完成所有阅读内容。能够清晰饱满完成所有词汇每个音节的发音。</p>
		<p>During the reading process, you can complete all reading with a high degree of concentration and interest. It is able to clearly and satisfactorily complete the pronunciation of each syllable of all words.</p>
	</div> -->
	<div class="btn-wrapper" @click="showMask">
		<button class="course-btn box-center text-center">分享</button>
	</div>
</div>
</template>

<script>
import constant from '@/js/common/constant'
import utils from '@/js/common/utils'
import shareImg from '@/assets/images/share_img.jpg'
import shareVideo from '@/assets/images/happy_halloween_final.mp4'
import wx from 'weixin-js-sdk'
import mixin from '@/js/common/wxshare_mixin'

export default {
    data() {
        return {
            userData: null,
            videoUrl: shareVideo,
            maskShow: false,
        }
    },
    mounted() {
        this.getUserInfo(this.getUserVideo)
    },
    mixins: [mixin],
    methods: {
        getUserVideo() {
            let self = this;
            self.$service.getUserVideo({
                params: {
                    id: self.$route.query.homeworkRecordId,
                    shareFrom: self.userData.data && self.userData.data !== null ? self.userData.data.openId : 'oztvqvzIyMMsuxp93MXLQowPTTLE'
                }
            }, (res) => {
                if (res.data.code === '0' && res.data.data.vidoUrl) {
                    self.videoUrl = utils.handleUrl(res.data.data.vidoUrl);
                } else {
                    self.$showMsg(res.data.message);
                }
            })
        },
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
                    "imgUrl": self.shareImg, // 分享显示的缩略图地址
                    "link": constant.chelchost + '/wx/classList', // 分享地址
                    "desc": '点亮乔希', // 分享描述
                    "title": '乔希家导读课' // 分享标题
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
