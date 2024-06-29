<script setup>
const emit = defineEmits(['onClickRemove'])
defineProps({
  id: String,
  title: String,
  price: Number,
  imgUrl: String
})
</script>

<template>
  <div class="flex items-center border rounded-xl border-slate-300 p-4 gap-4">
    <img class="w-16 h-16" :src="imgUrl" :alt="title" />

    <div class="flex flex-1 flex-col">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b class="flex flex-1">{{ price }}UAH</b>
        <img
          @click="() => emit('onClickRemove')"
          src="/close.svg"
          alt="Close"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
        />
      </div>
    </div>
  </div>
</template>
