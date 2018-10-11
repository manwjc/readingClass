<template>
	<div id="check-container" class="box-v-start align-stretch">
		<div class="check-main rest">
			<img  src="static/images/course/login-banner.jpg">
			<div class="input-wrapper">
				<div class="input-row box-start">
					<img  src="static/images/course/login-mobile.jpg">
					<input v-model="mobile" placeholder="输入手机号" class="box-start rest" type="text" />
				</div>
				<div class="input-row box-start">
					<img  src="static/images/course/login-verify.jpg">
					<input v-model="code" placeholder="输入验证码"  class="box-start rest" type="text" />
					<p @click="getCode">验证码</p>
				</div>
			</div>
			<button @click="submitForm" class="course-btn box-center">登录</button>
		</div>
		<img class="check-bot" src="static/images/course/bottom.jpg">
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
						if(data.data && data.data.isBindPhone === true && data.data.isBuyUser === true){
							self.$router.push({name:"sceneList"})
						}else if(data.data && data.data.isBindPhone === true && data.data.isBuyUser === false){
							self.$router.push({name:"newGay"})
						}
					}else{
						self.$showMsg(data.message);
					}
				}, (error) => {
					self.$showMsg(error)
				})
			},
			submitForm() {
				let self = this;
				let validateMsg = self.validateResult();
				let dataParams = self.$qs.stringify({
						signMobile:self.mobile,
						validateCode:self.code,
						isOldStudent:self.checkedValue
					});
				if(validateMsg){
					self.$showMsg(validateMsg);
					return;
				}

				self.$service.bindMobile(dataParams, (res) => {
					if(res.data.code === '0'){
						self.getUserInfo();
					}else{
						self.$showMsg(res.data.message);
					}
				}, (error) => {
					self.$showMsg(error)
				})
			},
			validateResult() {
                var self = this,
                    names = [
                        {name:'mobile', reg:Valid.validateMobile},
                        {name:'code'}
                    ],
                    message;
                var messages = {
                    mobile: {require: '手机号不能为空', regex: '手机号不合法，请重新输入'},
                    code: {require: '验证码不能为空', regex: '验证码不正确，请重新输入'}
                };

                for (var i = 0; i < names.length; i++) {
                    var item = names[i];
                    var name = item.name;
                    if (!self[name]) {
                        message = messages[name].require;
                        break;
                    }
                    if (item.reg && !item.reg(self[name])) {
                        message = messages[name].regex;
                        break;
                    }
                }
                return message;
			},
			getCode(){
				let self = this;
				let mobile = self.mobile,
					dataParams = {
						mobile:mobile
					};

				if(!mobile){
					self.$showMsg('请输入手机号');
					return;
				}
				if(!Valid.validateMobile(mobile)){
					self.$showMsg('手机号不合法，请重新输入');
					return;
				}

				self.$showMsg('验证码已发送');
				self.$service.sendValidateCode({params: dataParams}, (res) => {
					var validCode = res.data.data;
					if(validCode){
						self.code = validCode;
					}
				}, (error) => {
					self.$showMsg(error)
				})
			}

		}
	}
</script>

<style scope>
	html, body{height:100%; min-height: 100%;}
	#app{
		height:100%;
	}
	#check-container{
		height:100%;
	}
	#check-container .input-wrapper{
		width:80%;
		margin:30px auto;
	}
	#check-container .input-wrapper .input-row{

		border-bottom:solid 1px #999;
	}
	#check-container .input-wrapper .input-row input{
		margin-right:10px;
		height:40px;
		border:none;
		font-size:14px;
	}
	
	#check-container .input-wrapper .input-row img{
		width:17px;
		height:27px;
		margin-right:10px;
	}
	#check-container .input-wrapper .input-row a{
		color:#9B9B9B;
	}
	
	#check-container .check-bot{
		width:100%;
	}
</style>