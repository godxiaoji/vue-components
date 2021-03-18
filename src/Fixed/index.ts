import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Fixed from './Fixed.vue'

const _Fixed: SFCWithInstall<typeof Fixed> = Object.assign(Fixed, {
  install: function(app: App) {
    app.component(Fixed.name, Fixed)
  }
})

export default _Fixed
