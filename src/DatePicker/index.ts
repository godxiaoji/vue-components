import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import DatePicker from './DatePicker.vue'
import DatePickerPopup from '@/DatePickerPopup'

const _DatePicker: SFCWithInstall<typeof DatePicker> & {
  showDatePicker: typeof DatePickerPopup.showDatePicker
} = Object.assign(DatePicker, {
  install: function (app: App) {
    app.component(DatePicker.name, DatePicker)
  },
  showDatePicker: DatePickerPopup.showDatePicker
})

export default _DatePicker
