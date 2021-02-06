<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="默认" isLink @click="onShowModal({})"></fx-cell>
      <fx-cell
        label="蒙层可点击"
        isLink
        @click="
          onShowModal({
            maskClosable: true
          })
        "
      ></fx-cell>
      <fx-cell
        label="隐藏关闭按钮"
        isLink
        @click="
          onShowModal({
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
          onShowModal(
            {
              maskClosable: true
            },
            true
          )
        "
      ></fx-cell>
      <fx-cell
        label="show/shown/hide/hidden"
        isLink
        @click="
          onShowModal(
            {
              title: '标题',
              content: '提示内容提示内容提示内容提示内容提示内容提示内容'
            },
            false,
            true
          )
        "
      ></fx-cell>
    </fx-group>
    <fx-modal
      :visible.sync="visible"
      :mask-closable="maskClosable"
      :show-close="showClose"
      @cancel="onClose"
      @show="onOtherEvent('show')"
      @shown="onOtherEvent('shown')"
      @hide="onOtherEvent('hide')"
      @hidden="onOtherEvent('hidden')"
    >
    </fx-modal>
    <fx-modal :visible.sync="visible2">
      <fx-image
        class="image-image"
        :src="imageUrl"
        :aspect-ratio="1"
      ></fx-image>
    </fx-modal>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {},
  data() {
    return {
      visible: false,
      maskClosable: false,
      showClose: true,

      callbackEvent: false,
      otherEvent: false,

      visible2: false,
      imageUrl: 'https://cdn.fox2.cn/vfox/swiper/center-2.jpg'
    }
  },
  methods: {
    onShowModal(obj, callbackEvent, otherEvent) {
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

      this.callbackEvent = !!callbackEvent
      this.otherEvent = !!otherEvent

      this.visible = true
    },
    onClose(res) {
      console.log('cancel', res)
      if (this.callbackEvent) {
        if (res.closeClick) {
          this.$showToast('点击了关闭按钮')
        } else if (res.maskClick) {
          this.$showToast('点击了蒙层')
        }
      }
    },
    onOtherEvent(type) {
      if (this.otherEvent) {
        this.$showToast(`${type} 事件触发`)
        console.log(`${type} 事件触发`)
      }
    }
  }
}
</script>
