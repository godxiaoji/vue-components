import { App } from 'vue'
import { SFCWithInstall } from '@/utils/types'
import SwiperItem from '../Swiper/SwiperItem.vue'

const _SwiperItem: SFCWithInstall<typeof SwiperItem> = Object.assign(
  SwiperItem,
  {
    install: function(app: App) {
      app.component(SwiperItem.name, SwiperItem)
    }
  }
)

export default _SwiperItem
