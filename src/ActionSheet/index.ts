import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import ActionSheet from './ActionSheet.vue'
import { showPopup } from '@/apis/Popup'
import { ActionSheetItem } from './types'
import { ApiOptions, PopupHook } from '../apis/types'

type ShowActionSheetOptions = {
  title?: string
  showCancel?: boolean
  cancelText?: string
  options: ActionSheetItem[]
} & ApiOptions

const showActionSheet = function (object: ShowActionSheetOptions) {
  return showPopup(object, 'showActionSheet', function (done) {
    const hook: PopupHook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: ActionSheet,
      hook
    }
  })
}

const _ActionSheet: SFCWithInstall<typeof ActionSheet> & {
  showActionSheet: typeof showActionSheet
} = Object.assign(ActionSheet, {
  install: function (app: App) {
    app.component(ActionSheet.name, ActionSheet)
  },
  showActionSheet
})

export default _ActionSheet
