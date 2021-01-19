import Picker from './Picker.vue'
import { showPicker } from '../apis/Popup'

Picker.install = function(app) {
  app.component(Picker.name, Picker)

  // 添加api
  app.config.globalProperties.$showPicker = showPicker
}

Picker.showPicker = showPicker

export default Picker
