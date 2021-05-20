import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Notify from './Notify.vue'
import { showPopup, hidePopup } from '@/apis/Popup'
import { ApiOptions, PopupHook } from '../apis/types'
import { StateType } from '../hooks/types'

type ShowNotifyOptions = {
  title: string
  type?: StateType
  icon?: string
  duration?: number
  backgroundColor?: string
  color?: string
  closable?: boolean
} & ApiOptions

const showNotify = function (object: string | ShowNotifyOptions) {
  return showPopup(object, 'showNotify', function (done) {
    const hook: PopupHook = (hookName, res) => {
      if (hookName === 'afterShow') {
        done(res)
      }
    }

    return {
      component: Notify,
      hook,
      singleMode: true
    }
  })
}

const hideNotify = function (object?: ApiOptions) {
  return hidePopup(object || {}, 'hideNotify')
}

const _Notify: SFCWithInstall<typeof Notify> & {
  showNotify: typeof showNotify
  hideNotify: typeof hideNotify
} = Object.assign(Notify, {
  install: function (app: App) {
    app.component(Notify.name, Notify)
  },
  showNotify,
  hideNotify
})

export default _Notify
