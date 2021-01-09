import Picker from './Picker.vue'
import { showPicker } from '../apis/Popup'

Picker.install = function(Vue) {
  Vue.component(Picker.name, Picker)

  // 添加api
  Vue.prototype.$showPicker = showPicker
}

Picker.showPicker = showPicker

export default Picker
