import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import Picker from './Picker.vue'
import { showPicker } from '../apis/Popup'

const _Picker: SFCWithInstall<typeof Picker> = Object.assign(
  Picker,
  {
    install: function(app: App) {
      app.component(Picker.name, Picker)

      const properties = app.config.globalProperties

      properties.$showPicker = showPicker
    },
    showPicker
  }
)

export default _Picker
