<script setup>
import { computed, provide, ref, watch } from 'vue'
import axios from 'axios'

import HomePage from './page/HomePage.vue'
import HeaderVue from './components/HeaderVue.vue'
import DrawerVue from './components/DrawerVue.vue'

const API_URL = import.meta.env.VITE_APP_API_URL
axios.defaults.baseURL = API_URL

// axios.defaults.baseURL = 'https://664cac5cede9a2b556512585.mockapi.io/'

const cart = ref([])
const driverIsOpen = ref(false)
const totalCartPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const vatPrice = computed(() => Math.round(totalCartPrice.value * 5) / 100)

const openDriver = () => {
  driverIsOpen.value = true
}

const closeDriver = () => {
  driverIsOpen.value = false
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

// const fetchFavorites = async () => {
//   try {
//     const { data: favorites } = await axios.get('/favorites')

//     items.value = items.value.map((item) => {
//       const favorite = favorites.find((favorite) => favorite.parentId === item.id)

//       if (!favorite) {
//         return item
//       }

//       return {
//         ...item,
//         isFavorite: true,
//         favoriteId: favorite.id
//       }
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  openDriver,
  closeDriver,
  removeCart,
  addToCart
})
</script>

<template>
  <DrawerVue v-if="driverIsOpen" :total-price="totalCartPrice" :vat-price="vatPrice" />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <HeaderVue @open-driver="openDriver" :total-price="totalCartPrice" />
    <div class="p-10">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
