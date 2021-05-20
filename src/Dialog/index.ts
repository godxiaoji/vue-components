import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Dialog from './Dialog.vue'
import { ApiOptions, PopupHook } from '../apis/types'
import { showPopup } from '@/apis/Popup'

type ShowDialogOptions = {
  title?: string
  content: string
  maskClosable?: boolean
  showCancel?: boolean
  cancelText?: string
  confirmText?: string
} & ApiOptions

const showDialog = function (object: ShowDialogOptions) {
  return showPopup(object, 'showDialog', function (done) {
    const hook: PopupHook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: Dialog,
      hook
    }
  })
}

const _Dialog: SFCWithInstall<typeof Dialog> & {
  showDialog: typeof showDialog
} = Object.assign(Dialog, {
  install: function (app: App) {
    app.component(Dialog.name, Dialog)
  },
  showDialog
})

export default _Dialog
