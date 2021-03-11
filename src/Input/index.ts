import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import Input from './Input.vue'

const _Input: SFCWithInstall<typeof Input> = Object.assign(Input, {
  install: function(app: App) {
    app.component(Input.name, Input)
  }
})

export default _Input
