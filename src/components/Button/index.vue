<template>
  <button
    :class="[
      prefix + '-button',
      typeClassName,
      sizeClassName,
      patternClassName,
      shapeClassName,
      { 'has--icon': loading || icon, ghost: !!ghost }
    ]"
    :disabled="disabled"
    :type="realFormType"
    @click="onClick"
  >
    <icon v-if="loading" class-name="LoadingOutlined" :spin="true"></icon>
    <icon v-else-if="icon" :class-name="icon"></icon>
    <span><slot>按钮</slot></span>
  </button>
</template>

<script>
import Icon from '../Icon'
import { inArray } from '../../helpers/util'
import { SDKKey } from '../../config'

const SIZE_NAMES = ['default', 'small']
const TYPE_NAMES = ['default', 'primary', 'warning', 'danger', 'success']
const PATTERN_NAMES = ['default', 'solid', 'dashed', 'borderless']
const SHAPE_NAMES = ['default', 'round', 'circle', 'square']
const FORM_TYPE_NAMES = ['button', 'submit', 'reset']

export default {
  name: SDKKey + '-button',
  components: { Icon },
  inject: {
    appButtonGroupSubOptions: {
      default: null
    },
    appButtonGroup: {
      default: null
    }
  },
  props: {
    size: {
      validator(val) {
        return inArray(val, SIZE_NAMES)
      },
      default: SIZE_NAMES[0]
    },
    type: {
      validator(val) {
        return inArray(val, TYPE_NAMES)
      },
      default: TYPE_NAMES[0]
    },
    pattern: {
      validator(val) {
        return inArray(val, PATTERN_NAMES)
      },
      default: PATTERN_NAMES[0]
    },
    shape: {
      validator(val) {
        return inArray(val, SHAPE_NAMES)
      },
      default: SHAPE_NAMES[0]
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
      validator(val) {
        return inArray(val, FORM_TYPE_NAMES)
      },
      default: FORM_TYPE_NAMES[0]
    },
    icon: {
      type: String,
      default: ''
    },
    ghost: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey
    }
  }, // 计算属性的 getter
  computed: {
    typeClassName() {
      return (
        'type--' + (inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0])
      )
    },
    patternClassName() {
      return (
        'pattern--' +
        (this.appButtonGroupSubOptions
          ? this.appButtonGroupSubOptions.pattern
          : inArray(this.pattern, PATTERN_NAMES)
          ? this.pattern
          : PATTERN_NAMES[0])
      )
    },
    sizeClassName() {
      return (
        'size--' +
        (this.appButtonGroupSubOptions
          ? this.appButtonGroupSubOptions.size
          : inArray(this.size, SIZE_NAMES)
          ? this.size
          : SIZE_NAMES[0])
      )
    },
    shapeClassName() {
      return (
        'shape--' +
        (this.appButtonGroupSubOptions
          ? this.appButtonGroupSubOptions.shape
          : inArray(this.shape, SHAPE_NAMES)
          ? this.shape
          : SHAPE_NAMES[0])
      )
    },
    realFormType() {
      return inArray(this.formType, FORM_TYPE_NAMES)
        ? this.formType
        : FORM_TYPE_NAMES[0]
    }
  },
  created() {
    this.appButtonGroup && this.appButtonGroup.addButton(this._uid)
  },
  ready() {},
  mounted() {
    this.$el._app_type = 'button'
  },
  destroyed() {
    this.appButtonGroup && this.appButtonGroup.removeButton(this._uid)
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
  --button-font-color: #fff;
  --button-border-color: transparent;
  --button-icon-size: 21px;

  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  min-width: 72px;
  height: 48px;
  padding: 0 12px;
  font-size: 17px;
  line-height: 23.8px;
  border: 1px solid var(--button-border-color);
  background: #fff;
  font-weight: 500;
  color: var(--button-font-color);
  user-select: none;
  position: relative;
  overflow: hidden;
  -webkit-appearance: none;

  span {
    word-break: break-word;
    white-space: nowrap;
    overflow: hidden;
  }

  &::before {
    position: absolute;
    left: 0;
    top: 50%;
    height: 12px;
    width: 1px;
    transform: translate3d(0, -50%, 0) scaleX(1);
    background-color: var(--button-border-color);
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    border: 0 solid var(--button-border-color);
  }

  &:not(:disabled):active::after {
    background-color: rgba(0, 0, 0, 0.16);
  }

  + .#{$prefix}-button {
    margin-left: 16px;
  }

  .#{$prefix}-icon {
    --color: var(--button-font-color);
    --size: var(--button-icon-size);
    margin: 0 10px 0 -1px;
  }

  &.shape--round {
    border-radius: 24px;
  }

  &.shape--square,
  &.shape--circle {
    width: 48px;
    min-width: 48px;
    flex: 0;
    padding: 0;

    .#{$prefix}-icon {
      margin: 0;
    }

    span {
      display: none;
    }
  }

  &.shape--circle {
    border-radius: 24px;
  }

  &.size--small {
    min-width: 60px;
    height: 32px;
    padding: 0 8px;
    line-height: 16.8px;
    font-size: 12px;
    border-radius: 2px;
    --button-icon-size: 18px;
    // border-width: 0;

    &::before {
      height: 8px;
    }

    // &::after {
    //   border-width: 1px;
    // }

    .#{$prefix}-icon {
      margin: 0 4px 0 0;
    }

    &.shape--round {
      border-radius: 16px;
    }

    &.shape--circle {
      border-radius: 16px;
      width: 32px;
      min-width: 32px;
      padding: 0;
    }

    &.shape--square {
      width: 32px;
      min-width: 32px;
      padding: 0;
    }

    &.shape--square,
    &.shape--circle {
      .#{$prefix}-icon {
        margin: 0;
      }
    }
  }

  &.pattern--dashed,
  &.pattern--dashed::after {
    border-style: dashed;
  }

  &.pattern--borderless,
  &.pattern--borderless::after {
    border-width: 0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }

  &.type--default {
    background-color: #fff;
    --button-font-color: #{$title-color};
    --button-border-color: #{$border-color};

    &.ghost {
      background-color: transparent;
      --button-font-color: #fff;
      --button-border-color: #fff;
    }
  }

  &.type--primary {
    background-color: $primary-color;

    &.pattern--solid,
    &.pattern--dashed,
    &.pattern--borderless,
    &.ghost {
      background-color: #fff;
      --button-font-color: #{$primary-color};
      --button-border-color: #{$primary-color};
    }

    &.ghost {
      background-color: transparent;
    }
  }

  &.type--success {
    background-color: $success-color;

    &.pattern--solid,
    &.pattern--dashed,
    &.pattern--borderless,
    &.ghost {
      background-color: #fff;
      --button-font-color: #{$success-color};
      --button-border-color: #{$success-color};
    }

    &.ghost {
      background-color: transparent;
    }
  }

  &.type--warning {
    background-color: $warning-color;

    &.pattern--solid,
    &.pattern--dashed,
    &.pattern--borderless,
    &.ghost {
      background-color: #fff;
      --button-font-color: #{$warning-color};
      --button-border-color: #{$warning-color};
    }

    &.ghost {
      background-color: transparent;
    }
  }

  &.type--danger {
    background-color: $danger-color;

    &.pattern--solid,
    &.pattern--dashed,
    &.pattern--borderless,
    &.ghost {
      background-color: #fff;
      --button-font-color: #{$danger-color};
      --button-border-color: #{$danger-color};
    }

    &.ghost {
      background-color: transparent;
    }
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .#{$prefix}-button {
    &::before {
      transform: translate3d(0, -50%, 0) scaleX(0.5);
    }

    &::after {
      left: -50%;
      right: -50%;
      top: -50%;
      bottom: -50%;
      transform: scale(0.5);
    }
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .#{$prefix}-button {
    &::before {
      transform: translate3d(0, -50%, 0) scaleX($one-third);
    }

    &::after {
      left: -100%;
      right: -100%;
      top: -100%;
      bottom: -100%;
      transform: scale($one-third);
    }
  }
}
</style>
