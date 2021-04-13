import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Step from '../Steps/Step.vue'

const _Step: SFCWithInstall<typeof Step> = Object.assign(Step, {
  install: function(app: App) {
    app.component(Step.name, Step)
  }
})

export default _Step
