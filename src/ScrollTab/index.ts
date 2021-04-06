import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import ScrollTab from './ScrollTab.vue'

const _ScrollTab: SFCWithInstall<typeof ScrollTab> = Object.assign(ScrollTab, {
  install: function(app: App) {
    app.component(ScrollTab.name, ScrollTab)
  }
})

export default _ScrollTab
