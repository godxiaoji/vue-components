import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Popover from './Popover.vue'
import type { ApiOptions } from '../apis/types'
import { showPopup, PopupHook } from '@/apis/Popup'
import type { DomSelector } from '../helpers/types'
import type { PlacementType } from '../hooks/constants'

type ShowPopoverOptions = {
  selector: DomSelector
  content?: string
  placement?: PlacementType
} & ApiOptions

const showPopover = function(object: ShowPopoverOptions) {
  return showPopup(object, 'showPopover', function(done) {
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

const _Popover: SFCWithInstall<typeof Popover> = Object.assign(Popover, {
  install: function(app: App) {
    app.component(Popover.name, Popover)

    const properties = app.config.globalProperties

    properties.$showPopover = showPopover
  },
  showPopover
})

export default _Popover
