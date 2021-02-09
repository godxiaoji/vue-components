import PopMenu from '../Popover/PopMenu.vue'
import { showPopMenu } from '../apis/Popup'

PopMenu.install = function(Vue) {
  Vue.component(PopMenu.name, PopMenu)

  // 添加api
  Vue.prototype.$showPopMenu = showPopMenu
}

PopMenu.showPopMenu = showPopMenu

export default PopMenu
