import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import TimeAgo from './TimeAgo.vue'

const _TimeAgo: SFCWithInstall<typeof TimeAgo> = Object.assign(TimeAgo, {
  install: function(app: App) {
    app.component(TimeAgo.name, TimeAgo)
  }
})

export default _TimeAgo
