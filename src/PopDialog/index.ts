import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import PopDialog from '../Popover/PopDialog.vue'
import { showPopDialog } from '@/apis/Popup'

const _PopDialog: SFCWithInstall<typeof PopDialog> = Object.assign(PopDialog, {
  install: function(app: App) {
    app.component(PopDialog.name, PopDialog)

    const properties = app.config.globalProperties

    properties.$showPopDialog = showPopDialog
  },
  showPopDialog
})

export default _PopDialog
