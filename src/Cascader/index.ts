import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Cascader from './Cascader.vue'

const _Cascader: SFCWithInstall<typeof Cascader> = Object.assign(Cascader, {
  install: function(app: App) {
    app.component(Cascader.name, Cascader)
  }
})

export default _Cascader
