import ActionSheet from './ActionSheet.vue'
import { showActionSheet } from '../apis/Popup'

ActionSheet.install = function(app) {
  app.component(ActionSheet.name, ActionSheet)

  // 添加api
  app.config.globalProperties.$showActionSheet = showActionSheet
}

ActionSheet.showActionSheet = showActionSheet

export default ActionSheet
