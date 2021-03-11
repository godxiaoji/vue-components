import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import Progress from './Progress.vue'

const _Progress: SFCWithInstall<typeof Progress> = Object.assign(Progress, {
  install: function(app: App) {
    app.component(Progress.name, Progress)
  }
})

export default _Progress
