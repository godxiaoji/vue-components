<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="基础">
        <fx-button
          size="small"
          id="popMenu"
          shape="circle"
          icon="MenuOutlined"
          @click=";(selector = '#popMenu'), (visible = true)"
        >
        </fx-button>
      </fx-cell>
      <fx-cell label="不展示蒙层">
        <fx-button
          size="small"
          id="popMenuNoMask"
          shape="circle"
          icon="MenuOutlined"
          @click="visible3 = true"
        >
        </fx-button>
      </fx-cell>
    </fx-group>
    <fx-group title="方向 placement=top/bottom/left/right">
      <div class="popover-box2">
        <div>
          <fx-button
            size="small"
            id="popMenuTop2"
            shape="circle"
            icon="UpOutlined"
            @click="
              ;(placement2 = 'top'),
                (selector2 = '#popMenuTop2'),
                (visible2 = true)
            "
          >
            上
          </fx-button>
        </div>
        <div>
          <fx-button
            size="small"
            id="popMenuLeft2"
            shape="circle"
            icon="LeftOutlined"
            @click="
              ;(placement2 = 'left'),
                (selector2 = '#popMenuLeft2'),
                (visible2 = true)
            "
          >
            左
          </fx-button>
          <fx-button
            size="small"
            id="popMenuRight2"
            shape="circle"
            icon="RightOutlined"
            @click="
              ;(placement2 = 'right'),
                (selector2 = '#popMenuRight2'),
                (visible2 = true)
            "
          >
            右
          </fx-button>
        </div>
        <div>
          <fx-button
            size="small"
            id="popMenuBottom2"
            shape="circle"
            icon="DownOutlined"
            @click="
              ;(placement2 = 'bottom'),
                (selector2 = '#popMenuBottom2'),
                (visible2 = true)
            "
          >
            下
          </fx-button>
        </div>
      </div>
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell label="confirm/cancel">
        <fx-button
          size="small"
          id="popMenuEvent"
          shape="circle"
          icon="MenuOutlined"
          @click="
            ;(selector = '#popMenuEvent'), (showEvent = true), (visible = true)
          "
        >
        </fx-button>
      </fx-cell>
      <fx-cell label="visible-state-change">
        <fx-button
          size="small"
          id="popMenuPopupEvent"
          shape="circle"
          icon="MenuOutlined"
          @click="
            ;(selector = '#popMenuPopupEvent'),
              (showPopupEvent = true),
              (visible = true)
          "
        >
        </fx-button>
      </fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="showPopMenu">
        <fx-button
          size="small"
          id="popMenuApi"
          shape="circle"
          icon="MenuOutlined"
          @click="onCallApi('#popMenuApi')"
        >
        </fx-button>
      </fx-cell>
    </fx-group>
    <fx-pop-menu
      :visible.sync="visible"
      :selector="selector"
      :options="options"
      @confirm="onConfirm"
      @cancel="onCancel"
      @visible-state-change="onVisibleStateChange"
    >
    </fx-pop-menu>
    <fx-pop-menu
      :visible.sync="visible2"
      :selector="selector2"
      :placement="placement2"
      :options="options"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
    </fx-pop-menu>
    <fx-pop-menu
      :visible.sync="visible3"
      selector="#popMenuNoMask"
      :options="options"
      :show-mask="false"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
    </fx-pop-menu>
  </div>
</template>

<script>
export default {
  name: 'PopMenu',
  props: {},
  data() {
    return {
      visible: false,
      selector: '',

      placement2: 'bottom',
      visible2: false,
      selector2: '',

      visible3: false,

      options: [
        {
          icon: 'HeartOutlined',
          name: '爱心'
        },
        {
          icon: 'StarOutlined',
          name: '星星'
        },
        {
          icon: 'CircleOutlined',
          name: '圈圈',
          disabled: true
        }
      ]
    }
  },
  methods: {
    onVisibleStateChange({ state }) {
      if (this.showPopupEvent) {
        this.$showToast(`${state} 事件触发`)
        console.log(`${state} 事件触发`)
      }
      if (state === 'hidden') {
        this.showPopupEvent = false
        this.showEvent = false
      }
    },
    onConfirm(res) {
      console.log('confirm', res)
      if (this.showEvent) {
        this.$showDialog({
          title: '选择了',
          showCancel: false,
          content: `item.name: '${res.item.name}'\nindex: ${res.index}`
        })
      }
    },
    onCancel(res) {
      console.log('cancel', res)
      this.showEvent && this.$showToast('取消了')
    },
    onCallApi(selector) {
      this.$showPopMenu({
        selector,
        options: this.options,
        placement: 'top',
        success: res => {
          console.log('confirm', res)
          if (res.selected) {
            this.$showToast(`选择了 ${res.detail.item.name}`)
          } else {
            this.$showToast('取消了')
          }
        }
      })
    }
  }
}
</script>
