<template>
    <h1>监听器</h1>
</template>

<script  setup lang="ts">
import { reactive, ref, watch, watchEffect, watchPostEffect } from 'vue'
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
    console.log(`x is ${newX}`)
})

// getter 函数
watch(
    () => x.value + y.value,
    (sum) => {
        console.log(`sum of x + y is: ${sum}`)
    }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
    console.log(`x is ${newX} and y is ${newY}`)
})
const obj = reactive({ count: 0 })

// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
//加上 deep 选项，强制转成深层侦听器
// watch(
//   () => state.someObject,
//   (newValue, oldValue) => {
//     // 注意：`newValue` 此处和 `oldValue` 是相等的
//     // *除非* state.someObject 被整个替换了
//   },
//   { deep: true }
// )


// watch 默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。举例来说，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。

// 我们可以通过传入 immediate: true 选项来强制侦听器的回调立即执行：
const source= ref(0)
watch(source, (newValue, oldValue) => {
  // 立即执行，且当 `source` 改变时再次执行
}, { immediate: true })

const todoId = ref(1)
const data = ref(null)

watch(todoId, async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
}, { immediate: true })
//优化为
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
// watch vs. watchEffect
// watch 和 watchEffect 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

// watch 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，
// 仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。

// watchEffect，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。
// 这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

//如果想访问vue更新后的dom 可以使用watchPostEffect
watchPostEffect(()=>{
    /* 在 Vue 更新后执行 */
})
//要手动停止一个侦听器，请调用 watch 或 watchEffect 返回的函数：
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
</script>

<style></style>