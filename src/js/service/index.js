    
import axios from 'axios'
import api from '@/js/api'

export default {
    doLogin: function(success, fail) {
        axios.get(api.login).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取用户信息
    getUserInfo: function(success, fail) {
        axios.get(api.getUserInfo).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取阅读馆
    getReadRoomList: function(success, fail) {
        axios.get(api.getReadRoomList).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取用户信息
    getWechatSign: function(params, success, fail) {
        axios.get(api.getWechatSign, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //绑定手机号
    bindMobile: function(params, success, fail) {
        axios.post(api.bindMobile, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //发送验证码
    sendValidateCode: function(params, success, fail) {
        axios.get(api.sendValidateCode, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取期数判断当前阅读馆当前期数是否已满额
    getTermNum: function(params, success, fail) {
        return new Promise((resolve, reject) => {
            axios.get(api.getTermNum, params).then((res)=>{
                resolve(res);
            })
            .catch((error) => {
                fail && fail(error);
            })
        })
    },
    //获取期数
    getTermNumList: function(params, success, fail) {
        return new Promise((resolve, reject) => {
            axios.get(api.getTermNumList, params).then((res)=>{
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
    //提交报名
    signUp: function(params, success, fail) {
        return new Promise((resolve, reject) => {
            axios.post(api.signUp, params).then((res)=>{
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
    //获取课程列表
    getCoursewareList: function(params,success, fail) {
        axios.get(api.getCoursewareList).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //上传视频
    uploadVideo: function(params, success, fail) {
        axios.post(api.uploadVideo, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取精彩花絮数据
    getReadRoomGradeVideo: function(success, fail) {
        axios.get(api.getReadRoomGradeVideo).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取已报名用户
    recommendSignUp: function(success, fail) {
        axios.get(api.recommendSignUp).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取用户上传视频
    getUserVideo: function(params, success, fail) {
        axios.get(api.getUserVideo, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },


    //导读课
    //获取学生信息
    queryStudentAll: function(success, fail) {
        axios.get(api.queryStudentAll).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取本周导读课程
    queryThisWeekReadByUser: function(params, success, fail) {
        axios.post(api.queryThisWeekReadByUser, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取线下导读课程
    queryReadCourseAppointment: function(params, success, fail) {
        axios.post(api.queryReadCourseAppointment, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取已参加课程
    queryClassRecord: function(params, success, fail) {
        axios.post(api.queryReadCourseHaveClassRecord, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取未参加课程
    queryClassMissing: function(params, success, fail) {
        axios.post(api.queryReadCourseNotClassRecord, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //预约课程
    addAppointment: function(params, success, fail) {
        axios.post(api.addAppointmentStudentInfo, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //取消预约课程
    updateStudentAppointmentState: function(params, success, fail) {
        axios.post(api.updateStudentAppointmentState, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },

    //查询所有馆区
    queryAllSchool: function(success, fail) {
        axios.get(api.queryAllSchool).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //添加孩子
    addStudent: function(params, success, fail) {
        axios.post(api.addStudent, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },

    //查看导读场次
    queryTeacherAppointment: function(params, success, fail) {
        axios.post(api.queryTeacherAppointment, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //查看导读场次学员集合
    queryTeacherAppointmentByStudent: function(params, success, fail) {
        axios.post(api.queryTeacherAppointmentByStudent, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //保存周冠军候选人
    updateStudentWeekStatus: function(params, success, fail) {
        axios.post(api.updateStudentWeekStatus, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //获取评价
    getEvaluate: function(success, fail) {
        axios.get(api.getEvaluate).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
    //保存学员作业评价
    addEvaluate: function(params, success, fail) {
        axios.post(api.addEvaluate, params).then((res)=>{
            success && success(res);
        })
        .catch((error) => {
            fail && fail(error);
        })
    },
}