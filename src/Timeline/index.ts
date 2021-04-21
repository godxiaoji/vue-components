import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Timeline from './Timeline.vue'

const _Timeline: SFCWithInstall<typeof Timeline> = Object.assign(Timeline, {
  install: function(app: App) {
    app.component(Timeline.name, Timeline)
  }
})

export default _Timeline
