import CalendarPopup from '../Calendar/CalendarPopup.vue'
import { showCalendar } from '../apis/Popup'

CalendarPopup.install = function(Vue) {
  Vue.component(CalendarPopup.name, CalendarPopup)

  // 添加api
  Vue.prototype.$showCalendar = showCalendar
}

CalendarPopup.showCalendar = showCalendar

export default CalendarPopup
