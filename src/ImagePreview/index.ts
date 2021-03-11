import { App } from 'vue'
import { SFCWithInstall } from '../utils/types'
import ImagePreview from './ImagePreview.vue'
import { previewImage } from '../apis/Popup'

const _ImagePreview: SFCWithInstall<typeof ImagePreview> = Object.assign(
  ImagePreview,
  {
    install: function(app: App) {
      app.component(ImagePreview.name, ImagePreview)

      const properties = app.config.globalProperties

      properties.$previewImage = previewImage
    },
    previewImage
  }
)

export default _ImagePreview
