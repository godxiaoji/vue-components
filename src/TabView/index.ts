import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import TabView from '../Tab/TabView.vue'

const _TabView: SFCWithInstall<typeof TabView> = Object.assign(TabView, {
  install: function(app: App) {
    app.component(TabView.name, TabView)
  }
})

export default _TabView
