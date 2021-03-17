import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import ScrollView from './ScrollView.vue'

const _ScrollView: SFCWithInstall<typeof ScrollView> = Object.assign(
  ScrollView,
  {
    install: function(app: App) {
      app.component(ScrollView.name, ScrollView)
    }
  }
)

export default _ScrollView
