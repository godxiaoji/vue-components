import SkeletonButton from '../Skeleton/Button.vue'

SkeletonButton.install = function(Vue) {
  Vue.component(SkeletonButton.name, SkeletonButton)
}

export default SkeletonButton
