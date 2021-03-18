import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import RadioGroup from '../Radio/RadioGroup.vue'

const _RadioGroup: SFCWithInstall<typeof RadioGroup> = Object.assign(
  RadioGroup,
  {
    install: function(app: App) {
      app.component(RadioGroup.name, RadioGroup)
    }
  }
)

export default _RadioGroup
