<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'

// axios.defaults.baseURL = 'https://664cac5cede9a2b556512585.mockapi.io/'

const favorites = ref([])

onMounted(async () => {
  try {
    // const { data } = await axios.get('https://604781a0efa572c1.mokky.dev/favorites')
    const { data } = await axios.get('/favorites')
    favorites.value = data.map((obj) => obj.item)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <h2 class="font-bold text-3xl mb-8">Мои закладки</h2>
  <CardList :items="favorites" is-favorites />
</template>
