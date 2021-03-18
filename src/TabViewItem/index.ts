import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import TabViewItem from '../Tab/TabViewItem.vue'

const _TabViewItem: SFCWithInstall<typeof TabViewItem> = Object.assign(
  TabViewItem,
  {
    install: function(app: App) {
      app.component(TabViewItem.name, TabViewItem)
    }
  }
)

export default _TabViewItem
