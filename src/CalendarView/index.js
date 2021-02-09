import CalendarView from '../Calendar/CalendarView.vue'

CalendarView.install = function(app) {
  app.component(CalendarView.name, CalendarView)
}

export default CalendarView
