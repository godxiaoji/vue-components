import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import DatePickerView from '../DatePicker/DatePickerView.vue'

const _DatePickerView: SFCWithInstall<typeof DatePickerView> = Object.assign(
  DatePickerView,
  {
    install: function(app: App) {
      app.component(DatePickerView.name, DatePickerView)
    }
  }
)

export default _DatePickerView
