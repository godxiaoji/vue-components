import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import CountDown from './CountDown.vue'

const _CountDown: SFCWithInstall<typeof CountDown> = Object.assign(CountDown, {
  install: function(app: App) {
    app.component(CountDown.name, CountDown)
  }
})

export default _CountDown
