<template>
<div class="courseContent">
    <div class="courseHeader box-start">
        <img src="static/images/course/head-img.png" class="smallAvator"/>
        <div class="fontName">{{courseData && courseData.teacher_english_name}}</div>
        <!-- <div style="color:#dadada;margin-left:0.2rem; border-left: 1px solid #dadada;">4.5分</div> -->
    </div>
    <div class="topOrder box-v-start align-stretch">
        <div class="topHeader box-justify">
            <div class="topItem" style="margin-top:0.45rem">
                <div class="smallTittle">上课地点：</div>
                <div class="bigWFont box-start">
                    <div style="margin-right:0.1rem">{{courseData && courseData.schoolName}}</div>
                    <!-- <img class="backIcon" style="width: 15px;height: 15px;" src="static/images/down.png">		 -->
                </div>
            </div>
        </div>
        <div class="topItem " style="margin-top:0.25rem">
            <div class="box-justify">
                <div class="smallTittle">周日</div>
                <div class="smallTittle">周一</div>
                <div class="smallTittle">周二</div>
                <div class="smallTittle">周三</div>
                <div class="smallTittle">周四</div>
                <div class="smallTittle">周五</div>
                <div class="smallTittle">周六</div>
            </div>
        </div>
    </div>
    <mt-swipe :auto="0" :show-indicators="false" @change="handleChange" :continuous="false" style="height:0.50rem;background: #00244C;padding: 0 0.2rem 0.05rem;">
        <mt-swipe-item>
            <div class="box-justify align-stretch">
                <div class="bigWFont" v-for=" (item,index) in weekDate" v-if="index<7" @click="choseDate(item)">
                    <div>
                        {{item.weekDate}}
                    </div>
                    <img class="backIcon2" src="static/images/up.png" v-if="activeDate === +item.weekDate">
                    </div>
                </div>
        </mt-swipe-item>
        <mt-swipe-item>
            <div class="box-justify align-stretch">
                <div class="bigWFont" v-for=" (item,index) in weekDate" v-if="index>6" @click="choseDate(item)">
                    <div>
                        {{item.weekDate}}
                    </div>
                    <img class="backIcon2" src="static/images/up.png" v-if="activeDate === +item.weekDate">		    </div>
                </div>
        </mt-swipe-item>
    </mt-swipe>
    <div class="courseBody box-v-start rest">
        <div v-if="!activeDateCourse.length" class="ptb20 text-center" style="margin-top: 30%">该日期没有课程信息</div>
        <div v-else @click="goCourseDetail(item)" class="courseItem box-start align-stretch" v-for="item in activeDateCourse">
            <img src="static/images/book.png" class="bookImg"/>
            <div class="rest box-v-center align-stretch">
                <div class="itemHeader">{{item.course_english_name}}</div>
                <div class="itemHeader">{{item.classroomName}}</div>
                <div class="timeCss mtop5">{{item.appointment_time | timeFormat}}</div>
                     <div style="margin-bottom:0.2rem">
                        等级：<span class="bold">{{item.course_acronym}}</span> &nbsp;&nbsp;
                        学生：<span class="bold">{{item.classStudentSize}}人</span> &nbsp;&nbsp;
                     </div>
                <div style="margin-bottom:0.2rem">
                    状态：
                    <span class="bold" v-if="item.status === '-1'">未上课</span>
                    <span class="bold" v-else-if="item.status === '1'">已上课</span>
                    <span class="bold" v-else-if="item.status === '2'">已点评</span>
                    <!-- status  '-1': 未上课  '1': 已上课未点评  '2': 已点评所有学生的作业  -->
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import mixin from '@/js/common/student_mixin'
import utils from "@/js/common/utils";
export default {
    name: "courseList",
    data() {
        return {
            userData: null,
            videoUrl: "",
            weekDate: [],
            weekDateShow: [],
            popupShow: false,
            orderSuccess: false,
            checkedValue: true,
            activeDate: '',
            curWeekMonday: '', //当前周的周一日期
            curDateTime: '',
            curYearMonth: '',
            courseData: null,
            activeDateCourse: [], //当前周的课程
        };
    },
    watch: {
        activeDate(val) {
            this.activeDateCourse = [];
            this.courseData.courseList.filter((item) => {
                if (+item.appointment_time.substr(8, 2) === val) {
                    this.activeDateCourse.push(item)
                }
            });
        }
    },
    mounted() {
        this.getweekDate();
        this.getYearMonth()
        this.getMonday();
        this.curWeekMonday = this.weekDate[0].yearMonth + '-' + this.weekDate[0].weekDate;
        setTimeout(() => {
            this.queryTeacherAppointment(this.weekDate[0].weekDate, 6);
        }, 100)
    },
    mixins: [mixin],
    methods: {
        //计算当前可预约日期
        initActiveDate(curDate, sundayIndex) {
            let hasActiveCourse = false;
            let initDate = +curDate;
            let leftDay = +this.weekDate[sundayIndex].weekDate - initDate;

            this.activeDate = '';
            if(!this.courseData.courseList.length) {
                this.activeDate = initDate;
                return;
            }
            //比对当周有课程的日期
            for (let i = 0; i <= 7; i++) {
                this.courseData && this.courseData.courseList.filter((item) => {
                    let hoverDate = this.weekDate[sundayIndex - 6 + i] && +this.weekDate[sundayIndex - 6 + i].weekDate;
                    if (+item.appointment_time.substr(8, 2) == hoverDate && !hasActiveCourse) {
                        //设置当前日期
                        this.activeDate = hoverDate;
                        hasActiveCourse = true;
                        return false;
                    }
                });
            }
            //如果当周没有课程，则取首日
            if(this.activeDate === '') {
                if(sundayIndex === 6) {
                    this.activeDate = +this.weekDate[0].weekDate;
                }else{
                    this.activeDate = +this.weekDate[7].weekDate;
                }
            }

        },
        //切换周日期
        handleChange(index) {
            if (index === 0) {
                this.curWeekMonday = this.weekDate[0].yearMonth + '-' + this.weekDate[0].weekDate
                this.changeWeekCourse(this.weekDate[0].weekDate, 6)
            } else {
                this.curWeekMonday = this.weekDate[7].yearMonth + '-' + this.weekDate[7].weekDate
                this.changeWeekCourse(this.weekDate[7].weekDate, 13)
            }
        },
        changeWeekCourse(monday, sundayIndex) {
            // this.queryTeacherAppointment(monday, sundayIndex);
            this.initActiveDate(monday, sundayIndex);
        },
        //导读师查看已上课程（上周及本周）
        getweekDate() {
            var that = this;
            that.weekDate = [];
            var Nowdate = new Date();
            var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
            var oneTime = WeekFirstDay.getDate()

            for (let i = 5; i > -9; i--) {
                var tempTime = new Date((WeekFirstDay / 1000 + i * 86400) * 1000).getDate();
                var monthTime = new Date((WeekFirstDay / 1000 + i * 86400) * 1000).getMonth() + 1;
                var yearTime = new Date((WeekFirstDay / 1000 + i * 86400) * 1000).getFullYear();
                if (tempTime < 10) {
                    tempTime = '0' + tempTime
                } else {
                    tempTime = '' + tempTime
                }
                if (monthTime < 10) {
                    monthTime = '0' + monthTime 
                } else {
                    monthTime = '' + monthTime
                }
                that.weekDate.unshift({
                    weekDate: tempTime,
                    yearMonth: yearTime + '-' + monthTime
                });
            }

            for (let i = 0; i < 7; i++) {
                that.weekDateShow.push(that.weekDate[i])
            }
        },
        choseDate(item) {
            this.activeDate = +item.weekDate;
        },
        goCourseDetail(item) {
            this.$router.push({
                path: 'courseItem',
                query: {
                    'gradeNumber': item.grade_number,
                    'grade': item.grade,
                    'student_grade': item.course_acronym,
                    'status': item.status,
                    'classroomName': item.classroomName,
                }
            });
        },
        //查看导读场次
        queryTeacherAppointment(monday, sundayIndex) {
            let dataParams = this.$qs.stringify({
                weekBefore: this.curWeekMonday
            });

            this.$service.queryTeacherAppointment(
                dataParams,
                res => {
                    if (res.data.code === "0") {
                        this.courseData = res.data.data;
                        this.initActiveDate(monday, sundayIndex);
                    }else{
                        this.$showMsg(res.data.message)
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
}

.courseHeader {
    padding: 0.3rem 0.4rem;
    background-color: #f8f7f2;
}

.smallAvator {
    width: 40px;
    height: 40px;
    border-radius: 30px;
}

.fontName {
    font-size: 0.24rem;
    padding: 0rem 0.2rem;
}

.courseBody {
    padding: 0.4rem 0.5rem;
}

.courseItem {
    /* background-color: antiquewhite; */
    width: 100%;
    box-shadow: -1px 4px 10px #dadada;
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
    margin-bottom: 0.1rem;
    margin-top: 5px;
    font-size: 0.26rem;
}

.timeCss {
    margin-bottom: 0.35rem;
    color: #dadada;
}

.topOrder {
    padding: 0.1rem 0.2rem 0rem 0.2rem;
    background: #00244c;
}

.topHeader {}

.topItem {
    margin-top: 0.3rem;
}

.smallTittle {
    color: #cad6dc;
    margin-bottom: 0.15rem;
}

.bigWFont {
    color: white;
    font-size: 0.23rem;
}

.backIcon {
    width: 20px;
    height: 20px;
    border-radius: 60px;
    display: block;
    margin-right: 0.22rem;
}

.backIcon2 {
    width: 10px;
    height: 10px;
    display: block;
    margin: 0.04rem auto 0;
}
</style>
