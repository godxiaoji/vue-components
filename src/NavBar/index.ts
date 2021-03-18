import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import NavBar from './NavBar.vue'

const _NavBar: SFCWithInstall<typeof NavBar> = Object.assign(NavBar, {
  install: function(app: App) {
    app.component(NavBar.name, NavBar)
  }
})

export default _NavBar
