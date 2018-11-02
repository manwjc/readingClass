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
        </div>
    </div>
    <div class="course-main">
        <div class="course-main-header">
            <h3>线下导读</h3>
            <p class="des">老师带领细读经典英文课本</p>
            <!-- status: '-1':未预约  '4':已取消预约 '1':已预约 -->
            <div>
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
        </div>
    </div>
</div>
</template>

<script>
    import mixin from '@/js/common/student_mixin'
    import utils from '@/js/common/utils'
    export default {
        data() {
            return {
                dataLoaded: false,
                studentList: [],
                dataTips: '暂无课程信息',
                courseListData: {
                    "name": "万圣化妆趴",
                    "schoolName": "深圳喜荟城阅读馆",
                    "courseware": "1527755348306",
                    "english_name": "Halloween Cosplay ",
                    "status": "-1"
                },     //可预约的导读课程
                courseRecordData: [],   //已参加的导读课程
                appointment_time: '',   //当前周的周一日期
                curTabIndex: 0,
                curStudentIndex: '',
                curDateTime: '',
                curYearMonth: '',
                
            };
        },
        mounted() {
        },
        methods: { 
            //从app进入导读课页面
			getUserInfoFromApp() {
                let dataParams = this.$qs.stringify({
                    phone: utils.getCookie('phone'),
                });
				this.$service.getUserInfoFromApp(
                    dataParams,
                    (res) => {
					this.userData = res.data;
					// this.userData.data.openId && sessionStorage.setItem('openId', this.userData.data.openId);
					this.goToRouter(this.userData);
				}, (error) => {
					this.$showMsg(error)
				})
			},
			goToRouter(data){
				if(data.data && data.data.isBindPhone === true) {
					if(data.data.member !== '-1' && data.data.member !== '0'){
                        this.initPage();
                    }else if(data.data.member === '-1'){
                        this.$router.push({name:"hasDated"})
                    }else if(data.data.member === '0'){
                        this.$router.push({name:"newGay"})
                    }
				}else{
					this.$showMsg(data.message);
				}
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
