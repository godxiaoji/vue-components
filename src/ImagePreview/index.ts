import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import ImagePreview from './ImagePreview.vue'
import { ApiOptions, PopupHook } from '../apis/types'
import { showPopup } from '@/apis/Popup'

type PreviewImageOptions = {
  urls: string[]
  content?: string
  showClose?: boolean
  navigationButtons?: boolean
  imageHighRendering?: boolean
} & ApiOptions

const previewImage = function (object: PreviewImageOptions) {
  return showPopup(object, 'previewImage', function (done) {
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

const _ImagePreview: SFCWithInstall<typeof ImagePreview> & {
  previewImage: typeof previewImage
} = Object.assign(ImagePreview, {
  install: function (app: App) {
    app.component(ImagePreview.name, ImagePreview)
  },
  previewImage
})

export default _ImagePreview
