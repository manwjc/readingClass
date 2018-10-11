<template>
	<div class="share-container">
		<div class="share-top">
			<div class="video_box">
				<div class="video" >
					<video id="video" controls="controls" poster="static/images/course/video-bg.jpg" :src="videoUrl"></video>
				</div>
			</div>
		</div>
		<div class="course-stars  box-center">
			<img  src="static/images/course/star-light.jpg">
			<img  src="static/images/course/star-light.jpg">
			<img  src="static/images/course/star-light.jpg">
			<img  src="static/images/course/star-light.jpg">
			<img  src="static/images/course/star-gray.jpg">
		</div>
		<div class="text">
			<p>阅读过程中，能够高度专注并有兴趣的完成所有阅读内容。能够清晰饱满完成所有词汇每个音节的发音。</p>
			<p>During the reading process, you can complete all reading with a high degree of concentration and interest. It is able to clearly and satisfactorily complete the pronunciation of each syllable of all words.</p>
		</div>
		<div class="btn-wrapper">
			<button class="course-btn box-center">分享</button>
		</div>
	</div>
</template>

<script>
	import utils from '@/js/common/utils'

	export default {
		data() {
			return {
				userData: null,
				videoUrl: '',
			}
		},
		mounted() {
			let self = this;
			self.init();
		},
		methods: { 
			init() {
				const self = this
				self.$service.getUserInfo((res) => {
					self.userData = res.data;
					self.getUserVideo();
				})
			},
			getUserVideo() {
				let self = this;
				self.$service.getUserVideo({
					params: { 
						id: self.$route.query.id, 
						shareFrom: self.userData.data && self.userData.data !== null ? self.userData.data.openId : ''
					}
				}, (res) => {
					if(res.data.code === '0'){
						self.videoUrl = utils.handleUrl(res.data.data.vidoUrl);
					}else{
						self.$showMsg(res.data.message);
					}
				})
			},
			JoinIn() {
				let self = this;
				if(self.userData.code === '0'){
					if(self.userData.data.isBindPhone === true && self.userData.data.isBuyUser === true){
						self.$router.push({name:"sceneList"})
					}else if(self.userData.data && self.userData.data.isBindPhone === true && self.userData.data.isBuyUser === false){
						self.$router.push({name:"newGay"})
					}else if(self.userData.data && self.userData.data.isBindPhone === false){
						self.$router.push({name:"checkPhone"})
					}
				}else{
					self.$showMsg(self.userData.message);
				}
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
	width:90%;
	margin:0 auto;
	height: 100%;  
	overflow: hidden;
}
.video_box  .video video{ 
	width: 100%; 
	object-fit: contain;
}

.text{
	width:90%;
	margin:0 auto;
	font-size:16px;
	line-height:24px;
}
.text p{
	color:#767575;
	margin-top:10px;
}
.btn-wrapper{
	margin:30px 0;
}
</style>