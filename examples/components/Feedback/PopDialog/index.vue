<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="基础">
        <fx-button
          size="small"
          id="popDialog"
          shape="circle"
          icon="DeleteOutlined"
          @click=";(selector = '#popDialog'), (visible = true)"
        >
        </fx-button>
      </fx-cell>
      <fx-cell label="不展示取消按钮">
        <fx-button
          size="small"
          id="popDialogNoCancel"
          shape="circle"
          icon="DeleteOutlined"
          @click="
            ;(selector = '#popDialogNoCancel'),
              (showCancel = false),
              (visible = true)
          "
        >
        </fx-button>
      </fx-cell>
      <fx-cell label="设置按钮文案">
        <fx-button
          size="small"
          id="popDialogButtonText"
          shape="circle"
          icon="DeleteOutlined"
          @click="
            ;(selector = '#popDialogButtonText'),
              (confirmText = '接受'),
              (cancelText = '拒绝'),
              (visible = true)
          "
        >
        </fx-button>
      </fx-cell>
      <fx-cell label="不展示蒙层">
        <fx-button
          size="small"
          id="popDialogNoMask"
          shape="circle"
          icon="DeleteOutlined"
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
            id="popDialogTop2"
            shape="circle"
            icon="UpOutlined"
            @click="
              ;(placement2 = 'top'),
                (selector2 = '#popDialogTop2'),
                (visible2 = true)
            "
          >
            上
          </fx-button>
        </div>
        <div>
          <fx-button
            size="small"
            id="popDialogLeft2"
            shape="circle"
            icon="LeftOutlined"
            @click="
              ;(placement2 = 'left'),
                (selector2 = '#popDialogLeft2'),
                (visible2 = true)
            "
          >
            左
          </fx-button>
          <fx-button
            size="small"
            id="popDialogRight2"
            shape="circle"
            icon="RightOutlined"
            @click="
              ;(placement2 = 'right'),
                (selector2 = '#popDialogRight2'),
                (visible2 = true)
            "
          >
            右
          </fx-button>
        </div>
        <div>
          <fx-button
            size="small"
            id="popDialogBottom2"
            shape="circle"
            icon="DownOutlined"
            @click="
              ;(placement2 = 'bottom'),
                (selector2 = '#popDialogBottom2'),
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
          id="popDialogEvent"
          shape="circle"
          icon="DeleteOutlined"
          @click="
            ;(selector = '#popDialogEvent'),
              (showEvent = true),
              (visible = true)
          "
        >
        </fx-button>
      </fx-cell>
      <fx-cell label="visible-state-change">
        <fx-button
          size="small"
          id="popDialogPopupEvent"
          shape="circle"
          icon="DeleteOutlined"
          @click="
            ;(selector = '#popDialogPopupEvent'),
              (showPopupEvent = true),
              (visible = true)
          "
        >
        </fx-button>
      </fx-cell>
    </fx-group>
    <fx-group title="API">
      <fx-cell label="showPopDialog">
        <fx-button
          size="small"
          id="popDialogApi"
          shape="circle"
          icon="DeleteOutlined"
          @click="onCallApi('#popDialogApi')"
        >
        </fx-button>
      </fx-cell>
    </fx-group>
    <fx-pop-dialog
      v-model:visible="visible"
      :selector="selector"
      :content="content"
      :show-cancel="showCancel"
      :confirm-text="confirmText"
      :cancel-text="cancelText"
      @cancel="onCancel"
      @confirm="onConfirm"
      @visible-state-change="onVisibleStateChange"
    >
    </fx-pop-dialog>
    <fx-pop-dialog
      v-model:visible="visible2"
      :selector="selector2"
      :placement="placement2"
      content="这是气泡内容"
      :show-cancel="false"
    >
    </fx-pop-dialog>
    <fx-pop-dialog
      v-model:visible="visible3"
      selector="#popDialogNoMask"
      content="这是气泡内容"
      :show-cancel="false"
      :show-mask="false"
    >
    </fx-pop-dialog>
  </div>
</template>

<script>
export default {
  name: 'PopDialog',
  props: {},
  data() {
    return {
      visible: false,
      content: '确定要删除该条数据？',
      showCancel: true,
      selector: '',
      confirmText: '确定',
      cancelText: '取消',

      placement2: 'bottom',
      visible2: false,
      selector2: '',

      visible3: false
    }
  },
  methods: {
    onVisibleStateChange({ state }) {
      if (this.showPopupEvent) {
        this.$showToast(`${state} 事件触发`)
        console.log(`${state} 事件触发`)
      }
      if (state === 'hidden') {
        this.showCancel = true
        this.showPopupEvent = false
        this.showEvent = false
        this.content = '确定要删除该条数据？'
        this.confirmText = '确定'
        this.cancelText = '取消'
      }
    },
    onCancel(res) {
      console.log('cancel', res)
      if (this.showEvent) {
        this.$showToast(`取消事件触发`)
      }
    },
    onConfirm(res) {
      console.log('confirm', res)
      if (this.showEvent) {
        this.$showToast(`确定事件触发`)
      }
    },
    onCallApi(selector) {
      this.$showPopDialog({
        selector,
        placement: 'top',
        content: this.content,
        success: res => {
          console.log('success', res)
          this.$showToast(res.confirm ? `点击了确定` : `点击了取消`)
        }
      })
    }
  }
}
</script>
