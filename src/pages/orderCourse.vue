<template>
	<div class="OrderBodyContent box-v-start align-stretch">
	   <div class="topOrder box-v-start align-stretch">
	      <div class="topHeader box-justify">
		  <div class="box-start">
		    <img class="backIcon" src="static/images/leftBack.png">
		    <img class="user-avatar" src="static/images/course/wx.jpg">
		  </div>
		  <div class="headerTittle">线下导读预约</div>
		  <div style="visibility: hidden;">1111</div>
		  </div>
		  <div class="topItem">
		    <div class="smallTittle">当前预约课程</div>
			<div class="bigWFont box-start">joe和他特别的衣服</div>
		  </div>
		  <div class="topItem" style="margin-top:0.45rem">
		    <div class="smallTittle">选择上课地点</div>
			<div class="bigWFont box-start">
			<div style="margin-right:0.1rem">南山区世界之窗益田假日广场</div>
			<img class="backIcon" style="width: 15px;height: 15px;" src="static/images/down.png">
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
			<div class="box-justify">
			   <div class="bigWFont">01</div>
			   <div class="bigWFont">02</div>
			   <div class="bigWFont">03</div>
			   <div class="bigWFont">04</div>
			   <div class="bigWFont">05</div>
			   <div class="bigWFont">06</div>
			   <div class="bigWFont">07</div>
			</div>
			<div class="box-justify">
			   <img class="backIcon2" style="width: 15px;height: 15px;visibility:hidden" src="static/images/up.png">
			   <img class="backIcon2" style="width: 15px;height: 15px;visibility:hidden" src="static/images/up.png">
			   <img class="backIcon2" style="width: 15px;height: 15px;" src="static/images/up.png">
			   <img class="backIcon2" style="width: 15px;height: 15px;visibility:hidden" src="static/images/up.png">
			   <img class="backIcon2" style="width: 15px;height: 15px;visibility:hidden" src="static/images/up.png">
			   <img class="backIcon2" style="width: 15px;height: 15px;visibility:hidden" src="static/images/up.png">
			   <img class="backIcon2" style="width: 15px;height: 15px;visibility:hidden" src="static/images/up.png">
			</div>
		  </div>
	   </div>
	   <div class="rest box-v-start align-stretch orderBody" >
	     <div class="box-justify bodyItem">
		   <div class="bigWFont" style="color: initial;font-weight: 600;">选择课时段</div>
		   <div style="color: #BEBEBE;">共5节课</div>
		 </div>
		 <div class="bodyItem">
		   <div class="box-start timeCourse align-stretch" v-for=" (item,index) in dataCourse" :style="{'border':index+1==dataCourse.length?'none':''}">
		   <div class="pointTime"></div>
		     <div style="padding: 0rem 0.15rem;" >
			   <div style="padding-bottom:0.1rem">{{item.when}}</div>
			   <div>{{item.time}}</div>
			 </div>
			 <div class="rest"> 
			   <div class="panlInfo box-justify" v-for="item2 in item.course">
			     <div class="box-start align-stretch" >
				 
				   <img class="user-avatar" src="static/images/course/wx.jpg">
				   <div class="box-v-justify align-stretch" style="padding:0.12rem ">
				     <div class="sirName">{{item2.sirName}}</div>
					 <div>{{item2.point}}分</div>
				   </div>
				   <div v-if="item2.isFollow" class="panlFollow">
				   <div class="followClass">已关注</div>
				   </div>
				 </div>
				 <div style="color:#B02E2E;font-size: 0.23rem;" @click="orderCourse">
				  立刻预约
				 </div>
			   </div>
			   
			 </div>
			 
		   </div>
		 </div>
	   </div>
	</div>
</template>
<script>
	import Valid from '@/js/common/validate'

	export default {
		data() {
			return {
				mobile: '',
				code: '',
				checkedValue: true,
				dataCourse:[
				  {
				    time:"14:30",
					when:"下午",
					course:[
					{
					  sirName:"Amy",
					  point:4.5,
					  isFollow:true
					},
					{
					  sirName:"Rocher",
					  point:4.5,
					  isFollow:false
					},
					]
				  },
				  {
				    time:"14:30",
					when:"下午",
					course:[
					{
					  sirName:"Alice",
					  point:4.5,
					  isFollow:false
					}
					]
				  },
				  {
				    time:"20:30",
					when:"晚上",
					course:[
					{
					  sirName:"Bob",
					  point:4.5,
					  isFollow:false
					}
					]
				  }
				],
			}
		},
		mounted() {
			
		},
		methods: { 
			getUserInfo() {
				let self = this;
				self.$service.getUserInfo((res) => {
					let data = res.data;
					if(data.code === '0'){
						if(data.data && data.data.isBindPhone === true){
							self.$router.push({name:"classList"})
						}else{
							self.$router.push({name:"newGay"})
						}
					}else{
						self.$showMsg(data.message);
					}
				}, (error) => {
					self.$showMsg(error)
				})
			},
			orderCourse(){
			  var that=this;
			}
		}
			
	}
</script>

<style scope>
	html, body{height:100%; min-height: 100%;}
	#app{
	height:100%;	
	}
	.OrderBodyContent{
	    padding:0px;
		margin:0px;
		height:100%;
	}
	.topOrder{
		padding:0.1rem 0.2rem;
		background: #00244C;
	}
	.topHeader{
	
	}
	.user-avatar{
	width: 35px;
    height: 35px;
    border-radius: 60px;
    display: block;
	}
	.backIcon{
	width: 20px;
    height: 20px;
    border-radius: 60px;
    display: block;
	margin-right:0.22rem;
	}
	.backIcon2{
	width: 20px;
    height: 20px;
    border-radius: 60px;
    display: block;
	margin-top:0.04rem
	}
	.headerTittle{
	color:white;
	font-size: 0.36rem;
	}
	.topItem{
	   margin-top:0.3rem;
	}
	.smallTittle{
	  color:#CAD6DC;
	  margin-bottom: 0.15rem;
	}
	.bigWFont{
	  color:white;
	  font-size: 0.23rem;
	}
	.bodyItem{
	  padding:0rem 0.15rem;
	  margin-bottom: 0.2rem;
	}
	.orderBody{
	padding-top:0.4rem;
	background-color:#E7E7E7
	}
	.timeCourse{
	    border-left: 1px solid #BEBEBE;
	}
	.panlInfo{
	    background-color:white;
		border-radius:8px;
		padding: 0.1rem 0.30rem;
		margin-bottom:0.2rem;
	}
	.sirName{
	    font-size:0.23rem;
		font-weight:600;
		margin-bottom:0.1rem;
	}
	.panlFollow{
	    padding-top: 0.15rem;
	}
	.followClass{
	    background-color:#FFCE9A;
		color:white;
		padding:0.04rem;
		border-radius:3px;
	}
	.pointTime{
	    width:5px;
		height:5px;
		background-color:red;
		border-radius:30px;
		margin-left: -3px;
	}
</style>