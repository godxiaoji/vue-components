import Dialog from './Dialog.vue'
import { showDialog } from '../apis/Popup'

Dialog.install = function(app) {
  app.component(Dialog.name, Dialog)

  // 添加api
  app.config.globalProperties.$showDialog = showDialog
}

Dialog.showDialog = showDialog

export default Dialog
