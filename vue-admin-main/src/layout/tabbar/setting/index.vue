<template>
  <div class="settings-button">
    <el-button circle size="small" :icon="Refresh" @click="updateRefsh" />
    <el-button circle size="small" :icon="FullScreen" @click="fullScreen" />
    <el-popover
      placement="bottom"
      title="主题设置"
      :width="200"
      trigger="hover"
    >
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            v-model="color"
            show-alpha
            :predefine="predefineColors"
            size="small"
            @change="setColor"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="dark"
            size="small"
            inline-prompt
            active-icon="MoonNight"
            inactive-icon="Sunny"
            @change="changeDark"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button circle size="small" :icon="Setting" />
      </template>
    </el-popover>

    <img
      src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
      alt=""
    />

    <el-dropdown>
      <span class="el-dropdown-link" style="cursor: pointer">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import {
  Refresh,
  Setting,
  FullScreen,
  ArrowDown,
} from '@element-plus/icons-vue'
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
let layoutSettingStore = useLayOutSettingStore()
let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore()
//刷新页面
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}
// 切换全屏
const fullScreen = () => {
  console.log(userStore.avatar)
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// color
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
let dark = ref<boolean>(false)
const setColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
const changeDark = () => {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}

// 登出逻辑
const logout = async () => {
  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style lang="scss" scope>
.settings-button {
  text-align: center;
  display: flex;
  line-height: 60px;
  vertical-align: middle;

  img {
    width: 24px;
    height: 24px;
    border-radius: 20px;
    margin: 0 10px;
  }
}
</style>
