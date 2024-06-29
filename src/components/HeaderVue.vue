<script setup>
defineProps({
  totalPrice: Number
})
const emit = defineEmits(['openDriver'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-300 px-10 py-8">
    <RouterLink to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Light Snickers</h2>
          <p class="text-slate-400">Shop of the comfort shoes</p>
        </div>
      </div>
    </RouterLink>

    <ul class="flex items-center gap-10">
      <li
        class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
        @click="() => emit('openDriver')"
      >
        <img src="/cart.svg" alt="cart" />
        <b>{{ totalPrice }} UAH</b>
      </li>

      <RouterLink to="/favorites">
        <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
          <img src="/heart.svg" alt="cart" />
          <span>Закладки</span>
        </li>
      </RouterLink>
      <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
        <img src="/profile.svg" alt="cart" />
        <span>Profile</span>
      </li>
    </ul>
  </header>
</template>
