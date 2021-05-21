import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import CascaderPopup from '../Cascader/CascaderPopup.vue'
import { ApiOptions, PopupConfirmArgs } from '../apis/types'
import { createConfirmHook, showPopup } from '@/apis/Popup'
import {
  ModeNames,
  UserFieldNames,
  ModelValue,
  UserOptionItem
} from '../Picker/types'

type ShowCascaderOptions = {
  title?: string
  value?: ModelValue
  options: UserOptionItem[]
  mode?: ModeNames
  fieldNames?: UserFieldNames
} & ApiOptions

const showCascader = function (object: ShowCascaderOptions) {
  return showPopup<PopupConfirmArgs>(object, 'showCascader', function (done) {
    return {
      component: CascaderPopup,
      hook: createConfirmHook(done)
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
