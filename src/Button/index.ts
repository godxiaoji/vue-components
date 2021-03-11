import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import Button from './Button.vue'

const _Button: SFCWithInstall<typeof Button> = Object.assign(Button, {
  install: function(app: App) {
    app.component(Button.name, Button)
  }
})

export default _Button
