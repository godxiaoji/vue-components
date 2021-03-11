import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import Divider from './Divider.vue'

const _Divider: SFCWithInstall<typeof Divider> = Object.assign(Divider, {
  install: function(app: App) {
    app.component(Divider.name, Divider)
  }
})

export default _Divider
