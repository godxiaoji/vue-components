import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Stopwatch from './Stopwatch.vue'

const _Stopwatch: SFCWithInstall<typeof Stopwatch> = Object.assign(Stopwatch, {
  install: function(app: App) {
    app.component(Stopwatch.name, Stopwatch)
  }
})

export default _Stopwatch
