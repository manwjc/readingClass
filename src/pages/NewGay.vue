<template>
	<div class="box-v-start align-stretch" style="min-height: 100%;">
		<div class="box-v-start pb20">
			<img @click.prevent src="static/images/course/login-banner.jpg">
			<div class="flex-center"><img src="static/images/course/head-img.png" class="user-avatar"></div>
			<div v-if="hasDated" style="margin-top: 0.2rem">您已申请成功<br>稍候会有客服人员联系您，请保持电话畅通</div>
			<div v-if="!hasDated" style="margin-top: 0.2rem">为了您孩子更好地进行体验课程，请先填写孩子的信息</div>
			<div v-if="!hasDated" style="margin-top: 0.5rem">
				<div class="box-start infoItem">
				<div class="rightName">孩子姓名</div>
				<input type="text" name="" placeholder="孩子姓名" class="leftInput" v-model="userName" />
				</div>
				<div class="box-start infoItem">
				<div class="rightName">孩子生日</div>
				<input type="text" name="" placeholder="孩子姓名" class="leftInput" v-model="kidDate" @click="openPicker"/>
				</div>
				<mt-datetime-picker
					ref="picker"
					type="date"
					v-model="pickerValue"
					@confirm="sureDate"
					year-format="{value} 年"
					month-format="{value} 月"
					date-format="{value} 日"
					>
				</mt-datetime-picker>
				<div class="box-start infoItem">
				<div class="rightName">孩子性别</div>
				<div class="box-justify rest">
					<div class="box-start" @click="chooseSex('boy')">
						<img v-if="!isBoy" src="static/images/course/star-gray.jpg" class="backIcon" />
						<img v-if="isBoy" src="static/images/course/star-light.jpg" class="backIcon" />
						<div>男孩</div>
					</div>
					<div class="box-start" @click="chooseSex('girl')">
						<img v-if="!isGirl" src="static/images/course/star-gray.jpg" class="backIcon"/>
						<img v-if="isGirl" src="static/images/course/star-light.jpg" class="backIcon" />
						<div>女孩</div>
					</div>
				</div>
					
				</div>
				<div class="box-start infoItem">
				<div class="rightName">英&nbsp;&nbsp;文&nbsp;&nbsp;名</div>
				<input type="text" name="" placeholder="孩子英文名" class="leftInput" v-model="englishName" />
				</div>
				<div class="box-start infoItem">
					<label class="rightName" for="defaultRoom">阅&nbsp;&nbsp;读&nbsp;&nbsp;馆</label>
					<select class="input_normal boxflex01" v-model="defaultRoom" name="defaultRoom" @change="" >
						<option v-for="item in readingRooms"  :value="item.label">{{ item.name }}</option>
					</select>
				</div>
				<div class="box-center">
					<div class="submitBtn" @click="submitForm">提交信息</div>
				</div>
			</div>
		</div>
		<div class="rest displayflex flex-end">
			<img @click.prevent src="../assets/images/p_a_08.jpg">
		</div>
		
		<!-- <div @click.prevent="submitForm"><img @click.prevent src="../assets/images/p_b_06.jpg"></div>
		<img @click.prevent src="../assets/images/p_b_07.jpg">
		<img @click.prevent src="../assets/images/p_a_08.jpg"> -->
	</div>
</template>

<script>
	import Valid from '../js/common/validate'

	export default {
		data() {
			return {
				readingRooms: [],
				defaultRoom: '',
				termList: [],
				defaultTerm: 1,
				partNum: '',
				userName: '',
				userAge: '',
				englishName: '',
				userData: null,
				kidDate:'2018-10-16',
				pickerValue:'',
				sexValue:"1",
				isGirl:false,
				isBoy:true,
				hasSubmit: false,
				hasDated: false,
			}
		},
		mounted() {
			// this.getUserInfo();
			this.queryAllSchool();
		},
		methods: { 
			
			submitForm() {
				let self = this;
				let validateMsg = self.validateResult();
				let dataParams;

				if(this.hasSubmit){
					return;
				}
				if(validateMsg){
					self.$showMsg(validateMsg);
					return;
				}
				this.hasSubmit = true;
				console.log(self.defaultRoom)
				dataParams = self.$qs.stringify({
					name:self.userName,
					englishName:self.englishName,
					birthDate:self.kidDate,
					sex:self.sexValue,
					schoolId:self.defaultRoom,
				})
				
				//判断当前阅读馆当前期数是否已满额
				self.$service.addStudent(dataParams, (res) => {
					let data = res.data;
					if(data.code === '0'){
						this.$router.push({name:"hasDated"})
						// self.hasDated = true;
					}else{
						this.hasSubmit = false;
						const msg = data.message || '接口异常';
						self.$showMsg(msg);
					}
				});

			},
			validateResult:function () {
				var self = this,
                    names = [
						{name:'userName'},
                        // {name:'englishName'},
                        {name:'defaultRoom'},
                    ],
                    message;
                var messages = {
                    userName: {require: '姓名不能为空'},
                    // englishName: {require: '宝贝年龄不能为空'},
                    defaultRoom: {require: '阅读馆不能为空'},
                };

                for (var i = 0; i < names.length; i++) {
                    var item = names[i];
                    var name = item.name;
                    if (!self[name]) {
                        message = messages[name].require;
                        break;
                    }
                    if (item.reg&&!item.reg(self[name])) {
                        message = messages[name].regex;
                        break;
                    }
                }
                return message;
			},
			openPicker() {
		        this.$refs.picker.open();
		      },
		    sureDate(){
                var that=this;
                // var dateKid=new Date(that.pickerValue)
                that.kidDate=that.dateToString(that.pickerValue)
               
		    },
		    chooseSex(sex){
               var that=this;
               if(sex=="boy"){
                  that.isGirl=false;
				  that.isBoy=true
				  that.sexValue = '1'
               }else{
                  that.isGirl=true;
                  that.isBoy=false
				  that.sexValue = '2'
               }
		    },
		    dateToString: function(date){ 
			  var year = date.getFullYear(); 
			  var month =(date.getMonth() + 1).toString(); 
			  var day = (date.getDate()).toString();  
			  if (month.length == 1) { 
			      month = "0" + month; 
			  } 
			  if (day.length == 1) { 
			      day = "0" + day; 
			  }
			  var dateTime = year + "-" + month + "-" + day;
			  return dateTime; 
			},
			toPay(obj) {
				let self = this;
				WeixinJSBridge.invoke('getBrandWCPayRequest',{  
					"appId":obj.appid,                 //公众号名称，由商户传入  
					"timeStamp":obj.timeStamp,          //时间戳，自 1970 年以来的秒数  
					"nonceStr":obj.nonceStr,         //随机串  
					"package":'prepay_id=' + obj.prepayId,      //prepay_id=*** 
					"signType":obj.signType,        //微信签名方式:MD5  
					"paySign":obj.sign           //微信签名  
					},function(res){      
						//alert(res.err_msg); // get_brand_wcpay_request:ok
					if(res.err_msg == "get_brand_wcpay_request:ok" ) {  
						self.$router.push({name:"nameList"})
					}else{  
						// alert("错误：" + res.err_msg);
						self.$router.push({name:"newGay"}) 
					}  
				});
			},
			queryAllSchool() {
				let self = this;
				self.$service.queryAllSchool((res) => {
					if(res.data.code === '0'){
						let arr = res.data.data;
						self.readingRooms = arr.map(function(val){
							var obj = {};
							obj.name = val.ORG_UNIT_NAME;
							obj.label = val.ID;
							return obj;
						})
					}else{
						self.$showMsg(res.data.message);
					}
				})
			},
		}
	}
</script>

<style scope>
	html, body{height:100%; min-height: 100%;}
	body {
		 text-align: left;
	}
	#app{
		height: 100%
	}
	.user-avatar{
		width: 60px;
	    height: 60px;
	    border-radius: 60px;
	    display: block;
	}
	.infoItem{
		padding: 0.1rem
	}
	.rightName{
		margin-right: 0.5rem;
	}
	.leftInput{
		border: none;
		border-bottom: 1px solid #dadada;
		font-size: 0.24rem;
		padding: 0.06rem 0.04rem
	}
	.backIcon{
		width: 20px;
	    height: 20px;
	    border-radius: 60px;
	    display: block;
		margin-right: 0.1rem;
	}
	.submitBtn{
		padding: 0.2rem 1rem;
		color: white;
		background-color: #C01920;
		text-align: center;
        border-radius: 20px;
        margin-top: 0.3rem
	}
</style>