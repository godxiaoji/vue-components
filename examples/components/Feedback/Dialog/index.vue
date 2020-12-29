<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell
        label="默认"
        clickable
        @click="
          onShowDialog({
            title: '标题',
            content: '提示内容提示内容提示内容提示内容提示内容提示内容'
          })
        "
      ></fx-cell>
      <fx-cell
        label="不带标题"
        clickable
        @click="
          onShowDialog({
            content: '提示内容提示内容提示内容提示内容提示内容提示内容'
          })
        "
      ></fx-cell>
      <fx-cell
        label="不显示取消按钮"
        clickable
        @click="
          onShowDialog({
            title: '标题',
            content: '提示内容提示内容提示内容提示内容提示内容提示内容',
            showCancel: false
          })
        "
      ></fx-cell>
      <fx-cell
        label="自定义按钮文案"
        clickable
        @click="
          onShowDialog({
            title: '惊喜',
            content: '这有一份关爱保险待你查收',
            cancelText: '拒绝',
            confirmText: '接受'
          })
        "
      ></fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell
        label="confirm/cancel"
        clickable
        @click="
          onShowDialog(
            {
              title: '标题',
              content: '提示内容提示内容提示内容提示内容提示内容提示内容'
            },
            true
          )
        "
      ></fx-cell>
      <fx-cell
        label="show/shown/hide/hidden"
        clickable
        @click="
          onShowDialog(
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
    <fx-group title="API">
      <fx-cell label="showDialog" clickable @click="onCallApi()"></fx-cell>
    </fx-group>
    <fx-dialog
      :visible.sync="visible"
      :title="title"
      :content="content"
      :show-cancel="showCancel"
      :cancel-text="cancelText"
      :confirm-text="confirmText"
      @confirm="onConfirm"
      @cancel="onCancel"
      @show="onOtherEvent('show')"
      @shown="onOtherEvent('shown')"
      @hide="onOtherEvent('hide')"
      @hidden="onOtherEvent('hidden')"
    >
    </fx-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {},
  data() {
    return {
      visible: false,
      title: '',
      content: '',
      cancelText: '',
      confirmText: '',
      showCancel: false,

      callbackEvent: false,
      otherEvent: false
    }
  },
  methods: {
    onShowDialog(obj, callbackEvent, otherEvent) {
      obj = Object.assign(
        {
          title: null,
          content: '',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定'
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
    onCallApi() {
      this.$showDialog({
        title: '标题',
        content: '提示内容提示内容提示内容提示内容提示内容提示内容',
        maskClosable: true,
        success: res => {
          console.log('success', res)
          this.$showToast(res.confirm ? 'confirm = true' : 'cancel = true')
        }
      })
    },
    onConfirm(res) {
      console.log('confirm', res)
      this.callbackEvent && this.$showToast('点击确定按钮')
    },
    onCancel(res) {
      console.log('cancel', res)
      this.callbackEvent && this.$showToast('点击取消按钮')
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
