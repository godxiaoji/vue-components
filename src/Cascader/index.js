import Cascader from './Cascader.vue'
import { showCascader } from '../apis/Popup'

Cascader.install = function(app) {
  app.component(Cascader.name, Cascader)

  // 添加api
  app.config.globalProperties.$showCascader = showCascader
}

Cascader.showCascader = showCascader

export default Cascader
