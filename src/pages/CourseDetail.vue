<template>
<div class="courseContent heightp100 displayflex flex-column">
    <div class="">
        <div class="courseItem box-start align-stretch">
            <img src="static/images/book.png" class="bookImg"/>
            <div class="rest box-v-start align-stretch relative">
                <div class="itemHeader bold f16">{{courseDetailData.english_name}}</div>
                <div class="itemHeader" v-if="courseDetailData.classroom_name || courseDetailData.classroomName">{{courseDetailData.classroom_name || courseDetailData.classroomName}}</div>
                <div class="timeCss">{{courseDetailData.start_date || courseDetailData.appointment_time || courseDetailData.appointmentTime | timeFormat}}</div>
                <div class="courseHeader box-start">
                    <img src="static/images/course/head-img.png" class="smallAvator"/>
                    <div class="fontName">{{courseDetailData.teacher_english_name}}</div>
                    <!-- <div style="color:#dadada;margin-left:0.2rem; border-left: 1px solid #dadada;">4.5分</div> -->
                </div>
                <div>
                    <img @click="playAudio" v-if="!isPlaying && hasMp3" :src="trumpet01" class="icon-trumpet"/>
                    <img @click="playAudio" v-if="isPlaying && hasMp3" :src="trumpet02" class="icon-trumpet"/>
                </div>
            </div>
        </div>
    </div>
    <!-- 已参加课程 -->
    <!-- <div class="boxflex01" v-if="courseDetailData.coursewareList">		<iframe v-for="course in courseDetailData.coursewareList" v-if="course.fileType === '1'" :src="course.h5_file_url" style="width: 100%; height:100%; border-width: 0;">		</iframe>		<div class="hide" v-for="course in courseDetailData.coursewareList" v-if="course.fileType === '0'"><video id="video" controls="controls" autoplay="autoplay" :src="course.h5_file_url"></video></div>		</div> -->
    <!-- 可预约课程 -->
    <!-- <div class="boxflex01" v-else-if="courseDetailData.file">		<iframe v-for="course in courseDetailData.file" v-if="course.fileType === '1'" :src="course.h5_file_url" style="width: 100%; height:100%; border-width: 0;">		</iframe>		<div class="hide" v-for="course in courseDetailData.file" v-if="course.fileType === '0'"><video id="video" controls="controls" autoplay="autoplay" :src="course.h5_file_url"></video></div>		</div> -->
    <div v-if="!pageFrom" class="pb10">
		<!-- 已参加课程 -->
		<div class="mleft20" v-if="courseDetailData.coursewareList">
			<div class="mtop20" v-for="course in courseDetailData.coursewareList" v-if="course.fileType === '1'" @click="setPdfUrl(course.h5_file_url)">{{course.APPENDIX_NAME}} <span class="blue mleft10">查看该课件</span></div>
			<div class="hide" v-for="course in courseDetailData.coursewareList" v-if="course.fileType === '0'"><audio ref="audio" controls="controls" autoplay="autoplay" :src="course.h5_file_url"></audio></div>
		</div>
		<!-- 可预约课程 -->
		<div class="mleft20" v-else-if="courseDetailData.file">
			<div class="mtop20" v-for="course in courseDetailData.file" v-if="course.fileType === '1'" @click="setPdfUrl(course.h5_file_url)">{{course.fileName}} <span class="blue mleft10">查看该课件</span></div>
			<div class="hide" v-for="course in courseDetailData.file" v-if="course.fileType === '0'"><audio ref="audio" controls="controls" autoplay="autoplay" :src="course.h5_file_url"></audio></div>
		</div>
	</div>
    <div v-if="pageFrom === 'homework'" class="pb10">
		<!-- 已参加课程 -->
		<div class="mleft20" v-if="courseDetailData.fileList">
			<div class="mtop20" v-for="course in courseDetailData.fileList" v-if="courseDetailData.videoStatus === '0' && course.APPENDIX_NAME.indexOf('pdf') > -1" @click="setPdfUrl(course.APPENDIX_URL)">{{course.APPENDIX_NAME}} <span class="blue mleft10">查看该作业</span></div>
			<!-- <div class="mtop10" v-for="course in courseDetailData.fileList" v-if="course.homeworkState === '0' && course.APPENDIX_NAME.indexOf('pptx') > -1"><a target="_blank" :href="course.APPENDIX_URL">{{course.APPENDIX_NAME}} <span class="blue mleft10">下载ppt</span></a></div> -->
		</div>
	</div>

    <div class="box-justify pdsTool" v-if="pdfUrl && pdfNumMax > 1">
        <!-- <div @click="lastPage" class="pdfBtn">上一页</div>
        <div @click="nextPage" class="pdfBtn">下一页</div> -->

        <div @click="lastPage" class="pdfBtn" v-if="num > 1">上一页</div>
        <div class="pdfBtn bg-grey" v-else>上一页</div>

        <div @click="nextPage" class="pdfBtn" v-if="num < pdfNumMax">下一页</div>
        <div class="pdfBtn bg-grey" v-else>下一页</div>
    </div>

	<canvas id="canvas1" style="width: 100%;" ></canvas>
    <div class="mtop20 text-center wp100" v-if="loadingTip">加载中，请稍候</div>

</div>
</template>

<script>
import wx from 'weixin-js-sdk'
import trumpet01 from '@/assets/images/trumpet01.png'
import trumpet02 from '@/assets/images/trumpet02.gif'
import utils from '@/js/common/utils'
import Vue from 'vue'
import PDFJS from 'pdfjs-dist'
Vue.use(PDFJS)
export default {
    name: "courseDetail",
    data() {
        return {
            courseDetailData: {},
            num: 1,
            pdfNumMax: 1,
            pdfUrl: '',
			// pdfUrl: 'https://www.chel-c.com/appendix/M00/00/0B/rBLrN1s3TTSAWdJmABiTNykDYAE515.pdf'
            pageFrom: '',
            loadingTip: false,
            isPlaying: false,
            trumpet01: trumpet01,
            trumpet02: trumpet02,

        }
    },
    mounted() {
        this.initCourseDetail()
		if(this.pdfUrl) {
            this.showPdf(this.num);
        }
        // setTimeout(() => {
        //     this.gotoPlay();
        // },100)
    },
    computed: {
        hasMp3() {
            let hasMp3Type = false;
            if(this.courseDetailData.coursewareList && this.courseDetailData.coursewareList.length) {
                this.courseDetailData.coursewareList.forEach(item => {
                    if(item.fileType === '0') {
                        hasMp3Type = true;
                    }
                })
            }else if(this.courseDetailData.file && this.courseDetailData.file.length) {
                this.courseDetailData.file.forEach(item => {
                    if(item.fileType === '0') {
                        hasMp3Type = true;
                    }
                })
            }
            return hasMp3Type;
        },
    },
    methods: {
        setPdfUrl(url) {
            this.loadingTip = true;
            this.num = 1;
            this.pdfUrl = url;
            this.showPdf(this.num);
        },
        //查看课件详情
        initCourseDetail() {
			this.courseDetailData = JSON.parse(sessionStorage.getItem('courseDetailData'));
			this.pageFrom = this.$route.query.pageFrom;
        },
        showPdf(num) {
            var url = this.pdfUrl;
            PDFJS.workerSrc = 'pdf.worker.js';
            PDFJS.getDocument(url).promise.then((pdf) => {
                this.loadingTip = false;
                this.pdfNumMax = pdf.numPages;
                pdf.getPage(num).then((page) => {
                    var scale = 1;
                    var viewport = page.getViewport(scale);
                    var canvas = document.getElementById("canvas1");
                    var context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext);
                });
            });
        },
        lastPage() {
            if (this.num == 1) {
                return
            } else {
                this.num--;
                this.showPdf(this.num)
            }

        },
        nextPage() {
            if (this.num < this.pdfNumMax) {
                this.num++;
                this.showPdf(this.num)
            } else {
                return
            }

        },
        playAudio() {
            if(!this.isPlaying) {
                this.gotoPlay();
            }else{
                this.$refs.audio[0].pause();
                this.isPlaying = !this.isPlaying;
            }
        },
        gotoPlay() {
            // wx.ready (function() {
                this.$refs.audio[0].play();
                this.isPlaying = !this.isPlaying;
            // },false);
        }
    }
}
</script>

<style scoped>
html,
body {
    height: 100%;
    min-height: 100%;
}

.courseContent {
    color: black;
    overflow: hidden;
}

.courseHeader {
    /* padding: 0.3rem 0.4rem; */
    /* background-color: #F8F7F2 */
}

.smallStudentAvator {
    width: 65px;
    height: 65px;
}

.fontName {
    font-size: 0.24rem;
    padding: 0rem 0.2rem;

}

.subHeaderName {
    background-color: #CAE8FF;
    width: 100%;
    padding: 0.25rem 0.2rem;
    color: #145192;
    font-weight: 600;
}

.courseBody {
    padding: 0.1rem;

}

.courseItem {
    /* background-color: antiquewhite; */
    width: 100%;
    /* box-shadow: -1px 4px 10px #dadada; */
    padding: 0.3rem 0.3rem 0.1rem;
    border-radius: 5px;
}

.bookImg {
    width: 62px;
    height: 90px;
    margin-right: 0.2rem;
}

.itemHeader {
    margin-bottom: 0.20rem;
    margin-top: 5px;
    font-size: 0.26rem;
}

.timeCss {
    margin-bottom: 0.15rem;
    color: #dadada
}

.remarkCss {
    border-radius: 10px;
    background-color: aqua;
    color: #145192;
    padding: 0.06rem 0.25rem;
    margin-left: 0.2rem
}

.itemStu {
    border-bottom: 1px solid #dadada;
    padding: 0.1rem 0rem
}

.smallAvator {
    width: 30px;
    height: 30px;
    border-radius: 30px;
}

.lightbox {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    z-index: 7;
    opacity: 0.3;
    display: block;
    background-color: rgb(0, 0, 0);
}

.pop {
    position: absolute;
    left: 50%;
    width: 894px;
    margin-left: -447px;
    z-index: 9;
}

.pdsTool {
    padding: 0.4rem 0.2rem 0.3rem;
    overflow: hidden;
}

.pdfBtn {
    padding: 0.1rem 0.2rem;
    background-color: deepskyblue;
    border-radius: 3px;
    color: white;
}

.bg-grey {
    background: #d2d2d2
}

.icon-trumpet{ position: absolute; width: 24px; height: 24px; top: 10px; right: 40px;}
</style>
