import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import ActionSheet from './ActionSheet.vue'
import { showPopup, PopupHook } from '@/apis/Popup'
import type { ActionSheetItem } from './types'
import type { ApiOptions } from '../apis/types'

type ShowActionSheetOptions = {
  title?: string
  showCancel?: boolean
  cancelText?: string
  options: ActionSheetItem[]
} & ApiOptions

const showActionSheet = function(object: ShowActionSheetOptions) {
  return showPopup(object, 'showActionSheet', function(done) {
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

const _ActionSheet: SFCWithInstall<typeof ActionSheet> = Object.assign(
  ActionSheet,
  {
    install: function(app: App) {
      app.component(ActionSheet.name, ActionSheet)

      const properties = app.config.globalProperties

      properties.$showActionSheet = showActionSheet
    },
    showActionSheet
  }
)

export default _ActionSheet
