<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="预览图片" isLink @click="show"></fx-cell>
      <fx-cell
        label="指定初始图片"
        isLink
        @click="
          show({ current: 'https://cdn.fox2.cn/vfox/swiper/different-2.jpg' })
        "
      ></fx-cell>
      <fx-cell
        label="展示关闭按钮"
        isLink
        @click="show({ showClose: true })"
      ></fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell
        label="change/cancel"
        isLink
        @click="show({ changeEvent: true })"
      ></fx-cell>
      <fx-cell
        label="visible-state-change"
        isLink
        @click="show({ visibleEvent: true })"
      ></fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="previewImage" isLink @click="onCallApi"></fx-cell>
    </fx-group>
    <fx-image-preview
      v-model:visible="visible"
      :urls="imageUrls"
      v-model:current="current"
      :showClose="showClose"
      :imageHighRendering="false"
      @visible-state-change="onVisibleStateChange"
      @cancel="onCancel"
      @change="onChange"
    ></fx-image-preview>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PopupVisibleStateChangeArgs, PopupCancelArgs } from '../../utils/types'
import Toast from '@/Toast'
import ImagePreview from '@/ImagePreview'

interface showArgs {
  showClose?: boolean
  current?: string
  changeEvent?: boolean
  visibleEvent?: boolean
}

interface changeArgs {
  activeIndex: number
  current: number
}

export default defineComponent({
  name: 'ImagePreview',
  data() {
    return {
      visible: false,
      showClose: false,
      imageUrls: [
        'https://cdn.fox2.cn/vfox/swiper/different-1.jpg',
        'https://cdn.fox2.cn/vfox/swiper/different-2.jpg',
        'https://cdn.fox2.cn/vfox/swiper/different-3.jpg'
      ],
      current: '',

      changeEvent: false,
      visibleEvent: false
    }
  },
  methods: {
    onCallApi() {
      ImagePreview.previewImage({
        urls: this.imageUrls,
        showClose: true,
        imageHighRendering: false,
        success: res => {
          console.log('success', res)
        }
      })
    },
    show(res: showArgs) {
      this.showClose = res.showClose || false
      this.current = res.current || ''
      this.changeEvent = res.changeEvent || false
      this.visibleEvent = res.visibleEvent || false
      this.visible = true
    },
    onVisibleStateChange({ state }: PopupVisibleStateChangeArgs) {
      if (this.visibleEvent) {
        console.log(`${state} 事件触发`)
        Toast.showToast(`${state} 事件触发`)
      }
      if (state === 'hidden') {
        this.showClose = false
        this.current = ''
        this.changeEvent = false
        this.visibleEvent = false
      }
    },
    onChange({ activeIndex, current }: changeArgs) {
      if (this.changeEvent) {
        Toast.showToast(`切换到第 ${activeIndex + 1} 张`)
        console.log(`change 事件触发`, activeIndex, current)
      }
    },
    onCancel(res: PopupCancelArgs) {
      if (this.changeEvent) {
        console.log('cancel', res)
        Toast.showToast(`关闭`)
      }
    }
  }
})
</script>
