import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Rate from './Rate.vue'

const _Rate: SFCWithInstall<typeof Rate> = Object.assign(Rate, {
  install: function(app: App) {
    app.component(Rate.name, Rate)
  }
})

export default _Rate
