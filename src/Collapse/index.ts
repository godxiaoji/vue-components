import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Collapse from './Collapse.vue'

const _Collapse: SFCWithInstall<typeof Collapse> = Object.assign(Collapse, {
  install: function(app: App) {
    app.component(Collapse.name, Collapse)
  }
})

export default _Collapse
