<template>
<div class="course-container course-index box-v-start align-stretch">
    <div class="course-top">
        <div class="users box-justify">
            <div class="box-start user-img-wrapper">
                <img class="user-img" src="static/images/course/wx.jpg">
                <div class="box-v-center align-start">
                    <p>周慧佳</p>
                    <p>L3 </p>
                </div>
            </div>
            <div  @click="changeStudent" class="box-end user-right">
                <p>其他孩子 &gt;</p>
            </div>
        </div>
    </div>
    <div class="videoItemClass">
      <div class="videoClass">
      	  <video src="http://www.w3school.com.cn/i/movie.ogg" controls="controls" style="width: 100%;height: 3rem"></video>
      </div>
    </div>
    <div class="remarkItem">
    	<div class="remarkItemDetail">
    		<el-rate v-model="value1" class="box-justify"></el-rate>
    	</div>
    </div>
    <div class="remarkItem box-start">
      <div style="width: 20%;visibility: hidden;">
      	专注力
      </div>
      <div class="rest box-start" style="font-weight: 600">
      	<span style="width: 20%;margin-left: 8px">A</span>
      	<span style="width: 20%;margin-left: 8px">B</span>
      	<span style="width: 20%;margin-left: 8px">C</span>
      	<span style="width: 20%;margin-left: 8px">D</span>
      	<span style="width: 20%;margin-left: 8px">E</span>
      </div>
    </div>
    <div class="remarkItem box-start align-stretch">
      <div class="remarkItemLeft">
      	<div style="margin-top: 4px">专注力</div>
      </div>
      <div class="rest box-v-start align-stretch">
      	<div class="box-start" style="margin-bottom: 0.15rem">
      		<div class="box-start" style="width: 20%" v-for="(item,index) in remarkArr1" @click="choseScore(index,'remarkArr1')">
      			<img src="static/images/circleT.png" style="width: 20px;height: 20px" v-if="item.ig">
      			<img src="static/images/circleF.png" style="width: 20px;height: 20px" v-if="!item.ig">
      			<div style="height: 1px;background-color: #DADADA" class="rest" v-if="index!=4"></div>
      		</div>
      	</div>
      	<div class="TipsFont">you can complete all reading</div>
      </div>
    </div>
    <div class="remarkItem box-start align-stretch">
      <div class="remarkItemLeft">
      	<div style="margin-top: 4px">语音</div>
      </div>
      <div class="rest box-v-start align-stretch">
      	<div class="box-start" style="margin-bottom: 0.15rem">
      		<div class="box-start" style="width: 20%" v-for="(item,index) in remarkArr2" @click="choseScore(index,'remarkArr2')">
      			<img src="static/images/circleT.png" style="width: 20px;height: 20px" v-if="item.ig">
      			<img src="static/images/circleF.png" style="width: 20px;height: 20px" v-if="!item.ig">
      			<div style="height: 1px;background-color: #DADADA" class="rest" v-if="index!=4"></div>
      		</div>
      	</div>
      	<div class="TipsFont">you can complete all reading</div>
      </div>
    </div>
    <div class="remarkItem box-start align-stretch">
      <div class="remarkItemLeft">
      	<div style="margin-top: 4px">词汇</div>
      </div>
      <div class="rest box-v-start align-stretch">
      	<div class="box-start" style="margin-bottom: 0.15rem">
      		<div class="box-start" style="width: 20%" v-for="(item,index) in remarkArr3" @click="choseScore(index,'remarkArr3')">
      			<img src="static/images/circleT.png" style="width: 20px;height: 20px" v-if="item.ig">
      			<img src="static/images/circleF.png" style="width: 20px;height: 20px" v-if="!item.ig">
      			<div style="height: 1px;background-color: #DADADA" class="rest" v-if="index!=4"></div>
      		</div>
      	</div>
      	<div class="TipsFont">you can complete all reading</div>
      </div>
    </div>
    <div class="remarkItem box-start align-stretch">
      <div class="remarkItemLeft">
      	<div style="margin-top: 4px">满意度</div>
      </div>
      <div class="rest box-v-start align-stretch">
      	<div class="box-start" style="margin-bottom: 0.15rem">
      		<div class="box-start" style="width: 20%" v-for="(item,index) in remarkArr4" @click="choseScore(index,'remarkArr4')">
      			<img src="static/images/circleT.png" style="width: 20px;height: 20px" v-if="item.ig">
      			<img src="static/images/circleF.png" style="width: 20px;height: 20px" v-if="!item.ig">
      			<div style="height: 1px;background-color: #DADADA" class="rest" v-if="index!=4"></div>
      		</div>
      	</div>
      	<div class="TipsFont">you can complete all reading</div>
      </div>
    </div>
    <div class="remarkItem rest" style="margin-top: 0.1rem">
    	<div class=" box-v-end">
			<div class="submitBtn" >提交作业</div>
	</div>
    </div>
    
</div>
</template>

<script>
	import Vue from 'vue'
	import Element from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css'
	Vue.use(Element)
export default {
    data() {
        return {
            dataLoaded: false,
            studentList: [],
            curStudentIndex: 2,
            //可预约的导读课程
            courseListData: [], 
            //已参加的导读课程
            courseRecordData: [],
            //当前周的周一日期
            appointment_time: '',
            curTabIndex: 0,
            value1:null,
            remarkArr1:[{ig:false},{ig:false},{ig:false},{ig:false},{ig:false}],
            remarkArr2:[{ig:false},{ig:false},{ig:false},{ig:false},{ig:false}],
            remarkArr3:[{ig:false},{ig:false},{ig:false},{ig:false},{ig:false}],
            remarkArr4:[{ig:false},{ig:false},{ig:false},{ig:false},{ig:false}],
            remarkArr5:[{ig:false},{ig:false},{ig:false},{ig:false},{ig:false}],
        };
    },
    computed: {
        curStudent() {
            return this.studentList[this.curStudentIndex];
        }
    },
    watch: {
        curStudentIndex: function() {
            //获取线下导读课程
            this.queryReadCourseAppointment();
            //获取已参加课程
            this.queryClassRecord();
        },
        curTabIndex: function(val) {
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
        this.initPage();
        this.getDate();
    },
    methods: {
    	choseScore(index,type){
           var that=this;
           if(type=="remarkArr1"){
           	for(var i=0;i<5;i++){
           		if(index>=i){
                  that.remarkArr1[i].ig=true;
           		}else{
           		  that.remarkArr1[i].ig=false;	
           		}
           	}
           	console.log(that.remarkArr1)
           }else if(type=="remarkArr2"){
           		for(var i=0;i<5;i++){
           		if(index>=i){
                  that.remarkArr2[i].ig=true;
           		}else{
           		  that.remarkArr2[i].ig=false;	
           		}
           	}
           }else if(type=="remarkArr3"){
           		for(var i=0;i<5;i++){
           		if(index>=i){
                  that.remarkArr3[i].ig=true;
           		}else{
           		  that.remarkArr3[i].ig=false;	
           		}
           	}
           }else if(type=="remarkArr4"){
           		for(var i=0;i<5;i++){
           		if(index>=i){
                  that.remarkArr4[i].ig=true;
           		}else{
           		  that.remarkArr4[i].ig=false;	
           		}
           	}
           }
    	},
        initPage() {
            //获取学生信息
            this.queryStudentAll();
        },
        cancelCourse(item) {
            console.log(item)
        },
        changeCourseTab(index) {
            this.curTabIndex = index
        },
        changeStudent() {
            if(this.curStudentIndex+1 < this.studentList.length) {
                this.curStudentIndex++
            }else{
                this.curStudentIndex = 0
            }
        },
        getDate() {
            let now = new Date();
            let nowTime = now.getTime() ;
            let day = now.getDay();
            let oneDayTime = 24*60*60*1000 ;
            let MondayTime = nowTime - (day-1)*oneDayTime ;//显示周一
            let formatDate = this.getNowFormatDate(new Date(MondayTime))
            this.appointment_time = formatDate;
            return formatDate;

        },
        getNowFormatDate(date) {
            let seperator1 = "-";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            let currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        //获取学生信息
        queryStudentAll() {
            this.$service.queryStudentAll((res) => {
                    this.dataLoaded = true;
                    if (res.data.code === "0" && res.data.data) {
                        this.studentList = res.data.data;
                        //获取线下导读课程
                        this.queryReadCourseAppointment();
                        //获取已参加课程
                        this.queryClassRecord();
                    }else if(!res.data.data){
					    this.$showMsg(res.data.message)
                    }
                },
                error => {
                    console.error(error);
                }
            );
        },
        //获取线下导读课程
        queryReadCourseAppointment() {
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
                    }
                },
                error => {
                    console.error(error);
                }
            );
        },
        //获取已参加课程
        queryClassRecord() {
            let dataParams = this.$qs.stringify({
                student_id: this.curStudent.studentId
            });

            this.$service.queryClassRecord(
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
        //获取未参加课程
        queryClassMissing() {
            let dataParams = this.$qs.stringify({
                school_id: this.curStudent.schoolId,
                student_id: this.curStudent.studentId
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
}

.course-index .course-main .course-main-header .introduce .introduce-text p:nth-of-type(1) {
    font-weight: 600;
    color: #000;
    font-size: 16px;
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
    padding: 10px 0 10px 20px;
}

.course-index .course-main .course-main-body .tab-header button {
    height: 30px;

    margin-right: 30px;
}

.course-index .course-main .course-main-body .tab-header button.active {
    border-bottom: solid 2px #b7444a;
}

.course-index .course-main .course-main-body .tab-body .course-item {
    margin: 20px;
    padding: 20px;
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
    width: 100px;
    height: 40px;
    border-radius: 10px;
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
.videoClass{
	padding: 0.15rem;
	background-color: #C01920
	
}
.videoItemClass{
	padding: 0.2rem 1rem;
}
.remarkItem{
	padding: 0.1rem 1rem;
}
.remarkItemDetail{
	border-radius: 5px;
	box-shadow: 2px 2px 15px #dadada;
	padding: 0.1rem 0.6rem
}
.remarkItemLeft{
	width: 20%;
}
.TipsFont{
	color: #dadada;
	font-size: 0.14rem;
}
.submitBtn{
		/*padding: 0.1rem 1rem;*/
		color: white;
		background-color: #C01920;
		text-align: center;
        border-radius: 25px;
        margin-bottom: 0.1rem;
        width: 100%;
        padding: 0.2rem;
        font-size: 0.24rem

	}
</style>
