import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const IndexPage = resolve => require(['../pages/Index'], resolve)
const CheckPhone = resolve => require(['../pages/CheckPhone'], resolve)
const NameList = resolve => require(['../pages/NameList'], resolve)
const NewGay = resolve => require(['../pages/NewGay'], resolve)

const ClassList = resolve => require(['../pages/ClassList'], resolve)
const SceneCon = resolve => require(['../pages/SceneCon'], resolve)
const SceneLastDay = resolve => require(['../pages/SceneLastDay'], resolve)
const VideoShare = resolve => require(['../pages/VideoShare'], resolve)
const OrderCourse = resolve => require(['../pages/OrderCourse'], resolve)

const CourseItem = resolve => require(['../pages/CourseItem'], resolve)
const CourseList = resolve => require(['../pages/CourseList'], resolve)
const Homework = resolve => require(['../pages/Homework'], resolve)
const CourseDetail = resolve => require(['../pages/CourseDetail'], resolve)
const TeacherRemark = resolve => require(['../pages/TeacherRemark'], resolve)

export default new Router({
  routes: [
    //导读课路由
    {
      path: '/',
      name: 'index',
      component: IndexPage,
      // redirect: '/checkPhone',
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },
    {
      path: '/checkPhone',
      name: 'checkPhone',
      component: CheckPhone,
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },
    {
      path: '/classList',
      name: 'classList',
      component: ClassList,
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },
    {
      path: '/videoShare',
      name: 'videoShare',
      component: VideoShare,
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },
    {
      path: '/orderCourse',
      name: 'orderCourse',
      component: OrderCourse,
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },
    {
      path: '/courseItem',
      name: 'courseItem',
      component: CourseItem,
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },
    {
      path: '/courseList',
      name: 'courseList',
      component: CourseList,
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },
    {
      path: '/newGay',
      name: 'newGay',
      component: NewGay,
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },
    {
      path: '/homework',
      name: 'homework',
      component: Homework,
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },
    {
      path: '/courseDetail',
      name: 'courseDetail',
      component: CourseDetail,
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },
    {
      path: '/teacherRemark',
      name: 'teacherRemark',
      component: TeacherRemark,
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },

    //旧路由
    {
      path: '/nameList',
      name: 'nameList',
      component: NameList,
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },
    {
      path: '/sceneCon/:id',
      name: 'sceneCon',
      component: SceneCon,
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },
    {
      path: '/sceneLastDay',
      name: 'sceneLastDay',
      component: SceneLastDay,
      meta: {
        keepAlive: true,
        title: '乔希家导读课预约'
      }
    },
  ]
})
