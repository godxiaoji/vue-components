import CalendarPopup from '../Calendar/CalendarPopup.vue'
import { showCalendar } from '../apis/Popup'

CalendarPopup.install = function(app) {
  app.component(CalendarPopup.name, CalendarPopup)

  // 添加api
  app.config.globalProperties.$showCalendar = showCalendar
}

CalendarPopup.showCalendar = showCalendar

export default CalendarPopup
