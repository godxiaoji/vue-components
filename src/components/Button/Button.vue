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
    <icon v-if="loading" class-name="LoadingOutlined" :spin="true" />
    <icon v-else-if="icon" :class-name="icon" />
    <span><slot>按钮</slot></span>
  </button>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../../config'
import { createEnumsValidator, getEnumsValue } from '../../helpers/validator'

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
      validator: createEnumsValidator('buttonSize'),
      default: null
    },
    type: {
      validator: createEnumsValidator('buttonType'),
      default: null
    },
    pattern: {
      validator: createEnumsValidator('buttonPattern'),
      default: null
    },
    shape: {
      validator: createEnumsValidator('buttonShape'),
      default: null
    },
    formType: {
      validator: createEnumsValidator('buttonFormType'),
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
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
      return 'type--' + getEnumsValue('buttonType', this.type)
    },
    patternClassName() {
      return (
        'pattern--' +
        getEnumsValue(
          'buttonPattern',
          this.appButtonGroupSubOptions ? this.appButtonGroupSubOptions.pattern : this.pattern
        )
      )
    },
    sizeClassName() {
      return (
        'size--' +
        getEnumsValue('buttonSize', this.appButtonGroupSubOptions ? this.appButtonGroupSubOptions.size : this.size)
      )
    },
    shapeClassName() {
      return (
        'shape--' +
        getEnumsValue('buttonShape', this.appButtonGroupSubOptions ? this.appButtonGroupSubOptions.shape : this.shape)
      )
    },
    realFormType() {
      return getEnumsValue('buttonFormType', this.formType)
    }
  },
  created() {
    this.appButtonGroup && this.appButtonGroup.addButton(this._uid)
  },
  mounted() {
    this.$el._app_type = 'button'
  },
  destroyed() {
    this.appButtonGroup && this.appButtonGroup.removeButton(this._uid)
  },
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
  --button-icon-size: 20px;
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
  padding: 0 11px;
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
  transform: translateZ(0);

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
    flex-shrink: 0;
    --color: var(--button-font-color);
    --size: var(--button-icon-size);
  }

  &.shape--round {
    border-radius: calc(var(--button-size) / 2);
  }

  &.shape--round,
  &.shape--rectangle {
    .#{$prefix}-icon {
      margin: 0 8px 0 -2px;
    }
  }

  &.shape--square,
  &.shape--circle {
    flex-grow: 0;
    flex-shrink: 0;

    --button-icon-size: 24px;

    &.size--middle {
      --button-icon-size: 20px;
    }

    &.size--small {
      --button-icon-size: 18px;
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
    line-height: 21px;
    font-size: 15px;
    --button-icon-size: 18px;

    &.shape--square,
    &.shape--circle {
      padding: 0 9px;
    }

    &.shape--square,
    &.shape--rectangle {
      border-radius: 3px;
    }

    &::before {
      height: 10px;
    }

    &.shape--round,
    &.shape--rectangle {
      .#{$prefix}-icon {
        margin: 0 4px 0 -2px;
      }
    }
  }

  &.size--small {
    --button-size: 28px;
    line-height: 17px;
    font-size: 12px;
    --button-icon-size: 16px;
    // border-width: 0;

    &.shape--square,
    &.shape--circle {
      padding: 0 4px;
    }

    &.shape--square,
    &.shape--rectangle {
      border-radius: 2px;
    }

    // &::after {
    //   border-width: 1px;
    // }

    &.shape--round,
    &.shape--rectangle {
      .#{$prefix}-icon {
        margin: 0 2px 0 -2px;
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

    &.pattern--gradient {
      background-image: linear-gradient(90deg, $primary-border-color 0%, $primary-color 100%);
      --button-border-color: transparent;
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

    &.pattern--gradient {
      background-image: linear-gradient(90deg, $success-border-color 0%, $success-color 100%);
      --button-border-color: transparent;
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

    &.pattern--gradient {
      background-image: linear-gradient(90deg, $warning-border-color 0%, $warning-color 100%);
      --button-border-color: transparent;
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

    &.pattern--gradient {
      background-image: linear-gradient(90deg, $danger-border-color 0%, $danger-color 100%);
      --button-border-color: transparent;
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
