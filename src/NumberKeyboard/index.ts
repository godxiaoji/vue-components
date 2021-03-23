import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import NumberKeyboard from './NumberKeyboard.vue'

const _NumberKeyboard: SFCWithInstall<typeof NumberKeyboard> = Object.assign(
  NumberKeyboard,
  {
    install: function(app: App) {
      app.component(NumberKeyboard.name, NumberKeyboard)
    }
  }
)

export default _NumberKeyboard
