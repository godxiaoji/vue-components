import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Popover from './Popover.vue'
import { ApiOptions, PopupHook } from '../apis/types'
import { showPopup } from '@/apis/Popup'
import { DomSelector } from '../helpers/types'
import { PlacementType } from '../hooks/types'

type ShowPopoverOptions = {
  selector: DomSelector
  content?: string
  placement?: PlacementType
} & ApiOptions

const showPopover = function (object: ShowPopoverOptions) {
  return showPopup(object, 'showPopover', function (done) {
    const hook: PopupHook = (hookName, res) => {
      if (hookName === 'afterShow') {
        done(res)
      }
    }

    return {
      component: Popover,
      hook
    }
  })
}

const _Popover: SFCWithInstall<typeof Popover> & {
  showPopover: typeof showPopover
} = Object.assign(Popover, {
  install: function (app: App) {
    app.component(Popover.name, Popover)
  },
  showPopover
})

export default _Popover
