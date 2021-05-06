import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home'
import Review from '../pages/Review'
import QnA from '../pages/QnA'

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
    }
  ]
})

export default router
