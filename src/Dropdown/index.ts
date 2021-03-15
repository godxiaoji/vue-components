import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Dropdown from './Dropdown.vue'

const _Dropdown: SFCWithInstall<typeof Dropdown> = Object.assign(Dropdown, {
  install: function(app: App) {
    app.component(Dropdown.name, Dropdown)
  }
})

export default _Dropdown
