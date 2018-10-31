<template>
	<div class="share-container relative">
    	<div class="mask" v-show="maskShow" @click="hideMask"><img @click.prevent src="../assets/images/toShare.png"></div>
		<div class="share-top">
			<div class="video_box">
				<!-- <img src="static/images/course/index-top.png"> -->
				<div style="margin: 0.1rem 0.25rem;background-color: white;padding: 0.1rem" class="box-start">
					<div :class="[{'mleft10': index !== 0},{'active': index === activeIndex}]" v-for="(item,index) in 5" @click="choseChampionKid(index)">
						<img src="static/images/course/head-img.png">
					</div>
				</div>
				<div class="video" >
					<video id="video" controls="controls" poster="../assets/images/video-preview.jpg" :src="curStudentData && curStudentData.videoUrl"></video>
				</div>
			</div>
		</div>
		<div class="box-justify shareItem">
			<div class="box-v-start">
                <div style="color: #dadada;margin-bottom: 0.10rem">宝贝姓名</div>
                <div>{{curStudentData && curStudentData.name}}</div>
			</div>
			<div class="box-v-start">
                <div style="color: #dadada;margin-bottom: 0.10rem">宝贝年龄</div>
                <div>{{curStudentData && curStudentData.age}}</div>
			</div>
			<div class="box-v-start">
                <div style="color: #dadada;margin-bottom: 0.10rem">宝贝级别</div>
                <div>{{curStudentData && curStudentData.course_acronym}}</div>
			</div>
			<!-- <div class="box-v-start">
                <div style="color: #dadada;margin-bottom: 0.10rem">导读主题</div>
                <div>{{curStudentData && curStudentData.courseName}}</div>
			</div> -->
		</div>
		
		<div class="course-stars box-center">
			<!-- <img src="static/images/gold1.png" class="yinClass"> -->
			<div v-for="(item,index) in 5">
				<img  src="static/images/course/star-light.jpg" v-if="index < (curStudentData && curStudentData.star_count)">
				<img  src="static/images/course/star-gray.jpg" v-if="index >= (curStudentData && curStudentData.star_count)">
			</div>
		</div>
		
		<div class="text">
			<p><span class="bold">{{curStudentData.fluency && curStudentData.fluency.item_name}}：</span>{{curStudentData.fluency && curStudentData.fluency.evaluation}}</p>
			<p>{{curStudentData && curStudentData.fluency.english_evaluation}}</p>
			<p><span class="bold">{{curStudentData.focus && curStudentData.focus.item_name}}：</span>{{curStudentData.focus && curStudentData.focus.evaluation}}</p>
			<p>{{curStudentData && curStudentData.focus.english_evaluation}}</p>
			<p><span class="bold">{{curStudentData.voca && curStudentData.voca.item_name}}：</span>{{curStudentData.voca && curStudentData.voca.evaluation}}</p>
			<p>{{curStudentData && curStudentData.voca.english_evaluation}}</p>
			<p><span class="bold">{{curStudentData.voice && curStudentData.voice.item_name}}：</span>{{curStudentData.voice && curStudentData.voice.evaluation}}</p>
			<p>{{curStudentData && curStudentData.voice.english_evaluation}}</p>
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
				activeIndex: 0,
				studentList: [],
				curStudentData: {},
            	maskShow: false,
            	shareImg: shareImg,
				userData: null,
				videoUrl: '',
			}
		},
		mounted() {
			this.queryStudentMonthStatus();
			this.getUserInfo();
		},
    	mixins: [mixin],
		methods: { 
			choseChampionKid(index){
                var that=this;
                that.championNow=that.championArr[index]
				this.activeIndex = index;
			},
			init() {
				const self = this
				self.$service.getUserInfo((res) => {
					self.userData = res.data;
					self.getUserVideo();
				})
			},
			//查询月冠军
			queryStudentMonthStatus() {
				let dataParams = this.$qs.stringify({
					classroomId: this.$route.query.classroomId
				});
				this.studentList = [];
				this.$service.queryStudentMonthStatus(
					dataParams,
					res => {
						if (res.data.code === "0") {
							this.studentList = res.data.data;
							this.curStudentData = this.studentList[0];
						}else{
							this.$showMsg(res.data.message)
						}
					},
					error => {
						console.error(error);
					}
				);
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
						"link": constant.chelchost + '/wx/index?sharePage=monthChampion&classroomId=' + this.$route.query.classroomId, // 分享地址
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
  background: url(../assets/images/course/share-banner.jpg) no-repeat;
  background-size: 100% auto;
  width: 100%;
  padding-top:130px;
}
.video_box  .video{ 
	width:70%;
	margin:0 auto;
	height: 100%;  
	overflow: hidden;
	margin-top: 0.1rem;
}
.video_box  .video video{ 
	width: 100%; 
	object-fit: contain;
}

.text{
	width:90%;
	margin:0 auto;
	font-size:0.16rem;
	line-height:0.26rem;
}
.text p{
	color:#767575;
	margin-top:10px;
}
.btn-wrapper{
	margin:30px 0;
}
.shareItem{
	padding: 0rem 0.5rem;
	margin-top: 0.2rem
}
.course-stars {
    width: 66%;
    height: 36px;
    margin: 30px auto;
    border-radius: 11px;
    -webkit-box-shadow: 0 0 10px #ccc;
    box-shadow: 0 0 10px #ccc;
}
/*.yinClass{
	position: absolute;
    width: 0.9rem;
    height: 0.9rem;
    left: 0.5rem;
    top: -1.4rem;
}*/
.yinClass{
	position: absolute;
    width: 0.9rem;
    height: 0.9rem;
    left: 0.45rem;
    /*left: 0.5rem;
    top: -1.4rem;*/
}
.active{ border: 2px solid #febb08;}
</style>