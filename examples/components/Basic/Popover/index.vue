<template>
  <div>
    <fx-group title="基础用法">
      <div class="popover-box">
        <fx-button
          size="small"
          id="popoverLeft"
          shape="circle"
          icon="PlusOutlined"
          @click="
            selector = '#popoverLeft'
            visible = true
          "
        >
          左
        </fx-button>
        <fx-button
          size="small"
          id="popoverCenter"
          shape="circle"
          icon="PlusOutlined"
          @click="
            selector = '#popoverCenter'
            visible = true
          "
        >
          中
        </fx-button>
        <fx-button
          size="small"
          id="popoverRight"
          shape="circle"
          icon="PlusOutlined"
          @click="
            selector = '#popoverRight'
            visible = true
          "
        >
          右
        </fx-button>
      </div>
    </fx-group>
    <fx-group title="方向 placement=top/bottom/left/right">
      <div class="popover-box2">
        <div>
          <fx-button
            size="small"
            id="popoverTop2"
            shape="circle"
            icon="UpOutlined"
            @click="
              placement = 'top'
              selector = '#popoverTop2'
              visible = true
            "
          >
            上
          </fx-button>
        </div>
        <div>
          <fx-button
            size="small"
            id="popoverLeft2"
            shape="circle"
            icon="LeftOutlined"
            @click="
              placement = 'left'
              selector = '#popoverLeft2'
              visible = true
            "
          >
            左
          </fx-button>
          <fx-button
            size="small"
            id="popoverRight2"
            shape="circle"
            icon="RightOutlined"
            @click="
              placement = 'right'
              selector = '#popoverRight2'
              visible = true
            "
          >
            右
          </fx-button>
        </div>
        <div>
          <fx-button
            size="small"
            id="popoverBottom2"
            shape="circle"
            icon="DownOutlined"
            @click="
              placement = 'bottom'
              selector = '#popoverBottom2'
              visible = true
            "
          >
            下
          </fx-button>
        </div>
      </div>
    </fx-group>
    <fx-group title="带选项">
      <fx-cell label="长文案">
        <fx-button
          size="small"
          id="popoverLongContent"
          shape="circle"
          icon="PlusOutlined"
          @click="
            selector = '#popoverLongContent'
            content =
              '这是气泡内容这是气泡内容这是气泡内容这是气泡内容这是气泡内容这是气泡内容'
            visible = true
          "
        >
        </fx-button>
      </fx-cell>
      <fx-cell label="不展示蒙层">
        <fx-button
          size="small"
          id="popoverNoMask"
          shape="circle"
          icon="PlusOutlined"
          @click="onShowNoMask"
        >
        </fx-button>
      </fx-cell>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell label="show/shown/hide/hidden">
        <fx-button
          size="small"
          id="popoverEvent"
          shape="circle"
          icon="PlusOutlined"
          @click="
            selector = '#popoverEvent'
            showEventCallback = true
            visible = true
          "
        >
        </fx-button>
      </fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="showPopover">
        <fx-button
          size="small"
          id="popoverApi"
          shape="circle"
          icon="PlusOutlined"
          @click="onCallApi('#popoverApi')"
        >
        </fx-button>
      </fx-cell>
    </fx-group>
    <fx-popover
      :visible.sync="visible"
      :selector="selector"
      :placement="placement"
      :content="content"
      @show="onEvent('show')"
      @shown="onEvent('shown')"
      @hide="onEvent('hide')"
      @hidden="onEvent('hidden')"
    >
    </fx-popover>
    <fx-popover
      :visible.sync="noMaskVisible"
      selector="#popoverNoMask"
      :show-mask="false"
      content="无蒙层气泡内容"
    >
    </fx-popover>
  </div>
</template>

<script>
export default {
  name: 'Popover',
  props: {},
  data() {
    return {
      visible: false,
      selector: '',
      placement: 'bottom',
      content: '这是气泡内容',
      noMaskVisible: false
    }
  },
  methods: {
    onShowNoMask() {
      this.noMaskVisible = true
      setTimeout(() => {
        this.noMaskVisible = false
      }, 3000)
    },
    onEvent(type) {
      if (this.showEventCallback) {
        this.$showToast(`${type} 事件触发`)
        console.log(`${type} 事件触发`)
      }
      if (type === 'hidden') {
        this.selector = ''
        this.placement = 'bottom'
        this.content = '这是气泡内容'
        this.showEventCallback = false
      }
    },
    onSelect(res) {
      this.$showDialog({
        title: '选择了',
        showCancel: false,
        content: `item.name: '${res.item.name}'\nindex: ${res.index}`
      })
    },
    onCallApi(selector) {
      this.$showPopover({
        selector,
        content: '这是气泡内容',
        placement: 'top',
        success: res => {
          console.log('success', res)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../../src/components/style/var.scss';

.popover {
  &-box {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
  }

  &-box2 {
    padding: 8px 16px;

    > div {
      display: flex;
      justify-content: center;
    }

    .fx-button + .fx-button {
      margin-left: 32px;
    }
  }

  &-content {
    padding: 50px 12px;
    font-size: 17px;
    color: $title-color;
    line-height: 24px;
  }
}
</style>
