import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'LatestNews',
    component: HomePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router