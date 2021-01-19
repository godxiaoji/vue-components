<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell
        label="顶部弹出"
        clickable
        @click="onShow({ title: '顶部弹出', placement: 'top' })"
      ></fx-cell>
      <fx-cell
        label="底部弹出"
        clickable
        @click="onShow({ title: '底部弹出', placement: 'bottom' })"
      ></fx-cell>
      <fx-cell
        label="左侧弹出"
        clickable
        @click="onShow({ title: '左侧弹出', placement: 'left' })"
      ></fx-cell>
      <fx-cell
        label="右侧弹出"
        clickable
        @click="onShow({ title: '右侧弹出', placement: 'right' })"
      ></fx-cell>
    </fx-group>
    <fx-group title="无标题">
      <fx-cell
        label="底部弹出"
        clickable
        @click="onShow({ placement: 'bottom' })"
      ></fx-cell>
      <fx-cell
        label="右侧弹出"
        clickable
        @click="onShow({ placement: 'right' })"
      ></fx-cell>
    </fx-group>
    <fx-group title="展示关闭按钮">
      <fx-cell
        label="有标题-底部"
        clickable
        @click="onShow({ title: '标题', placement: 'bottom', showClose: true })"
      ></fx-cell>
      <fx-cell
        label="有标题-右侧"
        clickable
        @click="onShow({ title: '标题', placement: 'right', showClose: true })"
      ></fx-cell>
      <fx-cell
        label="无标题"
        clickable
        @click="onShow({ placement: 'bottom', showClose: true })"
      ></fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell
        label="show/shown/hide/hidden"
        clickable
        @click="
          onShow({
            title: '标题',
            placement: 'bottom',
            showClose: true,
            showEventCallback: true
          })
        "
      ></fx-cell>
    </fx-group>
    <fx-drawer
      v-model:visible="drawerVisible"
      :title="title"
      :placement="placement"
      :show-close="showClose"
      @show="onEvent('show')"
      @shown="onEvent('shown')"
      @hide="onEvent('hide')"
      @hidden="onEvent('hidden')"
    ></fx-drawer>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  props: {},
  data() {
    return {
      drawerVisible: false,
      title: '',
      placement: 'top',
      showClose: false
    }
  },
  methods: {
    onShow({ title, placement, showClose, showEventCallback }) {
      this.title = title || null
      this.placement = placement || 'top'
      this.showClose = showClose || false
      this.showEventCallback = !!showEventCallback
      this.drawerVisible = true
    },
    onEvent(type) {
      if (this.showEventCallback) {
        this.$showToast(`${type} 事件触发`)
        console.log(`${type} 事件触发`)
      }
    }
  }
}
</script>
