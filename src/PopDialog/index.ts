import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import PopDialog from '../Popover/PopDialog.vue'
import { ApiOptions, PopupConfirmArgs } from '../apis/types'
import { createConfirmHook, showPopup } from '@/apis/Popup'
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

const showPopDialog = function (object: ShowPopDialogOptions) {
  return showPopup<PopupConfirmArgs>(object, 'showPopDialog', function (done) {
    return {
      component: PopDialog,
      hook: createConfirmHook(done)
    }
  })
}

const _PopDialog: SFCWithInstall<typeof PopDialog> & {
  showPopDialog: typeof showPopDialog
} = Object.assign(PopDialog, {
  install: function (app: App) {
    app.component(PopDialog.name, PopDialog)
  },
  showPopDialog
})

export default _PopDialog
