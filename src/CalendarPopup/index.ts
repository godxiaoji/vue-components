import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import CalendarPopup from '../Calendar/CalendarPopup.vue'
import { showCalendar } from '@/apis/Popup'

const _CalendarPopup: SFCWithInstall<typeof CalendarPopup> = Object.assign(
  CalendarPopup,
  {
    install: function(app: App) {
      app.component(CalendarPopup.name, CalendarPopup)

      const properties = app.config.globalProperties

      properties.$showCalendar = showCalendar
    },
    showCalendar
  }
)

export default _CalendarPopup
