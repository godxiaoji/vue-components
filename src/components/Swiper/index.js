import SwiperItem from './SwiperItem.vue'
import Swiper from './Swiper.vue'

const install = function(Vue) {
  Vue.component(Swiper.name, Swiper)
  Vue.component(SwiperItem.name, SwiperItem)
}

export default { Swiper, SwiperItem, install }
export { Swiper, SwiperItem }
