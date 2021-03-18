import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import PopMenu from '../Popover/PopMenu.vue'
import { showPopMenu } from '@/apis/Popup'

const _PopMenu: SFCWithInstall<typeof PopMenu> = Object.assign(PopMenu, {
  install: function(app: App) {
    app.component(PopMenu.name, PopMenu)

    const properties = app.config.globalProperties

    properties.$showPopMenu = showPopMenu
  },
  showPopMenu
})

export default _PopMenu
