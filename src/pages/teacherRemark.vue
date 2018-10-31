<template>
<div class="course-container course-index box-v-start align-stretch">
    <div class="course-top">
        <div class="users box-justify">
            <div class="box-start user-img-wrapper">
                <img class="user-img" src="static/images/course/wx.jpg">
                <div class="box-v-center align-start">
                    <p>{{studentData && studentData.name}}</p>
                    <p>{{courseData && courseData.student_grade}} </p>
                </div>
            </div>
            <!-- <div  @click="changeStudent" class="box-end user-right">
                <p>其他孩子 &gt;</p>
            </div> -->
        </div>
    </div>
    <div class="videoItemClass">
        <div class="videoClass">
            <video :src="studentData && studentData.videoUrl" controls="controls" style="width: 100%;height: 3rem"></video>
        </div>
    </div>
    <div class="remarkItem">
        <div class="remarkItemDetail">
            <el-rate v-model="starValue" class="box-justify"></el-rate>
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
    <div class="remarkItem box-start align-stretch" v-for="markObj in markArray">
        <div class="remarkItemLeft">
            <div style="margin-top: 4px">{{markObj.markName}}</div>
        </div>
        <div class="rest box-v-start align-stretch">
            <div class="box-start" style="margin-bottom: 0.15rem">
                <div class="box-start" style="width: 20%" v-for="(item,index) in markObj.flagNum" @click="choseScore(item, index, markObj)">
                    <img class="icon-circle" src="static/images/circleT.png" v-if="markObj.selectedIndex !== '' && markObj.selectedIndex >= index">
                    <img class="icon-circle" src="static/images/circleF.png" v-else>
                    <div class="rest split-line" v-if="index!=4"></div>
                </div>
            </div>
            <div class="TipsFont">{{markObj.selectedText}}</div>        
        </div>
    </div>
    <div class="remarkItem rest" style="margin-top: 0.1rem">
        <div class=" box-v-end">
            <div class="submitBtn" @click="addEvaluate">提交评价</div>
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
            starValue: 0,
            markArray: [
                {
                    markName: '专注力',
                    flagNum: ['A', 'B', 'C', 'D', 'E'],
                    selectedIndex: '',
                    selectedText: '',
                    markList: []
                },
                {
                    markName: '语音',
                    flagNum: ['A', 'B', 'C', 'D', 'E'],
                    selectedIndex: '',
                    selectedText: '',
                    markList: []
                },
                {
                    markName: '词汇',
                    flagNum: ['A', 'B', 'C', 'D', 'E'],
                    selectedIndex: '',
                    selectedText: '',
                    markList: []
                },
                {
                    markName: '流畅度',
                    flagNum: ['A', 'B', 'C', 'D', 'E'],
                    selectedIndex: '',
                    selectedText: '',
                    markList: []
                }
            ],

            evaluateList: [],
            courseData: null,
            studentData: null,
        };
    },
    mounted() {
        this.initcourseData();
        this.getEvaluate();
    },
    methods: {
        //查看课件详情
        initcourseData() {
            this.courseData = JSON.parse(
                sessionStorage.getItem("courseData")
            );
            this.studentData = JSON.parse(
                sessionStorage.getItem("studentData")
            );
        },
        choseScore(item, index, markObj) {
            markObj.selectedIndex = index;
            markObj.selectedText = index;
            this.getLevelText(item, markObj);
        },
        //选择评价等级，筛选对应等级文案
        getLevelText(item, markObj) {
            markObj.markList.forEach(mark => {
                if(mark.grade === item) {
                    markObj.selectedText = mark.english_evaluation;
                    return;
                }
            })
        },
        //获取评价文案
        getEvaluate() {
            this.$service.getEvaluate({
                params: {
                    grade: this.studentData.grade
                }
            }, (res) => {
                if (res.data.code === "0" && res.data.data) {
                    this.evaluateList = res.data.data;
                    this.evaluateList.forEach(itemEvaluate => {
                        this.markArray.forEach(itemMark => {
                            if(itemEvaluate.item_name === itemMark.markName) {
                                itemMark.markList.push(itemEvaluate)
                            }
                        });
                    });
                } else if (!res.data.data) {
                    this.$showMsg(res.data.message)
                }
            },
            error => {
                console.error(error);
            });
        },
        //提交评价
        addEvaluate() {

            if(!this.hasEvaluated()) {
                this.$showMsg('请先完成评价');
                return false;
            }

            let dataParams = this.$qs.stringify({
                studentId: this.$route.query.studentId,
                gradeNumber: this.$route.query.gradeNumber,
                star: this.starValue,
                focus: this.markArray[0].markList[this.markArray[0].selectedIndex].ID,
                voice: this.markArray[1].markList[this.markArray[1].selectedIndex].ID,
                voca: this.markArray[2].markList[this.markArray[2].selectedIndex].ID,
                fluency: this.markArray[3].markList[this.markArray[3].selectedIndex].ID,
            });

            this.$service.addEvaluate(
                dataParams,
                res => {
                    if (res.data.code === "0") {
                        this.$showMsg('评价成功！')
                        this.$router.push({path: '/courseItem', query: {gradeNumber: this.$route.query.gradeNumber}})
                    }else{
                        this.$showMsg(res.data.message)
                    }
                },
                error => {
                    console.error(error);
                }
            );
        },
        //校验是否已评价
        hasEvaluated() {
            if(this.starValue === 0) {
                return false;
            }
            let isMarked = true;
            this.markArray.find(item => {
                if(item.selectedIndex === '') {
                    isMarked = false;
                }
            })
            if(!isMarked) {
                return false;
            }
            return true;
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

.videoClass {
    padding: 0.15rem;
    background-color: #C01920
}

.videoItemClass {
    padding: 0.2rem 1rem;
}

.remarkItem {
    padding: 0.1rem 1rem;
}

.remarkItemDetail {
    border-radius: 5px;
    box-shadow: 2px 2px 15px #dadada;
    padding: 0.1rem 0.6rem
}

.remarkItemLeft {
    width: 20%;
}

.TipsFont {
    color: #afafaf;
    font-size: 0.14rem;
}

.submitBtn {
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

.split-line {
    height: 1px;
    background-color: #DADADA
}
.icon-circle{
    width: 20px; height: 20px;
}
</style>
