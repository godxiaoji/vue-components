<template>
  <div v-show="visibility" :class="[prefix + '-modal']" @click="onModalClick">
    <div :class="[prefix + '-modal_box']" @click.stop="onBoxClick">
      <div :class="[prefix + '-modal_header']">
        <span :class="[prefix + '-modal_title']">{{ title }}</span>
        <span :class="[prefix + '-modal_close']" v-show="showClose" @click="onCloseClick">
          <icon type="close"></icon>
        </span>
      </div>
      <div :class="[prefix + '-modal_body']">
        <div :class="[prefix + '-modal_content']">
          <slot></slot>
        </div>
      </div>
      <div :class="[prefix + '-modal_footer']">
        <button
          v-show="showCancel"
          :class="[prefix + '-modal_button']"
          @click="onCancelClick"
        >{{ cancelText }}</button>
        <button
          :class="[prefix + '-modal_button primary']"
          @click="onConfirmClick"
        >{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { CustomEvent } from '../../helpers/events'
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-modal',
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
    return { prefix: SDKKey }
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

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-modal {
  --confirm-background-color: var(--#{$prefix}-main-color);
  --confirm-border-color: var(--#{$prefix}-main-color);
  --confirm-font-color: #fff;
  --cancel-font-color: var(--#{$prefix}-semi-color);
  --cancel-background-color: #fff;
  --cancel-border-color: var(--#{$prefix}-light-color);

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

  &_box {
    width: 400px;
    box-sizing: border-box;
    border: 1px solid $light-color;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
  }

  &_header {
    display: flex;
    align-items: center;
    height: 51px;
    padding: 0 0 0 20px;
  }

  &_title {
    flex: 1;
    font-size: 16px;
    color: $semi-color;
    margin-top: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  &_close {
    width: 30px;
    height: 30px;
    margin-bottom: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .#{$prefix}-icon {
    width: 20px;
    height: 20px;
    fill: var(--#{$prefix}-light-color);
  }

  &_body {
    padding: 0 20px;
    overflow: hidden;
  }

  &_content {
    max-height: 300px;
    overflow: auto;
    font-size: 14px;
    line-height: 1.715em;
    color: $grey-color;
  }

  &_footer {
    padding: 15px 20px 20px;
    display: flex;
    justify-content: flex-end;

    .#{$prefix}-modal_button {
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

      &.primary {
        color: var(--confirm-font-color);
        background-color: var(--confirm-background-color);
        border-color: var(--confirm-border-color);
      }
      &:hover {
        opacity: 0.8;
      }
      &:active {
        opacity: 0.6;
      }
    }
  }
}

@media screen and (max-width: 540px) {
  .#{$prefix}-modal {
    &_box {
      width: calc(100% - 40px);
      margin: 0 20px;
    }

    &_title {
      font-size: 18px;
    }

    &_content {
      font-size: 16px;
    }

    &_footer {
      .#{$prefix}-modal_button {
        height: 38px;
        line-height: 38px;
        font-size: 16px;
      }
    }
  }
}
</style>
