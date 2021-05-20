<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell
        label="默认"
        isLink
        @click="
          show({
            title: '标题',
            content: '提示内容提示内容提示内容提示内容提示内容提示内容'
          })
        "
      ></fx-cell>
      <fx-cell
        label="不带标题"
        isLink
        @click="
          show({
            content: '提示内容提示内容提示内容提示内容提示内容提示内容'
          })
        "
      ></fx-cell>
      <fx-cell
        label="不显示取消按钮"
        isLink
        @click="
          show({
            title: '标题',
            content: '提示内容提示内容提示内容提示内容提示内容提示内容',
            showCancel: false
          })
        "
      ></fx-cell>
      <fx-cell
        label="自定义按钮文案"
        isLink
        @click="
          show({
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
        isLink
        @click="
          show(
            {
              title: '标题',
              content: '提示内容提示内容提示内容提示内容提示内容提示内容'
            },
            true
          )
        "
      ></fx-cell>
      <fx-cell
        label="visible-state-change"
        isLink
        @click="
          show(
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
      <fx-cell label="showDialog" isLink @click="onCallApi()"></fx-cell>
    </fx-group>
    <fx-dialog
      v-model:visible="visible"
      :title="title"
      :content="content"
      :show-cancel="showCancel"
      :cancel-text="cancelText"
      :confirm-text="confirmText"
      @confirm="onConfirm"
      @cancel="onCancel"
      @visible-state-change="onVisibleStateChange"
    >
    </fx-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PopupVisibleStateChangeArgs, PopupCancelArgs } from '../../utils/types'
import Toast from '@/Toast'
import Dialog from '@/Dialog'

interface showArgs {
  title?: string
  content?: string
  showCancel?: boolean
  cancelText?: string
  confirmText?: string
}

export default defineComponent({
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
      visibleEvent: false
    }
  },
  methods: {
    show(obj: showArgs, callbackEvent?: boolean, visibleEvent?: boolean) {
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
      this.visibleEvent = !!visibleEvent

      this.visible = true
    },
    onCallApi() {
      Dialog.showDialog({
        title: '标题',
        content: '提示内容提示内容提示内容提示内容提示内容提示内容',
        maskClosable: true,
        success: (res: any) => {
          console.log('success', res)
          Toast.showToast(res.confirm ? 'confirm = true' : 'cancel = true')
        }
      })
    },
    onConfirm(res: PopupCancelArgs) {
      console.log('confirm', res)
      this.callbackEvent && Toast.showToast('点击确定按钮')
    },
    onCancel(res: PopupCancelArgs) {
      console.log('cancel', res)
      this.callbackEvent && Toast.showToast('点击取消按钮')
    },
    onVisibleStateChange({ state }: PopupVisibleStateChangeArgs) {
      if (this.visibleEvent) {
        console.log(`${state} 事件触发`)
        Toast.showToast(`${state} 事件触发`)
      }
    }
  }
})
</script>
