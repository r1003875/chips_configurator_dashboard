import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Voting from '../components/Voting.vue'
import Signup from '../components/Signup.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/signup', name: 'Signup', component: Signup },
    { path: '/login', name: 'Login', component: Login },

    { path: '/', redirect: '/voting' },

    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/voting',
      name: 'Voting',
      component: Voting,
      meta: { requiresAuth: true }
    },

    { path: '/:catchAll(.*)', redirect: '/voting' }
  ]
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }

  if (to.path === '/') {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    return next(isAdmin ? '/dashboard' : '/voting');
  }

  next();
});

export default router