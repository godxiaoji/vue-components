import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import PickerPopup from '../Picker/PickerPopup.vue'
import { ApiOptions } from '../apis/types'
import { showPopup } from '@/apis/Popup'
import { PopupHook } from '../apis/types'
import {
  ModeNames,
  UserFieldNames,
  ModelValue,
  UserOptionItem
} from '../Picker/types'

type ShowPickerOptions = {
  title?: string
  value?: ModelValue
  options: UserOptionItem[] | UserOptionItem[][]
  mode?: ModeNames
  fieldNames?: UserFieldNames
} & ApiOptions

const showPicker = function(object: ShowPickerOptions) {
  return showPopup(object, 'showPicker', function(done) {
    const hook: PopupHook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: PickerPopup,
      hook
    }
  })
}

const _PickerPopup: SFCWithInstall<typeof PickerPopup> = Object.assign(
  PickerPopup,
  {
    install: function(app: App) {
      app.component(PickerPopup.name, PickerPopup)

      const properties = app.config.globalProperties

      properties.$showPicker = showPicker
    },
    showPicker
  }
)

export default _PickerPopup
