import CalendarPopup from '../Calendar/Popup.vue'
import { showCalendar } from '../apis/Popup'

CalendarPopup.install = function(Vue) {
  Vue.component(CalendarPopup.name, CalendarPopup)

  // 添加api
  Vue.prototype.$showCalendar = showCalendar
}

export default CalendarPopup
