<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell
        label="主要"
        isLink
        @click="show({ title: '通知文本' })"
      ></fx-cell>
      <fx-cell
        label="成功"
        isLink
        @click="show({ title: '成功文本', type: 'success' })"
      ></fx-cell>
      <fx-cell
        label="警告"
        isLink
        @click="show({ title: '警告文本', type: 'warning' })"
      ></fx-cell>
      <fx-cell
        label="危险"
        isLink
        @click="show({ title: '危险文本', type: 'danger' })"
      ></fx-cell>
    </fx-group>
    <fx-group title="自定义图标">
      <fx-cell
        label="成功"
        isLink
        @click="
          show({
            title: '成功文本',
            type: 'success',
            icon: 'CheckCircleOutlined'
          })
        "
      ></fx-cell>
      <fx-cell
        label="警告"
        isLink
        @click="
          show({
            title: '警告文本',
            type: 'warning',
            icon: 'ExclamationCircleOutlined'
          })
        "
      ></fx-cell>
      <fx-cell
        label="危险"
        isLink
        @click="
          show({
            title: '危险文本',
            type: 'danger',
            icon: 'CloseCircleOutlined'
          })
        "
      ></fx-cell>
    </fx-group>
    <fx-group title="其他">
      <fx-cell
        label="自定义时长"
        isLink
        @click="show({ title: '5秒后消失', duration: 5000 })"
      ></fx-cell>
      <fx-cell
        label="自定义颜色"
        isLink
        @click="
          show({
            title: '深色调',
            icon: 'InfoCircleOutlined',
            backgroundColor: '#ff4d4f',
            color: '#ffffff'
          })
        "
      ></fx-cell>
      <fx-cell
        label="手动关闭"
        isLink
        @click="show({ title: '常驻可手动关闭', duration: 0, closable: true })"
      ></fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="showNotify" isLink @click="callShowApi"></fx-cell>
      <fx-cell label="hideNotify" isLink @click="callHideApi"></fx-cell>
    </fx-group>
    <fx-notify
      v-model:visible="visible"
      :title="title"
      :type="type"
      :backgroundColor="backgroundColor"
      :color="color"
      :icon="icon"
      :duration="duration"
      :closable="closable"
      @cancel="onCancel"
    ></fx-notify>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PopupCancelArgs, StateType } from '../../utils/types'
import Notify from '@/Notify'

interface showArgs {
  icon?: any
  title?: string
  backgroundColor?: string
  color?: string
  type?: StateType
  closable?: boolean
  duration?: number
}

export default defineComponent({
  name: 'Notify',
  data() {
    return {
      visible: false,
      title: '浅色调',
      icon: 'InfoCircleOutlined',
      backgroundColor: '#8bc7ff',
      color: '#292e36',
      duration: 0,
      type: 'primary',
      closable: false
    }
  },
  methods: {
    callShowApi() {
      Notify.showNotify({
        title: '通知文本',
        duration: 5000,
        closable: true,
        success(res: any) {
          console.log('success', res)
        }
      })
    },
    show({
      title,
      backgroundColor,
      color,
      type,
      duration,
      icon,
      closable
    }: showArgs) {
      this.icon = icon || null
      this.title = title || ''
      this.backgroundColor = backgroundColor || null
      this.color = color || null
      this.type = type || 'primary'
      this.closable = closable || false
      this.duration = duration != null ? duration : 1500
      this.visible = true
    },
    callHideApi() {
      Notify.hideNotify()
    },
    onCancel(res: PopupCancelArgs) {
      console.log('cancel', res)
    }
  }
})
</script>
