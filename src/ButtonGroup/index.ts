import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import ButtonGroup from '../Button/ButtonGroup.vue'

const _ButtonGroup: SFCWithInstall<typeof ButtonGroup> = Object.assign(
  ButtonGroup,
  {
    install: function(app: App) {
      app.component(ButtonGroup.name, ButtonGroup)
    }
  }
)

export default _ButtonGroup
