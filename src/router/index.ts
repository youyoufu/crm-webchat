import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Task from '@/views/Task.vue';
import Bind from '@/views/BindUser.vue';
import User from '@/views/User.vue';
import tasklist from '@/views/TaskList.vue';
import taskrefund from '@/views/TaskRefund.vue';
import taskbuy1 from '@/views/TaskBuy1.vue';
import taskbuy2 from '@/views/TaskBuy2.vue';
import taskbuy3 from '@/views/TaskBuy3.vue';
// import { hasLogin, saveLogin } from '@/util/session';
// import { stringifPath } from '@/api/index';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'task',
      component: Task,
      meta: { title: '任务中心' }
    },
    {
      path: '/tasklist',
      name: 'tasklist',
      component: tasklist,
      meta: { title: '任务列表' }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: '欢迎首次登陆' }
    },
    {
      path: '/bind',
      name: 'bind',
      component: Bind,
      meta: { title: '绑定商场账户' }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { title: '个人中心' }
    },
    {
      path: '/taskrefund',
      name: 'taskrefund',
      component: taskrefund,
      meta: { title: '挖宝任务' }
    },
    {
      path: '/taskbuy1',
      name: 'taskbuy1',
      component: taskbuy1,
      meta: { title: '任务第1步(共3步)' }
    },
    {
      path: '/taskbuy2',
      name: 'taskbuy2',
      component: taskbuy2,
      meta: { title: '任务第2步(共3步)' }
    },
    {
      path: '/taskbuy3',
      name: 'taskbuy3',
      component: taskbuy3,
      meta: { title: '任务第3步(共3步)' }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to autologin.
    // if (!hasLogin()) {
    //   saveLogin('youyoufu');
    // next({
    //   path: '/task',
    //   query: { redirect: to.fullPath },
    // });
    // } else {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
    // }
  } else {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next(); // 确保一定要调用 next()
  }
});

export default router;
