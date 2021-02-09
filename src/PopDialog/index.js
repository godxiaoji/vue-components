import PopDialog from '../Popover/PopDialog.vue'
import { showPopDialog } from '../apis/Popup'

PopDialog.install = function(Vue) {
  Vue.component(PopDialog.name, PopDialog)

  // 添加api
  Vue.prototype.$showPopDialog = showPopDialog
}

PopDialog.showPopDialog = showPopDialog

export default PopDialog
