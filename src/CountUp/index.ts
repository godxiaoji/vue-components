import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import CountUp from './CountUp.vue'

const _CountUp: SFCWithInstall<typeof CountUp> = Object.assign(CountUp, {
  install: function(app: App) {
    app.component(CountUp.name, CountUp)
  }
})

export default _CountUp
