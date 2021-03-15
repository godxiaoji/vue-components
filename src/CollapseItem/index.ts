import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import CollapseItem from '../Collapse/CollapseItem.vue'

const _CollapseItem: SFCWithInstall<typeof CollapseItem> = Object.assign(
  CollapseItem,
  {
    install: function(app: App) {
      app.component(CollapseItem.name, CollapseItem)
    }
  }
)

export default _CollapseItem
