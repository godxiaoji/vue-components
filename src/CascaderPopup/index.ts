import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import CascaderPopup from '../Cascader/CascaderPopup.vue'
import { showCascader } from '@/apis/Popup'

const _CascaderPopup: SFCWithInstall<typeof CascaderPopup> = Object.assign(
  CascaderPopup,
  {
    install: function(app: App) {
      app.component(CascaderPopup.name, CascaderPopup)

      const properties = app.config.globalProperties

      properties.$showCascader = showCascader
    },
    showCascader
  }
)

export default _CascaderPopup
