import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import SideTab from '../Tab/SideTab.vue'

const _SideTab: SFCWithInstall<typeof SideTab> = Object.assign(SideTab, {
  install: function(app: App) {
    app.component(SideTab.name, SideTab)
  }
})

export default _SideTab
