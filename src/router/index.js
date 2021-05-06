import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home'
import Review from '../pages/Review'
import QnA from '../pages/QnA'
import Board from '../pages/Board'
import Trading from '../pages/Trading'

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
      path: '/QnA',
      name: 'QnA',
      component: QnA
    },
    {
      path: '/Board',
      name: 'Board',
      component: Board
    },
    {
      path: '/Trading',
      name: 'Trading',
      component: Trading
    }
  ]
})

export default router
