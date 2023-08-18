import type { App } from 'vue'
import * as components from './components'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const install = function (app: App) {
  Object.entries(components).forEach(([key, value]) => {
    app.component(key, value)
  })
  for (const [key, comment] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, comment)
  }
}

export default install
export * from './components'
