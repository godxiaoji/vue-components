import ImagePreview from './ImagePreview.vue'
import { previewImage } from '../apis/Popup'

ImagePreview.install = function(Vue) {
  Vue.component(ImagePreview.name, ImagePreview)

  Vue.prototype.$previewImage = previewImage
}

ImagePreview.previewImage = previewImage

export default ImagePreview
