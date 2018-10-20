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
    <div class="course-main ">
        <div class="course-main-header">
            <h3>线下导读</h3>
            <p class="des">老师带领细读经典英文课本</p>
            <div v-if="courseListData.status === '-1' || courseListData.status === '4'">
                <div class="introduce box-start">
                    <img  src="static/images/course/book.png">
                    <div class="introduce-right box-v-center align-start">
                        <div class="introduce-text">
                            <p class="bold">{{courseListData.name}}</p>
                            <p>{{courseListData.schoolName}}</p>
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
                            <p class="f26 bold">{{courseListData.name}}</p>
                            <p class="mtop10">{{courseListData.appointmentTime | timeFormat}}</p>
                            <p class="box-start mtop10">
                                <img class="user-avatar" src="static/images/course/head-img.png">
                                <span class="mleft15">老师：{{courseListData.englishName}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="displaybox border-top mtop10 pt10">
                    <div class="left boxflex01" target="_blank" @click="cancelCourse(courseListData.gradeNumber)"><button class="box-center">取消课程</button></div>
                    <!-- <div v-for="item in courseListData.file" v-if="item.fileType === '1'" class="right boxflex01"><button class="red-btn" @click="viewCourseDetail(courseListData)">预习课件</button></div> -->
                    <a target="_blank" v-for="course in courseListData.file" v-if="course.fileType === '1'" class="right boxflex01" :href="course.h5_file_url"><button class="red-btn">查看课件</button></a>
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
                                        <p>{{item.course_name}}</p>
                                        <p>{{item.appointment_time | timeFormat}}</p>
                                        <p class="box-start">
                                            <img class="avatar" src="static/images/course/head-img.png">
                                            <span class="box-center">{{item.teacher_english_name || item.english_name}}</span>
                                            <!-- <span class="box-center">|</span>
                                            <span class="box-center">4.5分</span> -->
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="item-bot box-center">
                                <a target="_blank" v-for="course in item.coursewareList" v-if="course.fileType === '1'" :href="course.h5_file_url"><button class="red-btn">查看课件</button></a>
                                <!-- <button class="red-btn" @click="viewCourseDetail(item)">查看课件</button> -->
                                <button v-for="course in item.coursewareList" v-if="course.fileType === '0' && curTabIndex === 0" class="red-btn" @click="doHomework(item)">做作业</button>
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
                courseRecordData: [
    
{
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735159801216165",
		"teacher_id": "152845283545259806201279",
		"line": 2,
		"appointment_over_time": "18:00",
		"classhour_type": "151663241406235092578752",
		"grade_number": "2018091912597",
		"english_name": "Qianna",
		"school_id": "151624329992235091733904",
		"appointment_type": 4,
		"app_explain": null,
		"ID": "153699729052959801001485",
		"state": "1",
		"SECRET_LEVEL": "",
		"over_time": "2018-09-19T02:00:00.000+0000",
		"start_date": "2018-09-19",
		"courseware_id": "1527757085555",
		"course_id": "152775560731259801216133",
		"classroom_id": "151747750802759801346523",
		"appointment_time": "2018-09-19T01:15:00.000+0000",
		"subscribe": "2018-09-15 15:41:30",
		"course_name": "欢迎来到农场",
		"ETL_FLAG": "O",
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-2 T32 Welcome to the farm PPT.pdf",
			"APPENDIX_URL": "appendix/M00/00/23/rBLrN1tykSaANqOQADDTdZj9GDo746.pdf",
			"table_id": "1527757085555",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/23/rBLrN1tykSaANqOQADDTdZj9GDo746.pdf",
			"fileType": "1",
			"fileId": "153423491843259801934699"
		}, {
			"APPENDIX_NAME": "Pre-2 T32 Welcome to the farm HW.pdf",
			"APPENDIX_URL": "appendix/M00/00/23/rBLrN1tykTCAceFCAAyTpeOrTI8215.pdf",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/23/rBLrN1tykTCAceFCAAyTpeOrTI8215.pdf",
			"fileType": "1",
			"fileId": "153423492833259801404707"
		}, {
			"APPENDIX_NAME": "PreL2 T32 Welcome to the farm.mp3",
			"APPENDIX_URL": "appendix/M00/00/25/rBLrN1t2iF6AS7B2ACsXSisIlUU704.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/25/rBLrN1t2iF6AS7B2ACsXSisIlUU704.mp3",
			"fileType": "0",
			"fileId": "153449481489859801226321"
		}],
		"coid": "150760086241435091502172",
		"appointment_start_time": "17:15",
		"UPDATE_TIME": "2018-09-17T15:30:52.000+0000",
		"name": null
	}, {
		"courseware_id": "1527757085555",
		"course_id": "152775560731259801216133",
		"classroom_id": "151747750802759801346523",
		"appointment_time": "2018-09-20T03:15:00.000+0000",
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735159801216165",
		"subscribe": "2018-09-15 15:41:30",
		"course_name": "欢迎来到农场",
		"teacher_id": "152845238043359806198592",
		"ETL_FLAG": "O",
		"line": 2,
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-2 T32 Welcome to the farm PPT.pdf",
			"APPENDIX_URL": "appendix/M00/00/23/rBLrN1tykSaANqOQADDTdZj9GDo746.pdf",
			"table_id": "1527757085555",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/23/rBLrN1tykSaANqOQADDTdZj9GDo746.pdf",
			"fileType": "1",
			"fileId": "153423491843259801934699"
		}, {
			"APPENDIX_NAME": "Pre-2 T32 Welcome to the farm HW.pdf",
			"APPENDIX_URL": "appendix/M00/00/23/rBLrN1tykTCAceFCAAyTpeOrTI8215.pdf",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/23/rBLrN1tykTCAceFCAAyTpeOrTI8215.pdf",
			"fileType": "1",
			"fileId": "153423492833259801404707"
		}, {
			"APPENDIX_NAME": "PreL2 T32 Welcome to the farm.mp3",
			"APPENDIX_URL": "appendix/M00/00/25/rBLrN1t2iF6AS7B2ACsXSisIlUU704.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/25/rBLrN1t2iF6AS7B2ACsXSisIlUU704.mp3",
			"fileType": "0",
			"fileId": "153449481489859801226321"
		}],
		"coid": "150760086241435091502172",
		"classhour_type": "151663241406235092578752",
		"UPDATE_TIME": "2018-09-17T04:31:28.000+0000",
		"grade_number": "2018092012598",
		"english_name": "Nancy",
		"school_id": "151624329992235091733904",
		"appointment_type": 4,
		"ID": "153699729056259801001492",
		"state": "1",
		"SECRET_LEVEL": "",
		"over_time": "2018-09-20T04:00:00.000+0000"
	}, {
		"courseware_id": "1527757085555",
		"course_id": "152775560731259801216133",
		"classroom_id": "151747750802759801346523",
		"appointment_time": "2018-09-21T02:15:00.000+0000",
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735159801216165",
		"subscribe": "2018-09-17 14:09:50",
		"course_name": "欢迎来到农场",
		"teacher_id": "152845283545259806201279",
		"ETL_FLAG": "O",
		"line": 2,
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-2 T32 Welcome to the farm PPT.pdf",
			"APPENDIX_URL": "appendix/M00/00/23/rBLrN1tykSaANqOQADDTdZj9GDo746.pdf",
			"table_id": "1527757085555",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/23/rBLrN1tykSaANqOQADDTdZj9GDo746.pdf",
			"fileType": "1",
			"fileId": "153423491843259801934699"
		}, {
			"APPENDIX_NAME": "Pre-2 T32 Welcome to the farm HW.pdf",
			"APPENDIX_URL": "appendix/M00/00/23/rBLrN1tykTCAceFCAAyTpeOrTI8215.pdf",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/23/rBLrN1tykTCAceFCAAyTpeOrTI8215.pdf",
			"fileType": "1",
			"fileId": "153423492833259801404707"
		}, {
			"APPENDIX_NAME": "PreL2 T32 Welcome to the farm.mp3",
			"APPENDIX_URL": "appendix/M00/00/25/rBLrN1t2iF6AS7B2ACsXSisIlUU704.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/25/rBLrN1t2iF6AS7B2ACsXSisIlUU704.mp3",
			"fileType": "0",
			"fileId": "153449481489859801226321"
		}],
		"coid": "150760086241435091502172",
		"classhour_type": "151663241406235092578752",
		"UPDATE_TIME": "2018-09-17T21:46:18.000+0000",
		"grade_number": "2018092112599",
		"english_name": "Qianna",
		"school_id": "151624329992235091733904",
		"appointment_type": 4,
		"ID": "153699729060459801001500",
		"state": "1",
		"SECRET_LEVEL": "",
		"over_time": "2018-09-21T03:00:00.000+0000"
	}, {
		"courseware_id": "1527757085555",
		"course_id": "152775560731259801216133",
		"classroom_id": "151747750802759801346523",
		"appointment_time": "2018-09-23T01:15:00.000+0000",
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735159801216165",
		"subscribe": "2018-09-15 15:41:30",
		"course_name": "欢迎来到农场",
		"teacher_id": "152845238043359806198592",
		"ETL_FLAG": "O",
		"line": 2,
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-2 T32 Welcome to the farm PPT.pdf",
			"APPENDIX_URL": "appendix/M00/00/23/rBLrN1tykSaANqOQADDTdZj9GDo746.pdf",
			"table_id": "1527757085555",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/23/rBLrN1tykSaANqOQADDTdZj9GDo746.pdf",
			"fileType": "1",
			"fileId": "153423491843259801934699"
		}, {
			"APPENDIX_NAME": "Pre-2 T32 Welcome to the farm HW.pdf",
			"APPENDIX_URL": "appendix/M00/00/23/rBLrN1tykTCAceFCAAyTpeOrTI8215.pdf",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/23/rBLrN1tykTCAceFCAAyTpeOrTI8215.pdf",
			"fileType": "1",
			"fileId": "153423492833259801404707"
		}, {
			"APPENDIX_NAME": "PreL2 T32 Welcome to the farm.mp3",
			"APPENDIX_URL": "appendix/M00/00/25/rBLrN1t2iF6AS7B2ACsXSisIlUU704.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/25/rBLrN1t2iF6AS7B2ACsXSisIlUU704.mp3",
			"fileType": "0",
			"fileId": "153449481489859801226321"
		}],
		"coid": "150760086241435091502172",
		"classhour_type": "151663241406235092578752",
		"UPDATE_TIME": "2018-09-16T12:24:25.000+0000",
		"grade_number": "2018092312600",
		"english_name": "Nancy",
		"school_id": "151624329992235091733904",
		"appointment_type": 4,
		"ID": "153699729064159801001508",
		"state": "1",
		"SECRET_LEVEL": "",
		"over_time": "2018-09-23T02:00:00.000+0000"
	}, {
		"courseware_id": "1527757049845",
		"course_id": "152775560731259801216133",
		"classroom_id": "151747750802759801346523",
		"appointment_time": "2018-09-26T01:15:00.000+0000",
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735259801216166",
		"subscribe": "2018-09-22 18:42:04",
		"course_name": "动物之书",
		"teacher_id": "152845283545259806201279",
		"ETL_FLAG": "O",
		"line": 2,
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-2 T33 The animal book PPT.pdf",
			"APPENDIX_URL": "appendix/M00/00/26/rBLrN1t35OqAWenEACY8JvtCsNY203.pdf",
			"table_id": "1527757049845",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/26/rBLrN1t35OqAWenEACY8JvtCsNY203.pdf",
			"fileType": "1",
			"fileId": "153458404296159801734862"
		}, {
			"APPENDIX_NAME": "PreL2 T33 The Animal Book.mp3",
			"APPENDIX_URL": "appendix/M00/00/26/rBLrN1t35NuAMLwtACcfx0dVazE644.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/26/rBLrN1t35NuAMLwtACcfx0dVazE644.mp3",
			"fileType": "0",
			"fileId": "153458402777959801774859"
		}],
		"coid": "150760086241435091502172",
		"classhour_type": "151663241406235092578752",
		"UPDATE_TIME": "2018-09-23T11:29:32.000+0000",
		"grade_number": "2018092612782",
		"english_name": "Qianna",
		"school_id": "151624329992235091733904",
		"appointment_type": 4,
		"ID": "153761292449359807211330",
		"state": "1",
		"SECRET_LEVEL": "",
		"over_time": "2018-09-26T02:00:00.000+0000"
	}, {
		"courseware_id": "1527757049845",
		"course_id": "152775560731259801216133",
		"classroom_id": "151757238803559801345050",
		"appointment_time": "2018-09-27T03:15:00.000+0000",
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735259801216166",
		"subscribe": "2018-09-22 18:49:26",
		"course_name": "动物之书",
		"teacher_id": "152845283545259806201279",
		"ETL_FLAG": "O",
		"line": 2,
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-2 T33 The animal book PPT.pdf",
			"APPENDIX_URL": "appendix/M00/00/26/rBLrN1t35OqAWenEACY8JvtCsNY203.pdf",
			"table_id": "1527757049845",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/26/rBLrN1t35OqAWenEACY8JvtCsNY203.pdf",
			"fileType": "1",
			"fileId": "153458404296159801734862"
		}, {
			"APPENDIX_NAME": "PreL2 T33 The Animal Book.mp3",
			"APPENDIX_URL": "appendix/M00/00/26/rBLrN1t35NuAMLwtACcfx0dVazE644.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/26/rBLrN1t35NuAMLwtACcfx0dVazE644.mp3",
			"fileType": "0",
			"fileId": "153458402777959801774859"
		}],
		"coid": "150760086241435091502172",
		"classhour_type": "151663241406235092578752",
		"UPDATE_TIME": "2018-09-24T05:23:21.000+0000",
		"grade_number": "2018092712786",
		"english_name": "Qianna",
		"school_id": "151624329992235091733904",
		"appointment_type": 4,
		"ID": "153761336607559808421888",
		"state": "1",
		"SECRET_LEVEL": "",
		"over_time": "2018-09-27T04:00:00.000+0000"
	}, {
		"courseware_id": "1527757049845",
		"course_id": "152775560731259801216133",
		"classroom_id": "151747750802759801346523",
		"appointment_time": "2018-09-29T01:15:00.000+0000",
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735259801216166",
		"subscribe": "2018-09-22 18:54:02",
		"course_name": "动物之书",
		"teacher_id": "152845238043359806198592",
		"ETL_FLAG": "O",
		"line": 2,
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-2 T33 The animal book PPT.pdf",
			"APPENDIX_URL": "appendix/M00/00/26/rBLrN1t35OqAWenEACY8JvtCsNY203.pdf",
			"table_id": "1527757049845",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/26/rBLrN1t35OqAWenEACY8JvtCsNY203.pdf",
			"fileType": "1",
			"fileId": "153458404296159801734862"
		}, {
			"APPENDIX_NAME": "PreL2 T33 The Animal Book.mp3",
			"APPENDIX_URL": "appendix/M00/00/26/rBLrN1t35NuAMLwtACcfx0dVazE644.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/26/rBLrN1t35NuAMLwtACcfx0dVazE644.mp3",
			"fileType": "0",
			"fileId": "153458402777959801774859"
		}],
		"coid": "150760086241435091502172",
		"classhour_type": "151663241406235092578752",
		"UPDATE_TIME": "2018-09-23T08:35:05.000+0000",
		"grade_number": "2018092912792",
		"english_name": "Nancy",
		"school_id": "151624329992235091733904",
		"appointment_type": 4,
		"ID": "153761364293659807211971",
		"state": "1",
		"SECRET_LEVEL": "",
		"over_time": "2018-09-29T02:00:00.000+0000"
	}, {
		"courseware_id": "1527757029842",
		"course_id": "152775560731259801216133",
		"classroom_id": "151747750802759801346523",
		"appointment_time": "2018-10-04T03:15:00.000+0000",
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735359801216167",
		"subscribe": "2018-09-29 13:30:36",
		"course_name": "有趣的游戏",
		"teacher_id": "152845238043359806198592",
		"ETL_FLAG": "O",
		"line": 2,
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-2 T34 Having fun PPT.pdf",
			"APPENDIX_URL": "appendix/M00/00/25/rBLrN1t3viaAc9xhACS9jqqU2I8128.pdf",
			"table_id": "1527757029842",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/25/rBLrN1t3viaAc9xhACS9jqqU2I8128.pdf",
			"fileType": "1",
			"fileId": "153457411892859801766371"
		}, {
			"APPENDIX_NAME": "Pre-2 T34 Having fun HW.pdf",
			"APPENDIX_URL": "appendix/M00/00/25/rBLrN1t3viCABXCXAAc2C4i7Vzs053.pdf",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/25/rBLrN1t3viCABXCXAAc2C4i7Vzs053.pdf",
			"fileType": "1",
			"fileId": "153457411202359801706366"
		}, {
			"APPENDIX_NAME": "PreL2 T34 Having Fun.mp3",
			"APPENDIX_URL": "appendix/M00/00/27/rBLrN1t73ZGAfNpMABvpkzunwMo639.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/27/rBLrN1t73ZGAfNpMABvpkzunwMo639.mp3",
			"fileType": "0",
			"fileId": "153484430596059801757419"
		}],
		"coid": "150760086241435091502172",
		"classhour_type": "151663241406235092578752",
		"UPDATE_TIME": "2018-09-30T00:45:57.000+0000",
		"grade_number": "2018100412963",
		"english_name": "Nancy",
		"school_id": "151624329992235091733904",
		"appointment_type": 4,
		"ID": "153819903622559801697148",
		"state": "1",
		"SECRET_LEVEL": "",
		"over_time": "2018-10-04T04:00:00.000+0000"
	}, {
		"courseware_id": "1527757029842",
		"course_id": "152775560731259801216133",
		"classroom_id": "151747750802759801346523",
		"appointment_time": "2018-10-06T01:15:00.000+0000",
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735359801216167",
		"subscribe": "2018-09-29 13:30:36",
		"course_name": "有趣的游戏",
		"teacher_id": "152845283545259806201279",
		"ETL_FLAG": "O",
		"line": 2,
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-2 T34 Having fun PPT.pdf",
			"APPENDIX_URL": "appendix/M00/00/25/rBLrN1t3viaAc9xhACS9jqqU2I8128.pdf",
			"table_id": "1527757029842",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/25/rBLrN1t3viaAc9xhACS9jqqU2I8128.pdf",
			"fileType": "1",
			"fileId": "153457411892859801766371"
		}, {
			"APPENDIX_NAME": "Pre-2 T34 Having fun HW.pdf",
			"APPENDIX_URL": "appendix/M00/00/25/rBLrN1t3viCABXCXAAc2C4i7Vzs053.pdf",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/25/rBLrN1t3viCABXCXAAc2C4i7Vzs053.pdf",
			"fileType": "1",
			"fileId": "153457411202359801706366"
		}, {
			"APPENDIX_NAME": "PreL2 T34 Having Fun.mp3",
			"APPENDIX_URL": "appendix/M00/00/27/rBLrN1t73ZGAfNpMABvpkzunwMo639.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/27/rBLrN1t73ZGAfNpMABvpkzunwMo639.mp3",
			"fileType": "0",
			"fileId": "153484430596059801757419"
		}],
		"coid": "150760086241435091502172",
		"classhour_type": "151663241406235092578752",
		"UPDATE_TIME": "2018-09-30T11:15:49.000+0000",
		"grade_number": "2018100612964",
		"english_name": "Qianna",
		"school_id": "151624329992235091733904",
		"appointment_type": 4,
		"ID": "153819903625759801697156",
		"state": "1",
		"SECRET_LEVEL": "",
		"over_time": "2018-10-06T02:00:00.000+0000"
	}, {
		"courseware_id": "1527757029842",
		"course_id": "152775560731259801216133",
		"classroom_id": "151747750802759801346523",
		"appointment_time": "2018-10-07T00:15:00.000+0000",
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735359801216167",
		"subscribe": "2018-09-29 13:30:36",
		"course_name": "有趣的游戏",
		"teacher_id": "152845283545259806201279",
		"ETL_FLAG": "O",
		"line": 2,
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-2 T34 Having fun PPT.pdf",
			"APPENDIX_URL": "appendix/M00/00/25/rBLrN1t3viaAc9xhACS9jqqU2I8128.pdf",
			"table_id": "1527757029842",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/25/rBLrN1t3viaAc9xhACS9jqqU2I8128.pdf",
			"fileType": "1",
			"fileId": "153457411892859801766371"
		}, {
			"APPENDIX_NAME": "Pre-2 T34 Having fun HW.pdf",
			"APPENDIX_URL": "appendix/M00/00/25/rBLrN1t3viCABXCXAAc2C4i7Vzs053.pdf",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/25/rBLrN1t3viCABXCXAAc2C4i7Vzs053.pdf",
			"fileType": "1",
			"fileId": "153457411202359801706366"
		}, {
			"APPENDIX_NAME": "PreL2 T34 Having Fun.mp3",
			"APPENDIX_URL": "appendix/M00/00/27/rBLrN1t73ZGAfNpMABvpkzunwMo639.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/27/rBLrN1t73ZGAfNpMABvpkzunwMo639.mp3",
			"fileType": "0",
			"fileId": "153484430596059801757419"
		}],
		"coid": "150760086241435091502172",
		"classhour_type": "151663241406235092578752",
		"UPDATE_TIME": "2018-10-06T01:40:57.000+0000",
		"grade_number": "2018100712965",
		"english_name": "Qianna",
		"school_id": "151624329992235091733904",
		"appointment_type": 4,
		"ID": "153819903630659801697163",
		"state": "1",
		"SECRET_LEVEL": "",
		"over_time": "2018-10-07T01:00:00.000+0000"
	}, {
		"courseware_id": "1527757005531",
		"course_id": "152775560731259801216133",
		"classroom_id": "151747750802759801346523",
		"appointment_time": "2018-10-10T02:15:00.000+0000",
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735459801216168",
		"subscribe": "2018-10-05 14:50:11",
		"course_name": "它是谁？",
		"teacher_id": "152845283545259806201279",
		"ETL_FLAG": "O",
		"line": 2,
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-L2  T35 Who is it PDF.pdf",
			"APPENDIX_URL": "appendix/M00/00/27/rBLrN1t74ZSAM4S3ACvWkkd6Rz8036.pdf",
			"table_id": "1527757005531",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/27/rBLrN1t74ZSAM4S3ACvWkkd6Rz8036.pdf",
			"fileType": "1",
			"fileId": "153484533249759801798854"
		}, {
			"APPENDIX_NAME": "Pre-L2 T35 Who is It.mp3",
			"APPENDIX_URL": "appendix/M00/00/29/rBLrN1t_xe6AfHDAAARWeg726C4451.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/29/rBLrN1t_xe6AfHDAAARWeg726C4451.mp3",
			"fileType": "0",
			"fileId": "153510039833259801378900"
		}],
		"coid": "150760086241435091502172",
		"classhour_type": "151663241406235092578752",
		"UPDATE_TIME": "2018-10-08T10:44:55.000+0000",
		"grade_number": "2018101013088",
		"english_name": "Qianna",
		"school_id": "151624329992235091733904",
		"appointment_type": 4,
		"ID": "153872221167859801695225",
		"state": "1",
		"SECRET_LEVEL": "",
		"over_time": "2018-10-10T03:00:00.000+0000"
	}, {
		"courseware_id": "1527757005531",
		"course_id": "152775560731259801216133",
		"classroom_id": "151747750802759801346523",
		"appointment_time": "2018-10-11T03:15:00.000+0000",
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735459801216168",
		"subscribe": "2018-10-05 14:55:37",
		"course_name": "它是谁？",
		"teacher_id": "152845238043359806198592",
		"ETL_FLAG": "O",
		"line": 2,
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-L2  T35 Who is it PDF.pdf",
			"APPENDIX_URL": "appendix/M00/00/27/rBLrN1t74ZSAM4S3ACvWkkd6Rz8036.pdf",
			"table_id": "1527757005531",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/27/rBLrN1t74ZSAM4S3ACvWkkd6Rz8036.pdf",
			"fileType": "1",
			"fileId": "153484533249759801798854"
		}, {
			"APPENDIX_NAME": "Pre-L2 T35 Who is It.mp3",
			"APPENDIX_URL": "appendix/M00/00/29/rBLrN1t_xe6AfHDAAARWeg726C4451.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/29/rBLrN1t_xe6AfHDAAARWeg726C4451.mp3",
			"fileType": "0",
			"fileId": "153510039833259801378900"
		}],
		"coid": "150760086241435091502172",
		"classhour_type": "151663241406235092578752",
		"UPDATE_TIME": "2018-10-06T09:43:02.000+0000",
		"grade_number": "2018101113095",
		"english_name": "Nancy",
		"school_id": "151624329992235091733904",
		"appointment_type": 4,
		"ID": "153872253713559802645339",
		"state": "1",
		"SECRET_LEVEL": "",
		"over_time": "2018-10-11T04:00:00.000+0000"
	}, {
		"courseware_id": "1527757005531",
		"course_id": "152775560731259801216133",
		"classroom_id": "151747750802759801346523",
		"appointment_time": "2018-10-13T01:15:00.000+0000",
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735459801216168",
		"subscribe": "2018-10-05 15:06:08",
		"course_name": "它是谁？",
		"teacher_id": "152845238043359806198592",
		"ETL_FLAG": "O",
		"line": 2,
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-L2  T35 Who is it PDF.pdf",
			"APPENDIX_URL": "appendix/M00/00/27/rBLrN1t74ZSAM4S3ACvWkkd6Rz8036.pdf",
			"table_id": "1527757005531",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/27/rBLrN1t74ZSAM4S3ACvWkkd6Rz8036.pdf",
			"fileType": "1",
			"fileId": "153484533249759801798854"
		}, {
			"APPENDIX_NAME": "Pre-L2 T35 Who is It.mp3",
			"APPENDIX_URL": "appendix/M00/00/29/rBLrN1t_xe6AfHDAAARWeg726C4451.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/29/rBLrN1t_xe6AfHDAAARWeg726C4451.mp3",
			"fileType": "0",
			"fileId": "153510039833259801378900"
		}],
		"coid": "150760086241435091502172",
		"classhour_type": "151663241406235092578752",
		"UPDATE_TIME": "2018-10-06T08:24:49.000+0000",
		"grade_number": "2018101313104",
		"english_name": "Nancy",
		"school_id": "151624329992235091733904",
		"appointment_type": 4,
		"ID": "153872316840959802155538",
		"state": "1",
		"SECRET_LEVEL": "",
		"over_time": "2018-10-13T02:00:00.000+0000"
	}, {
		"courseware_id": "1527757005531",
		"course_id": "152775560731259801216133",
		"classroom_id": "151747750802759801346523",
		"appointment_time": "2018-10-14T00:15:00.000+0000",
		"type_name": "2",
		"gid": "-1",
		"course_unit_id": "152775560735459801216168",
		"subscribe": "2018-10-05 15:17:27",
		"course_name": "它是谁？",
		"teacher_id": "152845283545259806201279",
		"ETL_FLAG": "O",
		"line": 2,
		"coursewareList": [{
			"APPENDIX_NAME": "Pre-L2  T35 Who is it PDF.pdf",
			"APPENDIX_URL": "appendix/M00/00/27/rBLrN1t74ZSAM4S3ACvWkkd6Rz8036.pdf",
			"table_id": "1527757005531",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/27/rBLrN1t74ZSAM4S3ACvWkkd6Rz8036.pdf",
			"fileType": "1",
			"fileId": "153484533249759801798854"
		}, {
			"APPENDIX_NAME": "Pre-L2 T35 Who is It.mp3",
			"APPENDIX_URL": "appendix/M00/00/29/rBLrN1t_xe6AfHDAAARWeg726C4451.mp3",
			"h5_file_url": "https://www.chel-c.com/appendix/M00/00/29/rBLrN1t_xe6AfHDAAARWeg726C4451.mp3",
			"fileType": "0",
			"fileId": "153510039833259801378900"
		}]}

                ],   //已参加的导读课程
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
