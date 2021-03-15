import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import ScrollTab from '../Tab/ScrollTab.vue'

const _ScrollTab: SFCWithInstall<typeof ScrollTab> = Object.assign(ScrollTab, {
  install: function(app: App) {
    app.component(ScrollTab.name, ScrollTab)
  }
})

export default _ScrollTab
