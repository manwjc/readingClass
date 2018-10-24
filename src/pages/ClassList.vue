<template>
<div class="course-container course-index box-v-start align-stretch">
    <div class="course-top">
        <div class="users box-justify">
            <div class="box-start user-img-wrapper">
                <img class="user-img" src="static/images/course/head-img.png">
                <div class="box-v-center align-start">
                    <p>{{curStudent && curStudent.name}}</p>
                    <p>{{curStudent && curStudent.showGrade}}</p>
                </div>
            </div>
            <div v-if="studentList.length > 1" @click="changeStudent" class="box-end user-right">
                <p>其他孩子 &gt;</p>
            </div>
        </div>
        <div class="flash">
            <router-link to="/activityPage">
                <img class="flash-mask" src="static/images/course/light-bg.png">
            </router-link>
            <!-- <p id="flash-circle1" class="flash-circle"></p>
            <p id="flash-circle2" class="flash-circle"></p>
            <p id="flash-circle3" class="flash-circle"></p>
            <p id="flash-circle4" class="flash-circle"></p>
            <p id="flash-circle5" class="flash-circle"></p>
            <p id="flash-circle6" class="flash-circle"></p>
            <p id="flash-circle7" class="flash-circle"></p>
            <p id="flash-circle8" class="flash-circle"></p>
            <p id="flash-circle9" class="flash-circle"></p>
            <p id="flash-circle10" class="flash-circle"></p>
            <p id="flash-circle11" class="flash-circle"></p>
            <p id="flash-circle12" class="flash-circle"></p>
            <p id="flash-circle13" class="flash-circle"></p>
            <p id="flash-circle14" class="flash-circle"></p>
            <p id="flash-circle15" class="flash-circle"></p> -->

        </div>
        <!-- <div class="total box-center">
            <div class="item">
                <p>周冠军</p>
                <p>10次</p>
            </div>
            <div class="item">
                <p>月冠军</p>
                <p>5次</p>
            </div>
            <div class="item">
                <p>累积打卡</p>
                <p>10次</p>
            </div>
            <div class="item">
                <p>已预约导读</p>
                <p>1次</p>
            </div>
        </div> -->
    </div>
    <div class="course-main " v-if="curStudent && curStudent.member !== '-1'">
        <div class="course-main-header">
            <h3>线下导读</h3>
            <p class="des">老师带领细读经典英文课本</p>
            <div v-if="courseListData.status === '-1' || courseListData.status === '4'">
                <div class="introduce box-start">
                    <img  src="static/images/course/book.png">
                    <div class="introduce-right box-v-center align-start">
                        <div class="introduce-text">
                            <p class="bold" style="font-size: 16px !important">{{courseListData.english_name}}</p>
                            <p style="font-size: 14px !important">{{courseListData.schoolName}}</p>
                            <!-- <p class="text-bg">格林童话 | 经典阅读</p> -->
                        </div>
                        <div class="btn-wrapper">
                            <router-link to="/orderCourse">
                                <button>立即预约</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="courseListData.status === '1'" class="shadow mtop10 mright20 padding20">
                <div class="displaybox">
                    <img class="list-img" src="static/images/course/book.png">
                    <div class="boxflex01 boxalign mleft15">
                        <div class="course-item-info">
                            <p class="f26 bold">{{courseListData.english_name}}</p>
                            <p class="f20 mtop10">{{courseListData.classroomName}}</p>
                            <p class="mtop10">{{courseListData.appointmentTime | timeFormat}}</p>
                            <p class="box-start mtop10">
                                <img class="user-avatar" src="static/images/course/head-img.png">
                                <span class="mleft15">老师：{{courseListData.teacher_english_name}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="displaybox border-top mtop10 pt10">
                    <div class="left boxflex01" target="_blank" @click="cancelCourse(courseListData.gradeNumber)"><button class="box-center">取消课程</button></div>
                    <div v-for="item in courseListData.file" v-if="item.fileType === '1'" class="right boxflex01"><button class="red-btn" @click="viewCourseDetail(courseListData)">预习课件</button></div>
                    <!-- <a target="_blank" v-for="course in courseListData.file" v-if="course.fileType === '1'" class="right boxflex01" :href="course.h5_file_url"><button class="red-btn">查看课件</button></a> -->
                </div>
            </div>
        </div>
        <div class="course-main-body">
            <div class="course-tab">
                <div class="tab-header box-start">
                    <button class="box-center" @click="changeCourseTab(0)" :class="{'active': curTabIndex === 0}">已参加课程</button>
                    <button class="box-center" @click="changeCourseTab(1)" :class="{'active': curTabIndex === 1}">未参加课程</button>
                </div>
                <div class="tab-body">
                    <div v-if="courseRecordData && courseRecordData.length" class="attended">
                        <div v-for="item in courseRecordData" class="course-item shadow">
                            <div class="item-top box-start">
                                <img class="course-img" src="static/images/course/book.png">
                                <div class="course-item-right box-v-center align-start">
                                    <div class="course-item-text">
                                        <p>{{item.english_name}}</p>
                                        <p v-if="curTabIndex === 0">{{item.appointment_time | timeFormat}}</p>
                                        <p v-if="curTabIndex === 1">{{item.start_date}}</p>
                                        <p class="box-start">
                                            <img class="avatar" src="static/images/course/head-img.png">
                                            <span class="box-center">{{item.teacher_english_name}}</span>
                                            <!-- <span class="box-center">|</span>
                                            <span class="box-center">4.5分</span> -->
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="item-bot box-center">
                                <!-- <a target="_blank" v-for="course in item.coursewareList" v-if="course.fileType === '1'" :href="course.h5_file_url"><button class="red-btn">查看课件</button></a> -->
                                <button class="red-btn" @click="viewCourseDetail(item)">查看课件</button>
                                <button v-if="item.fileList && item.fileList.length && curTabIndex === 0 && item.fileList[0].homeworkState === '0'" class="red-btn" @click="doHomework(item)">做作业</button>
                                <button v-if="item.fileList && item.fileList.length && curTabIndex === 0 && item.fileList[0].homeworkState === '1'" class="red-btn" @click="viewHomework(item)">查看作业</button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="ptb20 text-center" style="margin-top: 10%">{{dataTips}}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import mixin from '@/js/common/student_mixin'
    export default {
        data() {
            return {
                dataLoaded: false,
                studentList: [],
                dataTips: '暂无课程信息',
                courseListData: [],     //可预约的导读课程
                courseRecordData: [],   //已参加的导读课程
                appointment_time: '',   //当前周的周一日期
                curTabIndex: 0,
                curStudentIndex: '',
                curDateTime: '',
                curYearMonth: '',
                
            };
        },
        computed: {
            curStudent() {
                return this.studentList[this.curStudentIndex];
            },
        },
        watch: {
            curStudentIndex: function() {
                if(this.studentList.length) {
                    //获取线下导读课程
                    this.queryThisWeekReadByUser();
                    //获取已参加课程
                    this.queryClassRecord();
                }
            },
            curTabIndex: function(val) {
                // this.dataTips = '加载中';
                this.courseRecordData = [];
                if(val === 0) {
                    //获取已参加课程
                    this.queryClassRecord();
                }else{
                    //获取未参加课程
                    this.queryClassMissing();
                }
            }
        },
        mounted() {
            this.setCurStudentIndex();
            this.initPage();
            this.getMonday();
            this.getYearMonth();
        },
        mixins: [mixin],
        methods: {
            //查看课件详情
            viewCourseDetail(item) {
                sessionStorage.setItem('courseDetailData', JSON.stringify(item));
                this.$router.push({name: 'courseDetail'})
            },
            //做作业
            doHomework(item) {
                sessionStorage.setItem('courseDetailData', JSON.stringify(item));
                this.$router.push({name: 'homework'})
            },
            //查看作业
            viewHomework(item) {
                this.$router.push({path: 'videoShare', query: {'id': item.coursewareId}});
            },
            setCurStudentIndex() {
                this.curStudentIndex = +sessionStorage.getItem('curStudentIndex') || 0;
            },
            initPage() {
                //获取学生信息
                this.queryStudentAll();
            },
            cancelCourse(grade_number) {

                let dataParams = this.$qs.stringify({
                    grade_number: grade_number,
                    student_id: this.curStudent.studentId
                });
                
                if(!window.confirm('确定取消该课程？')) {
                    return;
                }

                this.$service.updateStudentAppointmentState(
                    dataParams,
                    res => {
                        if (res.data.code === "0") {
                            this.$showMsg('取消成功！')
                            this.queryThisWeekReadByUser()
                        }else{
                            this.$showMsg(res.data.message)
                        }
                    },
                    error => {
                        console.error(error);
                    }
                );
            },
            changeCourseTab(index) {
                this.curTabIndex = index
            },
            changeStudent() {
                if(this.studentList.length && this.curStudentIndex+1 < this.studentList.length) {
                    this.curStudentIndex++
                }else{
                    this.curStudentIndex = 0
                }
                sessionStorage.setItem('curStudentIndex', this.curStudentIndex)
            },
            //获取未参加课程
            queryClassMissing() {
                let dataParams = this.$qs.stringify({
                    school_id: this.curStudent.schoolId,
                    student_id: this.curStudent.studentId,
                    appointment_time : this.curDateTime
                });

                this.$service.queryClassMissing(
                    dataParams,
                    res => {
                        if (res.data.code === "0") {
                            this.courseRecordData = res.data.data;
                        }
                    },
                    error => {
                        console.error(error);
                    }
                );
            },
        }
    };
</script>

<style scoped>
html,
body {
    height: 100%;
    min-height: 100%;
}

p {
    color: #000;
}

.course-container {
    /*height:100%;*/
}

.course-index .course-top {}

.course-index .users {
    background: #01244c;
}

.course-index .users .user-img-wrapper {
    padding: 20px 0 20px 20px;
}

.course-index .users .user-img-wrapper p {
    color: #fff;
    margin-left: 10px;
}

.course-index .users .user-img-wrapper p:first-of-type {
    margin-bottom: 10px;
}

.course-index .users .user-img {
    width: 60px;
    height: 60px;
    border-radius: 60px;
    display: block;
}

.course-index .users .user-right {
    background-color: #011844;
    padding: 10px 20px;
    border-radius: 20px 0 0 20px;
}

.course-index .users .user-right p {
    color: #fff;
}

.course-index .course-top .total {
    padding-top: 10px;
}

.course-index .course-top .total .item {
    margin: 0 13px;
    text-align: center;
}

.course-index .course-top .total .item p:first-of-type {
    margin-bottom: 10px;
    color: #999;
}

.course-index .course-main .course-main-header {
    margin-top: 10px;
    padding-top: 10px;
    border-top: solid 1px #e5e5e5;
    padding-left: 20px;
}

.course-index .course-main .course-main-header h3 {
    color: #000;
    font-weight: 600;
    font-size: 18px;
    line-height: 30px;
}

.course-index .course-main .course-main-header .des {
    color: #999;
}

.course-index .course-main .course-main-header .introduce {
    padding-top: 10px;
}

.course-index .course-main .course-main-header .introduce img {
    width: 120px;
    height: 160px;
    margin-right: 10px;
}

.course-index .course-main .course-main-header .introduce .introduce-text p {
    line-height: 24px;
    font-size: 16px;
    color: #666;
}

.course-index .course-main .course-main-header .introduce .introduce-text p:nth-of-type(1) {
    color: #333;
    font-size: 14px;
}

p.text-bg {
    background-color: #fcbf7e;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    border-radius: 6px;
    text-align: center;
    padding: 0 5px;
    margin-top: 5px;
}

.course-index .course-main .course-main-header .introduce .introduce-right .btn-wrapper {
    margin-top: 20px;
}

.course-index .course-main .course-main-header .introduce .introduce-right button {
    color: #b7444a;
    font-size: 18px;
}

.course-index .course-main .course-main-body .tab-header {
    padding: 10px 0 0 20px;
    border-bottom: solid 1px #e5e5e5;
}

.course-index .course-main .course-main-body .tab-header button {
    height: 30px;

    margin-right: 30px;
}

.course-index .course-main .course-main-body .tab-header button.active {
    border-bottom: solid 2px #b7444a;
}

.course-index .course-main .course-main-body .tab-body .course-item {
    margin: 10px 20px;
    padding: 10px 20px;
    border: solid 1px #e5e5e5;
}

.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-img {
    width: 80px;
    height: 120px;
    margin-right: 10px;
}

.course-index .course-main .course-main-body .tab-body .course-item .item-top .avatar {
    width: 40px;
    height: 40px;
}
.avatar-img {
    width: 40px;
    height: 40px;
}

.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-item-text p {
    line-height: 24px;
    margin: 5px 0;
}

.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-item-text p:nth-of-type(1) {
    font-weight: 600;
    color: #000;
    font-size: 16px;
}

.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-item-text p:nth-of-type(3) {}

.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-item-text p span {
    margin-left: 20px;
}

.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-item-right .btn-wrapper {
    margin-top: 20px;
}

.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-item-right button {
    color: #b7444a;
    font-size: 18px;
}

.course-index .course-main .course-main-body .tab-body .course-item .item-bot {
    margin-top: 10px;
}

.course-index .course-main .course-main-body .tab-body .course-item .item-bot button {
    border: solid 1px #e5e5e5;
    margin: 0 10px;
}

.course-index .course-main .course-main-body .tab-body .course-item .item-bot .dot {
    width: 38px;
    height: 19px;
}

.flash {
    position: relative;
}

.flash-circle {
    position: absolute;
    left: 30%;
    width: 7px;
    height: 7px;
    background-color: #e8a896;
    border-radius: 20px;
    top: 0;
    animation: opa 2s infinite;
    -webkit-animation: opa 2s infinite;
    /*Safari and Chrome*/
}

#flash-circle1 {
    left: 19.5%;
    top: 46%;
}

#flash-circle2 {
    left: 23.5%;
    top: 22%;
}

#flash-circle3 {
    left: 23.5%;
    top: 71%;
}

#flash-circle4 {
    left: 31.5%;
    top: 46%;
}

#flash-circle5 {
    left: 35%;
    top: 46%;
}

#flash-circle6 {
    left: 38.5%;
    top: 46%;
}

#flash-circle7 {
    left: 43%;
    top: 26%;
}

#flash-circle8 {
    left: 43%;
    top: 65%;
}

#flash-circle9 {
    left: 47%;
    top: 45%;
}

#flash-circle10 {
    left: 54%;
    top: 26%;
}

#flash-circle11 {
    left: 54%;
    top: 56%;
}

#flash-circle12 {
    left: 58%;
    top: 69%;
}

#flash-circle13 {
    left: 72%;
    top: 48%;
}

#flash-circle14 {
    left: 78%;
    top: 25%;
}

#flash-circle15 {
    left: 78%;
    top: 65%;
}

@keyframes opa {
    from {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@-webkit-keyframes opa

/*Safari and Chrome*/
    {
    from {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
</style>
