import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import BackTop from './BackTop.vue'

const _BackTop: SFCWithInstall<typeof BackTop> = Object.assign(BackTop, {
  install: function(app: App) {
    app.component(BackTop.name, BackTop)
  }
})

export default _BackTop
