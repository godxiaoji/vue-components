import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Stepper from './Stepper.vue'

const _Stepper: SFCWithInstall<typeof Stepper> = Object.assign(Stepper, {
  install: function(app: App) {
    app.component(Stepper.name, Stepper)
  }
})

export default _Stepper
