import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import IndexView from './IndexView.vue'

const _IndexView: SFCWithInstall<typeof IndexView> = Object.assign(IndexView, {
  install: function(app: App) {
    app.component(IndexView.name, IndexView)
  }
})

export default _IndexView
