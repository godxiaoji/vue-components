<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="默认" clickable @click="visible = true"></fx-cell>
      <fx-cell
        label="展示标题"
        clickable
        @click="
          title = '标题'
          visible = true
        "
      ></fx-cell>
      <fx-cell
        label="展示取消按钮"
        clickable
        @click="
          showCancel = true
          visible = true
        "
      ></fx-cell>
      <fx-cell
        label="设置取消按钮文案"
        clickable
        @click="
          showCancel = true
          cancelText = '自定义取消按钮文案'
          visible = true
        "
      ></fx-cell>
    </fx-group>
    <fx-group title="options 扩展">
      <fx-cell
        label="选项描述"
        clickable
        @click="
          options = [
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
          ]
          visible = true
        "
      ></fx-cell>
      <fx-cell
        label="选项高亮"
        clickable
        @click="
          options = [
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
          ]
          visible = true
        "
      ></fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell
        label="select/cancel"
        clickable
        @click="
          showCancel = true
          showSelectEvent = true
          visible = true
        "
      ></fx-cell>
      <fx-cell
        label="show/shown/hide/hidden"
        clickable
        @click="
          showOtherEvent = true
          visible = true
        "
      ></fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="showActionSheet" clickable @click="onCallApi()"></fx-cell>
    </fx-group>
    <fx-action-sheet
      :visible.sync="visible"
      :title="title"
      :options="options"
      :show-cancel="showCancel"
      :cancel-text="cancelText"
      @select="onSelect"
      @cancel="onCancel"
      @show="onEvent('show')"
      @shown="onEvent('shown')"
      @hide="onEvent('hide')"
      @hidden="onEvent('hidden')"
    ></fx-action-sheet>
  </div>
</template>

<script>
const options = [
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

export default {
  name: 'ActionSheet',
  props: {},
  data() {
    return {
      visible: false,
      title: null,
      showCancel: false,
      cancelText: '取消',
      options: options,
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
      ]
    }
  },
  methods: {
    onEvent(type) {
      if (this.showOtherEvent) {
        this.$showToast(`${type} 事件触发`)
        console.log(`${type} 事件触发`)
      }
      if (type === 'hidden') {
        this.showCancel = false
        this.cancelText = '取消'
        this.options = options
        this.title = null
        this.showOtherEvent = false
        this.showSelectEvent = false
      }
    },
    onSelect(res) {
      console.log('select', res)
      if (this.showSelectEvent) {
        this.$showDialog({
          title: '选择了',
          showCancel: false,
          content: `item.name: '${res.item.name}'\nindex: ${res.index}`
        })
      }
    },
    onCancel(res) {
      console.log('cancel', res)
      this.showSelectEvent && this.$showToast(`取消事件触发`)
    },
    onCallApi() {
      this.$showActionSheet({
        title: '标题',
        options: this.options,
        showCancel: true,
        success: ({ selected, detail }) => {
          if (selected) {
            this.$showDialog({
              title: '选择了',
              showCancel: false,
              content: `item.name: '${detail.item.name}'\nindex: ${detail.index}`
            })
          } else {
            this.$showToast('取消了')
          }
        }
      })
    }
  }
}
</script>
