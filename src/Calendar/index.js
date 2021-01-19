import Calendar from './Calendar.vue'
import { showCalendar } from '../apis/Popup'

Calendar.install = function(app) {
  app.component(Calendar.name, Calendar)

  // 添加api
  app.config.globalProperties.$showCalendar = showCalendar
}

Calendar.showCalendar = showCalendar

export default Calendar
