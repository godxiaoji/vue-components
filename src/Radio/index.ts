import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Radio from './Radio.vue'

const _Radio: SFCWithInstall<typeof Radio> = Object.assign(Radio, {
  install: function(app: App) {
    app.component(Radio.name, Radio)
  }
})

export default _Radio
