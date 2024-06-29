<script setup>
import axios from 'axios'
import debounce from 'lodash.debounce'
import CardList from '../components/CardList.vue'
import { inject, onMounted, reactive, ref, watch } from 'vue'

// axios.defaults.baseURL = 'https://664cac5cede9a2b556512585.mockapi.io/'

const { cart, addToCart, removeCart } = inject('cart')

const items = ref([])
const isLoading = ref(false)
const mesError = ref('')

const filters = reactive({
  filterSort: 'title',
  searchQuery: ''
})

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
        item
      }

      item.isFavorite = true
      const { data } = await axios.post('/favorites', obj)
      console.log(data)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const requestParams = (filterValue) => {
  switch (filterValue) {
    case 'title':
      return { sortBy: 'title' }
    case 'price':
      return { sortBy: 'price', order: 'asc' }
    case 'priceUp':
      return { sortBy: 'price', order: 'desc' }
  }
}

const fetchItem = async () => {
  try {
    const params = requestParams(filters.filterSort)

    if (filters.searchQuery) {
      params.search = `${filters.searchQuery}`
    }

    isLoading.value = true
    const { data } = await axios.get('/api/v1/sneakers', {
      params
    })
    console.log(data)

    items.value = data.map((obj) => ({
      ...obj,
      favoriteId: null,
      isFavorite: false,
      isAdded: false
    }))
  } catch (error) {
    console.log('Errorrr===', error)
    mesError.value = error.response.data

    items.value = []
  } finally {
    isLoading.value = false
  }
}

const onChangeSelect = (evt) => {
  filters.filterSort = evt.target.value
}

const onChangeInput = debounce((evt) => {
  filters.searchQuery = evt.target.value
}, 500)

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeCart(item)
  }
}

watch(cart, () => {
  items.value = items.value.map((item) => ({ ...item, isAdded: false }))
})

watch(filters, fetchItem)

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItem()

  items.value = items.value.map((item) => {
    return {
      ...item,
      isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
    }
  })
  // await fetchFavorites()
})
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="font-bold text-3xl mb-8">All sneakers</h2>
    <div class="flex gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="title">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="priceUp">По цене (дорогие)</option>
      </select>

      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
        <input
          name="title"
          @input="onChangeInput"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          placeholder="Search..."
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardList :items="items" @addToFavorite="addToFavorite" @add-to-cart="onClickAddPlus" />
    <!-- <CardList :items="items" @add-to-cart="onClickAddPlus" /> -->
    <div v-if="!isLoading && !items.length">
      <p>{{ mesError }}</p>
    </div>
  </div>
</template>
