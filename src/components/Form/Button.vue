<template>
  <button
    :class="[prefix + '-button', typeClassName, sizeClassName]"
    :disabled="disabled"
    :type="realFormType"
    @click="onClick"
  >
    <icon :class="[prefix + '-button_loading-icon']" v-if="loading" type="loading"></icon>
    <slot>按钮</slot>
  </button>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { inArray } from '../../helpers/util'
import { SDKKey } from '../../config'

const SIZE_NAMES = ['default', 'mini', 'large']
const TYPE_NAMES = ['default', 'primary', 'warn']
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
  --font-color: var(--#{$prefix}-semi-color);
  --border-color: var(--#{$prefix}-light-color);
  --background-color: #fff;
  --icon-size: 20px;
  --icon-color: var(--#{$prefix}-semi-color);

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

  color: var(--font-color);
  background-color: var(--background-color);
  border-color: var(--border-color);

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

  &:not(:disabled):hover {
    opacity: 0.8;
  }

  &:not(:disabled):active {
    opacity: 0.6;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }

  &.type--primary {
    --font-color: #fff;
    --border-color: var(--#{$prefix}-main-color);
    --background-color: var(--#{$prefix}-main-color);
    --icon-color: #fff;
  }

  &.type--warn {
    --font-color: #fff;
    --border-color: var(--#{$prefix}-warn-color);
    --background-color: var(--#{$prefix}-warn-color);
    --icon-color: #fff;
  }

  &_loading-icon {
    display: inline-block;
    width: 1.429em;
    height: 1.429em;
    line-height: 1;
    margin: -0.2em 0.34em 0 0;
    vertical-align: middle;
    @include rotate-360-animation(800ms);
    fill: var(--icon-color);
  }
}
</style>
