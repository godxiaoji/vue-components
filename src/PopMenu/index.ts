import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import PopMenu from '../Popover/PopMenu.vue'
import { ApiOptions, PopupHook } from '../apis/types'
import { showPopup } from '@/apis/Popup'
import { DomSelector } from '../helpers/types'
import { PlacementType } from '../hooks/types'
import { OptionItem } from '../Popover/types'

type ShowPopMenuOptions = {
  selector: DomSelector
  options: OptionItem[]
  placement?: PlacementType
} & ApiOptions

const showPopMenu = function (object: ShowPopMenuOptions) {
  return showPopup(object, 'showPopMenu', function (done) {
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

const _PopMenu: SFCWithInstall<typeof PopMenu> & {
  showPopMenu: typeof showPopMenu
} = Object.assign(PopMenu, {
  install: function (app: App) {
    app.component(PopMenu.name, PopMenu)
  },
  showPopMenu
})

export default _PopMenu
