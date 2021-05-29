import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home'
import Review from '../pages/Review'
import PlzReview from '../pages/PlzReview'
import Hot from '../pages/Hot'
import Board from '../pages/Board'
import BoardCreate from '@/components/board/BoardCreate'
import Boardid from '@/components/board/Boardid'
import BoardEdit from '@/components/board/BoardEdit'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import ReviewCreate from '@/components/review/ReviewCreate'
import Reviewid from '@/components/review/Reviewid'
import ReviewEdit from '@/components/review/ReviewEdit'

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
      path: '/board',
      name: 'Board',
      component: Board
    },
    {
      path: '/board/create',
      name: 'BoardCreate',
      component: BoardCreate
    },
    {
      path: '/board/:id',
      name: 'Boardid',
      component: Boardid,
      props: true
    },
    {
      path: '/board/:id/edit',
      name: 'BoardEdit',
      component: BoardEdit,
      props: true
    },
    {
      path: '/review/create',
      name: 'ReviewCreate',
      component: ReviewCreate
    },
    {
      path: '/review/:id',
      name: 'Reviewid',
      component: Reviewid,
      props: true
    },
    {
      path: '/review/:id/edit',
      name: 'ReviewEdit',
      component: ReviewEdit,
      props: true
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
