import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import invest from '@/views/invest'
import borrow from '@/views/borrow'
import personal from '@/views/personal'
import chakan from '@/views/chakan'


Vue.use(Router)

export default new Router({
  mode: 'history', //值：history /hash   就是路由后面会不会带有#
  routes: [
    //首页
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    // //我要投资
    {
      path: '/invest',
      name: 'invest',
      component: invest
    },
    // //我要借款
    {
      path: '/borrow',
      name: 'borrow',
      component: borrow
    },

    //个人中心
    {
      path: '/personal',
      name: 'personal',
      component: personal,
      children: [
        {
          path: 'tenderDetails',
          component: () => import('../views/personalIn/tenderDetails'),
          name: 'tenderDetails',
          meta: {
            title: '投标明细'
          }
        },
        {
          path: 'repayment',
          component: () => import('../views/personalIn/repayment'),
          name: 'repayment',
          meta: {
            title: '我的还款'
          }
        },
        {
          path: 'accountFlow',
          component: () => import('../views/user/accountFlow'),
          name: 'accountFlow',
          meta: {
            title: '账户流水'
          }
        },
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: personal,
      children: [
        {
          path: 'certification',
          component: () => import('../views/user/certification'),
          name: 'certification',
          meta: {
            title: '用户认证'
          }
        },
      ]
    },
    //查看投标详情路由，可查看借款人信息，还款记录，投标记录
    {
      path: '/chakan/:id',
      name: 'chakan',
      component: chakan
    },
  ]
})
