import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import TabBar from './TabBar.vue'

const _TabBar: SFCWithInstall<typeof TabBar> = Object.assign(TabBar, {
  install: function(app: App) {
    app.component(TabBar.name, TabBar)
  }
})

export default _TabBar
