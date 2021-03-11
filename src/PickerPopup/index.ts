import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import PickerPopup from '../Picker/PickerPopup.vue'
import { showPicker } from '../apis/Popup'

const _PickerPopup: SFCWithInstall<typeof PickerPopup> = Object.assign(
  PickerPopup,
  {
    install: function(app: App) {
      app.component(PickerPopup.name, PickerPopup)

      const properties = app.config.globalProperties

      properties.$showPicker = showPicker
    },
    showPicker
  }
)

export default _PickerPopup
