<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell
        label="顶部弹出"
        isLink
        @click="show({ title: '顶部弹出', placement: 'top' })"
      ></fx-cell>
      <fx-cell
        label="底部弹出"
        isLink
        @click="show({ title: '底部弹出', placement: 'bottom' })"
      ></fx-cell>
      <fx-cell
        label="左侧弹出"
        isLink
        @click="show({ title: '左侧弹出', placement: 'left' })"
      ></fx-cell>
      <fx-cell
        label="右侧弹出"
        isLink
        @click="show({ title: '右侧弹出', placement: 'right' })"
      ></fx-cell>
    </fx-group>
    <fx-group title="无标题">
      <fx-cell
        label="底部弹出"
        isLink
        @click="show({ placement: 'bottom' })"
      ></fx-cell>
      <fx-cell
        label="右侧弹出"
        isLink
        @click="show({ placement: 'right' })"
      ></fx-cell>
    </fx-group>
    <fx-group title="展示关闭按钮">
      <fx-cell
        label="有标题-底部"
        isLink
        @click="show({ title: '标题', placement: 'bottom', showClose: true })"
      ></fx-cell>
      <fx-cell
        label="有标题-右侧"
        isLink
        @click="show({ title: '标题', placement: 'right', showClose: true })"
      ></fx-cell>
      <fx-cell
        label="无标题"
        isLink
        @click="show({ placement: 'bottom', showClose: true })"
      ></fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell
        label="visible-state-change"
        isLink
        @click="
          show({
            title: '标题',
            placement: 'bottom',
            showClose: true,
            visibleEvent: true
          })
        "
      ></fx-cell>
    </fx-group>
    <fx-drawer
      v-model:visible="drawerVisible"
      :title="title"
      :placement="placement"
      :showClose="showClose"
      @visible-state-change="onVisibleStateChange"
    ></fx-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PopupVisibleStateChangeArgs, PlacementType } from '../../utils/types'
import Toast from '@/Toast'

interface showArgs {
  title?: string
  placement?: PlacementType
  showClose?: boolean
  visibleEvent?: boolean
}

export default defineComponent({
  name: 'Drawer',
  data() {
    return {
      drawerVisible: false,
      title: '',
      placement: 'top',
      showClose: false,
      visibleEvent: false
    }
  },
  methods: {
    show({ title, placement, showClose, visibleEvent }: showArgs) {
      this.title = title || null
      this.placement = placement || 'top'
      this.showClose = showClose || false
      this.visibleEvent = !!visibleEvent
      this.drawerVisible = true
    },
    onVisibleStateChange({ state }: PopupVisibleStateChangeArgs) {
      if (this.visibleEvent) {
        Toast.showToast(`${state} 事件触发`)
        console.log(`${state} 事件触发`)
      }
    }
  }
})
</script>
