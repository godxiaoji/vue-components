import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import CircleProgress from './CircleProgress.vue'

const _CircleProgress: SFCWithInstall<typeof CircleProgress> = Object.assign(
  CircleProgress,
  {
    install: function(app: App) {
      app.component(CircleProgress.name, CircleProgress)
    }
  }
)

export default _CircleProgress
