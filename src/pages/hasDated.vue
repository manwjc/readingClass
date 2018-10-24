<template>
	<div class="box-v-start align-stretch" style="height: 100%; min-height: 100%;">
		<div class="box-v-start">
			<img @click.prevent src="static/images/course/login-banner.jpg">
			<div class="flex-center"><img src="static/images/course/head-img.png" class="user-avatar"></div>
			<div style="margin-top: 0.2rem">您已申请成功<br>稍候会有客服人员联系您，请保持电话畅通</div>
		</div>
		<div class="rest displayflex flex-end">
			<img @click.prevent src="../assets/images/p_a_08.jpg">
		</div>
	</div>
</template>

<style scope>
	html, body{height:100%; min-height: 100%;}
	body {
		 text-align: left;
	}
	#app{
		height: 100%
	}
	.user-avatar{
		width: 40px;
	    height: 40px;
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