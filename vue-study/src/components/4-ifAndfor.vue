<template>
    <h1>条件渲染</h1>
    <button @click="awesome = !awesome">Toggle</button>
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1>
    <!-- v-show -->
    <h1 v-show="ok">Hello!</h1>
    <!-- 列表渲染 -->
    <h1>列表渲染</h1>
    <li v-for="item, index in items" :key="index">
        {{ parentMessage }} - {{ index }} - {{ item.message }}
    </li>
    <!-- v-for 和对象 -->
    <ul>
        <li v-for="(value, key, index) in myObject" :key="key">
            {{ value }}-{{ key }}-{{ index }}
        </li>
    </ul>
    <!--  -->
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const awesome = ref(true)
const ok = ref(true)
/**
 * v-if vs. v-show
 * 
 * v-if 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。
 * 
 * v-if 也是惰性的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。
 * 相比之下，v-show 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS display 属性会被切换。
 * 总的来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 v-show 较好；如果在运行时绑定条件很少改变，则 v-if 会更合适。
 */
const parentMessage = ref('parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
const myObject = reactive({
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
})
</script>

<style></style>