import Calendar from './Calendar.vue'
import { showCalendar } from '../apis/Popup'

Calendar.install = function(Vue) {
  Vue.component(Calendar.name, Calendar)

  // 添加api
  Vue.prototype.$showCalendar = showCalendar
}

Calendar.showCalendar = showCalendar

export default Calendar
