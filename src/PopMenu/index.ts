import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import PopMenu from '../Popover/PopMenu.vue'
import type { ApiOptions } from '../apis/types'
import { showPopup, PopupHook } from '@/apis/Popup'
import type { DomSelector } from '../helpers/types'
import type { PlacementType } from '../hooks/constants'
import type { OptionItem } from '../Popover/types'

type ShowPopMenuOptions = {
  selector: DomSelector
  options: OptionItem[]
  placement?: PlacementType
} & ApiOptions

const showPopMenu = function(object: ShowPopMenuOptions) {
  return showPopup(object, 'showPopMenu', function(done) {
    const hook: PopupHook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: PopMenu,
      hook
    }
  })
}

const _PopMenu: SFCWithInstall<typeof PopMenu> = Object.assign(PopMenu, {
  install: function(app: App) {
    app.component(PopMenu.name, PopMenu)

    const properties = app.config.globalProperties

    properties.$showPopMenu = showPopMenu
  },
  showPopMenu
})

export default _PopMenu
