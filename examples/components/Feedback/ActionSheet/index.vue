<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="默认" isLink @click="visible = true"></fx-cell>
      <fx-cell
        label="展示标题"
        isLink
        @click=";(title = '标题'), (visible = true)"
      ></fx-cell>
      <fx-cell
        label="展示取消按钮"
        isLink
        @click=";(showCancel = true), (visible = true)"
      ></fx-cell>
      <fx-cell
        label="设置取消按钮文案"
        isLink
        @click="
          ;(showCancel = true),
            (cancelText = '自定义取消按钮文案'),
            (visible = true)
        "
      ></fx-cell>
    </fx-group>
    <fx-group title="options 扩展">
      <fx-cell
        label="选项描述"
        isLink
        @click="
          ;(options = [
            {
              name: '选项1',
              description: '选项1的描述文案'
            },
            {
              name: '选项2'
            },
            {
              name: '选项3'
            }
          ]),
            (visible = true)
        "
      ></fx-cell>
      <fx-cell
        label="选项高亮"
        isLink
        @click="
          ;(options = [
            {
              name: '选项1',
              highlight: true
            },
            {
              name: '选项2'
            },
            {
              name: '选项3'
            }
          ]),
            (visible = true)
        "
      ></fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell
        label="confirm/cancel"
        isLink
        @click=";(showCancel = true), (showEvent = true), (visible = true)"
      ></fx-cell>
      <fx-cell
        label="visible-state-change"
        isLink
        @click=";(visibleEvent = true), (visible = true)"
      ></fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="showActionSheet" isLink @click="onCallApi()"></fx-cell>
    </fx-group>
    <fx-action-sheet
      v-model:visible="visible"
      :title="title"
      :options="options"
      :show-cancel="showCancel"
      :cancel-text="cancelText"
      @confirm="onConfirm"
      @cancel="onCancel"
      @visible-state-change="onVisibleStateChange"
    ></fx-action-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  PopupCancelArgs,
  PopupConfirmArgs,
  PopupVisibleStateChangeArgs
} from '../../utils/types'
import Toast from '@/Toast'
import Dialog from '@/Dialog'
import ActionSheet from '@/ActionSheet'

interface Option {
  name: string
  description?: string
  highlight?: boolean
}

const defaultOptions: Option[] = [
  {
    name: '选项1'
  },
  {
    name: '选项2'
  },
  {
    name: '选项3'
  }
]

export default defineComponent({
  name: 'ActionSheet',
  props: {},
  data() {
    return {
      visible: false,
      title: null,
      showCancel: false,
      cancelText: '取消',
      options: defaultOptions,
      options2: [
        {
          name: '选项1',
          description: '选项1的描述文案'
        },
        {
          name: '选项2'
        },
        {
          name: '选项3'
        }
      ] as Option[],

      showEvent: false,
      visibleEvent: false
    }
  },
  methods: {
    onVisibleStateChange({ state }: PopupVisibleStateChangeArgs) {
      if (this.visibleEvent) {
        Toast.showToast(`${state} 事件触发`)
        console.log(`${state} 事件触发`)
      }
      if (state === 'hidden') {
        this.showCancel = false
        this.cancelText = '取消'
        this.options = defaultOptions
        this.title = null
        this.visibleEvent = false
        this.showEvent = false
      }
    },
    onConfirm(res: PopupConfirmArgs) {
      console.log('confirm', res)
      if (this.showEvent) {
        Dialog.showDialog({
          title: '选择了',
          showCancel: false,
          content: `item.name: '${res.item.name}'\nindex: ${res.index}`
        })
      }
    },
    onCancel(res: PopupCancelArgs) {
      console.log('cancel', res)
      this.showEvent && Toast.showToast(`取消事件触发`)
    },
    onCallApi() {
      ActionSheet.showActionSheet({
        title: '标题',
        options: this.options,
        showCancel: true,
        success: (res: any) => {
          console.log('success', res)
          const { confirm, detail } = res

          if (confirm) {
            Dialog.showDialog({
              title: '选择了',
              showCancel: false,
              content: `item.name: '${detail.item.name}'\nindex: ${detail.index}`
            })
          } else {
            Toast.showToast('取消了')
          }
        }
      })
    }
  }
})
</script>
