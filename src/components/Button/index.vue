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
import { getPropValidation, getPropValue } from '../../helpers/validator'

const TYPE_NAMES = ['default', 'primary', 'warning', 'danger', 'success']
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
    size: getPropValidation('buttonSize'),
    type: {
      validator(val) {
        return inArray(val, TYPE_NAMES)
      },
      default: TYPE_NAMES[0]
    },
    pattern: getPropValidation('buttonPattern'),
    shape: getPropValidation('buttonShape'),
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
          : getPropValue('buttonPattern', this.pattern))
      )
    },
    sizeClassName() {
      return (
        'size--' +
        (this.appButtonGroupSubOptions
          ? this.appButtonGroupSubOptions.size
          : getPropValue('buttonSize', this.size))
      )
    },
    shapeClassName() {
      return (
        'shape--' +
        (this.appButtonGroupSubOptions
          ? this.appButtonGroupSubOptions.shape
          : getPropValue('buttonShape', this.shape))
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
  --button-icon-size: 18px;
  --button-size: 48px;

  display: inline-flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  height: var(--button-size);
  padding: 0 18px;
  font-size: 17px;
  line-height: 24px;
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
    background-color: rgba($color: $black-color, $alpha: 0.16);
  }

  + .#{$prefix}-button {
    margin-left: 16px;
  }

  .#{$prefix}-icon {
    --color: var(--button-font-color);
    --size: var(--button-icon-size);
  }

  &.shape--round {
    border-radius: calc(var(--button-size) / 2);
  }

  &.shape--round,
  &.shape--rectangle {
    .#{$prefix}-icon {
      margin: 0 10px 0 -1px;
    }
  }

  &.shape--square,
  &.shape--circle {
    width: var(--button-size);
    flex-grow: 0;
    flex-shrink: 0;
    padding: 0;

    --button-icon-size: 21px;

    &.size--middle {
      --button-icon-size: 20px;
    }

    &.size--small {
      --button-icon-size: 16px;
    }

    span {
      display: none;
    }
  }

  &.shape--circle {
    border-radius: 24px;
  }

  &.size--middle {
    --button-size: 40px;
    line-height: 22px;
    font-size: 16px;
    --button-icon-size: 17px;

    &::before {
      height: 10px;
    }

    &.shape--round,
    &.shape--rectangle {
      .#{$prefix}-icon {
        margin: 0 8px 0 -1px;
      }
    }
  }

  &.size--small {
    --button-size: 28px;
    line-height: 17px;
    font-size: 12px;
    --button-icon-size: 14px;
    // border-width: 0;

    &.shape--square,
    &.shape--rectangle {
      border-radius: 2px;
    }

    &::before {
      height: 8px;
    }

    // &::after {
    //   border-width: 1px;
    // }

    &.shape--round,
    &.shape--rectangle {
      .#{$prefix}-icon {
        margin: 0 4px 0 0;
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
      --button-border-color: #{$primary-border-color};
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
      --button-border-color: #{$success-border-color};
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
      --button-border-color: #{$warning-border-color};
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
      --button-border-color: #{$danger-border-color};
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

    // &::after {
    //   left: -50%;
    //   right: -50%;
    //   top: -50%;
    //   bottom: -50%;
    //   transform: scale(0.5);
    // }
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .#{$prefix}-button {
    &::before {
      transform: translate3d(0, -50%, 0) scaleX($one-third);
    }

    // &::after {
    //   left: -100%;
    //   right: -100%;
    //   top: -100%;
    //   bottom: -100%;
    //   transform: scale($one-third);
    // }
  }
}
</style>
