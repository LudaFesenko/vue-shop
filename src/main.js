import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import FavoritesView from './page/FavoritesView.vue'
import HomePage from './page/HomePage.vue'
const app = createApp(App)

const routes = [
  { path: '/', name: HomePage, component: HomePage },
  { path: '/favorites', name: FavoritesView, component: FavoritesView }
]

const router = createRouter({
  history: createWebHistory('/vue-shop/'),
  routes
})

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
