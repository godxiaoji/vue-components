import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import ActivityIndicator from './ActivityIndicator.vue'

const _ActivityIndicator: SFCWithInstall<typeof ActivityIndicator> = Object.assign(
  ActivityIndicator,
  {
    install: function(app: App) {
      app.component(ActivityIndicator.name, ActivityIndicator)
    }
  }
)

export default _ActivityIndicator
