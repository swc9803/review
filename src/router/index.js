import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home'
import Review from '../pages/Review'
import PlzReview from '../pages/PlzReview'
import Hot from '../pages/Hot'
import QnA from '../pages/QnA'
import Board from '../pages/Board'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Create from '@/components/board/Create'
import Boardid from '@/components/board/Boardid'
import error from '../pages/error'
import User from '../pages/User'

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
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/board/:id',
      name: 'Boardid',
      component: Boardid,
      props: true
    },
    {
      path: '/*',
      name: 'error',
      component: error
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})

export default router
