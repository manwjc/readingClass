<template>
	<div class="courseContent heightp100 displayflex flex-column">
		 <div class="">
            <div class="courseItem box-start align-stretch">
					<img src="static/images/book.png" class="bookImg"/>
					<div class="rest box-v-start align-stretch">
						<div class="itemHeader">{{courseDetailData.classroom_name || courseDetailData.classroomName}}</div>
						<div class="timeCss">{{courseDetailData.appointment_time || courseDetailData.appointmentTime}}</div>
						<div class="courseHeader box-start">
				            <img src="static/images/course/head-img.png" class="smallAvator"/>
							<div class="fontName">{{courseDetailData.teacher_name || courseDetailData.teacherName}}</div>
							<!-- <div style="color:#dadada;margin-left:0.2rem; border-left: 1px solid #dadada;">4.5分</div> -->
					    </div>
					</div>
			</div> 
		 </div>
		<!-- 已参加课程 -->
		<div class="boxflex01" v-if="courseDetailData.coursewareList">
			<iframe v-for="course in courseDetailData.coursewareList" v-if="course.fileType === '1'" :src="course.h5_file_url" style="width: 100%; height:100%; border-width: 0;">
			</iframe>
			<div class="hide" v-for="course in courseDetailData.coursewareList" v-if="course.fileType === '0'"><video id="video" controls="controls" autoplay="autoplay" :src="course.h5_file_url"></video></div>
		</div>
		<!-- 可预约课程 -->
		<div class="boxflex01" v-else-if="courseDetailData.file">
			<iframe v-for="course in courseDetailData.file" v-if="course.fileType === '1'" :src="course.h5_file_url" style="width: 100%; height:100%; border-width: 0;">
			</iframe>
			<div class="hide" v-for="course in courseDetailData.file" v-if="course.fileType === '0'"><video id="video" controls="controls" autoplay="autoplay" :src="course.h5_file_url"></video></div>
		</div>

    </div>
</template>

<script>
	export default {
		name:"courseDetail",
		data() {
			return {
				courseDetailData: {},
			}
		},
		mounted() {
			this.initCourseDetail()
		},
		methods: { 
            //查看课件详情
            initCourseDetail() {
                this.courseDetailData = JSON.parse(sessionStorage.getItem('courseDetailData'));
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
.courseContent{
	color: black;
	overflow: hidden;
}
.courseHeader{
	/* padding: 0.3rem 0.4rem; */
	/* background-color: #F8F7F2 */
}
.smallStudentAvator{
	width: 65px;
	height: 65px;
}
.fontName{
	font-size: 0.24rem;
	padding: 0rem 0.2rem;
}
.subHeaderName{
	background-color: #CAE8FF;
	width:100%;
	padding:0.25rem 0.2rem;
	color:#145192;
	font-weight: 600;
}
.courseBody{
	padding: 0.1rem ;
	
}
.courseItem{
	/* background-color: antiquewhite; */
	width: 100%;
	/* box-shadow: -1px 4px 10px #dadada; */
	padding: 0.3rem 0.3rem;
	border-radius: 5px;
	margin-bottom: 0.1rem;
}
.bookImg{
	width: 62px;
    height: 90px;
	margin-right: 0.2rem;
}
.itemHeader{
	margin-bottom: 0.20rem;
    margin-top: 5px;
    font-size: 0.26rem;
}
.timeCss{
	margin-bottom:0.35rem;
	color:#dadada
}
.remarkCss{
	border-radius: 10px;
	background-color: aqua;
	color: #145192;
	padding: 0.06rem 0.25rem;
	margin-left: 0.2rem
}
.itemStu{
	border-bottom: 1px solid #dadada;
	padding:0.1rem 0rem
}
.smallAvator{
	width: 30px;
	height: 30px;
	border-radius: 30px;
}
</style>