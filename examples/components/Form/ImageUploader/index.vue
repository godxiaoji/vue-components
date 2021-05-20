<template>
  <fx-group title="基础用法">
    <fx-image-uploader
      :uploadReady="onUploadOrFail"
      @change="onChange"
      @delete="onDelete"
      accept="png"
      :maxCount="9"
      v-model="imageList"
      multiple
    />
  </fx-group>
  <fx-group title="上传前置处理">
    <fx-image-uploader
      :beforeUpload="onBeforeUpload"
      :uploadReady="onUpload"
      accept="png"
      :maxCount="9"
      v-model="imageList3"
      multiple
    />
  </fx-group>
  <fx-group title="禁用删除">
    <fx-image-uploader
      v-model="imageList2"
      :deletable="false"
      :uploadReady="onUpload"
    >
    </fx-image-uploader>
  </fx-group>
  <fx-group title="禁用上传">
    <fx-image-uploader disabled> </fx-image-uploader>
  </fx-group>
</template>

<script>
import Toast from '@/Toast'

export default {
  name: 'ImageUploader',
  props: {},
  data() {
    return {
      imageList: [],
      imageList2: [
        'https://cdn.fox2.cn/vfox/empty/default@2x.png',
        'https://cdn.fox2.cn/vfox/empty/error@2x.png'
      ],
      imageList3: []
    }
  },
  methods: {
    onBeforeUpload(file, { formatSize }) {
      if (file.size > 1024 * 1024) {
        Toast.showToast(`上传图片不能大于 ${formatSize(1024 * 1024)}`)
        return false
      }
      Toast.showToast(`上传图片大小为 ${formatSize(file.size)}`)
    },

    onUploadOrFail(file, handlers) {
      handlers.setUploading('上传中...')

      setTimeout(() => {
        this.getDataUrl(file).then(url => {
          if (Math.random() > 0.5) {
            handlers.fail('模拟失败')
          } else {
            handlers.success(url)
          }
        })
      }, 2000)
    },

    onUpload(file, handlers) {
      this.getDataUrl(file).then(url => {
        handlers.success(url)
      })
    },

    getDataUrl(file) {
      return new Promise(resolve => {
        const fr = new FileReader()
        fr.onload = function(e) {
          resolve(e.target.result)
        }
        fr.readAsDataURL(file)
      })
    },

    onChange(res) {
      console.log('change', res)
    },

    onDelete(res) {
      console.log('delete', res)
    }
  }
}
</script>
