import CalendarView from '../Calendar/View.vue'

CalendarView.install = function(Vue) {
  Vue.component(CalendarView.name, CalendarView)
}

export default CalendarView
