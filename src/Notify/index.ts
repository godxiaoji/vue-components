import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Notify from './Notify.vue'
import { showPopup, hidePopup, PopupHook } from '@/apis/Popup'
import type { ApiOptions } from '../apis/types'
import type { StateType } from '../hooks/constants'

type ShowNotifyOptions = {
  title: string
  type?: StateType
  icon?: string
  duration?: number
  backgroundColor?: string
  color?: string
  closable?: boolean
} & ApiOptions

const showNotify = function(object: string | ShowNotifyOptions) {
  return showPopup(object, 'showNotify', function(done) {
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

const hideNotify = function(object: ApiOptions) {
  return hidePopup(object, 'hideNotify')
}

const _Notify: SFCWithInstall<typeof Notify> = Object.assign(Notify, {
  install: function(app: App) {
    app.component(Notify.name, Notify)

    const properties = app.config.globalProperties

    properties.$showNotify = showNotify
    properties.$hideNotify = hideNotify
  },
  showNotify,
  hideNotify
})

export default _Notify
