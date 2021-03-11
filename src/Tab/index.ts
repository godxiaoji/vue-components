import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import Tab from './Tab.vue'

const _Tab: SFCWithInstall<typeof Tab> = Object.assign(Tab, {
  install: function(app: App) {
    app.component(Tab.name, Tab)
  }
})

export default _Tab
