<template>
	<div class="relative heightp100">
		<div class="align-middle text-center loading-box">
			<div class="loading-icon"><img src="static/images/loading.gif"></div>
			<div>加载中</div>
		</div>
	</div>
</template>

<script>
	import utils from '@/js/common/utils'
	export default {
		name: 'index',
		data() {
			return {
				userData: null,
				phone: ''
			}
		},
		mounted() {
			utils.setCookie('phone', '13499998888')
			if(this.$route.query.pageSource === 'chelcApp') {
				this.phone = utils.getCookie('phone');
				if(!this.phone) {
					this.$router.push({path: 'notLoginPage'})
				}else{
					this.$router.push({path:"classList", query: {phone: this.phone, pageSource: 'chelcApp'}})
					this.getUserInfoFromApp();
				}
			}else{
				this.getUserInfo()
			}
		},
		methods: { 
			//app
			getUserInfoFromApp() {
				let dataParams = {
					params: {
						phone: this.phone
					}
				}
				this.$service.getUserInfoFromApp(dataParams, (res) => {
					let data = res.data;
					if(data.data.member !== '-1' && data.data.member !== '0'){
						this.$router.push({name:"classList", params: {phone: this.phone}})
					}else if(data.data.member === '-1'){
						this.$router.push({name:"hasDated"})
					}else if(data.data.member === '0'){
						this.$router.push({name:"newGay"})
					}
				}, (error) => {
					this.$showMsg(error)
				})
			},
			//wx
			getUserInfo() {
				this.$service.getUserInfo((res) => {
					this.userData = res.data;
					this.userData.data.openId && sessionStorage.setItem('openId', this.userData.data.openId);
					this.goToRouter(this.userData);
				}, (error) => {
					this.$showMsg(error)
				})
			},
			goToRouter(data){
				if(data.data && data.data.isBindPhone === true) {
					if(data.data.isTeacher) {
						this.$router.push({name:"courseList"})
					}else if(data.data.isSa) {
						this.$router.push({name:"saSet"})
					}else if(data.data.member) {
						if(data.data.member !== '-1' && data.data.member !== '0'){
							this.$router.push({name:"classList"})
						}else if(data.data.member === '-1'){
							this.$router.push({name:"hasDated"})
						}else if(data.data.member === '0'){
							this.$router.push({name:"newGay"})
						}
					}
				}else if(data.data && data.data.isBindPhone === false){
					this.$router.push({name:"checkPhone"})
				}else{
					this.$showMsg(data.message);
				}
			},
		}
	}
</script>
