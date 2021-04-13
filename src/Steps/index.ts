import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Steps from './Steps.vue'

const _Steps: SFCWithInstall<typeof Steps> = Object.assign(Steps, {
  install: function(app: App) {
    app.component(Steps.name, Steps)
  }
})

export default _Steps
