import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home'
import Review from '../pages/Review'
import PlzReview from '../pages/PlzReview'
import Hot from '../pages/Hot'
import QnA from '../pages/QnA'
import Board from '../pages/Board'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/review',
      name: 'Review',
      component: Review
    },
    {
      path: '/plzreview',
      name: 'PlzReview',
      component: PlzReview
    },
    {
      path: '/hot',
      name: 'Hot',
      component: Hot
    },
    {
      path: '/qna',
      name: 'QnA',
      component: QnA
    },
    {
      path: '/board',
      name: 'Board',
      component: Board
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})

export default router
