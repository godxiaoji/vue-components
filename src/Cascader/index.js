import Cascader from './Cascader.vue'
import { showCascader } from '../apis/Popup'

Cascader.install = function(Vue) {
  Vue.component(Cascader.name, Cascader)

  // 添加api
  Vue.prototype.$showCascader = showCascader
}

export default Cascader
