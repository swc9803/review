import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home'
import Recruit from '../pages/Recruit'
import QnA from '../pages/QnA'
import Board from '../pages/Board'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Recruit',
      name: 'Recruit',
      component: Recruit
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
    }
  ]
})

export default router
