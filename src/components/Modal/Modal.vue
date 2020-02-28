<template>
  <div v-show="visibility" class="modal" @click="onModalClick">
    <div class="modal-box" @click.stop="onBoxClick">
      <div class="modal-header">
        <span class="modal-title">{{ title }}</span>
        <span class="modal-close" v-show="showClose" @click="onCloseClick">
          <icon type="close"></icon>
        </span>
      </div>
      <div class="modal-body">
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
      <div class="modal-footer">
        <button
          v-show="showCancel"
          class="modal-button modal-cancel-button"
          @click="onCancelClick"
        >
          {{ cancelText }}
        </button>
        <button
          class="modal-button modal-confirm-button primary"
          @click="onConfirmClick"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { getHandleEvent } from '../../helpers/events'
import './modal'

export default {
  name: 'app-modal',
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
      this.$emit(type, getHandleEvent(this.$el, e, {}, type))

      this.close(e)
    },
    onConfirmClick(e) {
      const type = 'confirm'
      this.$emit(type, getHandleEvent(this.$el, e, {}, type))

      this.close(e)
    },
    close(e) {
      this.$emit('update:visibility', false)

      const type = 'close'
      this.$emit(type, getHandleEvent(this.$el, e, {}, type))
    }
  }
}
</script>

<style>
@import url('../../global.css');

.modal {
  --confirm-background-color: var(--app-main-color);
  --confirm-border-color: var(--app-main-color);
  --confirm-font-color: #fff;
  --cancel-font-color: var(--app-semi-color);
  --cancel-background-color: #fff;
  --cancel-border-color: var(--app-light-color);

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

.modal-box {
  width: 400px;
  box-sizing: border-box;
  border: 1px solid var(--app-light-color);
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  height: 51px;
  padding: 0 0 0 20px;
}

.modal-header .modal-title {
  flex: 1;
  font-size: 16px;
  color: var(--app-semi-color);
  margin-top: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.modal-header .modal-close {
  width: 30px;
  height: 30px;
  margin-bottom: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.modal-header .modal-close .icon {
  width: 20px;
  height: 20px;
  fill: var(--app-light-color);
}

.modal-body {
  padding: 0 20px;
  overflow: hidden;
}

.modal-content {
  max-height: 300px;
  overflow: auto;
  font-size: 14px;
  line-height: 1.715em;
  color: var(--app-grey-color);
}

.modal-footer {
  padding: 15px 20px 20px;
  display: flex;
  justify-content: flex-end;
}

.modal-footer .modal-button {
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

.modal-footer .modal-button.primary {
  color: var(--confirm-font-color);
  background-color: var(--confirm-background-color);
  border-color: var(--confirm-border-color);
}

.modal-footer .modal-button:hover {
  opacity: 0.8;
}

.modal-footer .modal-button:active {
  opacity: 0.6;
}

@media screen and (max-width: 540px) {
  .modal-box {
    width: calc(100% - 40px);
    margin: 0 20px;
  }

  .modal-header .modal-title {
    font-size: 18px;
  }

  .modal-content {
    font-size: 16px;
  }

  .modal-footer .modal-button {
    height: 38px;
    line-height: 38px;
    font-size: 16px;
  }
}
</style>
