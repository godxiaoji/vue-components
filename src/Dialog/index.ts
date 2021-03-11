import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import Dialog from './Dialog.vue'
import { showDialog } from '../apis/Popup'

const _Dialog: SFCWithInstall<typeof Dialog> = Object.assign(Dialog, {
  install: function(app: App) {
    app.component(Dialog.name, Dialog)

    const properties = app.config.globalProperties

    properties.$showDialog = showDialog
  },
  showDialog
})

export default _Dialog
