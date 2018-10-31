<template>
<div class="OrderBodyContent box-v-start align-stretch">
    <div class="topOrder box-v-start align-stretch">
        <div class="topHeader box-justify">
            <div class="box-start">
                <img @click="goback()" class="backIcon" src="static/images/leftBack.png">
                <img class="user-avatar" src="static/images/course/head-img.png">		  </div>
                <div class="headerTittle">线下导读预约</div>
                <div style="visibility: hidden;">1111</div>
            </div>
            <div class="topItem">
                <div class="smallTittle">当前预约课程</div>
                <div class="bigWFont box-start" style="height: 20px;">{{activeDateCourse[0] && activeDateCourse[0].english_name}}</div>
            </div>
            <div class="topItem" style="margin-top:0.45rem">
                <div class="smallTittle">上课馆区名称</div>
                <div class="bigWFont box-start">
                    <div style="margin-right:0.1rem; height: 20px;">{{activeDateCourse[0] && activeDateCourse[0].school_name}}</div>
                    <!-- <img class="backIcon" style="width: 15px;height: 15px;" src="static/images/down.png"> -->
                </div>
            </div>
            <div class="topItem " style="margin-top:0.25rem">
                <div class="box-justify">
                    <div class="smallTittle">周一</div>
                    <div class="smallTittle">周二</div>
                    <div class="smallTittle">周三</div>
                    <div class="smallTittle">周四</div>
                    <div class="smallTittle">周五</div>
                    <div class="smallTittle">周六</div>
                    <div class="smallTittle">周日</div>
                </div>
                <mt-swipe :auto="0" :show-indicators="false" :continuous="false" @change="handleChange" style="height:24px; background: #00244C; margin-top: -0.1rem; padding: 0.2rem 0 0;">
                    <mt-swipe-item>
                        <div class="box-justify align-stretch">
                            <div class="bigWFont text-center w20" v-for=" (item,index) in weekDate" v-if="index<7" @click="chooseDate(item)">
                                <div>
                                    {{item.weekDate}}
                                </div>
                                <img class="backIcon2" src="static/images/up.png" v-if="+item.weekDate === activeDate">
                    </div>
                            </div>
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <div class="box-justify align-stretch">
                            <div class="bigWFont text-center w20" v-for=" (item,index) in weekDate" v-if="index>6" @click="chooseDate(item)">
                                <div>
                                    {{item.weekDate}}
                                </div>
                                <img class="backIcon2" src="static/images/up.png" v-if="+item.weekDate === activeDate">
                    </div>
                            </div>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <div class="rest box-v-start align-stretch orderBody">
            <div class="box-justify bodyItem">
                <div class="bigWFont" style="color: initial;font-weight: 600;">选择课时段</div>
                <div style="color: #BEBEBE;">共{{activeDateCourse.length}}节课</div>
            </div>
            <div class="bodyItem">
                <div v-if="!activeDateCourse.length" class="ptb20 text-center" style="margin-top: 30%">该日期没有可预约课程</div>
                <div v-else class="box-start timeCourse align-stretch" v-for=" (item,index) in activeDateCourse" :style="{'border':index+1==activeDateCourse.length?'none':''}">
                    <div class="pointTime"></div>
                    <div style="padding: 0.02rem 0.15rem 0;">
                        <div style="padding-bottom:0.1rem">{{item.appointmentTime}}</div>
                        <div>{{item.appointment_start_time}}-{{item.appointment_over_time}}</div>
                    </div>
                    <div class="rest">
                        <div class="panlInfo box-justify">
                            <div class="box-start align-stretch">

                                <img class="user-avatar" src="static/images/course/head-img.png">
                                <div class="box-v-justify align-stretch" style="padding:0.12rem; margin-top: 6px;">
                                    <div class="sirName">老师：{{item.teacher_english_name}}</div>
                                    <!-- <div>5分</div> -->
                                </div>
                                <!-- <div v-if="item.isFollow" class="panlFollow">
                                    <div class="followClass">已关注</div>
                            </div> -->
                            </div>
                            <div style="color:#B02E2E;font-size: 0.23rem;" @click="orderCourse(item)">
                                立刻预约
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <mt-popup v-model="popupShow" position="bottom" popup-transition="popup-fade" closeOnClickModal="false" style="width:100%">

                <div v-if="!orderSuccess" style="width:100%;height:250px;background-color:white" class="box-v-justify align-stretch">
                    <div class="box-justify popupHeader">
                        <img class="backIcon" style="visibility:hidden" src="static/images/leftBack.png">
                        <div class="headerTittle" style="color:black; font-size: 0.24rem;">课程信息确认</div>
                        <div @click="closePopup" class="p510"><img class="backIcon" src="static/images/close2c.png"></div>
                        </div>
                        <div class="popupBody box-v-start align-stretch">
                            <div class="box-justify popupItem">
                                <div class="popupSamallT">课程</div>
                                <div class="popupSamallT2">{{confirmCourse.english_name}}</div>
                            </div>
                            <div class="box-justify popupItem">
                                <div class="popupSamallT">老师</div>
                                <div class="popupSamallT2 box-start">
                                    <img class="user-avatar" style="width:20px;height:20px;margin-right:0.10rem" src="static/images/course/head-img.png">
                                    <div>{{confirmCourse.teacher_english_name}}</div>
                                </div>
                            </div>
                            <div class="box-justify popupItem">
                                <div class="popupSamallT">上课地址</div>
                                <div class="popupSamallT2">{{confirmCourse.school_name}}</div>
                            </div>
                            <div class="box-justify popupItem">
                                <div class="popupSamallT">时间</div>
                                <div class="popupSamallT2">{{confirmCourse.appointmentTime + ' ' + confirmCourse.appointment_start_time + '-' + confirmCourse.appointment_over_time}}</div>
                            </div>
                        </div>
                        <div class="box-center popupFoot" @click="addAppointment">
                            <div class="headerTittle">确&nbsp;&nbsp;定</div>
                        </div>
                    </div>
                    <div v-if="orderSuccess" style="width:100%;height:170px;background-color:white; padding: 20px 0;" class="box-v-center">
                        <div>
                            <img class="user-avatar" style="margin-bottom:0.3rem;width:45px;height:45px" src="static/images/success.png">		 </div>
                            <div class="headerTittle" style="color:#c5393c;margin-bottom:0.4rem">
                                已成功预约该课程
                            </div>
                            <div class="popupSamallT" style="margin-bottom:0.5rem">
                                请提醒孩子尽快学习课前教材哦
                            </div>
                            <router-link to="/classList">
                                <div class="red-btn" style="width: 60%; margin: 0 auto;">确定</div>
                            </router-link>
                            <!-- <a target="_blank" :href="course.h5_file_url"><button class="red-btn">查看课件</button></a> -->
                            <!-- <a target="_blank" :href="confirmCourse.coursewareList[0] && confirmCourse.coursewareList[0].h5_file_url"><div class="red-btn">查看课件</div></a> -->
                        </div>
            </mt-popup>
        </div>

    </div>
</template>

<script>
import mixin from '@/js/common/student_mixin'
export default {
    data() {
        return {
            weekDate: [],
            weekDateShow: [],
            popupShow: false,
            orderSuccess: false,
            checkedValue: true,

            appointment_time: '', //当前周的周一日期
            courseListData: [], //可预约的导读课程
            studentList: [],
            activeDate: 0, //当前可预约日期
            activeDateCourse: [], //当前可预约日期的课程
            confirmCourse: {}, //确认预约课程信息
            curYearMonth: '',
            curDateTime: '',
            curStudentIndex: 0,
            hasSubmit: false,
            orderedGradeList: [],
        }
    },
    computed: {
        curStudent() {
            return this.studentList.length && this.studentList[this.curStudentIndex];
        },
    },
    watch: {
        activeDate(val) {
            this.activeDateCourse = [];
            this.courseListData.filter((item) => {
                if (+item.appointment_time.substr(8, 2) === val) {
                    this.activeDateCourse.push(item)
                }
            });
        }
    },
    mounted() {
        this.setCurStudentIndex();
        this.getMonday()
        this.getweekDate()
        this.getYearMonth()
        this.queryStudentAll()
    },
    mixins: [mixin],
    methods: {
        setCurStudentIndex() {
            this.curStudentIndex = +sessionStorage.getItem('curStudentIndex') || 0;
        },
        //切换周日期
        handleChange(index) {
            let activeWeekMonday;
            if (index === 0) {
                activeWeekMonday = new Date().getDate();
                this.changeWeekCourse(this.curYearMonth + activeWeekMonday, activeWeekMonday, 6)
            } else {
                activeWeekMonday = this.weekDate[7].weekDate;
                this.changeWeekCourse(this.curYearMonth + activeWeekMonday, activeWeekMonday, 13)
            }
        },
        //切换周日期
        changeWeekCourse(weekTime, monday, sundayIndex) {
            this.appointment_time = weekTime;
            sessionStorage.removeItem('courseListData')
            this.queryReadCourseAppointment(monday, sundayIndex);
        },
        goback() {
            history.go(-1)
        },
        //获取学生信息
        queryStudentAll() {
            this.$service.queryStudentAll((res) => {
                    let resDate = res.data;
                    this.dataLoaded = true;
                    if (resDate.code === "0" && resDate.data.length) {
                        this.studentList = resDate.data;
                        //获取线下导读课程
                        this.queryReadCourseAppointment(new Date().getDate(), 6);
                    } else if (!resDate.data) {
                        this.$showMsg(resDate.message)
                    } else if (!resDate.data.length) {
                        let message = '未查找到用户信息'
                        this.$showMsg(message)
                    }
                },
                error => {
                    console.error(error);
                }
            );
        },
        //获取线下导读课程
        queryReadCourseAppointment(monday, sundayIndex) {
            let dataParams = this.$qs.stringify({
                school_id: this.curStudent.schoolId,
                appointment_time: this.appointment_time,
                student_id: this.curStudent.studentId
            });

            this.$service.queryReadCourseAppointment(
                dataParams,
                res => {
                    if (res.data.code === "0") {
                        this.courseListData = res.data.data;
                        this.initActiveDate(monday, sundayIndex);
                        sessionStorage.setItem('courseListData', JSON.stringify(res.data.data))
                    }
                },
                error => {
                    console.error(error);
                }
            );
        },
        //计算当前可预约日期
        initActiveDate(curDate, sundayIndex) {
            let hasActiveCourse = false;
            let today = +curDate;
            let leftDay = +this.weekDate[sundayIndex].weekDate - today;

            this.activeDate = '';
            if (!this.courseListData.length) {
                this.activeDate = today;
                return;
            }
            //计算当周剩余天数
            if (leftDay <= 0) {
                this.weekDateShow.forEach((item, index) => {
                    if (item.weekDate == today) {
                        leftDay = 6 - index;
                    }
                })
            }
            //从今日开始，遍历当周课程，显示最近日期的课程
            for (let i = 0; i <= leftDay; i++) {
                this.courseListData.filter((item) => {
                    if (+item.appointment_time.substr(8, 2) === today && !hasActiveCourse) {
                        //设置当前可预约日期
                        this.activeDate = today;
                        hasActiveCourse = true;
                    }
                });
                today++
            }
            if (this.activeDate === '') {
                this.activeDate = +curDate;
            }
        },
        getweekDate() {
            var that = this;
            that.weekDate = [];
            var Nowdate = new Date();
            var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
            var oneTime = WeekFirstDay.getDate()
            if (oneTime < 10) {
                oneTime = '0' + oneTime
            } else {
                oneTime = "" + oneTime
            }
            that.weekDate.push({
                weekDate: oneTime
            })
            for (let i = 1; i < 14; i++) {
                var tempTime = new Date((WeekFirstDay / 1000 + i * 86400) * 1000).getDate();
                if (tempTime < 10) {
                    tempTime = '0' + tempTime
                } else {
                    tempTime = '' + tempTime
                }
                that.weekDate.push({
                    weekDate: tempTime
                });
            }

            for (let i = 0; i < 7; i++) {
                that.weekDateShow.push(that.weekDate[i])
            }
        },
        orderCourse(item) {
            let _hasOrdered = false;
            this.confirmCourse = item;
            //已经预约的课程，则直接显示课件
            this.orderedGradeList.filter((grade) => {
                if (item.grade_number === grade) {
                    _hasOrdered = true;
                }
            })
            if (_hasOrdered) {
                this.popupShow = true;
                this.orderSuccess = true;
            } else {
                this.popupShow = true;
                this.orderSuccess = false;
            }
        },
        chooseDate(item) {
            this.activeDate = +item.weekDate;
        },
        closePopup() {
            this.popupShow = false;
        },
        SwipeNextWeek() {
            var that = this;
            that.weekDateShow = [];
            for (var i = 7; i < 14; i++) {
                that.weekDateShow.push(that.weekDate[i])
            }

            var activeWeekMonday = that.weekDate[7].weekDate;
            this.changeWeekCourse(this.curYearMonth + activeWeekMonday, activeWeekMonday, 13)
        },
        onSwipeRight() {
            var that = this;
            that.weekDateShow = [];
            for (var i = 0; i < 7; i++) {
                that.weekDateShow.push(that.weekDate[i])
            }
            this.changeWeekCourse(this.curYearMonth + that.weekDate[0].weekDate, new Date().getDate(), 6)
        },
        //提交预约课程
        addAppointment() {
            // if(this.isDateCanAppoiment()) {
            //     this.$showMsg('当前日期不可预约');
            //     return;
            // }
            if (this.hasSubmit) {
                return;
            }
            this.hasSubmit = true;
            this.confirmCourse.student_id = this.curStudent.studentId;
            this.confirmCourse.classroom_type = 1;
            let dataParams = this.$qs.stringify(this.confirmCourse);
            this.$service.addAppointment(
                dataParams,
                res => {
                    this.hasSubmit = false;
                    if (res.data.code === "0") {
                        this.orderSuccess = true;
                        this.orderedGradeList.push(this.confirmCourse.grade_number);
                    } else {
                        this.$showMsg(res.data.message)
                    }
                },
                error => {
                    this.hasSubmit = false;
                    console.error(error);
                }
            );
        },
        isDateCanAppoiment() {
            return this.curDateTime < this.confirmCourse.appointmentTime
        }
    }

}
</script>

<style>
html,
body {
    height: 100%;
    min-height: 100%;
}

#app {
    height: 100%;
}

.OrderBodyContent {
    padding: 0px;
    margin: 0px;
    min-height: 100%;
}

.topOrder {
    padding: 0.1rem 0.2rem;
    background: #00244C;
}

.topHeader {}

.user-avatar {
    width: 35px;
    height: 35px;
    border-radius: 60px;
    display: block;
}

.backIcon {
    width: 20px;
    height: 20px;
    border-radius: 60px;
    display: block;
    margin-right: 0.22rem;
}

.backIcon2 {
    width: 20px;
    height: 20px;
    border-radius: 60px;
    display: block;
    margin-top: 0.04rem;
}

.headerTittle {
    color: white;
    font-size: 0.3rem;
}

.topItem {
    margin-top: 0.3rem;
}

.smallTittle {
    color: #CAD6DC;
    margin-bottom: 0.15rem;
}

.bigWFont {
    color: white;
    font-size: 0.23rem;
}

.bodyItem {
    padding: 0rem 0.15rem;
    margin-bottom: 0.2rem;
}

.orderBody {
    padding-top: 0.4rem;
    background-color: #E7E7E7
}

.timeCourse {
    border-left: 1px solid #BEBEBE;
}

.panlInfo {
    background-color: white;
    border-radius: 8px;
    padding: 0.1rem 0.30rem;
    margin-bottom: 0.2rem;
}

.sirName {
    font-size: 0.23rem;
    font-weight: 600;
    margin-bottom: 0.1rem;
}

.panlFollow {
    padding-top: 0.15rem;
}

.followClass {
    background-color: #FFCE9A;
    color: white;
    padding: 0.04rem;
    border-radius: 3px;
}

.pointTime {
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 30px;
    margin-left: -3px;
}

.popupHeader {
    padding: 0.25rem 0.15rem;
    border-bottom: 1px solid #b7b7b7;
}

.popupBody {
    padding: 0.35rem 0.20rem;

}

.popupSamallT {
    font-size: 0.25rem;
    color: #b7b7b7
}

.popupSamallT2 {
    font-size: 0.25rem;
    color: black
}

.popupItem {
    margin-bottom: 0.4rem;
}

.popupFoot {
    background-color: #B02E2E;
    color: white;
    padding: 0.35rem 0rem
}
</style>
