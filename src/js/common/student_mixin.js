import service from '@/js/service'

export default {
    data() {
      return {
      };
    },
    methods: { 
        getMonday() {
            let now = new Date();
            let nowTime = now.getTime() ;
            let day = now.getDay();
            let oneDayTime = 24*60*60*1000 ;
            let MondayTime = nowTime - (day-1)*oneDayTime ;//显示周一
            let formatDate = this.getNowFormatDate(new Date(MondayTime))
            this.appointment_time = this.appointment_time || formatDate;
            return formatDate;

        },
        getNowFormatDate(date) {
            let seperator1 = "-";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            let currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        //获取学生信息
        queryStudentAll() {
            this.$service.queryStudentAll((res) => {
                    let resDate = res.data;
                    this.dataLoaded = true;
                    if (resDate.code === "0" && resDate.data.length) {
                        this.studentList = resDate.data;
                        //获取线下导读课程
                        this.queryReadCourseAppointment();
                        //获取已参加课程
                        this.queryClassRecord();
                    }else if(!resDate.data){
					    this.$showMsg(resDate.message)
                    }else if(!resDate.data.length){
                        let message = '未查找到用户信息'
					    this.$showMsg(message)
                    }
                },
                error => {
                    console.error(error);
                }
            );
        },
        //获取线下导读课程
        queryReadCourseAppointment() {
            let dataParams = this.$qs.stringify({
                school_id: this.curStudent.schoolId,
                appointment_time: this.appointment_time,
                student_id: this.curStudent.studentId
            });

            this.$service.queryReadCourseAppointment(
                dataParams,
                res => {
                    if (res.data.code === "0") {
                        this.courseListData = res.data.data;
                        sessionStorage.setItem('courseListData', JSON.stringify(res.data.data))
                    }
                },
                error => {
                    console.error(error);
                }
            );
        },
        //获取已参加课程
        queryClassRecord() {
            let dataParams = this.$qs.stringify({
                school_id: this.curStudent.schoolId,
                grade: this.curStudent.grade,
                student_id: this.curStudent.studentId
            });

            this.$service.queryClassRecord(
                dataParams,
                res => {
                    if (res.data.code === "0") {
                        this.courseRecordData = res.data.data;
                    }
                },
                error => {
                    console.error(error);
                }
            );
        },
    }
}