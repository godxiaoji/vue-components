import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import PopDialog from '../Popover/PopDialog.vue'
import { ApiOptions, PopupHook } from '../apis/types'
import { showPopup } from '@/apis/Popup'
import { DomSelector } from '../helpers/types'
import { PlacementType } from '../hooks/types'

type ShowPopDialogOptions = {
  selector: DomSelector
  content: string
  placement?: PlacementType
  showCancel?: boolean
  cancelText?: string
  confirmText?: string
} & ApiOptions

const showPopDialog = function(object: ShowPopDialogOptions) {
  return showPopup(object, 'showPopDialog', function(done) {
    const hook: PopupHook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: PopDialog,
      hook
    }
  })
}

const _PopDialog: SFCWithInstall<typeof PopDialog> = Object.assign(PopDialog, {
  install: function(app: App) {
    app.component(PopDialog.name, PopDialog)

    const properties = app.config.globalProperties

    properties.$showPopDialog = showPopDialog
  },
  showPopDialog
})

export default _PopDialog
