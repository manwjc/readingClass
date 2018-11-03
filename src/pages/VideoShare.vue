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
    <div class="course-stars box-center">
        <img v-if="curStudentData && curStudentData.status === '1'" src="static/images/award-grey.png" class="yinClass">
        <img v-else-if="curStudentData && curStudentData.status === '2'" src="static/images/award-gold.png" class="yinClass">
        <div v-for="(item,index) in 5">
            <img src="static/images/course/star-light.jpg" v-if="index < (curStudentData && curStudentData.star_count)">
            <img src="static/images/course/star-gray.jpg" v-if="index >= (curStudentData && curStudentData.star_count)">
        </div>
    </div>
    
    <div class="text">
        <p><span class="bold">{{curStudentData.fluency && curStudentData.fluency.item_name}}：</span>{{curStudentData.fluency && curStudentData.fluency.evaluation}}</p>
        <p>{{curStudentData.fluency && curStudentData.fluency.english_evaluation}}</p>
        <p><span class="bold">{{curStudentData.focus && curStudentData.focus.item_name}}：</span>{{curStudentData.focus && curStudentData.focus.evaluation}}</p>
        <p>{{curStudentData.focus && curStudentData.focus.english_evaluation}}</p>
        <p><span class="bold">{{curStudentData.voca && curStudentData.voca.item_name}}：</span>{{curStudentData.voca && curStudentData.voca.evaluation}}</p>
        <p>{{curStudentData.voca && curStudentData.voca.english_evaluation}}</p>
        <p><span class="bold">{{curStudentData.voice && curStudentData.voice.item_name}}：</span>{{curStudentData.voice && curStudentData.voice.evaluation}}</p>
        <p>{{curStudentData.voice && curStudentData.voice.english_evaluation}}</p>
    </div>
	<div class="btn-wrapper" @click="showMask">
		<div class="course-btn box-center text-center">分享</div>
	</div>
</div>
</template>

<script>
import constant from '@/js/common/constant'
import utils from '@/js/common/utils'

import shareImg from '@/assets/images/share_img.jpg'
import wx from 'weixin-js-sdk'
import mixin from '@/js/common/wxshare_mixin'

export default {
    data() {
        return {
            userData: null,
            videoUrl: '',
            maskShow: false,
            shareImg: shareImg,
            curStudentData: null
        }
    },
    mounted() {
        this.getUserInfo(this.getUserVideo)
    },
    mixins: [mixin],
    methods: {
        getUserVideo() {
            let self = this;
            this.queryStudentEvaluation()
            self.$service.getUserVideo({
                params: {
                    id: self.$route.query.id,
                    shareFrom: self.userData.data && self.userData.data !== null ? self.userData.data.openId : '123'
                }
            }, (res) => {
                if (res.data.code === '0' && res.data.data.vidoUrl) {
                    self.videoUrl = utils.handleUrl(res.data.data.vidoUrl);
                } else if(res.data.code !== '0'){
                    self.$showMsg(res.data.message);
                }
            })
        },
        queryStudentEvaluation() {
            let self = this;
            let dataParams = this.$qs.stringify({
                id: self.$route.query.id,
                shareFrom: self.userData.data && self.userData.data !== null ? self.userData.data.openId : ''
            });
            self.$service.queryStudentEvaluation(
                dataParams,
                (res) => {
                if (res.data.code === '0') {
                    self.curStudentData = res.data.data[0];
                }else{
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
                    "imgUrl": constant.chelchost + '/wx/index/' + self.shareImg, // 需要绝对地址，否则无法显示。分享显示的缩略图地址    imgUrl:"./static/img/share_img.ebc8a25.jpg"
                    "link": constant.chelchost + '/wx/index?sharePage=videoShare&shareFrom=' + openId + '&id=' + self.$route.query.id, // 分享地址
                    "title": '乔希家"Happy Halloween-Trick or Treat？"', // 分享标题
                    "desc": '每馆限50名额，适合3-12岁孩子，边玩边学', // 分享描述
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
    font-size: 0.24rem;
    line-height: 0.26rem;
}

.text p {
    color: #767575;
    margin-top: 10px;
}

.btn-wrapper {
    margin: 30px 0;
}
.yinClass{
	position: absolute;
    width: 0.9rem;
    height: 1.2rem;
    left: 0.25rem;
    /*left: 0.5rem;
    top: -1.4rem;*/
}
</style>
