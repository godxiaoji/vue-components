import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Calendar from './Calendar.vue'
import { showCalendar } from '@/apis/Popup'

const _Calendar: SFCWithInstall<typeof Calendar> = Object.assign(Calendar, {
  install: function(app: App) {
    app.component(Calendar.name, Calendar)

    const properties = app.config.globalProperties

    properties.$showCalendar = showCalendar
  },
  showCalendar
})

export default _Calendar
