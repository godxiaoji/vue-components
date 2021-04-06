import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import ScrollTabItem from '../ScrollTab/ScrollTabItem.vue'

const _ScrollTabItem: SFCWithInstall<typeof ScrollTabItem> = Object.assign(
  ScrollTabItem,
  {
    install: function(app: App) {
      app.component(ScrollTabItem.name, ScrollTabItem)
    }
  }
)

export default _ScrollTabItem
