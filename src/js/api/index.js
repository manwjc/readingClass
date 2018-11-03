    
export default {
    login : '/api/service2/keywordLogin!login?userName=15919764630&USER_PASSWORD=25d55ad283aa400af464c76d713c07ad&IMEI=&safeword=&identity_id=2&coid=150760086241435091502172&gid=-1&timeZone=GMT%2B08%3A00&language=zh-cn',
    //获取微信签名信息
    getWechatSign: '/wx/wechat/portal/getWechatSign',
    //获取用户信息
    getUserInfo: '/wx/wxApi/getUserInfo',
    //绑定手机号
    bindMobile: '/wx/wxApi/bindMobile',
    //发送验证码
    sendValidateCode: '/wx/wxApi/sendValidateCode',
    //判断当前阅读馆当前期数是否已满额
    getTermNum: '/wx/wxApi/getTermNum',
    //获取已报名用户
    recommendSignUp: '/wx/wxApi/recommendSignUp',
    //获取期数
    getTermNumList: '/wx/chelApi/getTermNumList',
    //获取阅读馆
    getReadRoomList: '/wx/chelApi/getReadRoomList',
    //获取课程列表
    getCoursewareList: '/wx/chelApi/getCoursewareList',
    //上传视频
    uploadVideo: '/wx/chelApi/uploadVideo',
    //获取精彩花絮数据
    getReadRoomGradeVideo: '/wx/chelApi/getReadRoomGradeVideo',
    //获取用户上传视频
    getUserVideo: '/wx/chelApi/getUserVideo',

    /** 
     * 导读课接口 
     * 20181011
     */
    //获取学生信息
    queryStudentAll: '/wx/homepage/queryStudentAll',
    //获取本周导读课程
    queryThisWeekReadByUser: '/wx/homepage/queryThisWeekReadByUser',
    //获取线下导读课程
    queryReadCourseAppointment: '/wx/homepage/queryReadCourseAppointment',
    //获取已参加课程
    queryReadCourseHaveClassRecord: '/wx/homepage/queryReadCourseHaveClassRecord',
    //获取未参加课程
    queryReadCourseNotClassRecord: '/wx/homepage/queryReadCourseNotClassRecord',
    //预约课程
    addAppointmentStudentInfo: '/wx/homepage/addAppointmentStudentInfo',
    //取消预约课程
    updateStudentAppointmentState: '/wx/homepage/updateStudentAppointmentState',

    //查询所有馆区
    queryAllSchool: '/wx/homepage/queryAllSchool',
    //添加孩子
    addStudent: '/wx/homepage/addStudent',
    
    //查看导读场次
    queryTeacherAppointment: '/wx/guide/teacher/queryTeacherAppointment',
    //查看导读场次学员集合
    queryTeacherAppointmentByStudent: '/wx/guide/teacher/queryTeacherAppointmentByStudent',
    //保存周冠军候选人
    addStudentWeekCandidateStatus: '/wx/guide/teacher/addStudentWeekCandidateStatus',
    //取消周冠军候选人
    updateStudentWeekCandidateStatus: '/wx/guide/teacher/updateStudentWeekCandidateStatus',
    //获取评价
    getEvaluate: '/wx/guide/teacher/getEvaluate',
    //保存学员作业评价
    addEvaluate: '/wx/guide/teacher/addEvaluate',
    //查询学员作业评价
    queryStudentEvaluation: '/wx/homepage/queryStudentEvaluation',
    
    //查询课程等级
    queryGradeAll: '/wx/guide/sa/queryGradeAll',
    //查询导读室
    queryClassroomByStudentAdmin: '/wx/guide/sa/queryClassroomByStudentAdmin',
    //根据导读室和课程等级查询所有课程
    queryCourseByClassAndGrade: '/wx/guide/sa/queryCourseByClassAndGrade',
    //查询周冠军候选人
    queryWeekChampionCandidate: '/wx/guide/sa/queryStudentWeekCompetitorStatus',
    //查询月冠军候选人
    queryMonthChampionCandidate: '/wx/guide/sa/queryStudentWeekStatus',
    //保存周冠军
    addWeekChampion: '/wx/guide/sa/updateStudentWeekStatus',
    //保存月冠军
    addMonthChampion: '/wx/guide/sa/updateStudentMonthStatus',

    //查询周冠军
    queryStudentWeekStatusByClassroomId: '/wx/guide/sa/queryStudentWeekStatusByClassroomId',
    //查询月冠军
    queryStudentMonthStatus: '/wx/guide/sa/queryStudentMonthStatus',

    //导读课接入app
    //通过手机号查询app用户信息
    getUserInfoFromApp: '/wx/wxApi/getUserInfo',
}