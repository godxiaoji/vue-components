import PopMenu from '../Popover/PopMenu.vue'
import { showPopMenu } from '../apis/Popup'

PopMenu.install = function(app) {
  app.component(PopMenu.name, PopMenu)

  // 添加api
  app.config.globalProperties.$showPopMenu = showPopMenu
}

PopMenu.showPopMenu = showPopMenu

export default PopMenu
