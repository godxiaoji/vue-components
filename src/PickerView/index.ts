import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import PickerView from '../Picker/PickerView.vue'

const _PickerView: SFCWithInstall<typeof PickerView> = Object.assign(
  PickerView,
  {
    install: function(app: App) {
      app.component(PickerView.name, PickerView)
    }
  }
)

export default _PickerView
