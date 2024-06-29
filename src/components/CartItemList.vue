<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeCart } = inject('cart')
</script>

<template>
  <div class="flex flex-col gap-5" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :img-url="item.imageUrl"
      :price="item.price"
      @on-click-remove="() => removeCart(item)"
    />
  </div>
</template>
