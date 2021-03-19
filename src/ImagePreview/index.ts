import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import ImagePreview from './ImagePreview.vue'
import type { ApiOptions } from '../apis/types'
import { showPopup, PopupHook } from '@/apis/Popup'

type PreviewImageOptions = {
  urls: string[]
  content?: string
  showClose?: boolean
  navigationButtons?: boolean
  imageHighRendering?: boolean
} & ApiOptions

const previewImage = function(object: PreviewImageOptions) {
  return showPopup(object, 'previewImage', function(done) {
    const hook: PopupHook = (hookName, res) => {
      if (hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: ImagePreview,
      hook
    }
  })
}

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
