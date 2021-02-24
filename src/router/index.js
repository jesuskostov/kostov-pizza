import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import { fb } from '../firebase'
import "firebase/auth"
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import MakeOrder from '../views/MakeOrder.vue'
import OrderTrack from '../views/OrderTrack.vue'
import AdminOrders from '../views/AdminOrders.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/order',
    name: 'MakeOrder',
    component: MakeOrder,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin-orders',
    name: 'AdminOrders',
    component: AdminOrders,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ordertrack',
    name: 'OrderTrack',
    component: OrderTrack,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // meta: {
    //   requiresAuth: false
    // }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = fb.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next();
  }
})

export default router
