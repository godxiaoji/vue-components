import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import SideTab from './SideTab.vue'

const _SideTab: SFCWithInstall<typeof SideTab> = Object.assign(SideTab, {
  install: function(app: App) {
    app.component(SideTab.name, SideTab)
  }
})

export default _SideTab
