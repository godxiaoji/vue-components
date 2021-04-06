import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import StickyView from './StickyView.vue'

const _StickyView: SFCWithInstall<typeof StickyView> = Object.assign(
  StickyView,
  {
    install: function(app: App) {
      app.component(StickyView.name, StickyView)
    }
  }
)

export default _StickyView
