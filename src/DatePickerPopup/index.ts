import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import DatePickerPopup from '../DatePicker/DatePickerPopup.vue'
import { showPopup } from '@/apis/Popup'
import { ModeName, OptionFilter } from '../DatePicker/types'
import { ApiOptions, PopupHook } from '../apis/types'

type ShowPickerOptions = {
  title?: string
  value?: Date
  minDate?: Date
  maxDate?: Date
  mode?: ModeName
  filter?: OptionFilter
} & ApiOptions

const showDatePicker = function(object: ShowPickerOptions) {
  return showPopup(object, 'showDatePicker', function(done) {
    const hook: PopupHook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: DatePickerPopup,
      hook
    }
  })
}

const _DatePickerPopup: SFCWithInstall<typeof DatePickerPopup> = Object.assign(
  DatePickerPopup,
  {
    install: function(app: App) {
      app.component(DatePickerPopup.name, DatePickerPopup)

      const properties = app.config.globalProperties

      properties.$showDatePicker = showDatePicker
    },
    showDatePicker
  }
)

export default _DatePickerPopup
