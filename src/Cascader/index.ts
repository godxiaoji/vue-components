import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import Cascader from './Cascader.vue'
import { showCascader } from '../apis/Popup'

const _Cascader: SFCWithInstall<typeof Cascader> = Object.assign(Cascader, {
  install: function(app: App) {
    app.component(Cascader.name, Cascader)

    const properties = app.config.globalProperties

    properties.$showCascader = showCascader
  },
  showCascader
})

export default _Cascader
