import Dialog from './Dialog.vue'
import { showDialog } from '../apis/Popup'

Dialog.install = function(Vue) {
  Vue.component(Dialog.name, Dialog)

  // 添加api
  Vue.prototype.$showDialog = showDialog
}

Dialog.showDialog = showDialog

export default Dialog
