import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import CalendarPopup from '../Calendar/CalendarPopup.vue'
import { ApiOptions, PopupHook } from '../apis/types'
import { showPopup } from '@/apis/Popup'
import { CalendarType, CalendarValue, DayHandler } from '../Calendar/types'

type ShowCalendarOptions = {
  title?: string
  value?: CalendarValue
  showConfirm?: boolean
  showClose?: boolean
  minDate?: Date
  maxDate?: Date
  type?: CalendarType
  allowSameDay?: boolean
  maxRange?: number
  dayHandler?: DayHandler
} & ApiOptions

const showCalendar = function (object: ShowCalendarOptions) {
  return showPopup(object, 'showCalendar', function (done) {
    const hook: PopupHook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: CalendarPopup,
      hook
    }
  })
}

const _CalendarPopup: SFCWithInstall<typeof CalendarPopup> & {
  showCalendar: typeof showCalendar
} = Object.assign(CalendarPopup, {
  install: function (app: App) {
    app.component(CalendarPopup.name, CalendarPopup)
  },
  showCalendar
})

export default _CalendarPopup
