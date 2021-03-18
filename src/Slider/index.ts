import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Slider from './Slider.vue'

const _Slider: SFCWithInstall<typeof Slider> = Object.assign(Slider, {
  install: function(app: App) {
    app.component(Slider.name, Slider)
  }
})

export default _Slider
