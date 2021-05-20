<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="默认" isLink @click="showModel({})"></fx-cell>
      <fx-cell
        label="蒙层可点击"
        isLink
        @click="
          showModel({
            maskClosable: true
          })
        "
      ></fx-cell>
      <fx-cell
        label="隐藏关闭按钮"
        isLink
        @click="
          showModel({
            maskClosable: true,
            showClose: false
          })
        "
      ></fx-cell>
    </fx-group>
    <fx-group title="Slot default">
      <fx-cell label="图片" isLink @click="visible2 = true"></fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell
        label="close"
        isLink
        @click="
          ;(callbackEvent = true) &&
            showModel({
              maskClosable: true
            })
        "
      ></fx-cell>
      <fx-cell
        label="visible-state-change"
        isLink
        @click="
          ;(visibleEvent = true) &&
            showModel({
              title: '标题',
              content: '提示内容提示内容提示内容提示内容提示内容提示内容'
            })
        "
      ></fx-cell>
    </fx-group>
    <fx-modal
      v-model:visible="visible"
      :mask-closable="maskClosable"
      :show-close="showClose"
      @cancel="onClose"
      @visible-state-change="onVisibleStateChange"
    >
    </fx-modal>
    <fx-modal v-model:visible="visible2">
      <fx-image
        class="image-image"
        :src="imageUrl"
        :aspect-ratio="1"
      ></fx-image>
    </fx-modal>
  </div>
</template>

<script>
import Toast from '@/Toast'

export default {
  name: 'Modal',
  props: {},
  data() {
    return {
      visible: false,
      maskClosable: false,
      showClose: true,

      callbackEvent: false,
      visibleEvent: false,

      visible2: false,
      imageUrl: 'https://cdn.fox2.cn/vfox/swiper/center-2.jpg'
    }
  },
  methods: {
    showModel(obj) {
      obj = Object.assign(
        {
          maskClosable: false,
          showClose: true
        },
        obj
      )

      Object.keys(obj).forEach(k => {
        this[k] = obj[k]
      })

      this.visible = true
    },
    onClose(res) {
      console.log('cancel', res)
      if (this.callbackEvent) {
        if (res.closeClick) {
          Toast.showToast('点击了关闭按钮')
        } else if (res.maskClick) {
          Toast.showToast('点击了蒙层')
        }
      }
    },
    onVisibleStateChange({ state }) {
      if (this.visibleEvent) {
        console.log(`${state} 事件触发`)
        Toast.showToast(`${state} 事件触发`)
      }
      if (state === 'hidden') {
        this.callbackEvent = false
        this.visibleEvent = false
      }
    }
  }
}
</script>
