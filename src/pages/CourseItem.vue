<template>
<div class="courseContent">
    <div class="courseHeader box-start">
        <div class="courseItem box-start align-stretch">
            <img src="static/images/book.png" class="bookImg"/>
            <div class="rest box-v-center align-stretch">
                <div class="itemHeader">{{$route.query.classroomName}}</div>
                <div class="timeCss"><span style="margin-right: 0.1rem">{{courseData && courseData.studentList[0].appointment_time | timeFormat}}</span></div>
                <div style="margin-bottom:0.2rem">
                    等级：<span class="bold" style="margin-right: 0.1rem">{{$route.query.student_grade}}</span> 
                    学生：<span class="bold" style="margin-right: 0.1rem">{{courseData && courseData.classStudentSize}}人</span> 
                </div>
                <div style="margin-bottom:0.2rem">
                    状态：
                    <span class="bold" v-if="$route.query.status === '-1'">未上课</span>
                    <span class="bold" v-else-if="$route.query.status === '1'">已上课</span>
                    <span class="bold" v-else-if="$route.query.status === '2'">已点评</span>
                    <!-- status  '-1': 未上课  '1': 已上课未点评  '2': 已点评所有学生的作业  -->
                </div>
            </div>
        </div>
    </div>
    <div class="subHeaderName">
        学生信息
    </div>
    <div class="courseBody box-v-start rest align-stretch">
    <div class="box-justify align-stretch itemStu" v-for="(item,index) in courseData && courseData.studentList" :key="item.id">
        <div class="box-start align-stretch">
            <img src="static/images/course/head-img.png" class="smallStudentAvator"/>
            <div>
                <div style="margin:0.03rem 0 0.2rem 0.2rem;">英文名：{{item.englishName}}</div>
                <div style="margin:0.03rem 0 0.2rem 0.2rem;">中文名：{{item.name}}</div>
            </div>
            <div style="margin-left:0.3rem">
                <div style="margin-bottom:0.2rem;margin-top:3px">性别：
                    <span v-if="item.sex === '1'">男</span>
                    <span v-else>女</span>
                </div>
                <!-- <div style="margin-bottom:0.2rem">等级：{{item.level}}</div> -->
            </div>
        </div>
        <div class="box-v-end">
            <div class="box-start">
                <div @click="changeLike(item)">
                    <!-- 点赞的状态  -1：未选为候选人 1：选为候选人 2：取消候选人' -->
                    <img v-if="item.like_status === '1'" class="icon-like" src="static/images/like.png"/>
                    <img v-else class="icon-like" src="static/images/unlike.png"/>
                </div>
                    <div class="remarkCss">
                        <span v-if="item.status === '1'" @click="gotoEvaluate(item)">作业</span>
                        <span v-else-if="item.status === '-1'" >未提交</span>
                        <span v-else-if="item.status === '2'" >已点评</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import utils from "@/js/common/utils";

export default {
    name: "courseList",
    data() {
        return {
            userData: null,
            videoUrl: "",
            courseData: null,
            courseList: [{
                    name: "joe",
                    name2: "刘一依",
                    sex: "女",
                    level: "2",
                    isRemark: false,
                    isLike: false,
                    id: 1
                },
                {
                    name: "joe",
                    name2: "刘一依",
                    sex: "女",
                    level: "2",
                    isRemark: false,
                    isLike: false,
                    id: 2
                },
                {
                    name: "joe",
                    name2: "刘一依",
                    sex: "女",
                    level: "2",
                    isRemark: false,
                    isLike: false,
                    id: 3
                },
                {
                    name: "joe",
                    name2: "刘一依",
                    sex: "女",
                    level: "2",
                    isRemark: false,
                    isLike: false,
                    id: 4
                },
                {
                    name: "joe",
                    name2: "刘一依",
                    sex: "女",
                    level: "2",
                    isRemark: false,
                    isLike: false,
                    id: 5
                }
            ]
        };
    },
    mounted() {
        this.queryTeacherAppointmentByStudent();
    },
    methods: {
        //点评作业
        gotoEvaluate(item) {
            sessionStorage.setItem('courseData', JSON.stringify(this.courseData));
            sessionStorage.setItem('studentData', JSON.stringify(item));
            this.$router.push({'path': '/teacherRemark', query: {'gradeNumber': this.$route.query.gradeNumber, 'studentId': item.student_id}})
        },
        //点赞/取消点赞
        changeLike(item) {
            if(item.status !== '1') {
                this.$showMsg('请先评价作业');
                return;
            }
            let dataParams = this.$qs.stringify({
                studentId: item.student_id,
                gradeNumber: this.$route.query.gradeNumber
            });

            let updateApi = item.like_status === '1' ? 'updateStudentWeekCandidateStatus' : 'addStudentWeekCandidateStatus';
            this.$service.updateStudentWeekCandidateStatus(
                dataParams,
                res => {
                    if (res.data.code === "0") {
                        this.$showMsg(res.data.message)
                        if(item.like_status === '1') {
                            item.like_status = '2'
                        }else{
                            item.like_status = '1'
                        }
                    }
                },
                error => {
                    console.error(error);
                }
            );
        },
        //查看导读场次
        queryTeacherAppointmentByStudent() {
            let dataParams = this.$qs.stringify({
                gradeNumber: this.$route.query.gradeNumber
            });

            this.$service.queryTeacherAppointmentByStudent(
                dataParams,
                res => {
                    if (res.data.code === "0") {
                        this.courseData = res.data.data;
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

.courseContent {
    color: black;
    overflow-x: hidden;
}

.courseHeader {
    /* padding: 0.3rem 0.4rem; */
    /* background-color: #F8F7F2 */
}

.smallStudentAvator {
    width: 0.7rem;
    height: 0.7rem;
}

.fontName {
    font-size: 0.24rem;
    padding: 0rem 0.2rem;
    border-right: 1px solid #dadada;
}

.subHeaderName {
    background-color: #004c86;
    width: 100%;
    padding: 0.25rem 0.2rem;
    color: white;
    font-weight: 600;
}

.courseBody {
    padding: 0.1rem;
}

.courseItem {
    /* background-color: antiquewhite; */
    width: 100%;
    /* box-shadow: -1px 4px 10px #dadada; */
    padding: 0.3rem 0.3rem;
    border-radius: 5px;
    margin-bottom: 0.1rem;
}

.bookImg {
    width: 62px;
    height: 90px;
    margin-right: 0.2rem;
}

.itemHeader {
    margin-bottom: 0.2rem;
    margin-top: 5px;
    font-size: 0.26rem;
}

.timeCss {
    margin-bottom: 0.35rem;
    color: #a7a7a7;
}

.remarkCss {
    border-radius: 30px;
    background-color: #e3f2ff;
    border: 1px solid #bee1ff;
    color: #3395F8;
    padding: 0.06rem 0.25rem;
    margin-left: 0.2rem;
}

.itemStu {
    border-bottom: 1px solid #a7a7a7;
    padding: 0.2rem 0rem;
}
</style>
