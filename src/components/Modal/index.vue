<template>
  <div
    v-show="visible"
    :class="[prefix + '-modal']"
    :style="{ zIndex }"
    @click="onModalClick"
  >
    <div
      :class="[prefix + '-modal_box', { visible }]"
      :style="boxStyles"
      @click.stop="onBoxClick"
    >
      <div :class="[prefix + '-modal_header']" v-if="hasHeader">
        <slot name="header"></slot>
      </div>
      <div :class="[prefix + '-modal_body']">
        <slot></slot>
      </div>
      <div :class="[prefix + '-modal_footer']" v-if="hasFooter">
        <slot name="footer"></slot>
      </div>
      <i
        v-if="showClose"
        :class="[prefix + '-modal_close']"
        @click="onCloseClick"
        ><icon class-name="CloseOutlined"></icon
      ></i>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { CustomEvent } from '../../helpers/events'
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-modal',
  components: { Icon },
  props: {
    width: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 10000
    }
  },
  data() {
    return { prefix: SDKKey, hasHeader: false, hasFooter: false }
  },
  computed: {
    boxStyles() {
      const styles = {}

      if (this.width) {
        styles.width = this.width
      }

      return styles
    }
  },
  created() {},
  mounted() {
    if (this.$scopedSlots.header) {
      this.hasHeader = true
    }

    if (this.$scopedSlots.footer) {
      this.hasFooter = true
    }
  },
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
    close() {
      this.$emit('update:visible', false)

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
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: $black-color, $alpha: 0.5);
  text-align: left;
  transform: translateZ(0);

  &_box {
    width: 400px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #fff;
    transform: scale(0);
    transition: all 0.2s;
    opacity: 0;

    &.visible {
      opacity: 1;
      transform: scale(1);
    }
  }

  &_header {
    flex: 1;
    font-size: 21px;
    font-weight: bold;
    color: $title-color;
    padding: 16px 0 12px;
    margin: 0 24px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
  }

  &_body {
    padding: 0;
    font-size: 17px;
    line-height: 23.8px;
    color: $font-color;
  }

  &_footer {
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    margin: 0 24px;
  }

  &_close {
    position: absolute;
    left: 50%;
    bottom: -56px;
    margin: 0 0 0 -20px;
    background-color: rgba($color: $black-color, $alpha: 0.5);
    border: 2px solid #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;

    .#{$prefix}-icon {
      --size: 24px;
      --color: #fff;
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
