import ImagePreview from './ImagePreview.vue'
import { previewImage } from '../apis/Popup'

ImagePreview.install = function(app) {
  app.component(ImagePreview.name, ImagePreview)

  app.config.globalProperties.$previewImage = previewImage
}

ImagePreview.previewImage = previewImage

export default ImagePreview
