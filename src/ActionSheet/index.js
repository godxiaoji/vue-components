import ActionSheet from './ActionSheet.vue'
import { showActionSheet } from '../apis/Popup'

ActionSheet.install = function(Vue) {
  Vue.component(ActionSheet.name, ActionSheet)

  // 添加api
  Vue.prototype.$showActionSheet = showActionSheet
}

ActionSheet.showActionSheet = showActionSheet

export default ActionSheet
