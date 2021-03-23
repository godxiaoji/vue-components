import CascaderPopup from '../Cascader/CascaderPopup.vue'
import { showCascader } from '../apis/Popup'

CascaderPopup.install = function(Vue) {
  Vue.component(CascaderPopup.name, CascaderPopup)

  // 添加api
  Vue.prototype.$showCascader = showCascader
}

CascaderPopup.showCascader = showCascader

export default CascaderPopup
