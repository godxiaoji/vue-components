import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Cascader from './Cascader.vue'
import CascaderPopup from '@/CascaderPopup'

const _Cascader: SFCWithInstall<typeof Cascader> & {
  showCascader: typeof CascaderPopup.showCascader
} = Object.assign(Cascader, {
  install: function (app: App) {
    app.component(Cascader.name, Cascader)
  },
  showCascader: CascaderPopup.showCascader
})

export default _Cascader
