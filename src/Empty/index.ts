import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Empty from './Empty.vue'

const _Empty: SFCWithInstall<typeof Empty> = Object.assign(Empty, {
  install: function(app: App) {
    app.component(Empty.name, Empty)
  }
})

export default _Empty
