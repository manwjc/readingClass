<template>
<div class="courseContent">
    <div class="courseHeader box-start">
        <img src="static/images/course/head-img.png" class="smallAvator"/>
        <div class="fontName">{{courseData.teacherName}}</div>
        <!-- <div style="color:#dadada;margin-left:0.2rem; border-left: 1px solid #dadada;">4.5分</div> -->
    </div>
    <div class="topOrder box-v-start align-stretch">
        <div class="topHeader box-justify">
            <div class="topItem" style="margin-top:0.45rem">
                <div class="smallTittle">选择上课地点</div>
                <div class="bigWFont box-start">
                    <div style="margin-right:0.1rem">{{courseData.schoolName}}</div>
                    <img class="backIcon" style="width: 15px;height: 15px;" src="static/images/down.png">		</div>
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
        <mt-swipe :auto="0" :show-indicators="false" :continuous="false" style="height:28px;background: #00244C;padding: 0rem 0.2rem;">
            <mt-swipe-item>
                <div class="box-justify align-stretch">
                    <div class="bigWFont" v-for=" (item,index) in weekDate" v-if="index<7" @click="choseDate(item)">
                        <div>
                            {{item.weekDate}}
                        </div>
                        <img class="backIcon2" style="width: 13px;height: 13px;" src="static/images/up.png" v-if="activeDate === item.weekDate">		    </div>
                    </div>
            </mt-swipe-item>
            <mt-swipe-item>
                <div class="box-justify align-stretch">
                    <div class="bigWFont" v-for=" (item,index) in weekDate" v-if="index>6" @click="choseDate(item)">
                        <div>
                            {{item.weekDate}}
                        </div>
                        <img class="backIcon2" style="width: 13px;height: 13px;" src="static/images/up.png" v-if="item.isChose">		    </div>
                    </div>
            </mt-swipe-item>
        </mt-swipe>
        <div class="courseBody box-v-start rest">
            <div @click="goCourseDetail(item)" class="courseItem box-start align-stretch" v-for="item in courseData.courseList" :key="item.id">
                <img src="static/images/book.png" class="bookImg"/>
                <div class="rest box-v-start align-stretch">
                    <div class="itemHeader">{{courseData.classroomName}}</div>
                    <div class="timeCss">{{item.appointment_time | timeFormat}}</div>
                    <div style="margin-bottom:0.2rem">
                        等级：<span style="font-weight:600">{{item.course_acronym}}</span> &nbsp;&nbsp;
                        学生：<span style="font-weight:600">{{item.classSize}}</span> &nbsp;&nbsp;
                        状态：<span style="font-weight:600">{{item.state}}</span>
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
            weekDate: [],
            weekDateShow: [],
            popupShow: false,
            orderSuccess: false,
            checkedValue: true,
            activeDate: '',
            courseList: [{
                    adrress: "南山益田假日广场导读室",
                    time: "2018-08-08  14:30",
                    level: "Pre-L1",
                    students: "8人",
                    state: "未上课",
                    id: 1
                },
                {
                    adrress: "南山益田假日广场导读室",
                    time: "2018-08-08  14:30",
                    level: "Pre-L1",
                    students: "8人",
                    state: "未上课",
                    id: 2
                },
                {
                    adrress: "南山益田假日广场导读室",
                    time: "2018-08-08  14:30",
                    level: "Pre-L1",
                    students: "8人",
                    state: "未上课",
                    id: 3
                },
                {
                    adrress: "南山益田假日广场导读室",
                    time: "2018-08-08  14:30",
                    level: "Pre-L1",
                    students: "8人",
                    state: "未上课",
                    id: 4
                },
                {
                    adrress: "南山益田假日广场导读室",
                    time: "2018-08-08  14:30",
                    level: "Pre-L1",
                    students: "8人",
                    state: "未上课",
                    id: 5
                }
            ],
            courseData: {
                "teacherName": "ivy",
                "classroomName": "宁波银泰城阅读馆",
                "courseList": [{
                        "course_id": "152775716351959801217146",
                        "classroom_id": "152824984235559801345545",
                        "appointment_time": "2018-08-30T08:30:00.000+0000",
                        "type_name": "2",
                        "gid": "-1",
                        "course_unit_id": "152775716355259801217175",
                        "subscribe": "2018-08-24 17:45:20",
                        "teacher_id": "152057961382795471640003",
                        "ETL_FLAG": "O",
                        "line": 2,
                        "coid": "150760086241435091502172",
                        "classhour_type": "151663241406235092578752",
                        "UPDATE_TIME": "2018-08-24T17:45:21.000+0000",
                        "grade_number": "2018083012004",
                        "school_id": "151624329992235091733941",
                        "appointment_type": 4,
                        "ID": "153510392091859801376941",
                        "state": "2",
                        "SECRET_LEVEL": "",
                        "over_time": "2018-08-30T09:15:00.000+0000"
                    },
                    {
                        "course_id": "152775560731259801216133",
                        "classroom_id": "152824984235559801345545",
                        "appointment_time": "2018-08-30T11:30:00.000+0000",
                        "type_name": "2",
                        "gid": "-1",
                        "course_unit_id": "152775560734859801216162",
                        "subscribe": "2018-08-24 17:46:05",
                        "teacher_id": "152057961382795471640003",
                        "ETL_FLAG": "O",
                        "line": 2,
                        "coid": "150760086241435091502172",
                        "classhour_type": "151663241406235092578752",
                        "UPDATE_TIME": "2018-08-24T17:46:06.000+0000",
                        "grade_number": "2018083012005",
                        "school_id": "151624329992235091733941",
                        "appointment_type": 4,
                        "ID": "153510396572659801386974",
                        "state": "2",
                        "SECRET_LEVEL": "",
                        "over_time": "2018-08-30T12:15:00.000+0000"
                    },
                    {
                        "course_id": "152775379955959801214993",
                        "classroom_id": "152824984235559801345545",
                        "appointment_time": "2018-08-30T10:30:00.000+0000",
                        "type_name": "2",
                        "gid": "-1",
                        "course_unit_id": "152775379959159801215022",
                        "subscribe": "2018-08-24 17:46:25",
                        "teacher_id": "152057961382795471640003",
                        "ETL_FLAG": "O",
                        "line": 2,
                        "coid": "150760086241435091502172",
                        "classhour_type": "151663241406235092578752",
                        "UPDATE_TIME": "2018-08-24T19:35:15.000+0000",
                        "grade_number": "2018083012006",
                        "school_id": "151624329992235091733941",
                        "appointment_type": 4,
                        "ID": "153510398579159801426991",
                        "state": "1",
                        "SECRET_LEVEL": "",
                        "over_time": "2018-08-30T11:15:00.000+0000"
                    },
                    {
                        "course_id": "152775379955959801214993",
                        "classroom_id": "152824984235559801345545",
                        "appointment_time": "2018-08-31T02:15:00.000+0000",
                        "type_name": "2",
                        "gid": "-1",
                        "course_unit_id": "152775379959159801215022",
                        "subscribe": "2018-08-24 17:46:52",
                        "teacher_id": "152057961382795471640003",
                        "ETL_FLAG": "O",
                        "line": 2,
                        "coid": "150760086241435091502172",
                        "classhour_type": "151663241406235092578752",
                        "UPDATE_TIME": "2018-08-24T18:06:11.000+0000",
                        "grade_number": "2018083112007",
                        "school_id": "151624329992235091733941",
                        "appointment_type": 4,
                        "ID": "153510401229659801387008",
                        "state": "1",
                        "SECRET_LEVEL": "",
                        "over_time": "2018-08-31T03:00:00.000+0000"
                    },
                    {
                        "course_id": "152775716351959801217146",
                        "classroom_id": "152824984235559801345545",
                        "appointment_time": "2018-09-01T02:15:00.000+0000",
                        "type_name": "2",
                        "gid": "-1",
                        "course_unit_id": "152775716355259801217175",
                        "subscribe": "2018-08-24 17:48:27",
                        "teacher_id": "152057961382795471640003",
                        "ETL_FLAG": "O",
                        "line": 2,
                        "coid": "150760086241435091502172",
                        "classhour_type": "151663241406235092578752",
                        "UPDATE_TIME": "2018-08-25T09:56:39.000+0000",
                        "grade_number": "2018090112010",
                        "school_id": "151624329992235091733941",
                        "appointment_type": 4,
                        "ID": "153510410775859801377062",
                        "state": "1",
                        "SECRET_LEVEL": "",
                        "over_time": "2018-09-01T03:00:00.000+0000"
                    },
                    {
                        "course_id": "152775560731259801216133",
                        "classroom_id": "152824984235559801345545",
                        "appointment_time": "2018-09-01T03:15:00.000+0000",
                        "type_name": "2",
                        "gid": "-1",
                        "course_unit_id": "152775560734859801216162",
                        "subscribe": "2018-08-24 17:48:48",
                        "teacher_id": "152057961382795471640003",
                        "ETL_FLAG": "O",
                        "line": 2,
                        "coid": "150760086241435091502172",
                        "classhour_type": "151663241406235092578752",
                        "UPDATE_TIME": "2018-08-25T09:45:38.000+0000",
                        "grade_number": "2018090112011",
                        "school_id": "151624329992235091733941",
                        "appointment_type": 4,
                        "ID": "153510412891359801437077",
                        "state": "1",
                        "SECRET_LEVEL": "",
                        "over_time": "2018-09-01T04:00:00.000+0000"
                    },
                    {
                        "course_id": "152775379955959801214993",
                        "classroom_id": "152824984235559801345545",
                        "appointment_time": "2018-09-01T08:30:00.000+0000",
                        "type_name": "2",
                        "gid": "-1",
                        "course_unit_id": "152775379959159801215022",
                        "subscribe": "2018-08-24 17:49:47",
                        "teacher_id": "152057961382795471640003",
                        "ETL_FLAG": "O",
                        "line": 2,
                        "coid": "150760086241435091502172",
                        "classhour_type": "151663241406235092578752",
                        "UPDATE_TIME": "2018-08-24T17:49:48.000+0000",
                        "grade_number": "2018090112012",
                        "school_id": "151624329992235091733941",
                        "appointment_type": 4,
                        "ID": "153510418768659801427102",
                        "state": "2",
                        "SECRET_LEVEL": "",
                        "over_time": "2018-09-01T09:15:00.000+0000"
                    }
                ],
                "schoolName": "宁波银泰城阅读馆"
            },
            courseListData: [{
                    "course_id": "152775716351959801217146",
                    "classroom_id": "152824984235559801345545",
                    "appointment_time": "2018-08-19T08:30:00.000+0000",
                    "type_name": "2",
                    "gid": "-1",
                    "course_unit_id": "152775716355259801217175",
                    "subscribe": "2018-08-24 17:45:20",
                    "teacher_id": "152057961382795471640003",
                    "ETL_FLAG": "O",
                    "line": 2,
                    "coid": "150760086241435091502172",
                    "classhour_type": "151663241406235092578752",
                    "UPDATE_TIME": "2018-08-24T17:45:21.000+0000",
                    "grade_number": "2018083012004",
                    "school_id": "151624329992235091733941",
                    "appointment_type": 4,
                    "ID": "153510392091859801376941",
                    "state": "2",
                    "SECRET_LEVEL": "",
                    "over_time": "2018-08-19T09:15:00.000+0000"
                },
                {
                    "course_id": "152775560731259801216133",
                    "classroom_id": "152824984235559801345545",
                    "appointment_time": "2018-08-19T11:30:00.000+0000",
                    "type_name": "2",
                    "gid": "-1",
                    "course_unit_id": "152775560734859801216162",
                    "subscribe": "2018-08-24 17:46:05",
                    "teacher_id": "152057961382795471640003",
                    "ETL_FLAG": "O",
                    "line": 2,
                    "coid": "150760086241435091502172",
                    "classhour_type": "151663241406235092578752",
                    "UPDATE_TIME": "2018-08-24T17:46:06.000+0000",
                    "grade_number": "2018083012005",
                    "school_id": "151624329992235091733941",
                    "appointment_type": 4,
                    "ID": "153510396572659801386974",
                    "state": "2",
                    "SECRET_LEVEL": "",
                    "over_time": "2018-08-19T12:15:00.000+0000"
                },
                {
                    "course_id": "152775379955959801214993",
                    "classroom_id": "152824984235559801345545",
                    "appointment_time": "2018-08-19T10:30:00.000+0000",
                    "type_name": "2",
                    "gid": "-1",
                    "course_unit_id": "152775379959159801215022",
                    "subscribe": "2018-08-24 17:46:25",
                    "teacher_id": "152057961382795471640003",
                    "ETL_FLAG": "O",
                    "line": 2,
                    "coid": "150760086241435091502172",
                    "classhour_type": "151663241406235092578752",
                    "UPDATE_TIME": "2018-08-24T19:35:15.000+0000",
                    "grade_number": "2018083012006",
                    "school_id": "151624329992235091733941",
                    "appointment_type": 4,
                    "ID": "153510398579159801426991",
                    "state": "1",
                    "SECRET_LEVEL": "",
                    "over_time": "2018-08-19T11:15:00.000+0000"
                },
                {
                    "course_id": "152775379955959801214993",
                    "classroom_id": "152824984235559801345545",
                    "appointment_time": "2018-08-20T02:15:00.000+0000",
                    "type_name": "2",
                    "gid": "-1",
                    "course_unit_id": "152775379959159801215022",
                    "subscribe": "2018-08-24 17:46:52",
                    "teacher_id": "152057961382795471640003",
                    "ETL_FLAG": "O",
                    "line": 2,
                    "coid": "150760086241435091502172",
                    "classhour_type": "151663241406235092578752",
                    "UPDATE_TIME": "2018-08-24T18:06:11.000+0000",
                    "grade_number": "2018083112007",
                    "school_id": "151624329992235091733941",
                    "appointment_type": 4,
                    "ID": "153510401229659801387008",
                    "state": "1",
                    "SECRET_LEVEL": "",
                    "over_time": "2018-08-20T03:00:00.000+0000"
                },
                {
                    "course_id": "152775716351959801217146",
                    "classroom_id": "152824984235559801345545",
                    "appointment_time": "2018-09-21T02:15:00.000+0000",
                    "type_name": "2",
                    "gid": "-1",
                    "course_unit_id": "152775716355259801217175",
                    "subscribe": "2018-08-24 17:48:27",
                    "teacher_id": "152057961382795471640003",
                    "ETL_FLAG": "O",
                    "line": 2,
                    "coid": "150760086241435091502172",
                    "classhour_type": "151663241406235092578752",
                    "UPDATE_TIME": "2018-08-25T09:56:39.000+0000",
                    "grade_number": "2018090112010",
                    "school_id": "151624329992235091733941",
                    "appointment_type": 4,
                    "ID": "153510410775859801377062",
                    "state": "1",
                    "SECRET_LEVEL": "",
                    "over_time": "2018-09-21T03:00:00.000+0000"
                },
                {
                    "course_id": "152775560731259801216133",
                    "classroom_id": "152824984235559801345545",
                    "appointment_time": "2018-09-21T03:15:00.000+0000",
                    "type_name": "2",
                    "gid": "-1",
                    "course_unit_id": "152775560734859801216162",
                    "subscribe": "2018-08-24 17:48:48",
                    "teacher_id": "152057961382795471640003",
                    "ETL_FLAG": "O",
                    "line": 2,
                    "coid": "150760086241435091502172",
                    "classhour_type": "151663241406235092578752",
                    "UPDATE_TIME": "2018-08-25T09:45:38.000+0000",
                    "grade_number": "2018090112011",
                    "school_id": "151624329992235091733941",
                    "appointment_type": 4,
                    "ID": "153510412891359801437077",
                    "state": "1",
                    "SECRET_LEVEL": "",
                    "over_time": "2018-09-21T04:00:00.000+0000"
                },
                {
                    "course_id": "152775379955959801214993",
                    "classroom_id": "152824984235559801345545",
                    "appointment_time": "2018-09-21T08:30:00.000+0000",
                    "type_name": "2",
                    "gid": "-1",
                    "course_unit_id": "152775379959159801215022",
                    "subscribe": "2018-08-24 17:49:47",
                    "teacher_id": "152057961382795471640003",
                    "ETL_FLAG": "O",
                    "line": 2,
                    "coid": "150760086241435091502172",
                    "classhour_type": "151663241406235092578752",
                    "UPDATE_TIME": "2018-08-24T17:49:48.000+0000",
                    "grade_number": "2018090112012",
                    "school_id": "151624329992235091733941",
                    "appointment_type": 4,
                    "ID": "153510418768659801427102",
                    "state": "2",
                    "SECRET_LEVEL": "",
                    "over_time": "2018-09-21T09:15:00.000+0000"
                }
            ],
        };
    },
    mounted() {
        this.getweekDate();
        this.initActiveDate(new Date().getDate(), 6);
    },
    methods: {
        //计算当前可预约日期
        initActiveDate(curDate, sundayIndex) {
            let hasActiveCourse = false;
            let today = +curDate;
            let leftDay = +this.weekDate[sundayIndex].weekDate - today;
            for(let i=0; i<=leftDay; i++) {
                this.courseListData.filter((item) => {
                    if(+item.appointment_time.substr(8, 2) === today && !hasActiveCourse) {
                        //设置当前可预约日期
                        this.activeDate = today;
                        hasActiveCourse = true;
                    }
                });
                today++
            }
        },
        getweekDate() {
            var that = this;
            that.weekDate = [];
            var Nowdate = new Date();
            var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
            var oneTime = WeekFirstDay.getDate();
            if (oneTime < 10) {
                oneTime = "0" + oneTime;
            } else {
                oneTime = "" + oneTime;
            }
            that.weekDate.push({
                isChose: true,
                weekDate: oneTime
            });
            for (var i = 1; i < 14; i++) {
                var tempTime = new Date(
                    (WeekFirstDay / 1000 + i * 86400) * 1000
                ).getDate();
                if (tempTime < 10) {
                    tempTime = "0" + tempTime;
                } else {
                    tempTime = "" + tempTime;
                }
                that.weekDate.push({
                    isChose: false,
                    weekDate: tempTime
                });
            }
            for (var i = 0; i < 7; i++) {
                that.weekDateShow.push(that.weekDate[i]);
            }
        },
        choseDate(item) {
            this.activeDate = item.weekDate;
        },
        goCourseDetail(item) {
            var that = this;
            that.$router.push({
                name: "courseItem",
                path: "/courseItem"
            });
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
    width: 30px;
    height: 30px;
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
    margin-bottom: 0.2rem;
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
</style>
