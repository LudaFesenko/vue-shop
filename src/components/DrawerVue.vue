<script setup>
import { inject, ref, computed } from 'vue'
import axios from 'axios'

import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})
const isCreatingOrder = ref(false)
const orderId = ref(null)

const { cart, closeDriver } = inject('cart')

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value
    })

    cart.value = []

    orderId.value = data.id
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}
const cartIsEmpty = computed(() => cart.value.length === 0)
const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div class="flex h-full items-center" v-if="!totalPrice || orderId">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пуста"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="/package-icon.png"
      />

      <InfoBlock
        v-if="orderId"
        image-url="/order-success-icon.png"
        title="Заказ оформлен!"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
      />
    </div>

    <div v-else>
      <CartItemList />

      <div class="flex flex-col gap-5 mt-6">
        <div class="flex gap-2 items-baseline">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} UAH</b>
        </div>

        <div class="flex gap-2 items-baseline">
          <span>ПДВ 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} UAH</b>
        </div>

        <button
          :disabled="cartButtonDisabled"
          @click="createOrder"
          class="mt-4 bg-lime-500 w-full rounded-xl py-3 transition text-white disabled:bg-slate-400 hover:bg-lime-600 active:bg-lime-800 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
