import _Swiper from 'swiper/js/swiper'
import SwiperItemComponent from './SwiperItem.vue'
import SwiperComponent from './Swiper.vue'

const Swiper = _Swiper
const swiper = SwiperComponent
const swiperItem = SwiperItemComponent
const install = function (Vue) {
  Vue.component(SwiperComponent.name, SwiperComponent)
  Vue.component(SwiperItemComponent.name, SwiperItemComponent)
}

export default { Swiper, swiper, swiperItem, install }
export { Swiper, swiper, swiperItem, install }