import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import StickyViewItem from '../Sticky/StickyViewItem.vue'

const _StickyViewItem: SFCWithInstall<typeof StickyViewItem> = Object.assign(
  StickyViewItem,
  {
    install: function(app: App) {
      app.component(StickyViewItem.name, StickyViewItem)
    }
  }
)

export default _StickyViewItem
