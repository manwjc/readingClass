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
					this.goToRouter(this.userData);
				}, (error) => {
					this.$showMsg(error)
				})
			},
			goToRouter(userData){
				if(userData.code === '0'){
					if(userData.data.isBindPhone === true){
						this.$router.push({name:"classList"})
					}else{
						this.$router.push({name:"checkPhone"})
					}
				}else{
					this.$showMsg(userData.message);
				}
			},
		}
	}
</script>
