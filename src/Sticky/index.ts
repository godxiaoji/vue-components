import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import Sticky from './Sticky.vue'

const _Sticky: SFCWithInstall<typeof Sticky> = Object.assign(Sticky, {
  install: function(app: App) {
    app.component(Sticky.name, Sticky)
  }
})

export default _Sticky
