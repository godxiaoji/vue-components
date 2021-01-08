import PopMenu from '../Popover/Menu.vue'
import { showPopMenu } from '../apis/Popup'

PopMenu.install = function(Vue) {
  Vue.component(PopMenu.name, PopMenu)

  // 添加api
  Vue.prototype.$showPopMenu = showPopMenu
}

export default PopMenu
