import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import Swiper from './Swiper.vue'

const _Swiper: SFCWithInstall<typeof Swiper> = Object.assign(Swiper, {
  install: function(app: App) {
    app.component(Swiper.name, Swiper)
  }
})

export default _Swiper
