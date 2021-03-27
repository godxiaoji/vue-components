import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import ImageUploader from './ImageUploader.vue'

const _ImageUploader: SFCWithInstall<typeof ImageUploader> = Object.assign(ImageUploader, {
  install: function(app: App) {
    app.component(ImageUploader.name, ImageUploader)
  }
})

export default _ImageUploader
