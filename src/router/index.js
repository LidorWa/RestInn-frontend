import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import aboutPage from '../views/about-page.vue'
import loginSignup from '../views/login-signup.vue'
import stayDetails from '../views/stay-details.vue'
import stayEdit from '../views/stay-edit.vue'
import userDetails from '../views/user-details.vue'
import dashboard from '../views/dashboard.vue'
import stayApp from '../views/stay-app.vue'
// import backoffice from '../views/backoffice.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'home-page',
      path: '/',
      component: homePage,
    },
    {
      name: 'about-page',
      path: '/about',
      component: aboutPage,
    },
    {
      name: 'stay-app',
      path: '/stay',
      component: stayApp,
    },
    {
      name: 'stay-details',
      path: '/stay/:stayId',
      component: stayDetails,
    },
  ],
})

export default router
