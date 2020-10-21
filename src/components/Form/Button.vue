<template>
  <button
    :class="[
      prefix + '-button',
      typeClassName,
      sizeClassName,
      patternClassName,
      shapeClassName
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
import Icon from '../Icon/Icon.vue'
import { inArray } from '../../helpers/util'
import { SDKKey } from '../../config'

const SIZE_NAMES = ['default', 'small']
const TYPE_NAMES = ['default', 'primary', 'warning', 'danger', 'success']
const PATTERN_NAMES = ['default', 'solid', 'dashed']
const SHAPE_NAMES = ['default', 'round', 'circle']
const FORM_TYPE_NAMES = ['button', 'submit', 'reset']

export default {
  name: SDKKey + '-button',
  components: { Icon },
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
        (inArray(this.pattern, PATTERN_NAMES) ? this.pattern : PATTERN_NAMES[0])
      )
    },
    sizeClassName() {
      return (
        'size--' + (inArray(this.size, SIZE_NAMES) ? this.size : SIZE_NAMES[0])
      )
    },
    shapeClassName() {
      return (
        'shape--' +
        (inArray(this.shape, SHAPE_NAMES) ? this.shape : SHAPE_NAMES[0])
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
  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  min-width: 66px;
  height: 48px;
  padding: 0 12px;
  font-size: 17px;
  line-height: 23.8px;
  border: 1px solid transparent;
  background: #fff;
  font-weight: 500;
  color: #fff;
  user-select: none;

  + .#{$prefix}-button {
    margin-left: 16px;
  }

  .#{$prefix}-icon {
    --color: #fff;
    --size: 20px;
    margin: 0 -2px;

    + span {
      margin-left: 10px;
    }
  }

  &.shape--round {
    border-radius: 24px;
  }

  &.shape--circle {
    border-radius: 24px;
    width: 48px;
    min-width: 48px;
    flex: 0;
    padding: 0;

    span {
      display: none;
    }
  }

  &.size--small {
    min-width: 60px;
    height: 28px;
    padding: 0 8px;
    line-height: 16.8px;
    font-size: 12px;

    .#{$prefix}-icon {
      --size: 16px;
    }

    &.shape--round {
      border-radius: 14px;
    }

    &.shape--circle {
      border-radius: 14px;
      width: 28px;
      min-width: 28px;
    }
  }

  &.pattern--dashed {
    border-style: dashed;
  }

  &:disabled {
    cursor: not-allowed;
    border-color: $divider-color;
    background-color: $background2-color;
    color: $font3-color;

    .#{$prefix}-icon {
      --color: #{$font3-color};
    }
  }

  &.type--default:not(:disabled) {
    border-color: $border-color;
    background-color: #fff;
    color: $title-color;

    .#{$prefix}-icon {
      --color: #{$title-color};
    }

    &:hover {
      background-color: $background2-color;
    }

    &:active {
      background-color: $background-color;
    }
  }

  &.type--primary {
    &:not(:disabled) {
      background-color: $primary-color;

      &:hover {
        border-color: #40a9ff;
        background-color: #40a9ff;
      }

      &:active {
        border-color: #096dd9;
        background-color: #096dd9;
      }

      &.pattern--solid,
      &.pattern--dashed {
        border-color: $primary-color;
        background-color: #fff;
        color: $primary-color;

        &:hover {
          background-color: #fff;
          border-color: #40a9ff;
          color: #40a9ff;
        }

        &:active {
          background-color: #fff;
          border-color: #096dd9;
          color: #096dd9;
        }

        .#{$prefix}-icon {
          --color: #{$primary-color};
        }
      }
    }

    &.pattern--default:disabled {
      border-color: transparent;
      background-color: rgba($color: $primary-color, $alpha: 0.2);
      color: #fff;
    }
  }

  &.type--success {
    &:not(:disabled) {
      background-color: $success-color;

      &:hover {
        border-color: #73d13d;
        background-color: #73d13d;
      }

      &:active {
        border-color: #389e0d;
        background-color: #389e0d;
      }

      &.pattern--solid,
      &.pattern--dashed {
        border-color: $success-color;
        background-color: #fff;
        color: $success-color;

        &:hover {
          background-color: #fff;
          border-color: #73d13d;
          color: #73d13d;
        }

        &:active {
          background-color: #fff;
          border-color: #389e0d;
          color: #389e0d;
        }

        .#{$prefix}-icon {
          --color: #{$success-color};
        }
      }
    }

    &.pattern--default:disabled {
      border-color: transparent;
      background-color: rgba($color: $success-color, $alpha: 0.2);
      color: #fff;
    }
  }

  &.type--warning {
    &:not(:disabled) {
      background-color: $warning-color;

      &:hover {
        border-color: #ffc53d;
        background-color: #ffc53d;
      }

      &:active {
        border-color: #f5a511;
        background-color: #f5a511;
      }

      &.pattern--solid,
      &.pattern--dashed {
        border-color: $warning-color;
        background-color: #fff;
        color: $warning-color;

        &:hover {
          background-color: #fff;
          border-color: #ffc53d;
          color: #ffc53d;
        }

        &:active {
          background-color: #fff;
          border-color: #f5a511;
          color: #f5a511;
        }

        .#{$prefix}-icon {
          --color: #{$warning-color};
        }
      }
    }

    &.pattern--default:disabled {
      border-color: transparent;
      background-color: rgba($color: $warning-color, $alpha: 0.2);
      color: #fff;
    }
  }

  &.type--danger {
    &:not(:disabled) {
      background-color: $danger-color;

      &:hover {
        border-color: #ff7875;
        background-color: #ff7875;
      }

      &:active {
        border-color: #f5222d;
        background-color: #f5222d;
      }

      &.pattern--solid,
      &.pattern--dashed {
        border-color: $danger-color;
        background-color: #fff;
        color: $danger-color;

        &:hover {
          background-color: #fff;
          border-color: #ff7875;
          color: #ff7875;
        }

        &:active {
          background-color: #fff;
          border-color: #f5222d;
          color: #f5222d;
        }

        .#{$prefix}-icon {
          --color: #{$danger-color};
        }
      }
    }

    &.pattern--default:disabled {
      border-color: transparent;
      background-color: rgba($color: $danger-color, $alpha: 0.2);
      color: #fff;
    }
  }
}
</style>
