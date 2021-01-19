import PopDialog from '../Popover/Dialog.vue'
import { showPopDialog } from '../apis/Popup'

PopDialog.install = function(app) {
  app.component(PopDialog.name, PopDialog)

  // 添加api
  app.config.globalProperties.$showPopDialog = showPopDialog
}

PopDialog.showPopDialog = showPopDialog

export default PopDialog
