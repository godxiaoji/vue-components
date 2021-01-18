<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell
        label="主要"
        clickable
        @click="onShowNotify({ title: '通知文本' })"
      ></fx-cell>
      <fx-cell
        label="成功"
        clickable
        @click="onShowNotify({ title: '成功文本', type: 'success' })"
      ></fx-cell>
      <fx-cell
        label="警告"
        clickable
        @click="onShowNotify({ title: '警告文本', type: 'warning' })"
      ></fx-cell>
      <fx-cell
        label="危险"
        clickable
        @click="onShowNotify({ title: '危险文本', type: 'danger' })"
      ></fx-cell>
    </fx-group>
    <fx-group title="自定义图标">
      <fx-cell
        label="成功"
        clickable
        @click="
          onShowNotify({
            title: '成功文本',
            type: 'success',
            icon: 'CheckCircleOutlined'
          })
        "
      ></fx-cell>
      <fx-cell
        label="警告"
        clickable
        @click="
          onShowNotify({
            title: '警告文本',
            type: 'warning',
            icon: 'ExclamationCircleOutlined'
          })
        "
      ></fx-cell>
      <fx-cell
        label="危险"
        clickable
        @click="
          onShowNotify({
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
        clickable
        @click="onShowNotify({ title: '5秒后消失', duration: 5000 })"
      ></fx-cell>
      <fx-cell
        label="自定义颜色"
        clickable
        @click="
          onShowNotify({
            title: '深色调',
            icon: 'InfoCircleOutlined',
            backgroundColor: '#ff4d4f',
            color: '#ffffff'
          })
        "
      ></fx-cell>
      <fx-cell
        label="手动关闭"
        clickable
        @click="
          onShowNotify({ title: '常驻可手动关闭', duration: 0, closable: true })
        "
      ></fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="showNotify" clickable @click="onCallApi"></fx-cell>
      <fx-cell label="hideNotify" clickable @click="$hideNotify()"></fx-cell>
    </fx-group>
    <fx-notify
      :visible.sync="visible"
      :title="title"
      :type="type"
      :backgroundColor="backgroundColor"
      :color="color"
      :icon="icon"
      :duration="duration"
      :closable="closable"
      @cancel="onCancel"
      @show="onOtherEvent('show')"
      @shown="onOtherEvent('shown')"
      @hide="onOtherEvent('hide')"
      @hidden="onOtherEvent('hidden')"
    ></fx-notify>
  </div>
</template>

<script>
export default {
  name: 'Notify',
  props: {},
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
    onCallApi() {
      this.$showNotify({
        title: '通知文本',
        duration: 5000,
        closable: true,
        success(res) {
          console.log('success', res)
        }
      })
    },
    onShowNotify({
      title,
      backgroundColor,
      color,
      type,
      duration,
      icon,
      closable
    }) {
      this.icon = icon || null
      this.title = title || ''
      this.backgroundColor = backgroundColor || null
      this.color = color || null
      this.type = type || 'primary'
      this.closable = closable || false
      this.duration = duration != null ? duration : 1500
      this.visible = true
    },
    onOtherEvent(type) {
      console.log(`${type} 事件触发`)
    },
    onCancel(res) {
      console.log('cancel', res)
    }
  }
}
</script>
