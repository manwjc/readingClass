<template>
	<div>
	<mt-navbar class="border-bottom" v-model="selected">
		  <mt-tab-item id="1">周冠军</mt-tab-item>
		  <mt-tab-item id="2">月冠军</mt-tab-item>
	</mt-navbar>
	<mt-tab-container v-model="selected">
 <mt-tab-container-item id="1">
	<div class="courseContent">
		 <div class="courseHeader box-start">
            <div class="courseItem box-start align-stretch">
					<img src="../../static/images/book.png" class="bookImg"/>
					<div class="rest box-v-start align-stretch">
						<div class="itemHeader">南山益田假日广场导读室</div>
						<div class="timeCss box-start">
						   <div>等级：</div>
						   <input type="text" placeholder="--请选择--" v-model="seachObj.stuLevelName" readonly class="mobileSelect" @click="openslectlevel"/>
						   <div style="position: relative;"></div>
                           <i class="el-icon-caret-bottom mobileSelectIcon" ></i>
					    </div>
					    <div class="timeCss box-justify">
					    	<div class="box-start">
					    		<div>课程：</div>
					    		<input style="width: 2.3rem" type="text" placeholder="--请选择--" v-model="seachObj.courseName" readonly class="mobileSelect" @click="openslectCourse"/>
                                <i class="el-icon-caret-bottom mobileSelectIcon" ></i>
					    	</div>					   
                            <div class="setBtn">设置为</div>
					    </div>
						<div style="margin-bottom:0.2rem">
							学生：<span style="font-weight:600">8人</span> &nbsp;&nbsp;状态：<span style="font-weight:600">已上课</span></div>
					</div>
				 </div> 
		 </div>
		 <div class="subHeaderName">
             学生信息
		 </div>
		 
		 <div class="courseBody box-v-start rest align-stretch" >
			<div class="box-justify align-stretch itemStu ptb20" v-for="(item,index) in courseList" :key="item.id">
               <div class="box-start align-stretch rest">
				 <img src="static/images/course/head-img.png" class="smallStudentAvator"/>
				 <div class="box-v-start align-stretch rest" >
				 	 <div class="box-start">
				 	 	<div style="margin-bottom:0.2rem;margin-top:3px;width: 56%"><span style="color:blue"></span>英文名：{{item.name}}</div>
				 	 	<div style="margin-bottom:0.2rem;margin-top:3px"><span style="color:blue"></span>性别：{{item.sex}}</div>
				 	 </div>
					 <div class="box-start">
				 	 	<div style="margin-bottom:0.2rem;;width: 56%"><span style="color:blue"></span>中文名：{{item.name2}}</div>
				 	 	<div style="margin-bottom:0.2rem"><span style="color:blue"></span>等级：{{item.level}}</div>
				 	 </div>
					 <div >
						<div style="margin-bottom:0.2rem;margin-top:3px;font-size: 0.24rem"><span style="color:blue;visibility: hidden;"></span>课程主题：joe和他特殊的衣服</div>
					</div>
				 </div>
				 
			   </div>
			   <div class="box-v-start" style="height:80px">
				 <div class="box-start">
					 <div @click="changeLike(index)">
						 <img v-if="!item.isLike" class="icon-like" src="../../static/images/unlike.png"/>
						 <img v-else class="icon-like" src="../../static/images/like.png"/>
					 </div>
					 <div class="remarkCss">
						<input type="checkbox" name="" style="    margin-top: 5px;">
					 </div>
				 </div>  
			   </div>
			</div>	 
		 </div>
		 <el-dialog :center=true :append-to-body=true title="请选择" :visible.sync="choseStudentLevel" width="70%" :show-close=false :close-on-click-modal=true top="40%">
        <div >
            <div v-for="(item,index) in levelArr" :key="item.levelValue" style="border-bottom: 1px solid rgb(218, 218, 218)">
                <div style="margin:8px;" class="box-start hoverClass"  @click="levelChose(index)"> 
                <div class="selectInput mr-10" >
                    <img style="width:18px;height:18px;margin-right: 0.2rem" src="../../static/images/single1.png" v-if="item.checked!='1'"/>
                    <img style="width:18px;height:18px;margin-right: 0.2rem" src="../../static/images/singled1.png" v-if="item.checked=='1'"/>
                    </div>
                    <div class="lineNormal" >{{item.levelName}}</div> 
                </div>
            </div>
            
        </div>       
        </el-dialog>
        <el-dialog   :append-to-body=true title="请选择" :visible.sync="choseStudentCourse" width="70%" 
        :show-close=false :close-on-click-modal=true :center=true top="40%">
        <div >
            <div v-for="(item,index) in courseArr" :key="item.courseValue" style="border-bottom: 1px solid rgb(218, 218, 218)">
                <div style="margin:8px;" class="box-start hoverClass"  @click="courseChose(index)"> 
                <div class="selectInput mr-10" >
                    <img style="width:18px;height:18px;margin-right: 0.2rem"  src="../../static/images/single1.png" v-if="item.checked!='1'"/>
                    <img style="width:18px;height:18px;margin-right: 0.2rem" src="../../static/images/singled1.png" v-if="item.checked=='1'"/>
                    </div>
                    <div class="lineNormal" >{{item.courseName}}</div> 
                </div>
            </div>
            
        </div>       
        </el-dialog>
        

<!-- tab-container -->
	</div>
 </mt-tab-container-item>
 <mt-tab-container-item id="2">
    <div class="courseContent">
            <div class="timeCss box-justify courseHeader2">
            	<div class="box-start">
            		<div>等级：</div>
				   <input type="text" placeholder="--请选择--" v-model="seachObj.stuLevelNameMonth" readonly class="mobileSelect" @click="openslectlevel"/>
	               <i class="el-icon-caret-bottom mobileSelectIcon" ></i>
	            </div>
                <div class="setBtn">设置为</div>
			
		    </div>
		 <div class="subHeaderName">
             本月周冠军信息
		 </div>
		 <div class="courseBody box-v-start rest align-stretch" >
			<div class="box-justify align-stretch itemStu" v-for="(item,index) in courseList" :key="item.id">
               <div class="box-start align-stretch rest">
				 <img src="static/images/course/head-img.png" class="smallStudentAvator"/>
				 <div class="box-v-start align-stretch rest" >
				 	 <div class="box-start">
				 	 	<div style="margin-bottom:0.2rem;margin-top:3px;width: 56%"><span style="color:blue"></span>英文名：{{item.name}}</div>
				 	 	<div style="margin-bottom:0.2rem;margin-top:3px"><span style="color:blue"></span>性别：{{item.sex}}</div>
				 	 </div>
					 <div class="box-start">
				 	 	<div style="margin-bottom:0.2rem;;width: 56%"><span style="color:blue"></span>中文名：{{item.name2}}</div>
				 	 	<div style="margin-bottom:0.2rem"><span style="color:blue"></span>等级：{{item.level}}</div>
				 	 </div>
					 <div >
						<div style="margin-bottom:0.2rem;margin-top:3px;font-size: 0.24rem"><span style="color:blue;visibility: hidden;">·</span>课程主题：joe和他特殊的衣服</div>
					</div>
				 </div>
				 
			   </div>
			   <div class="box-v-start" style="height:80px"> 
				 <div class="box-start">
					 <div @click="changeLike(index)">
						 <img v-if="!item.isLike" class="icon-like" src="../../static/images/unlike.png"/>
						 <img v-else class="icon-like" src="../../static/images/like.png"/>
					 </div>
					 <div class="remarkCss">
						<input type="checkbox" name="" style="    margin-top: 5px;">
					 </div>
				 </div>  
			   </div>
			</div>	 
		 </div>
	</div>

  </mt-tab-container-item>
  
</mt-tab-container>
</div>
	
</template>

<script>
	import Vue from 'vue'
	import Element from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css'
	Vue.use(Element)
	import utils from '@/js/common/utils'
	export default {
		name:"saSet",
		data() {
			return {
				userData: null,
				videoUrl: '',
				selected:"1",
				courseList:[{
					name:"joe",
					name2:"刘一依",
					sex:"女",
					level:"2",
					isRemark:false,
					isLike:false,
					id:1
				},
				{
					name:"joe",
					name2:"刘一依",
					sex:"女",
					level:"2",
					isRemark:false,
					isLike:false,
					id:2
				}
				,{
					name:"joe",
					name2:"刘一依",
					sex:"女",
					level:"2",
					isRemark:false,
					isLike:false,
					id:3
				},
				{
					name:"joe",
					name2:"刘一依",
					sex:"女",
					level:"2",
					isRemark:false,
					isLike:false,
					id:4
				}
				,{
					name:"joe",
					name2:"刘一依",
					sex:"女",
					level:"2",
					isRemark:false,
					isLike:false,
					id:5
				}],
				choseStudentLevel:false,
				choseStudentCourse:false,
                levelArr:[{
                	levelName:"Pre-L1",
                	levelValue:1,
                	checked:2
                },{
                	levelName:"Pre-L2",
                	levelValue:2,
                	checked:2
                },{
                	levelName:"Pre-L3",
                	levelValue:3,
                	checked:2
                },{
                	levelName:"Pre-L4",
                	levelValue:4,
                	checked:2
                }],
                courseArr:[{
                	courseName:"joe和他特殊的衣服",
                	courseValue:1,
                	checked:2
                },{
                	courseName:"joe和他特殊的衣服",
                	courseValue:2,
                	checked:2
                },{
                	courseName:"joe和他特殊的衣服",
                	courseValue:3,
                	checked:2
                },{
                	courseName:"joe和他特殊的衣服",
                	courseValue:4,
                	checked:2
                }],
                seachObj:{
                	stuLevel:1,
                	stuLevelName:'',
                	courseName:'',
                	stuLevelMonth:1,
                	stuLevelNameMonth:'',

                }
			}
		},
		mounted() {
			let self = this;
			
		},
		methods: { 
			changeLike(index){
				var that=this;
				for(var i=0;i<that.courseList.length;i++){
					if(i==index){
						that.courseList[i].isLike=!that.courseList[i].isLike;

					}
				}
			},
			openslectlevel(){
                var that=this;
                that.choseStudentLevel=true;
			},
			levelChose(index){
                var that=this;
                for(var i=0;i<that.levelArr.length;i++){
					if(i==index){
						that.levelArr[i].checked=1;
						if(that.selected=="1"){
							that.seachObj.stuLevel=that.levelArr[index].levelValue;
                            that.seachObj.stuLevelName=that.levelArr[index].levelName;
						}else{
							that.seachObj.stuLevelMonth=that.levelArr[index].levelValue;
                            that.seachObj.stuLevelNameMonth=that.levelArr[index].levelName;
						}
						

					}else{
						that.levelArr[i].checked=2;
					}
				}
				that.choseStudentLevel=false;
                
			},
			openslectCourse(){
                var that=this;
                that.choseStudentCourse=true;
			},
			courseChose(index){
                var that=this;
                for(var i=0;i<that.courseArr.length;i++){
					if(i==index){
						that.courseArr[i].checked=1;
						that.seachObj.courseValue=that.courseArr[index].courseValue;
                        that.seachObj.courseName=that.courseArr[index].courseName;

					}else{
						that.courseArr[i].checked=2;
					}
				}
				that.choseStudentCourse=false;
                
			},
			JoinIn() {
				let self = this;
				if(self.userData.code === '0'){
					if(self.userData.data.isBindPhone === true && self.userData.data.isBuyUser === true){
						self.$router.push({name:"sceneList"})
					}else if(self.userData.data && self.userData.data.isBindPhone === true && self.userData.data.isBuyUser === false){
						self.$router.push({name:"newGay"})
					}else if(self.userData.data && self.userData.data.isBindPhone === false){
						self.$router.push({name:"checkPhone"})
					}
				}else{
					self.$showMsg(self.userData.message);
				}
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
.courseContent{
	color: black;
}
.courseHeader{
	/* padding: 0.3rem 0.4rem; */
	/* background-color: #F8F7F2 */
}
.courseHeader2{
	 padding: 0.3rem 0.4rem 0.1rem; 
	/* background-color: #F8F7F2 */
}
.smallStudentAvator{
	width: 0.8rem;
	height: 0.8rem;
}
.fontName{
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

.courseBody{
	padding: 0.1rem ;
	
}
.courseItem{
	/* background-color: antiquewhite; */
	width: 100%;
	/* box-shadow: -1px 4px 10px #dadada; */
	padding: 0.3rem 0.15rem 0.1rem;
	border-radius: 5px;
	
}
.bookImg{
	width: 62px;
    height: 90px;
	margin-right: 0.1rem;
}
.itemHeader{
	margin-bottom: 0.20rem;
    margin-top: 5px;
    font-size: 0.26rem;
}
.timeCss{
	margin-bottom:0.2rem;
	color:#7A7774
}
.remarkCss{
	border-radius: 10px;

	color: #145192;
	padding: 0rem 0.25rem;
	margin-left: 0.2rem
}
.itemStu{
	border-bottom: 1px solid #dadada;
	padding:0.2rem 0 0.1rem
}
.hoverClass{
	cursor: pointer;
	padding: 0.3rem;
}

.hoverClass:hover{
	background-color: #EFEFEF;
}
.mobileSelect{
	border: 1px solid rgb(218, 218, 218);
    width: 1.5rem;
    min-height: 0.16rem;
    padding: 0.05px 0.1rem;
    /*position: relative;*/
}
.mobileSelectIcon{
	/*position: absolute;*/
	    margin-left: -0.28rem;
	}
.setBtn{
		padding: 0.1rem 0.3rem;
		color: white;
		background-color: #E70012;
		text-align: center;
        border-radius: 10px;  
	}
	
</style>