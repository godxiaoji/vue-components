import PickerPopup from '../Picker/Popup.vue'
import { showPicker } from '../apis/Popup'

PickerPopup.install = function(Vue) {
  Vue.component(PickerPopup.name, PickerPopup)

  // 添加api
  Vue.prototype.$showPicker = showPicker
}

export default PickerPopup
