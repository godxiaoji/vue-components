import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Drawer from './Drawer.vue'

const _Drawer: SFCWithInstall<typeof Drawer> = Object.assign(Drawer, {
  install: function(app: App) {
    app.component(Drawer.name, Drawer)
  }
})

export default _Drawer
