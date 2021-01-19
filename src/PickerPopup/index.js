import PickerPopup from '../Picker/Popup.vue'
import { showPicker } from '../apis/Popup'

PickerPopup.install = function(app) {
  app.component(PickerPopup.name, PickerPopup)

  // 添加api
  app.config.globalProperties.$showPicker = showPicker
}

PickerPopup.showPicker = showPicker

export default PickerPopup
