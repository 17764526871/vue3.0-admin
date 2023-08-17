<template>
    <h1>响应式基础</h1>
    <div class="red"> {{ count }}</div>
    <button @click="handlerClick">{{ count }}</button>
    <button @click="state.countb++">{{ state.countb }}</button>
</template>

<script setup lang="ts">

import { ref, nextTick, reactive } from 'vue';

const count = ref(0);

console.log(count) // { value: 0 }
console.log(count.value) // 0
count.value++
console.log(count.value) // 1F

const handlerClick = () => {
    count.value++
}
// Ref 可以持有任何类型的值，包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构，比如 Map。

// Ref 会使它的值具有深层响应性。这意味着即使改变嵌套对象或数组时，变化也会被检测到：
const objectRef = ref({
    nested: { count: 0 },
    arr: ['foo', 'bar']
})
function mutatrDeeply() {
    objectRef.value.nested.count++
    objectRef.value.arr.push('baz')
}
// Dom 更新时机
//要等待 DOM 更新完成后再执行额外的代码，可以使用 nextTick() 全局 API：
async function increment() {
    count.value++
    await nextTick()
    // dom 已经更新完毕
}

// reactive()
const state = reactive({ countb: 0 })
//值得注意的是，reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的：
const raw = {}
const proxy = reactive(raw)
// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true
// const proxy2 = reactive({})
// const raw2 = {}
// proxy2.nested = raw
// console.log(proxy2.nested === raw) // false


// reactive 局限性
// 1 有限的值类型：只能用于对象类型
// 2 不能替代整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。
let state1 = reactive({ count: 0 })

// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state1 = reactive({ count: 1 })
// 3 对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：


</script>

<style scoped>
.red {
    font-size: 24px;
    color: red
}
</style>