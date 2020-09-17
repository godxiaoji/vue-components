<template>
  <button
    :class="[prefix + '-button', typeClassName, sizeClassName]"
    :disabled="disabled"
    :type="realFormType"
    @click="onClick"
  >
    <icon
      :class="[prefix + '-button_loading-icon']"
      v-if="loading"
      type="loading"
    ></icon>
    <slot>按钮</slot>
  </button>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { inArray } from '../../helpers/util'
import { SDKKey } from '../../config'

const SIZE_NAMES = ['default', 'mini', 'large']
const TYPE_NAMES = ['primary', 'warning', 'secondary']
const FORM_TYPE_NAMES = ['button', 'submit', 'reset']

export default {
  name: SDKKey + '-button',
  components: { Icon },
  props: {
    size: {
      type: String,
      default: SIZE_NAMES[0]
    },
    type: {
      type: String,
      default: TYPE_NAMES[0]
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    formType: {
      type: String,
      default: FORM_TYPE_NAMES[0]
    }
  },
  data() {
    return {
      prefix: SDKKey
    }
  },
  computed: {
    // 计算属性的 getter
    typeClassName() {
      return (
        'type--' + (inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0])
      )
    },
    sizeClassName() {
      return (
        'size--' + (inArray(this.size, SIZE_NAMES) ? this.size : SIZE_NAMES[0])
      )
    },
    realFormType() {
      return inArray(this.formType, FORM_TYPE_NAMES)
        ? this.formType
        : FORM_TYPE_NAMES[0]
    }
  },
  ready() {},
  mounted() {
    this.$el._app_type = 'button'
  },
  updated() {},
  attached() {},
  methods: {
    onClick(e) {
      this.$emit(e.type, e)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-button {
  --icon-size: 20px;
  --icon-color: #000;

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

  color: #000;
  background-color: #fbfafc;
  border-color: #d6d5d6;

  &.size--mini {
    min-width: 48px;
    height: 24px;
    padding: 0 8px;
    line-height: 22px;
    font-size: 12px;
    --icon-size: 16px;
  }

  &.size--large {
    min-width: 72px;
    height: 40px;
    padding: 0 16px;
    line-height: 38px;
    font-size: 16px;
    --icon-size: 22px;
  }

  &:not(:disabled):hover,
  &:not(:disabled):active {
    background-color: #dfdfdf;
    border-color: #bfbfbf;
    color: rgba($color: #000000, $alpha: 0.6);
    --icon-color: rgba(0, 0, 0, 0.6);
  }

  &:disabled {
    cursor: not-allowed;
    border-color: rgba($color: #d6d5d6, $alpha: 0.6);
    background-color: rgba($color: #fbfafc, $alpha: 0.6);
    color: rgba($color: #000000, $alpha: 0.3);
    --icon-color: rgba(0, 0, 0, 0.3);
  }

  &.type--primary {
    color: #fff;
    border-color: #029400;
    background-color: #09bb07;
    --icon-color: #fff;

    &:not(:disabled):hover,
    &:not(:disabled):active {
      border-color: #029400;
      background-color: #09bb07;
      color: rgba($color: #fff, $alpha: 0.3);
      --icon-color: rgba(255, 255, 255, 0.3);
    }

    &:disabled {
      border-color: rgba($color: #029400, $alpha: 0.4);
      background-color: rgba($color: #09bb07, $alpha: 0.4);
      color: rgba($color: #fff, $alpha: 0.6);
      --icon-color: rgba(255, 255, 255, 0.6);
    }
  }

  &.type--warning {
    color: #fff;
    border-color: #d64949;
    background-color: #e94f4f;
    --icon-color: #fff;

    &:not(:disabled):hover,
    &:not(:disabled):active {
      border-color: #c04242;
      background-color: #d14747;
      color: rgba($color: #fff, $alpha: 0.3);
      --icon-color: rgba(255, 255, 255, 0.3);
    }

    &:disabled {
      color: rgba($color: #fff, $alpha: 0.6);
      --icon-color: rgba(255, 255, 255, 0.6);
    }
  }

  .#{$prefix}-icon {
    display: inline-block;
    line-height: 1;
    margin: -0.2em 0.34em 0 0;
    vertical-align: middle;
    --size: var(--icon-size);
    --color: var(--icon-color);
  }

  &_loading-icon {
    @include rotate-360-animation(800ms);
  }
}
</style>
