import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Popover from './Popover.vue'
import { showPopover } from '@/apis/Popup'

const _Popover: SFCWithInstall<typeof Popover> = Object.assign(Popover, {
  install: function(app: App) {
    app.component(Popover.name, Popover)

    const properties = app.config.globalProperties

    properties.$showPopover = showPopover
  },
  showPopover
})

export default _Popover
