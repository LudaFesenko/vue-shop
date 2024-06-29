<script setup>
import CardVue from './CardVue.vue'

defineProps({
  items: Array,
  isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <CardVue
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :price="item.price"
      :title="item.title"
      :imgUrl="item.imageUrl"
      :onClickAdded="isFavorites ? null : () => emit('addToCart', item)"
      :isFavorite="item.isFavorite"
      :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :isAdded="item.isAdded"
    />
  </div>
</template>
