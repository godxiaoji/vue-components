import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Range from './Range.vue'

const _Range: SFCWithInstall<typeof Range> = Object.assign(Range, {
  install: function(app: App) {
    app.component(Range.name, Range)
  }
})

export default _Range
