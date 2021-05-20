import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Picker from './Picker.vue'
import PickerPopup from '@/PickerPopup'

const _Picker: SFCWithInstall<typeof Picker> & {
  showPicker: typeof PickerPopup.showPicker
} = Object.assign(Picker, {
  install: function (app: App) {
    app.component(Picker.name, Picker)
  },
  showPicker: PickerPopup.showPicker
})

export default _Picker
