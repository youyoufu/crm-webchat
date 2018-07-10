import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Task from '@/views/Task.vue';
import Bind from '@/views/BindUser.vue';
import User from '@/views/User.vue';
import { hasLogin,saveLogin } from '@/util/session';
import { stringifPath } from '@/api/index';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/bind',
      name: 'bind',
      component: Bind
    },
    {
      path:'/user',
      name:'user',
      component:User,
    },
    {
      path:'/task',
      name:'task',
      component:Task,
      meta: { requiredAuth: true },
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to autologin.
    if (!hasLogin()) {
      saveLogin('youyoufu');
      // next({
      //   path: '/task',
      //   query: { redirect: to.fullPath },
      // });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});

export default router;
