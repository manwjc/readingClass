<template>
<div>
    <mt-navbar class="border-bottom" v-model="selected">
        <mt-tab-item id="1"><span style="font-size: 18px !important">周冠军</span></mt-tab-item>
        <mt-tab-item id="2"><span style="font-size: 18px !important">月冠军</span></mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
            <div class="courseContent">
                <div class="courseHeader box-start">
                    <div class="courseItem box-start align-stretch">
                        <img src="../../static/images/book.png" class="bookImg"/>
                        <div class="rest box-v-start align-stretch">
                            <!-- <div class="itemHeader">南山益田假日广场导读室</div> -->
                            <div class="timeCss box-start">
                                <div class="label_name" v-if="roomArrLoaded">导读室</div>
								<select class="input_normal boxflex01 m010" v-model="selectedRoom" @change="queryCourseByClassAndGrade" >
									<option v-for="item in roomArr"  :value="item.classroomId">{{ item.classroom_name }}</option>
								</select>
                            </div>
                            <div class="timeCss box-start" v-if="levelArrLoaded">
                                <div class="label_name">等级</div>
								<select class="input_normal boxflex01 m010" v-model="selectedLevel" name="level" @change="queryCourseByClassAndGrade" >
									<option v-for="item in levelArr"  :value="item.grade">{{ item.name }}</option>
								</select>
                            </div>
                            <div class="timeCss box-start" v-if="courseArrLoaded">
								<div class="label_name">课程</div>
								<select class="input_normal boxflex01 m010" v-model="selectedCourse" >
									<option v-for="item in courseArr"  :value="item.grade_number">{{ item.courseware_name }}</option>
								</select>
                            </div>
                            <div class="timeCss box-justify" style="margin-bottom:0.2rem">
                                <div class="box-start">
									学生：<span class="bold mright10">{{studentWeekList.length}}人</span>
									状态：<span class="bold"></span>
								</div>
                                <div v-if="isSettedWeek === '-1'" class="setBtn" @click="checkChampion">设置为</div>
                                <div v-else class="setBtn" @click="viewWeekChampion">查看周冠军</div>
							</div>
                        </div>
                    </div>
                </div>
                <div class="p10">
                    从以下等级划分区域选择5名学员进行评选：<div class="mleft10 mtop10">Pre-L1，Pre-L2，Pre-L3，L1-L3，L4及以上</div>
                </div>
                <div class="subHeaderName">
                    学生信息
                </div>
                <div class="courseBody box-v-start rest align-stretch" v-if="studentWeekList.length > 0">
                    <div class="box-justify align-stretch itemStu ptb20" v-for="(item,index) in studentWeekList" :key="item.id">
                        <div class="box-start align-stretch rest">
                            <img src="static/images/course/head-img.png" class="smallStudentAvator"/>
                            <div class="box-v-start align-stretch rest mleft20">
                                <div class="box-start">
                                    <div style="margin-bottom:0.2rem;margin-top:3px;width: 56%">英文名：{{item.englishName}}</div>
                                    <div style="margin-bottom:0.2rem;margin-top:3px">性别：
										<span v-if="item.sex === '1'">男</span>
										<span v-else>女</span>
									</div>
                                </div>
                                <div class="box-start">
                                    <div style="margin-bottom:0.2rem;;width: 56%">中文名：{{item.name}}</div>
                                    <div style="margin-bottom:0.2rem">等级：{{item.grade | gradeFormat}}</div>
                                </div>
                                <!-- <div>
                                    <div style="margin-bottom:0.2rem;margin-top:3px;font-size: 0.24rem"><span style="color:blue;visibility: hidden;"></span>课程主题：joe和他特殊的衣服</div>
                                </div> -->
                            </div>

                        </div>
                        <div class="box-v-start">
                            <div class="box-start">
                                <div @click="changeLike(index)">
                                    <!-- <img v-if="!item.isLike" class="icon-like" src="../../static/images/unlike.png"/> -->
                                    <img class="icon-like mtop5" src="../../static/images/like.png"/>		 
								</div>
								<div class="remarkCss">
									<input type="radio" name="weekRadio" class="mtop5" @click="setWeekChampion(item)">		 
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-else class="text-center mtop20 grey">该课程没有周冠军候选人</div>
			</div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <div class="courseContent">
                <div class="timeCss box-justify courseHeader2">
					<div class="box-start boxflex01">
						<div class="label_name">等级</div>
						<select class="input_normal boxflex01 m010" v-model="selectedLevel" name="level" @change="queryCourseByClassAndGrade" >
							<option v-for="item in levelArr"  :value="item.grade">{{ item.name }}</option>
						</select>
					</div>
                    <div v-if="isSettedMonth === '-1'" class="setBtn" @click="checkChampion">设置为</div>
                    <div v-else class="setBtn" @click="viewMonthChampion">查看月冠军</div>
                </div>
                <div class="p10">
                    从以下等级划分区域选择5名学员进行评选：<div class="mleft10 mtop10">Pre-L1，Pre-L2，Pre-L3，L1-L3，L4及以上</div>
                </div>
                <div class="subHeaderName">
                    本月周冠军信息
                </div>
                <div class="courseBody box-v-start rest align-stretch">
                    <div class="box-justify align-stretch itemStu" v-if="studentMonthList.length > 0" v-for="(item,index) in studentMonthList" :key="item.id">
                        <div class="box-start align-stretch rest">
                            <img src="static/images/course/head-img.png" class="smallStudentAvator"/>
                            <div class="box-v-start align-stretch rest mleft10">
                                <div class="box-start">
                                    <div style="margin-bottom:0.2rem;margin-top:3px;width: 56%">英文名：{{item.englishName}}</div>
                                    <div style="margin-bottom:0.2rem;margin-top:3px">性别：
                                        <span v-if="item.sex === '1'">男</span>
                                        <span v-else>女</span>
                                    </div>
                                </div>
                                <div class="box-start">
                                    <div style="margin-bottom:0.2rem;;width: 56%">中文名：{{item.name}}</div>
                                    <div style="margin-bottom:0.2rem">等级：{{item.grade | gradeFormat}}</div>
                                </div>
                                <!-- <div>
                                    <div style="margin-bottom:0.2rem;margin-top:3px;font-size: 0.24rem">课程主题：{{curCoursewareName}}</div>
                                </div> -->
                            </div>
                        </div>
                        <div class="box-v-start">
                            <div class="box-start">
                                <div @click="changeLike(index)">
									<!-- <img v-if="!item.isLike" class="icon-like" src="../../static/images/unlike.png"/> -->
									<img class="icon-like" src="../../static/images/like.png"/>		 
								</div>
								<div class="remarkCss">
									<input ref="" type="radio" name="monthRadio" class="mtop5" @click="setMonthChampion(item)">		 
								</div>
							</div>
						</div>
					</div>
				    <div v-else class="text-center mtop20 grey">该等级没有月冠军候选人</div>
				</div>
			</div>
        </mt-tab-container-item>
    </mt-tab-container>
    
    <el-dialog :append-to-body=true :title="'以下学员设置为' + (selected === '1' ? '周冠军':'月冠军')" :visible.sync="checkDialogShow" width="90%" 
    :show-close=true :close-on-click-modal=true :center=true top="20%">
        <div >
            <el-table v-if="selected === '1'" border :data="weekChampionArray" style="width: 100%">
                <el-table-column prop="student_name" label="学员">
                </el-table-column>
                <el-table-column prop="student_level" label="等级">
                    <template slot-scope="scope">
                        <span>{{scope.row.student_level | gradeFormat}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-table v-else border :data="monthChampionArray" style="width: 100%">
                <el-table-column prop="student_name" label="学员">
                </el-table-column>
                <el-table-column prop="student_level" label="等级">
                </el-table-column>
            </el-table>
            <div class="mtop10 text-right">
                <el-button type="info" @click="cancelDialog">取消</el-button>
                <el-button type="primary" @click="submitChampion">确定</el-button>
            </div>
        </div>       
    </el-dialog>
</div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
import utils from '@/js/common/utils'
export default {
    name: "saSet",
    data() {
        return {
            userData: null,
            videoUrl: '',
            selected: "1",
            courseList: [ {
                    name: "joe",
                    name2: "刘一依",
                    sex: "女",
                    level: "2",
                    isRemark: false,
                    isLike: false,
                    id: 5
                }
			],

            seachObj: {
                stuRoomName: '',
                stuLevel: 1,
                stuLevelName: '',
                courseName: '',
                stuLevelMonth: 1,
                stuLevelNameMonth: '',

            },
			
			levelArrLoaded: false,
			roomArrLoaded: false,
			courseArrLoaded: false,
			selectedRoom: '',
			selectedLevel: '',
			selectedCourse: '',
			roomArr: [],
			levelArr: [],
			courseArr: [],

            studentWeekList: [],
            studentMonthList: [],
            checkDialogShow: false,
			//周冠军评选 
			/* 						grade
			Pre-L1      1个最佳视频  	1
			Pre-L2      1个最佳视频 	2
			Pre-L3      1个最佳视频 	3
			L1-L3       1个最佳视频  	4-6
			L4及以上    1个最佳视频 	7+
			*/
			weekChampionArray: [],  //已选中的周冠军候选人
			monthChampionArray: [],     //已选中的月冠军候选人
            dialogTitleText: '周冠军',  
            isPageInited: false,    //页面是否已初始化
            weekChampionSetted: false,  //是否已设置周冠军
            monthChampionSetted: false,  //是否已设置月冠军
        }
	},
	watch: {
		selectedLevel(val) {
            if(!this.isPageInited) {
                return false;
            }
            if(this.selected === '1') {
                this.queryWeekChampionCandidate();
            }else{
                this.queryMonthChampionCandidate();
            }
        },
		selectedCourse(val) {
            this.courseArr.forEach(item => {
                if(val == item.grade_number) {
                    this.curCoursewareName = item.courseware_name
                }
            })
            if(!this.isPageInited) {
                return false;
            }
            if(this.selected === '1') {
                this.queryWeekChampionCandidate();
            }else{
                this.queryMonthChampionCandidate();
            }
        },
        selected(val) {
            if(val === '1') {
                this.queryWeekChampionCandidate();
            }else{
                this.queryMonthChampionCandidate();
            }
        },
        weekChampionArray(val) {
            let isAllSet = true;
            if(val.length < 5) {
                isAllSet = false;
            }
            this.hasSelectedWeekChampion = isAllSet;
        },
        monthChampionArray(val) {
            let isAllSet = true;
            if(val.length < 5) {
                isAllSet = false;
            }
            this.hasSelectedMonthChampion = isAllSet;
        },
    },
    computed: {
        isSettedWeek() {
            let isSettedWeek = '-1';
            this.roomArr.forEach(item => {
                if(item.classroomId === this.selectedRoom) {
                    isSettedWeek = item.isSettedWeek;
                }
            })
            return isSettedWeek;
        },
        isSettedMonth() {
            let isSettedMonth = '-1';
            this.roomArr.forEach(item => {
                if(item.classroomId === this.selectedRoom) {
                    isSettedMonth = item.isSettedMonth;
                }
            })
            return isSettedMonth;
        },
    },
    mounted() {
        this.initPage();
    },
    methods: {
        async initPage() {
			await this.queryGradeAll();
			await this.queryClassroomByStudentAdmin();
			await this.queryCourseByClassAndGrade();
            this.queryWeekChampionCandidate();
            this.isPageInited = true;
        },
        changeLike(index) {
            var that = this;
            for (var i = 0; i < that.courseList.length; i++) {
                if (i == index) {
                    that.courseList[i].isLike = !that.courseList[i].isLike;
                }
            }
		},
        //查询导读室
        queryClassroomByStudentAdmin() {
			return new Promise((resolve, reject) => {
            	this.$service.queryClassroomByStudentAdmin(res => {
                    if (res.data.code === "0") {
						this.roomArrLoaded = true;
						this.roomArr = res.data.data;
						this.selectedRoom = this.roomArr.length && this.roomArr[0].classroomId;
						resolve();
                    }
                },
                error => {
                    console.error(error);
                });
			})
        },
        //查询等级
        queryGradeAll() {
			return new Promise((resolve, reject) => {
				this.$service.queryGradeAll(res => {
					if (res.data.code === "0") {
						this.levelArrLoaded = true;
						this.levelArr = res.data.data;
						this.selectedLevel = this.levelArr.length && this.levelArr[0].grade;
						resolve();
					}
				},
				error => {
					console.error(error);
				});
			})
        },
        //根据导读室和等级查询课程
        queryCourseByClassAndGrade() {
			let dataParams = this.$qs.stringify({
				classroomId: this.selectedRoom,
                grade: this.selectedLevel
			});
			return new Promise((resolve, reject) => {
				this.$service.queryCourseByClassAndGrade(
					dataParams, 
					res => {
					if (res.data.code === "0") {
						this.courseArrLoaded = true;
						this.courseArr = res.data.data;
						this.selectedCourse = this.courseArr.length && this.courseArr[0].grade_number;
						resolve();
					}
				},
				error => {
					console.error(error);
				});
			})
        },
        //查询周冠军候选人
        queryWeekChampionCandidate() {
            let dataParams = this.$qs.stringify({
                gradeNumber: this.selectedCourse,
            });
            this.studentWeekList = [];
            this.$service.queryWeekChampionCandidate(
                dataParams,
                res => {
                    if (res.data.code === "0") {
                        this.studentWeekList = res.data.data;
                    }else{
                        this.$showMsg(res.data.message)
                    }
                },
                error => {
                    console.error(error);
                }
            );
        },
        //查询月冠军候选人
        queryMonthChampionCandidate() {
            let dataParams = this.$qs.stringify({
                grade: this.selectedLevel
            });
            this.studentMonthList = [];
            this.$service.queryMonthChampionCandidate(
                dataParams,
                res => {
                    if (res.data.code === "0") {
                        this.studentMonthList = res.data.data;
                    }else{
                        this.$showMsg(res.data.message)
                    }
                },
                error => {
                    console.error(error);
                }
            );
        },
        //设置月冠军
		setMonthChampion(item) {
            let hasTheSameStudent = false;
            this.monthChampionArray.find(student => {
                if(student.student_id === item.student_id) {
                    hasTheSameStudent = true;
                }
            })
            if(hasTheSameStudent) {
                this.$showMsg('该学生已选中')
                return false;
            }

            let obj = {};
            obj.classroomId = this.selectedRoom;
            obj.grade = item.grade;
            obj.gradeNumber = item.grade_number;
            obj.student_id = item.ID;
            obj.student_name = item.name;
            obj.student_level = this.selectedLevel;
			switch(+item.grade) {
                case 1:
                    this.monthChampionArray.splice(0, 1, obj);
                    break;
                case 2:
                    this.monthChampionArray.splice(1, 1, obj);
                    break;
                case 3:
                    this.monthChampionArray.splice(2, 1, obj);
                    break;
                case 4 || 5 || 6:
                    this.monthChampionArray.splice(3, 1, obj);
                    break;
                default:
                    this.monthChampionArray.splice(4, 1, obj);
                    break;
            }
        },
        //设置周冠军
		setWeekChampion(item) {
            let hasTheSameStudent = false;
            this.weekChampionArray.find(student => {
                if(student.student_id === item.student_id) {
                    hasTheSameStudent = true;
                }
            })
            if(hasTheSameStudent) {
                this.$showMsg('该学生已选中')
                return false;
            }

            let obj = {};
            obj.classroomId = this.selectedRoom;
            obj.grade = item.grade;
            obj.gradeNumber = item.grade_number;
            obj.student_id = item.student_id;
            obj.student_name = item.name;
            obj.student_level = this.selectedLevel;
			switch(+item.grade) {
                case 1:
                    this.weekChampionArray.splice(0, 1, obj);
                    break;
                case 2:
                    this.weekChampionArray.splice(1, 1, obj);
                    break;
                case 3:
                    this.weekChampionArray.splice(2, 1, obj);
                    break;
                case 4 || 5 || 6:
                    this.weekChampionArray.splice(3, 1, obj);
                    break;
                default:
                    this.weekChampionArray.splice(4, 1, obj);
                    break;
            }
            this.$forceUpdate();
        },
        checkChampion() {
            this.checkDialogShow = true;
        },
        cancelDialog() {
            this.checkDialogShow = false;
        },
        submitChampion() {
            if(this.selected === '1') {
                this.addWeekChampion();
            }else{
                this.addMonthChampion();
            }
        },
        viewWeekChampion() {
            this.$router.push({'path': '/weekChampion', query: {'classroomId': this.selectedRoom}})
        },
        viewMonthChampion() {
            this.$router.push({'path': '/monthChampion', query: {'classroomId': this.selectedRoom}})
        },
        //保存周冠军
        addWeekChampion() {
            if(!this.hasSelectedWeekChampion) {
                this.$showMsg('请选择5个等级的周冠军');
                return false;
            }
            this.checkDialogShow = false;
            let dataParams = this.weekChampionArray;

            this.$service.addWeekChampion(
                dataParams,
                res => {
                    if (res.data.code === "0") {
                        this.$showMsg(res.data.message)
                        this.isSettedWeek = true;
                    }
                },
                error => {
                    console.error(error);
                }
            );
        },
        //保存月冠军
        addMonthChampion() {
            // let dataParams = this.$qs.stringify(this.monthChampionArray);
            let dataParams = this.monthChampionArray;
            if(!this.hasSelectedMonthChampion) {
                this.$showMsg('请选择5个等级的月冠军');
                return false;
            }

            this.$service.addMonthChampion(
                dataParams,
                res => {
                    if (res.data.code === "0") {
                        this.$showMsg(res.data.message)
                        this.isSettedMonth = true;
                    }
                },
                error => {
                    console.error(error);
                }
            );
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

.courseContent {
    color: black;
}

.courseHeader {
    /* padding: 0.3rem 0.4rem; */
    /* background-color: #F8F7F2 */
}

.courseHeader2 {
    padding: 0.3rem 0.4rem 0.1rem;
    /* background-color: #F8F7F2 */
}

.smallStudentAvator {
    width: 0.8rem;
    height: 0.8rem;
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
    padding: 0.3rem 0.15rem 0.1rem;
    border-radius: 5px;

}

.bookImg {
    width: 62px;
    height: 90px;
    margin-right: 0.1rem;
}

.itemHeader {
    margin-bottom: 0.20rem;
    margin-top: 5px;
    font-size: 0.26rem;
}

.timeCss {
    margin-bottom: 0.2rem;
    color: #7A7774
}

.remarkCss {
    border-radius: 10px;

    color: #145192;
    padding: 0rem 0.25rem;
}
.remarkCss input[type=radio]{ width: 20px; height: 20px;}

.itemStu {
    border-bottom: 1px solid #dadada;
    padding: 0.2rem 0 0.1rem
}

.hoverClass {
    cursor: pointer;
    padding: 0.3rem;
}

.hoverClass:hover {
    background-color: #EFEFEF;
}

.mobileSelect {
    border: 1px solid rgb(218, 218, 218);
    width: 1.5rem;
    min-height: 0.16rem;
    padding: 0.05px 0.1rem;
    /*position: relative;*/
}

.mobileSelectIcon {
    /*position: absolute;*/
    margin-left: -0.28rem;
}

.setBtn {
    padding: 0.1rem 0.3rem;
    color: white;
    background-color: #E70012;
    text-align: center;
    border-radius: 10px;
}

.label_name{ min-width: 0.8rem;}
.text-right{ text-align: right}
.mint-tab-item-label{ font-size: 20px !important;}
</style>
