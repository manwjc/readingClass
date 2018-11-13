<template>
<div id="check-container" class="box-v-start align-stretch">
    <div class="check-main box-v-start rest pb20">
        <img  src="static/images/course/login-banner.jpg">
        <div class="input-wrapper">
            <div class="input-row box-start">
                <img  src="static/images/course/login-mobile.jpg">
                <input v-model="mobile" placeholder="输入手机号" class="box-start rest" type="text" />		</div>
                <div class="input-row box-start">
                    <img  src="static/images/course/login-verify.jpg">
                    <input v-model="code" placeholder="输入验证码"  class="box-start rest" type="text" />
                    <p style="font-size: 16px;" v-if="canClick" @click="getCode">验证码</p>
                    <p style="font-size: 16px;" v-else>{{content}}</p>
                </div>
            </div>
            <div @click="submitForm" class="course-btn box-center text-center">登录</div>
        </div>
        <div>
            <img class="check-bot" src="static/images/course/bottom.jpg">		</div>
        </div>
</template>

<script>
import Valid from '@/js/common/validate'
import utils from '@/js/common/utils'

export default {
    data() {
        return {
            mobile: '',
            code: '',
			checkedValue: true,
			canClick: true,
			totalTime: 60,
			content: '验证码'
        }
    },
    mounted() {
        console.log(utils.setCookie('chel-account', 'admin'))
	},
    methods: {
        countDown() {
            if (!this.canClick) {
				return 
			}
            this.canClick = false
            this.content = this.totalTime + 's'
            let clock = window.setInterval(() => {
                this.totalTime--
                this.content = this.totalTime + 's'
                if (this.totalTime < 1) {
                    window.clearInterval(clock)
                    this.content = '重新发送验证码'
                    this.totalTime = 60
                    this.canClick = true //这里重新开启
                }
            }, 1000)
        },
        getUserInfo() {
            let self = this;
            self.$service.getUserInfo((res) => {
                let data = res.data;
                /**
                 * 正常用户 * member: '-1' 非会员   '\d\d\d\d\d' 会员id
                 * 教师 * isTeacher: true
                 * 学管sa * isSa: true
                 */
                if (data.code === '0') {
                    if (data.data && data.data.isBindPhone === true) {
                        if (data.data.member) {
                            if (data.data.member !== '-1' && data.data.member !== '0') {
                                self.$router.push({
                                    name: "classList"
                                })
                            } else if (data.data.member === '-1') {
                                self.$router.push({
                                    name: "hasDated"
                                })
                            } else if (data.data.member === '0') {
                                self.$router.push({
                                    name: "newGay"
                                })
                            }
                        } else if (data.data.isTeacher) {
                            self.$router.push({
                                name: "courseList"
                            })
                        } else if (data.data.isSa) {
                            self.$router.push({
                                name: "courseList"
                            })
                        }
                    } else {
                        self.$showMsg(data.message);
                        // self.$router.push({name:"newGay"})
                    }
                } else {
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
                signMobile: self.mobile,
                validateCode: self.code,
                isOldStudent: self.checkedValue
            });
            if (validateMsg) {
                self.$showMsg(validateMsg);
                return;
            }

            self.$service.bindMobile(dataParams, (res) => {
                if (res.data.code === '0') {
                    self.getUserInfo();
                } else {
                    self.$showMsg(res.data.message);
                }
            }, (error) => {
                self.$showMsg(error)
            })
        },
        validateResult() {
            var self = this,
                names = [{
                        name: 'mobile',
                        reg: Valid.validateMobile
                    },
                    {
                        name: 'code'
                    }
                ],
                message;
            var messages = {
                mobile: {
                    require: '手机号不能为空',
                    regex: '手机号不合法，请重新输入'
                },
                code: {
                    require: '验证码不能为空',
                    regex: '验证码不正确，请重新输入'
                }
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
        getCode() {
            let self = this;
            let mobile = self.mobile,
                dataParams = {
                    mobile: mobile
                };

            if (!mobile) {
                self.$showMsg('请输入手机号');
                return;
            }
            if (!Valid.validateMobile(mobile)) {
                self.$showMsg('手机号不合法，请重新输入');
                return;
            }

            self.$showMsg('验证码已发送');
            self.$service.sendValidateCode({
                params: dataParams
            }, (res) => {
                var validCode = res.data.data;
                // if (validCode) {
                //     self.code = validCode;
				// }
				this.countDown();
            }, (error) => {
                self.$showMsg(error)
            })
        }

    }
}
</script>

<style>
html,
body {
    min-height: 100%;
}

#app {
    min-height: 100%;
}

#check-container {
    min-height: 100%;
}

#check-container .input-wrapper {
    width: 80%;
    margin: 30px auto;
}

#check-container .input-wrapper .input-row {

    border-bottom: solid 1px #999;
}

#check-container .input-wrapper .input-row input {
    margin-right: 10px;
    height: 50px;
    border: none;
    font-size: 14px;
}

#check-container .input-wrapper .input-row img {
    width: 17px;
    height: 27px;
    margin-right: 10px;
}

#check-container .input-wrapper .input-row a {
    color: #9B9B9B;
}

#check-container .check-bot {
    width: 100%;
}

.arrow:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    left: 100px;
    top: 20px;
    border-top: solid 10px transparent;
    border-left: solid 10px black;
    /* 白色小三角形 */
    border-bottom: solid 10px transparent;
}
</style>
