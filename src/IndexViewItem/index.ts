import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import IndexViewItem from '../IndexView/IndexViewItem.vue'

const _IndexViewItem: SFCWithInstall<typeof IndexViewItem> = Object.assign(
  IndexViewItem,
  {
    install: function(app: App) {
      app.component(IndexViewItem.name, IndexViewItem)
    }
  }
)

export default _IndexViewItem
