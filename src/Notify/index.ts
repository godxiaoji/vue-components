import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Notify from './Notify.vue'
import { showNotify, hideNotify } from '@/apis/Notify'

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
