import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import CheckboxGroup from '../Checkbox/CheckboxGroup.vue'

const _CheckboxGroup: SFCWithInstall<typeof CheckboxGroup> = Object.assign(
  CheckboxGroup,
  {
    install: function(app: App) {
      app.component(CheckboxGroup.name, CheckboxGroup)
    }
  }
)

export default _CheckboxGroup
