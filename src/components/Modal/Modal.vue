<template>
  <div v-show="visibility" class="ly-modal" @click="onModalClick">
    <div class="ly-modal_box" @click.stop="onBoxClick">
      <div class="ly-modal_header">
        <span class="ly-modal_title">{{ title }}</span>
        <span class="ly-modal_close" v-show="showClose" @click="onCloseClick">
          <icon type="close"></icon>
        </span>
      </div>
      <div class="ly-modal_body">
        <div class="ly-modal_content">
          <slot></slot>
        </div>
      </div>
      <div class="ly-modal_footer">
        <button
          v-show="showCancel"
          class="ly-modal_button"
          @click="onCancelClick"
        >
          {{ cancelText }}
        </button>

        <button class="ly-modal_button primary" @click="onConfirmClick">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { CustomEvent } from '../../helpers/events'
// import './modal'

export default {
  name: 'ly-modal',
  components: { Icon },
  props: {
    visibility: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    showCancel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  created() {},
  beforeDestroy() {},
  methods: {
    onBoxClick() {},
    onModalClick(e) {
      if (this.maskClosable) {
        this.close(e)
      }
    },
    onCloseClick(e) {
      this.close(e)
    },
    onCancelClick(e) {
      const type = 'cancel'

      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el
          },
          {}
        )
      )

      this.close(e)
    },
    onConfirmClick(e) {
      const type = 'confirm'

      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el
          },
          {}
        )
      )

      this.close(e)
    },
    close() {
      this.$emit('update:visibility', false)

      const type = 'close'

      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el
          },
          {}
        )
      )
    }
  }
}
</script>

<style>
@import url('../../global.css');

.ly-modal {
  --confirm-background-color: var(--ly-main-color);
  --confirm-border-color: var(--ly-main-color);
  --confirm-font-color: #fff;
  --cancel-font-color: var(--ly-semi-color);
  --cancel-background-color: #fff;
  --cancel-border-color: var(--ly-light-color);

  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  text-align: left;
  transform: translateZ(0);
}

.ly-modal_box {
  width: 400px;
  box-sizing: border-box;
  border: 1px solid var(--ly-light-color);
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
}

.ly-modal_header {
  display: flex;
  align-items: center;
  height: 51px;
  padding: 0 0 0 20px;
}

.ly-modal_title {
  flex: 1;
  font-size: 16px;
  color: var(--ly-semi-color);
  margin-top: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.ly-modal_close {
  width: 30px;
  height: 30px;
  margin-bottom: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.ly-modal_close .ly-icon {
  width: 20px;
  height: 20px;
  fill: var(--ly-light-color);
}

.ly-modal_body {
  padding: 0 20px;
  overflow: hidden;
}

.ly-modal_content {
  max-height: 300px;
  overflow: auto;
  font-size: 14px;
  line-height: 1.715em;
  color: var(--ly-grey-color);
}

.ly-modal_footer {
  padding: 15px 20px 20px;
  display: flex;
  justify-content: flex-end;
}

.ly-modal_footer .ly-modal_button {
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  min-width: 64px;
  height: 32px;
  padding: 0 16px;
  font-size: 14px;
  line-height: 30px;
  border-width: 1px;
  border-style: solid;
  background: none;
  color: var(--cancel-font-color);
  background-color: var(--cancel-background-color);
  border-color: var(--cancel-border-color);
  margin: 0 0 0 10px;
}

.ly-modal_footer .ly-modal_button.primary {
  color: var(--confirm-font-color);
  background-color: var(--confirm-background-color);
  border-color: var(--confirm-border-color);
}

.ly-modal_footer .ly-modal_button:hover {
  opacity: 0.8;
}

.ly-modal_footer .ly-modal_button:active {
  opacity: 0.6;
}

@media screen and (max-width: 540px) {
  .ly-modal_box {
    width: calc(100% - 40px);
    margin: 0 20px;
  }

  .ly-modal_header .ly-modal_title {
    font-size: 18px;
  }

  .ly-modal_content {
    font-size: 16px;
  }

  .ly-modal_footer .ly-modal_button {
    height: 38px;
    line-height: 38px;
    font-size: 16px;
  }
}
</style>
