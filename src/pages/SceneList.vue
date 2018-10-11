<template>
	<div class="course-container course-index box-v-start align-stretch">
		<div class="course-top">
			<div class="users box-justify">
				<div class="box-start user-img-wrapper">
					<img class="user-img" src="static/images/course/wx.jpg">
					<div class="box-v-center align-start">
						<p>{{user.name}}</p>
						<p>{{user.show_grade}}</p>
					</div>
				</div>
				<div class="box-end user-right">
					<p>其他孩子 &gt;</p>
				</div>
			</div>
			<div class="flash">
				<img class="flash-mask" src="static/images/course/light-bg.png">
				<p id="flash-circle1" class="flash-circle" ></p>
				<p id="flash-circle2" class="flash-circle" ></p>
				<p id="flash-circle3" class="flash-circle" ></p>
				<p id="flash-circle4" class="flash-circle" ></p>
				<p id="flash-circle5" class="flash-circle" ></p>
				<p id="flash-circle6" class="flash-circle" ></p>
				<p id="flash-circle7" class="flash-circle" ></p>
				<p id="flash-circle8" class="flash-circle" ></p>
				<p id="flash-circle9" class="flash-circle" ></p>
				<p id="flash-circle10" class="flash-circle" ></p>
				<p id="flash-circle11" class="flash-circle" ></p>
				<p id="flash-circle12" class="flash-circle" ></p>
				<p id="flash-circle13" class="flash-circle" ></p>
				<p id="flash-circle14" class="flash-circle" ></p>
				<p id="flash-circle15" class="flash-circle" ></p>

			</div>
			<div class="total box-center">
				<div class="item">
					<p>周冠军</p>
					<p>10次</p>
				</div>
				<div class="item">
					<p>月冠军</p>
					<p>5次</p>
				</div>
				<div class="item">
					<p>累积打卡</p>
					<p>10次</p>
				</div>
				<div class="item">
					<p>已预约导读</p>
					<p>1次</p>
				</div>
			</div>
		</div>
		<div class="course-main ">
			<div class="course-main-header">
				<h3>线下导读</h3>
				<p class="des">老师带领细读经典英文课本</p>
				<div class="introduce box-start">
					<img  src="static/images/course/index-demo.png">
					<div class="introduce-right box-v-center align-start">
						<div class="introduce-text">
							<p>eric和他特别的衣服</p>
							<p>（英）clark,（英）clark</p>
							<p>格林童话|经典阅读</p>
						</div>
						<div class="btn-wrapper">
							<button>立即预约</button>
						</div>
					</div>
				</div>
			</div>
			<div class="course-main-body">
				<div class="course-tab">
					<div class="tab-header box-start">
						<button class="box-center active">已参加课程</button>
						<button class="box-center">未参加课程</button>
					</div>
					<div class="tab-body">
						<div class="attended">
							<div class="course-item  shadow">
								<div class="item-top box-start">
									<img class="course-img" src="static/images/course/index-demo.png">
									<div class="course-item-right box-v-center align-start">
										<div class="course-item-text">
											<p>eric和他特别的衣服</p>
											<p>（英）clark,（英）clark</p>
											<p class="box-start">
												<img class="avatar" src="static/images/course/wx.jpg">
												<span class="box-center">army</span>
												<span class="box-center">|</span>
												<span class="box-center">4.5分</span>
											</p>
										</div>
										
									</div>
								</div>
								<div class="item-bot box-center">
									<button class="box-center">查看课件</button>
									<button class="box-center">做作业</button>
									<img class="dot " src="static/images/course/dot.png">
								</div>
							</div>
							<div class="course-item  shadow">
								<div class="item-top box-start">
									<img class="course-img" src="static/images/course/index-demo.png">
									<div class="course-item-right box-v-center align-start">
										<div class="course-item-text">
											<p>eric和他特别的衣服</p>
											<p>（英）clark,（英）clark</p>
											<p class="box-start">
												<img class="avatar" src="static/images/course/wx.jpg">
												<span class="box-center">army</span>
												<span class="box-center">|</span>
												<span class="box-center">4.5分</span>
											</p>
										</div>
										
									</div>
								</div>
								<div class="item-bot box-center">
									<button class="box-center">查看课件</button>
									<button class="box-center">做作业</button>
									<img class="dot " src="static/images/course/dot.png">
								</div>
							</div>
							<div class="course-item  shadow">
								<div class="item-top box-start">
									<img class="course-img" src="static/images/course/index-demo.png">
									<div class="course-item-right box-v-center align-start">
										<div class="course-item-text">
											<p>eric和他特别的衣服</p>
											<p>（英）clark,（英）clark</p>
											<p class="box-start">
												<img class="avatar" src="static/images/course/wx.jpg">
												<span class="box-center">army</span>
												<span class="box-center">|</span>
												<span class="box-center">4.5分</span>
											</p>
										</div>
										
									</div>
								</div>
								<div class="item-bot box-center">
									<button class="box-center">查看课件</button>
									<button class="box-center">做作业</button>
									<img class="dot " src="static/images/course/dot.png">
								</div>
							</div>
						</div>
						<div class="no-attend hide"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				user : {},
				listData: [],
			}
		},
		mounted() {
			let self = this;
			self.getUser();
			//self.getUser()
			//self.getList();
		},
		methods: {
			redirect(item,index){
				let self = this;
				if(item.isGray){
					return;
				}
				if(index === 4){
					self.$router.push({ name: 'sceneLastDay'});
				}
				else{
					self.$router.push({ name: 'sceneCon', params: { id: item.id }});
				}

			},
			format(time, format){
			    var t = new Date(time);
			    var tf = function(i){return (i < 10 ? '0' : '') + i};
			    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
			        switch(a){
			            case 'yyyy':
			                return tf(t.getFullYear());
			                break;
			            case 'MM':
			                return tf(t.getMonth() + 1);
			                break;
			            case 'mm':
			                return tf(t.getMinutes());
			                break;
			            case 'dd':
			                return tf(t.getDate());
			                break;
			            case 'HH':
			                return tf(t.getHours());
			                break;
			            case 'ss':
			                return tf(t.getSeconds());
			                break;
			        }
			    })
			}, 
			/*doLogin(){
				let self = this;
				self.$service.doLogin(
					
					(res) => {
					if(res.data.code === '000'){
						self.getUser()
					
					}
				}, (error) => {
					console.error(error)
				})
			},*/
			getUser() {
				let self = this;
				self.user = 
					{
						"status":"4","ID":"152328200694459801411107","name":"钟大宝","englishName":"yuan","birthDate":"2015-07-02","parent_id":"152268189362559801375939","sex":"1","state":"1","grade":"5","hours":"1775","number":"S-201804090025","currency":"0","school":"151624329992235091733919","imgUrl":"","consume":"71","cumulative":"2050","surplus_hours":"215","membershipsNum":"20188898","borrowing_times":"1","membership_data":"2019-04-09","overplus_read_days":"183","read_days":"182","free_open_class":"0","notTime":"0","studentCourseLevel":["1","2","6","4","10","13","5"],"show_grade":"L2"
					}
				/*let dataParams = self.$qs.stringify({id : "152268189362559801375939"});
				self.$service.getUserInfo(
					dataParams,
					(res) => {
					if(res.data.code === '0'){
						self.listData = res.data.data;
					
					}
				}, (error) => {
					console.error(error)
				})*/
			},
			getList() {
				let self = this;

				self.$service.getCoursewareList((res) => {
					if(res.data.code === '0'){
						self.listData = res.data.data;
					
					}
				}, (error) => {
					console.error(error)
				})
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
p{
	color:#000;
}
.course-container{
	/*height:100%;*/
}
.course-index .course-top{
	
}
.course-index .users{
	background:#01244C;
}
.course-index .users .user-img-wrapper{
	padding:20px 0 20px 20px;
	
}
.course-index .users .user-img-wrapper p{
	color:#fff;
	margin-left:10px;

}
.course-index .users .user-img-wrapper p:first-of-type{
	margin-bottom:10px;
}
.course-index .users .user-img{
	width:60px;
	height:60px;
	border-radius:60px;
	display:block;
}
.course-index .users .user-right{
	background-color:#011844;
	padding:10px 20px;
	border-radius:20px 0 0 20px;
}
.course-index .users .user-right p{
	color:#fff;
}
.course-index .course-top .total{
	padding-top:10px;
}
.course-index .course-top .total .item{
	margin:0 13px;
	text-align:center;
}
.course-index .course-top .total .item p:first-of-type{
	margin-bottom:10px;
	color:#999;
}
.course-index .course-main .course-main-header{
	margin-top:10px;
	padding-top:10px;
	border-top:solid 1px #e5e5e5;
	padding-left:20px;
}
.course-index .course-main .course-main-header h3{
	color:#000;
	font-weight:600;
	font-size:18px;
	line-height:30px;

}
.course-index .course-main .course-main-header .des{
	color:#999;
}
.course-index .course-main .course-main-header .introduce{
	padding-top:10px;
}

.course-index .course-main .course-main-header .introduce img{
	width:120px;
	height:160px;
	margin-right:10px;
}
.course-index .course-main .course-main-header .introduce .introduce-text p{
	line-height:24px;
	margin:5px 0;
}
.course-index .course-main .course-main-header .introduce .introduce-text p:nth-of-type(1){
	font-weight:600;
	color:#000;
	font-size:16px;
}
.course-index .course-main .course-main-header .introduce .introduce-text p:nth-of-type(3){
	background-color:#FFCE99;
	border-radius:20px;
	font-weight:600;
	color:#fff;
	font-size:14px;
	border-radius:6px;
	text-align:center;
}
.course-index .course-main .course-main-header .introduce .introduce-right .btn-wrapper{
	margin-top:20px;
}
.course-index .course-main .course-main-header .introduce .introduce-right button{
	color:#DCA0A0;
	font-size:18px;
}


.course-index .course-main .course-main-body .tab-header{
	padding:10px 0 10px 20px;

}
.course-index .course-main .course-main-body .tab-header button{
	height:30px;
	
	margin-right:30px;
}
.course-index .course-main .course-main-body .tab-header button.active{
	border-bottom:solid 2px #DCA0A0;
}
.course-index .course-main .course-main-body .tab-body .course-item{
	margin:20px;
	padding:20px;
	border:solid 1px #e5e5e5;
}
.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-img{
	width:80px;
	height:120px;
	margin-right:10px;
}
.course-index .course-main .course-main-body .tab-body .course-item .item-top .avatar{
	width:40px;
	height:40px;
}
.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-item-text p{
	line-height:24px;
	margin:5px 0;
}
.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-item-text p:nth-of-type(1){
	font-weight:600;
	color:#000;
	font-size:16px;
}
.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-item-text p:nth-of-type(3){
	
}
.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-item-text p span{
	margin-left:20px;
}
.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-item-right .btn-wrapper{
	margin-top:20px;
}
.course-index .course-main .course-main-body .tab-body .course-item .item-top .course-item-right button{
	color:#DCA0A0;
	font-size:18px;
}
.course-index .course-main .course-main-body .tab-body .course-item .item-bot{
	margin-top:10px;
}
.course-index .course-main .course-main-body .tab-body .course-item .item-bot button{
	width:100px;
	height:40px;
	border-radius:10px;
	border:solid 1px #e5e5e5;
	margin:0 10px;
}

.course-index .course-main .course-main-body .tab-body .course-item .item-bot .dot{
	width:38px;
	height:19px;
}
.flash{
	position:relative;

}
.flash-circle{
	position:absolute;
	left:30%;
	width:7px;
	height:7px;
	background-color:#E8A896;
	border-radius:20px;
	top:0;
	animation:opa 2s infinite;
	-webkit-animation:opa 2s infinite; /*Safari and Chrome*/
}
#flash-circle1{
	left: 19.5%;
    top: 46%;
}
#flash-circle2{
	left: 23.5%;
    top: 22%;
}
#flash-circle3{
	left: 23.5%;
    top: 71%;
}
#flash-circle4{
	left: 31.5%;
    top: 46%;
}
#flash-circle5{
	left: 35%;
    top: 46%;
}
#flash-circle6{
	left: 38.5%;
    top: 46%;
}
#flash-circle7{
	left: 43%;
    top: 26%;
}

#flash-circle8{
	left: 43%;
    top: 65%;
}
#flash-circle9{
	left: 47%;
    top: 45%;
}
#flash-circle10{
	left: 54%;
    top: 26%;
}
#flash-circle11{
	left: 54%;
    top: 56%;
}
#flash-circle12{
	left: 58%;
    top: 69%;
}
#flash-circle13{
	left: 72%;
    top: 48%;
}
#flash-circle14{
	left: 78%;
    top: 25%;
}
#flash-circle15{
	left: 78%;
    top: 65%;
}
@keyframes opa
{
from {opacity:0;}
50%{opacity:1;}
to {opacity:0;}
}

@-webkit-keyframes opa /*Safari and Chrome*/
{
from {opacity:0;}
50%{opacity:1;}
to {opacity:0;}
}
</style>