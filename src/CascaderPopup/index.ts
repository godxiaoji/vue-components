import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import CascaderPopup from '../Cascader/CascaderPopup.vue'
import { ApiOptions, PopupHook } from '../apis/types'
import { showPopup } from '@/apis/Popup'
import {
  ModeNames,
  UserFieldNames,
  ModelValue,
  UserOptionItem
} from '@/Picker/types'

type ShowCascaderOptions = {
  title?: string
  value?: ModelValue
  options: UserOptionItem[]
  mode?: ModeNames
  fieldNames?: UserFieldNames
} & ApiOptions

const showCascader = function (object: ShowCascaderOptions) {
  return showPopup(object, 'showCascader', function (done) {
    const hook: PopupHook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: CascaderPopup,
      hook
    }
  })
}

const _CascaderPopup: SFCWithInstall<typeof CascaderPopup> & {
  showCascader: typeof showCascader
} = Object.assign(CascaderPopup, {
  install: function (app: App) {
    app.component(CascaderPopup.name, CascaderPopup)
  },
  showCascader
})

export default _CascaderPopup
