import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import Switch from './Switch.vue'

const _Switch: SFCWithInstall<typeof Switch> = Object.assign(Switch, {
  install: function(app: App) {
    app.component(Switch.name, Switch)
  }
})

export default _Switch
