<template>
<div class="courseContent">
    <div class="courseHeader box-start">
        <div class="courseItem box-start align-stretch">
            <img src="static/images/book.png" class="bookImg"/>
            <div class="rest box-v-start align-stretch">
                <div class="itemHeader">南山益田假日广场导读室</div>
                <div class="timeCss"><span style="margin-right: 0.1rem">2018-08-08</span>14:30</div>
                <div style="margin-bottom:0.2rem">等级：<span style="font-weight:600;margin-right: 0.1rem">Pre-L1</span> 学生：<span style="font-weight:600;margin-right: 0.1rem"">8人</span> 状态：<span style="font-weight:600">未上课</span></div>
            </div>
        </div>
    </div>
    <div class="subHeaderName">
        学生信息
    </div>
    <div class="courseBody box-v-start rest align-stretch">
        <div class="box-justify align-stretch itemStu" v-for="(item,index) in courseList" :key="item.id">
            <div class="box-start align-stretch">
                <img src="static/images/course/head-img.png" class="smallStudentAvator"/>
                <div>
                    <div style="margin:0.03rem 0 0.2rem 0.2rem;"><span style="color:blue"></span>英文名：{{item.name}}</div>
                    <div style="margin:0.03rem 0 0.2rem 0.2rem;"><span style="color:blue"></span>中文名：{{item.name2}}</div>
                </div>
                <div style="margin-left:0.3rem">
                    <div style="margin-bottom:0.2rem;margin-top:3px"><span style="color:blue"></span>性别：{{item.sex}}</div>
                    <div style="margin-bottom:0.2rem"><span style="color:blue"></span>等级：{{item.level}}</div>
                </div>
            </div>
            <div class="box-v-end">
                <div class="box-start">
                    <div @click="changeLike(index)">
                        <img v-if="!item.isLike" class="icon-like" src="static/images/unlike.png"/>
                        <img v-else class="icon-like" src="static/images/like.png"/>
                    </div>
                        <div class="remarkCss">
                            <router-link v-if="!item.isRmark" to="/teacherRemark">
                                <span>作业</span>
                            </router-link>
                            <span v-else >已点评</span>
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
        let self = this;
    },
    methods: {
        changeLike(index) {
            var that = this;
            for (var i = 0; i < that.courseList.length; i++) {
                if (i == index) {
                    that.courseList[i].isLike = !that.courseList[i].isLike;
                }
            }
        },
        JoinIn() {
            let self = this;
            if (self.userData.code === "0") {
                if (
                    self.userData.data.isBindPhone === true &&
                    self.userData.data.isBuyUser === true
                ) {
                    self.$router.push({
                        name: "sceneList"
                    });
                } else if (
                    self.userData.data &&
                    self.userData.data.isBindPhone === true &&
                    self.userData.data.isBuyUser === false
                ) {
                    self.$router.push({
                        name: "newGay"
                    });
                } else if (
                    self.userData.data &&
                    self.userData.data.isBindPhone === false
                ) {
                    self.$router.push({
                        name: "checkPhone"
                    });
                }
            } else {
                self.$showMsg(self.userData.message);
            }
        }
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
	color:white;
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
    color: #dadada;
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
    border-bottom: 1px solid #dadada;
    padding: 0.2rem 0rem;
}
</style>
