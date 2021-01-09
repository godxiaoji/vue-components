import ImagePreview from './ImagePreview.vue'
import { previewImage } from '../apis/Preview'

ImagePreview.install = function(Vue) {
  Vue.component(ImagePreview.name, ImagePreview)

  Vue.prototype.$previewImage = previewImage
}

ImagePreview.previewImage = previewImage

export default ImagePreview
