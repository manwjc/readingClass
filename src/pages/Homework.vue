<template>
<div class="homeWorkCotent box-v-start align-stretch relative">
    <el-progress class="progress" v-if="isUploading" type="circle" :percentage="videoUploadPercent"></el-progress>
    <div class="mask" v-show="maskShow"></div>
    <div style="border-bottom: 1px solid #dadada;margin-top: 0.5rem">
        <div class="box-start workInfoItem">
            <div class=""><span>课程名称：</span>{{courseDetailData && courseDetailData.english_name}}</div>
            <!-- <div><span style="font-weight: 600">进度：</span>0%</div> -->
        </div>
        <div class="box-start workInfoItem">
            <div><span>时间：</span>{{courseDetailData && courseDetailData.appointment_time | timeFormat}}</div>
        </div>
    </div>
    <div style="padding: 0.2rem 0rem">
        <div style="font-weight: 600; margin-bottom: 0.2rem;">全部作业</div>
        <div class="workInfoItem2 displayflex mtop20" v-for="course in courseDetailData && courseDetailData.fileList" v-if="course.homeworkState === '0'">
            <div class="left-title">作业名称：</div>
            <div class="flex-start">
                <div>{{course.APPENDIX_NAME}}</div>
                <div class="mtop10">
                   <span v-if="course.APPENDIX_NAME.indexOf('pdf') > -1" @click="viewCourseDetail(courseDetailData)" class="green">查看</span>
                    <!-- <a target="_blank" :href="course.h5_file_url"><span class="green">查看</span></a> -->
                    <a class="green" :class="{'mleft20' : course.APPENDIX_NAME.indexOf('pdf') > -1}" target="_blank" :href="course.APPENDIX_URL"><span class="green">下载</span></a>
                </div>
            </div>
        </div>
        <div class="displayflex mtop20">
            <div class="pt10 left-title">上传作业：</div>
            <div class="relative flex-start">
                <el-upload ref="upload" :action="uploadVideoUrl" 
                    :limit="1" 
                    :file-list="fileList" 
                    :upload-error="uploadError" 
                    :before-upload="beforeUpload" 
                    :on-progress="uploadVideoProcess" 
                    :on-success="uploadSuccess" 
                    :on-change="(file)=>{return handleChange(file, 22)}" 
                    :data="uploadData"
                    :auto-upload="true">
                    <el-button class="select-file" slot="trigger" size="small" type="primary">
                        <div class="upload-text f24">{{uploadText}}</div>
                    </el-button>
                    <div slot="tip" class="el-upload__tip">请上传作业视频（时长小于1分钟，大小不超过100MB）</div>
                </el-upload>
                <!-- <el-button class="up-button" size="small" type="success" @click="submitUpload">开始上传</el-button> -->
            </div>
        </div>
    </div>
    <div v-show="uploadVideo" class="video">
        <video id="video" controls="controls" poster="static/images/black_bg.png" :src="uploadVideo"></video>
    </div>
    <!-- </div> -->
    <router-link :to="'/VideoShare?id=' + homeworkRecordId" v-if="uploadVideo">
        <div class="rest box-v-end mtop10">
            <div class="submitBtn">提交作业</div>
        </div>
    </router-link>
</div>
</template>

<script>
import Vue from "vue";
import utils from '@/js/common/utils'
import constant from "@/js/common/constant";
import Element from "element-ui";
import api from '@/js/api'
import "element-ui/lib/theme-chalk/index.css";

import shareImg from "@/assets/images/share_img.jpg";
import wx from "weixin-js-sdk";
import mixin from "@/js/common/wxshare_mixin";

Vue.use(Element);

export default {
    data() {
        return {
            isUploading: false,
            videoUploadPercent: '10',
            listData: [{
                    name: "“小剧场”剧本台词",
                    url: ""
                },
                {
                    name: "“小剧场”剧本录音",
                    url: ""
                },
                {
                    name: "“小剧场”作业",
                    url: ""
                }
            ],
            maskShow: false,
            upLoadData: "",
            fileList: [],
            uploadVideo: null,
            userData: null,
            mp3Url: "",
            classBg6_8: "",
            shareImg: location.origin + "/wx/" + shareImg,

            //课程信息
            courseDetailData: {},
            loading: null,
            uploadText: '选择视频',
            homeworkRecordId: '',

            courseListData: {},
            uploadData: {}
        };
    },
    computed: {
        uploadVideoUrl() {
            return process.env.NODE_ENV === 'development' ? '/baseApi' + api.uploadVideo : api.uploadVideo;
        }
    },
    mounted() {
        this.initCourseDetail();
    },
    mixins: [mixin],
    methods: {
        hideMask() {
            this.maskShow = false;
            document.body.style = 'overflow: inherit';
        },
        showMask() {
            this.maskShow = true;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            document.body.style = 'overflow: hidden';
        },
        //查看课件详情
        viewCourseDetail(item) {
            sessionStorage.setItem('courseDetailData', JSON.stringify(item));
            this.$router.push({path: 'courseDetail', query: {'pageFrom': 'homework'}});
        },
        openFullScreenLoading() {
            this.loading = this.$loading({
                lock: true,
                text: '',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        },
        //查看课件详情
        initCourseDetail() {
            this.courseDetailData = JSON.parse(
                sessionStorage.getItem("courseDetailData")
            );
        },
        redirect(item) {
            let self = this;
            location.href = item.url;
        },
        handleChange(file) {
            this.uploadText = '重新上传'
        },
        beforeUpload(file) {
            let self = this;
            // let fd = new FormData();

            //   this.$showMsg("上传中，请稍候…");
            // this.openFullScreenLoading();

            if (!self.beforeAvatarUpload(file)) {
                return false;
            }
            this.showMask();
            this.uploadData.coursewareId = this.courseDetailData.coursewareId;
            // fd.append("file", file);
            // fd.append("coursewareId", self.courseDetailData.coursewareId);
            // self.$service.uploadVideo(
            //     fd,
            //     res => {
            //         // alert(JSON.stringify(res))
            //         let data = res.data;

            //         if (data.code === "0") {
            //             self.uploadVideo = utils.handleUrl(data.data.APPENDIX_URL);
            //             self.homeworkRecordId = self.courseDetailData.coursewareId;
            //             this.$showMsg("文件上传成功");
            //         } else {
            //             let message = data.message || "上传失败!";
            //             this.$showMsg(message);
            //         }
            //         this.loading.close();
            //     },
            //     error => {
            //         console.error(error);
            //     }
            // );
            // return false; //拦截默认提交
        },
        uploadVideoProcess(event, file, fileList){
            this.isUploading = true;
            this.videoUploadPercent = file.percentage.toFixed(0);
        },
        uploadSuccess(response, file, fileList) {
            this.uploadVideo = utils.handleUrl(response.data.APPENDIX_URL);
            this.homeworkRecordId = this.courseDetailData.coursewareId;
            this.isUploading = false;
            this.videoUploadPercent = 100;
            this.hideMask();
            this.$showMsg("文件上传成功");
        },
        // 上传错误
        uploadError(err, file, fileList) {
            this.hideMask();
            this.$showMsg(err);
        },
        // 上传前对文件的大小的判断
        beforeAvatarUpload(file) {
            const fileArr = file.name.split(".");
            const fileLength = fileArr.length;
            const extension = fileArr[fileLength - 1] === "mp4" || file.name.indexOf("mov") > -1;
            const isLt2M = file.size / 1024 / 1024 < 100;
            // if (!extension) {
            // 	this.$showMsg('上传文件只能是 mp4/mov 格式!')
            // }
            if (!isLt2M) {
                this.$showMsg("上传文件大小不能超过 100MB!");
            }
            return isLt2M;
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        setShareData() {
            let self = this;
            let openId =
                self.userData.data && self.userData.data !== null ?
                self.userData.data.openId :
                "";
            wx.ready(function () {
                // 微信分享的数据
                var shareData = {
                    imgUrl: self.shareImg, // 分享显示的缩略图地址
                    link: location.origin +
                        "/wx/index?id=" +
                        self.$route.params.id +
                        "&shareFrom=" +
                        openId, // 分享地址
                    desc: "原价699元，新生99元报名", // 分享描述
                    title: "暑假英文阅读戏剧表演营" // 分享标题
                };
                wx.onMenuShareTimeline(shareData);
                wx.onMenuShareAppMessage(shareData);
            });
        }
    }
};
</script>

<style scoped>
html,
body {
    height: 100%;
    min-height: 100%;
}

#app {
    height: 100%;
    min-height: 100%;
}

.homeWorkCotent {
    min-height: 100%;
    padding: 0rem 0.4rem;
    color: black;
}

.workInfoItem {
    margin-bottom: 0.3rem;
}

.workInfoItem2 {
    margin-bottom: 0.3rem;
}

.workInfoItemRight {
    width: 45%;
}

.workInfoItemRight span {
    font-weight: 600;
}

.workInfoItemRight2 {
    width: 60%;
    /*font-weight: 600*/
}

.workInfoItemRight2 span {
    font-weight: 600;
}

.videoImg {
    width: 30px;
    height: 30px;
    margin-left: 0.2rem;
}

.submitBtn {
    /*padding: 0.1rem 1rem;*/
    color: white;
    background-color: #c01920;
    text-align: center;
    border-radius: 25px;
    margin-bottom: 0.5rem;
    width: 100%;
    padding: 0.2rem;
    font-size: 0.24rem;
}

.videoWork {
    padding: 0.2rem;
    margin-top: 0.3rem;
    background-color: #c01920;
}

.form_list01 {
    background: #fcf6e8;
    padding-bottom: 0.15rem;
    overflow: hidden;
}

.video_box {
    background: url(../assets/images/video_bg.jpg) repeat-y;
    background-size: 100% 100%;
    width: 100%;
}

.video {
    height: auto;
    margin: 0 0.6rem;
    overflow: hidden;
}

.video video {
    width: 100%;
    object-fit: fill;
}

.upload_btn {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
}

.el-upload__tip,
a.el-upload-list__item-name {
    color: #c5744c !important;
}

.el-upload-list__item-name {
    padding-left: 0.4rem;
}

.up-button {
    position: relative;
    width: 2rem;
    left: 50%;
    transform: translate(-50%, 0);
}

.upload-box {
    padding: 0.5rem 0 0.2rem;
}

/* .el-upload input{display: none} */

.scene_list {
    background: url(../assets/images/page2_list_bg.jpg) no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: calc(93 * 100vw / 640);
    margin: 0 auto;
    overflow: hidden;
    color: #ad2924;
}

.scene_list.bg6_8 {
    background: url(../assets/images/page2_list_bg2.jpg) no-repeat;
    background-size: 100% 100%;
}

.scene_name {
    margin: 0.4rem 0 0 2.4rem;
}

.scene_name5 {
    margin: 0.3rem 0 0 2.4rem;
}

.scene_name5 div {
    margin-left: 0.6rem;
}

.select-file,
.select-file:hover {
    background: url(../../static/images/video.png) no-repeat;
    background-size: 30px 30px;
    width: 100px;
    height: 30px;
    border: none;
}

.upload-text {
    margin: 2px 0 0 20px;
    color: #666;
}

.left-title {
    min-width: 75px;
}
.progress{
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%);  -webkit-transform:translate(-50%, -50%);
    z-index: 9999;
    color: #fff !important;
}
</style>
