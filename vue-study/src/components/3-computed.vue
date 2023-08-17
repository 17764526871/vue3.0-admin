<template>
    <h1>计算属性</h1>
    <p>Has published books:</p>
    <span>{{ publishedBooksMessage }}</span>
</template>

<script setup lang='ts'>
import { computed, reactive } from 'vue'

const author = reactive({
    name: 'John Doe',
    books: [
        'Vue 2 - Advanced Guide',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
    ]
})
// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<style></style>