import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import Checkbox from './Checkbox.vue'

const _Checkbox: SFCWithInstall<typeof Checkbox> = Object.assign(Checkbox, {
  install: function(app: App) {
    app.component(Checkbox.name, Checkbox)
  }
})

export default _Checkbox
