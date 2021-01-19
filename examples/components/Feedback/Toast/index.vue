<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell
        label="纯文字"
        clickable
        @click="onShowToast({ title: '提示文本' })"
      ></fx-cell>
      <fx-cell
        label="长文字"
        clickable
        @click="
          onShowToast({ title: '提示文本提示文本提示文本提示文本提示文本' })
        "
      ></fx-cell>
      <fx-cell
        label="成功"
        clickable
        @click="onShowToast({ title: '成功文本', type: 'success' })"
      ></fx-cell>
      <fx-cell
        label="失败"
        clickable
        @click="onShowToast({ title: '失败文本', type: 'fail' })"
      ></fx-cell>
      <fx-cell
        label="加载中"
        clickable
        @click="onShowToast({ title: '加载文本', type: 'loading' })"
      ></fx-cell>
    </fx-group>
    <fx-group title="自定义图标">
      <fx-cell
        label="收藏"
        clickable
        @click="onShowToast({ title: '已收藏', icon: 'StarFilled' })"
      ></fx-cell>
      <fx-cell
        label="警告"
        clickable
        @click="
          onShowToast({ title: '警告文本', icon: 'ExclamationCircleOutlined' })
        "
      ></fx-cell>
    </fx-group>
    <fx-group title="其他">
      <fx-cell
        label="自定义时长"
        clickable
        @click="onShowToast({ title: '5秒后消失', duration: 5000 })"
      ></fx-cell>
      <fx-cell
        label="展示透明蒙层"
        clickable
        @click="onShowToast({ title: '不可穿透', mask: true })"
      ></fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell
        label="showToast"
        clickable
        @click="$showToast({ title: '提示文本', duration: 5000 })"
      ></fx-cell>
      <fx-cell label="hideToast" clickable @click="$hideToast()"></fx-cell>
      <fx-cell
        label="showLoading"
        clickable
        @click="$showLoading({ title: '加载中' })"
      ></fx-cell>
      <fx-cell label="hideLoading" clickable @click="$hideLoading()"></fx-cell>
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

<script>
export default {
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
    onShowToast({ title, mask, type, duration, icon }) {
      this.icon = icon || null
      this.title = title || ''
      this.mask = mask || false
      this.type = type || 'default'
      this.duration = duration != null ? duration : 1500
      this.visible = true
    }
  }
}
</script>
