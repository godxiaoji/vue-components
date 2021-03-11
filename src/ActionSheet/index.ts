import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import ActionSheet from './ActionSheet.vue'
import { showActionSheet } from '../apis/Popup'

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
