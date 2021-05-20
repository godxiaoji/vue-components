import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Calendar from './Calendar.vue'
import CalendarPopup from '@/CalendarPopup'

const _Calendar: SFCWithInstall<typeof Calendar> & {
  showCalendar: typeof CalendarPopup.showCalendar
} = Object.assign(Calendar, {
  install: function (app: App) {
    app.component(Calendar.name, Calendar)
  },
  showCalendar: CalendarPopup.showCalendar
})

export default _Calendar
