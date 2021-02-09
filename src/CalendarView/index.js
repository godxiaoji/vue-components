import CalendarView from '../Calendar/CalendarView.vue'

CalendarView.install = function(Vue) {
  Vue.component(CalendarView.name, CalendarView)
}

export default CalendarView
