<template>
	<div class="relative heightp100">
		<div class="align-middle text-center loading-box">
			<div class="loading-icon"><img src="static/images/loading.gif"></div>
			<div>加载中</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				userData: null
			}
		},
		mounted() {
			this.getUserInfo()
		},
		methods: { 
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
				/* if(userData.code === '0'){
					if(userData.data.isBindPhone === true && userData.data.member !== '-1' && userData.data.member !== '0'){
						this.$router.push({name:"classList"})
					}else if(userData.data.isBindPhone === true && userData.data.member === '-1'){
						this.$router.push({name:"hasDated"})
					}else if(userData.data.isBindPhone === true && userData.data.member === '0'){
						this.$router.push({name:"newGay"})
					}else{
						this.$router.push({name:"checkPhone"})
					}
				}else{
					this.$showMsg(userData.message); 
				} */
				if(data.data && data.data.isBindPhone === true) {
					if(data.data.member) {
						if(data.data.member !== '-1' && data.data.member !== '0'){
							this.$router.push({name:"classList"})
						}else if(data.data.member === '-1'){
							this.$router.push({name:"hasDated"})
						}else if(data.data.member === '0'){
							this.$router.push({name:"newGay"})
						}
					}else if(data.data.isTeacher) {
						this.$router.push({name:"courseList"})
					}else if(data.data.isSa) {
						this.$router.push({name:"saSet"})
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
