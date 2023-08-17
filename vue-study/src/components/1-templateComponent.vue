<template>
  <div>
    <h1>模版语法</h1>
    <span> massage: {{ msg }}</span>
    <!-- V-HTMAL -->
    <span v-html="rawHtml"></span>
    <!-- v-bind -->
    <div :id="dynamicId"></div>
    <!-- boolean v-bind  -->
    <div :disabled="true">boolean v-bind </div>
    <!-- object v-bind  -->
    <div v-bind="objectAttrs">object v-bind</div>
    <!-- 指令 -->
    <p v-if="seen"></p>
    <a @click="url">a标签</a>
    <!-- 动态参数 -->
    <a :[attrName]="url" @[eventName]="handler">动态参数</a>
    <!-- 修饰符 -->
    <form @submit.prevent="onSubmit"></form>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const msg = ref('msg');
const rawHtml = '<p> 这是p标签</p>';
const dynamicId = "id";
const objectAttrs = {
  id: 'id',
  class: 'className'
}
const seen = true;
const url = () => {
  console.log('a')
}
const attrName = 'attrName';
const eventName = "eventName";
const handler = () => {
  console.log('handler')
}
const onSubmit = () => {
  console.log('onSubmit')
}

</script>

<style></style>