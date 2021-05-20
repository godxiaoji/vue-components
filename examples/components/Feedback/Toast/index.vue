<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell
        label="纯文字"
        isLink
        @click="onShowToast({ title: '提示文本' })"
      ></fx-cell>
      <fx-cell
        label="长文字"
        isLink
        @click="
          onShowToast({ title: '提示文本提示文本提示文本提示文本提示文本' })
        "
      ></fx-cell>
      <fx-cell
        label="成功"
        isLink
        @click="onShowToast({ title: '成功文本', type: 'success' })"
      ></fx-cell>
      <fx-cell
        label="失败"
        isLink
        @click="onShowToast({ title: '失败文本', type: 'fail' })"
      ></fx-cell>
      <fx-cell
        label="加载中"
        isLink
        @click="onShowToast({ title: '加载文本', type: 'loading' })"
      ></fx-cell>
    </fx-group>
    <fx-group title="自定义图标">
      <fx-cell
        label="收藏"
        isLink
        @click="onShowToast({ title: '已收藏', icon: 'StarFilled' })"
      ></fx-cell>
      <fx-cell
        label="警告"
        isLink
        @click="
          onShowToast({ title: '警告文本', icon: 'ExclamationCircleOutlined' })
        "
      ></fx-cell>
    </fx-group>
    <fx-group title="其他">
      <fx-cell
        label="自定义时长"
        isLink
        @click="onShowToast({ title: '5秒后消失', duration: 5000 })"
      ></fx-cell>
      <fx-cell
        label="展示透明蒙层"
        isLink
        @click="onShowToast({ title: '不可穿透', mask: true })"
      ></fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="showToast" isLink @click="callShowToastApi"></fx-cell>
      <fx-cell label="hideToast" isLink @click="callHideToastApi"></fx-cell>
      <fx-cell label="showLoading" isLink @click="callShowLoadingApi"></fx-cell>
      <fx-cell label="hideLoading" isLink @click="callHideLoadingApi"></fx-cell>
    </fx-group>
    <fx-toast
      v-model:visible="visible"
      :title="title"
      :type="type"
      :mask="mask"
      :icon="icon"
      :duration="duration"
    ></fx-toast>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from '@/Toast'

interface showArgs {
  icon?: any
  title?: string
  mask?: boolean
  type?: ToastType
  duration?: number
}

type ToastType = 'default' | 'success' | 'fail' | 'loading'

export default defineComponent({
  name: 'Toast',
  props: {},
  data() {
    return {
      visible: false,
      title: '',
      type: 'default',
      mask: false,
      icon: null,
      duration: 0
    }
  },
  methods: {
    onShowToast({ title, mask, type, duration, icon }: showArgs) {
      this.icon = icon || null
      this.title = title || ''
      this.mask = mask || false
      this.type = type || 'default'
      this.duration = duration != null ? duration : 1500
      this.visible = true
    },
    callShowToastApi() {
      Toast.showToast({ title: '提示文本', duration: 5000 })
    },
    callShowLoadingApi() {
      Toast.showLoading({ title: '加载中' })
    },
    callHideLoadingApi() {
      Toast.hideLoading()
    },
    callHideToastApi() {
      Toast.hideToast()
    }
  }
})
</script>
