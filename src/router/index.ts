import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import task from '@/views/Task.vue';
import invite from '@/views/Inviter.vue';
import share from '@/views/Share.vue';
import Bind from '@/views/BindUser.vue';
import AddAcount from '@/views/AddAcount.vue';
import User from '@/views/User.vue';
import tasklist from '@/views/TaskList.vue';
import taskcenter from '@/views/TaskCenter.vue';
import taskrefund from '@/views/TaskRefund.vue';
import taskbuy from '@/views/TaskBuy.vue';
import { hasLogin, TOKEN } from '@/util/session';
import { login } from '@/api/login';
import { getCookie } from '@/util/cookie';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'user',
      component: User,
      meta: { title: '个人中心', requiredAuth: false }
    },
    {
      path: '/addAcount',
      name: 'addAcount',
      component: AddAcount,
      meta: { title: '请绑定账号后进入活动', requiredAuth: false }
    },
    {
      path: '/taskcenter',
      name: 'taskcenter',
      component: taskcenter,
      meta: { title: '会员专享活动', requiredAuth: false }
    },
    {
      path: '/tasklist',
      name: 'tasklist',
      component: tasklist,
      meta: { title: '领取更多活动', requiredAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: '欢迎首次登陆', requiredAuth: true }
    },
    {
      path: '/bind',
      name: 'bind',
      component: Bind,
      meta: { title: '绑定商场账户', requiredAuth: false }
    },

    {
      path: '/taskrefund',
      name: 'taskrefund',
      component: taskrefund,
      meta: { title: '挖宝活动', requiredAuth: false }
    },
    {
      path: '/taskbuy',
      name: 'taskbuy',
      component: taskbuy,
      meta: { title: '免单活动操作步骤', requiredAuth: false }
    },
    {
      path: '/invite',
      name: 'invite',
      component: invite,
      meta: { title: '邀请好友得现金红包', requiredAuth: false }
    },
    {
      path: '/share',
      name: 'share',
      component: share,
      meta: { title: '先关注后注册', requiredAuth: false }
    },
    {
      path: '/task',
      name: 'task',
      component: task,
      meta: { title: 'test', requiredAuth: false }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to autologin.
    if (!hasLogin()) {
      console.log(1111);
      login(getCookie(TOKEN) || '', '');
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router;
