import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import CalendarView from '../Calendar/CalendarView.vue'

const _CalendarView: SFCWithInstall<typeof CalendarView> = Object.assign(
  CalendarView,
  {
    install: function(app: App) {
      app.component(CalendarView.name, CalendarView)
    }
  }
)

export default _CalendarView
