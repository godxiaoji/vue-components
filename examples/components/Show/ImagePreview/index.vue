<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="预览图片" isLink @click="onShow({})"></fx-cell>
      <fx-cell
        label="指定初始图片"
        isLink
        @click="
          onShow({ current: 'https://cdn.fox2.cn/vfox/swiper/different-2.jpg' })
        "
      ></fx-cell>
      <fx-cell
        label="展示关闭按钮"
        isLink
        @click="onShow({ showClose: true })"
      ></fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell
        label="show/shown/hide/hidden/change"
        isLink
        @click="
          onShow({
            showEventCallback: true
          })
        "
      ></fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="previewImage" isLink @click="onCallApi"></fx-cell>
    </fx-group>
    <fx-image-preview
      :visible.sync="visible"
      :urls="imageUrls"
      :current.sync="current"
      :showClose="showClose"
      :imageHighRendering="false"
      @show="onEvent('show')"
      @shown="onEvent('shown')"
      @hide="onEvent('hide')"
      @hidden="onEvent('hidden')"
      @cancel="onCancel"
      @change="onChange"
    ></fx-image-preview>
  </div>
</template>

<script>
export default {
  name: 'ImagePreview',
  props: {},
  data() {
    return {
      visible: false,
      showClose: false,
      imageUrls: [
        'https://cdn.fox2.cn/vfox/swiper/different-1.jpg',
        'https://cdn.fox2.cn/vfox/swiper/different-2.jpg',
        'https://cdn.fox2.cn/vfox/swiper/different-3.jpg'
      ],
      current: ''
    }
  },
  methods: {
    onCallApi() {
      this.$previewImage({
        urls: this.imageUrls,
        showClose: true
      })
    },
    onShow({ showClose, current, showEventCallback }) {
      this.showClose = showClose || false
      this.current = current || ''
      this.showEventCallback = !!showEventCallback
      this.visible = true
    },
    onEvent(type) {
      if (this.showEventCallback) {
        this.$showToast(`${type} 事件触发`)
        console.log(`${type} 事件触发`)
      }
    },
    onChange({ activeIndex, current }) {
      if (this.showEventCallback) {
        this.$showToast(`切换到第 ${activeIndex + 1} 张`)
        console.log(`change 事件触发`, activeIndex, current)
      }
    },
    onCancel(res) {
      console.log('cancel', res)
    }
  }
}
</script>
