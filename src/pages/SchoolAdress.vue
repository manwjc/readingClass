<template>
<div class="relative pt20" style="width:100%">
    <div class="title f30">
        全国实体阅读馆分布
    </div>
    <ul class="tab mtop20">

        <li @click="change(0)" :class="{'opacity1' : index === 0}" style="background-color:#49caf9;">
            深圳
        </li>
        <li @click="change(1)" :class="{'opacity1' : index === 1}" style="background-color:#fdb941;">
            成都
        </li>
        <li @click="change(2)" :class="{'opacity1' : index === 2}" style="background-color:#fb795b;">
            宁波
        </li>
        <li @click="change(3)" :class="{'opacity1' : index === 3}" style="background-color:#b269e9;">
            杭州
        </li>
        <li @click="change(4)" :class="{'opacity1' : index === 4}" style="background-color:#3cc;">
            梅州
        </li>
    </ul>

    <div class="adress_content">
        <ul class="list_box" v-if="index==0">
            <li class="list_box-item" v-for="item in contentData['index0']">
                <div class="adress_box">
                    <img :src="item.src" alt="">
                    <div class="adress_box-title">{{item.title}}</div>
                    <div class="adress_box-content">{{item.content}}</div>
                    <div class="text-center">
                        <button class="red-btn" @click="gotoAddStudent">一键预约</button>
                    </div>
                </div>
            </li>
        </ul>
        <ul class="list_box" v-if="index==1">
            <li class="list_box-item" v-for="item in contentData['index1']">
                <div class="adress_box">
                    <img :src="item.src" alt="">
                    <div class="adress_box-title">{{item.title}}</div>
                    <div class="adress_box-content">{{item.content}}</div>
                    <div class="text-center">
                        <button class="red-btn" @click="gotoAddStudent">一键预约</button>
                    </div>
                </div>
            </li>
        </ul>

        <ul class="list_box" v-if="index==2">
            <li class="list_box-item" v-for="item in contentData['index2']">
                <div class="adress_box">
                    <img :src="item.src" alt="">
                    <div class="adress_box-title">{{item.title}}</div>
                    <div class="adress_box-content">{{item.content}}</div>
                    <div class="text-center">
                        <button class="red-btn" @click="gotoAddStudent">一键预约</button>
                    </div>
                </div>
            </li>
        </ul>

        <ul class="list_box" v-if="index==3">
            <li class="list_box-item" v-for="item in contentData['index3']">
                <div class="adress_box">
                    <img :src="item.src" alt="">
                    <div class="adress_box-title">{{item.title}}</div>
                    <div class="adress_box-content">{{item.content}}</div>
                    <div class="text-center">
                        <button class="red-btn" @click="gotoAddStudent">一键预约</button>
                    </div>
                </div>
            </li>
        </ul>

        <ul class="list_box" v-if="index==4">
            <li class="list_box-item" v-for="item in contentData['index4']">
                <div class="adress_box">
                    <img :src="item.src" alt="">
                    <div class="adress_box-title">{{item.title}}</div>
                    <div class="adress_box-content">{{item.content}}</div>
                    <div class="text-center">
                        <button class="red-btn" @click="gotoAddStudent">一键预约</button>
                    </div>
                </div>
            </li>
        </ul>

    </div>

</div>
</template>

<script>
import constant from "@/js/common/constant";

export default {
    data() {
        return {
            index: 0,
            contentData: {
                index0: [{
                        src: "http://www.chel-c.com/img/shenzhen1.c3af01c.png",
                        title: "深圳南山太古城阅读馆",
                        content: "南山区宝能all city购物中心北区负二层NB211（海月地铁站B出口）"
                    },
                    {
                        src: "http://www.chel-c.com/img/shenzhen2.e391358.png",
                        title: "深圳南山华润城阅读馆",
                        content: "南山区深南大道与沙河西路交汇处华润万象天地SL456（高新园A出口）"
                    },
                    {
                        src: "http://www.chel-c.com/img/shenzhen1.c3af01c.png",
                        title: "深圳罗湖喜荟城阅读馆",
                        content: "罗湖区喜荟城购物中心三层337（太安地铁站C出口）"
                    },
                    {
                        src: "http://www.chel-c.com/img/shenzhen4.0ed1079.png",
                        title: "深圳福田虹湾阅读馆",
                        content: "福田区梅林街道绿景佐阾虹湾购物中心L3022（梅景站A1出口）"
                    },
                    // {
                    //     src: "http://www.chel-c.com/img/shenzhen5.6aa2200.png",
                    //     title: "深圳龙华cococity阅读馆",
                    //     content: "龙华区星河盛世cococity COCO童堡L2s-07/08（白石龙D出口）"
                    // },
                    {
                        src: "http://www.chel-c.com/img/shenzhen6.f9c2437.png",
                        title: "深圳龙华壹方天地阅读馆",
                        content: "龙华区人民路壹方天地A区乐聚公园L3层008/009号"
                    }
                ],
                index1: [{
                    src: "http://www.chel-c.com/img/chengdu1.b648564.png",
                    title: "成都九方阅读馆",
                    content: "成都市高新区府城大道中段88号 九方购物中心L425/426"
                }],

                index2: [{
                    src: "http://www.chel-c.com/img/ningbo1.01ff134.png",
                    title: "宁波银泰城阅读馆",
                    content: "宁波市中山东路2266号宁波东部新城银泰城352铺"
                }],

                index3: [
                    {
                        src: "http://www.chel-c.com/img/hangzhou1.1206c74.png",
                        title: "杭州新天地阅读馆",
                        content: "杭州市下城区东新街道长滨路718号杭州新天地L329"
                    },
                    {
                        src: "http://www.chel-c.com/img/hangzhou1.1206c74.png",
                        title: "杭州大悦城分馆",
                        content: "浙江省杭州市拱墅区隐秀路1号大悦城3楼L308"
                    },
                ],

                index4: [{
                    src: "http://www.chel-c.com/img/meizhou1.eaff571.png",
                    title: "梅州万达阅读馆",
                    content: "梅江区金燕大道及五横街交叉路口万达广场三层3002"
                }]
            },
            tabs: [{
                    type: "深圳",
                    view: "child1"
                },
                {
                    type: "成都",
                    view: "child2"
                },
                {
                    type: "宁波",
                    view: "child1"
                },
                {
                    type: "杭州",
                    view: "child2"
                },
                {
                    type: "梅州",
                    view: "child2"
                }
            ]
        };
    },

    methods: {
        change(e) {
            this.index = e;
        },
        gotoAddStudent() {
            let isProd = location.origin.indexOf('chel') > -1;
            sessionStorage.setItem('fromDating', '1');
            if(isProd) {
                location.href = 'https://www.chel-c.com/wx/index';
            }else{
                this.$router.push({
                    path: '/',
                    query: {
                        fromDating: '1'
                    }
                })
            }
        }
    }
};
</script>

<style scoped>
html,
body {
    height: 100%;
    min-height: 100%;
}

.tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;

    padding: 0 0.2rem;

}

.tab>li {

    padding: 0.1rem 0;
    border-radius: 0.03rem;
    font-size: 0.24rem;
    justify-content: center;
    align-items: center;
    flex: 1;
    margin: 0 0.02rem;
    text-align: center;
    color: #ffffff;
    opacity: 0.75;
}
.tab>li.opacity1 { opacity: 1;}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
}

.list_box {

    display: flex;
    flex-direction: column;

}

.list_box-item {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin: 0.15rem 0;
}

.list_box-item>img {
    width: 2rem;

}

.list_box-mid {
    display: flex;
    flex-direction: column;
}

.adress_box {
    width: 100%; padding: 0 10px;
}
.adress_box .red-btn{ margin: 5px auto 20px; padding: 0 10px;}

.adress_box-title {
    letter-spacing: 0;
    padding: 0;
    color: black;
    line-height: 0;
    font-size: 0.24rem;
    margin-top: 0.2rem;

}

.adress_box-content {
    margin-top: 0.15rem;
    font-size: 0.18rem;
    line-height: 0.3rem;

}

.btn {
    width: 0.5rem !important;
    font-size: 0.2rem !important;
    line-height: 0.2rem !important;
}

.red-btn {
    line-height: 0.2rem;
    font-size: 0.2rem;
    height: 24px;
    line-height: 0.24rem;
}
</style>
