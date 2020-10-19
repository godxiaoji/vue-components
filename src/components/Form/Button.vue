<template>
  <button
    :class="[
      prefix + '-button',
      typeClassName,
      sizeClassName,
      patternClassName
    ]"
    :disabled="disabled"
    :type="realFormType"
    @click="onClick"
  >
    <icon v-if="loading" class-name="LoadingOutlined" :spin="true"></icon>
    <slot>按钮</slot>
  </button>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { inArray } from '../../helpers/util'
import { SDKKey } from '../../config'

const SIZE_NAMES = ['default', 'mini', 'large']
const TYPE_NAMES = ['default', 'primary', 'warning', 'danger', 'success']
const PATTERN_NAMES = ['default', 'solid', 'dashed', 'link']
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
    pattern: {
      type: String,
      default: PATTERN_NAMES[0]
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
        (inArray(this.type, PATTERN_NAMES) ? this.pattern : PATTERN_NAMES[0])
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
  --icon-size: 17px;
  --icon-color: #fff;

  display: inline-flex;
  flex: 1 0 100%;
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
  line-height: 24px;
  border: 1px solid transparent;
  background: #fff;
  font-weight: 400;
  color: #fff;

  .#{$prefix}-icon {
    margin-right: 10px;
    --size: var(--icon-size);
    --color: var(--icon-color);
    fill: #fff;
  }

  &.size--mini {
    min-width: 58px;
    height: 28px;
    padding: 0 8px;
    line-height: 19.6px;
    font-size: 14px;
    --icon-size: 16px;
  }

  &.size--large {
    min-width: 80px;
    height: 40px;
    padding: 0 16px;
    line-height: 22.4px;
    font-size: 16px;
    --icon-size: 22px;
  }

  &.pattern--dashed {
    border-style: dashed;
  }

  &:disabled {
    cursor: not-allowed;
    color: #fff;
  }

  &.type--default {
    border-color: $divider-color;
    background-color: #fff;
    color: $title-color;

    .#{$prefix}-icon {
      fill: $title-color;
    }

    &:not(:disabled) {
      &:hover {
        background-color: $background-color;
      }

      &:active {
        background-color: $background-color;
      }
    }

    &:disabled {
      border-color: $divider-color;
      background-color: $background2-color;
      color: $font3-color;

      .#{$prefix}-icon {
        fill: $font3-color;
      }
    }
  }

  &.type--primary {
    background-color: $primary-color;

    &:not(:disabled) {
      &:hover {
        border-color: #40a9ff;
        background-color: #40a9ff;
      }

      &:active {
        border-color: #096dd9;
        background-color: #096dd9;
      }
    }

    &.pattern--solid,
    &.pattern--dashed {
      background-color: #fff;
      color: $primary-color;
    }

    &:disabled {
      background-color: rgba($color: $primary-color, $alpha: 0.2);
    }
  }

  &.type--success {
    background-color: $success-color;

    &:not(:disabled) {
      &:hover {
        border-color: #40a9ff;
        background-color: #40a9ff;
      }

      &:active {
        border-color: #096dd9;
        background-color: #096dd9;
      }
    }

    &:disabled {
      background-color: rgba($color: $primary-color, $alpha: 0.2);
    }
  }

  &.type--warning {
    background-color: $warning-color;

    &:not(:disabled) {
      &:hover {
        border-color: #40a9ff;
        background-color: #40a9ff;
      }

      &:active {
        border-color: #096dd9;
        background-color: #096dd9;
      }
    }

    &:disabled {
      background-color: rgba($color: $warning-color, $alpha: 0.2);
    }
  }

  &.type--danger {
    background-color: $danger-color;

    &:not(:disabled) {
      &:hover {
        border-color: #ff7875;
        background-color: #ff7875;
      }

      &:active {
        border-color: #f5222d;
        background-color: #f5222d;
      }
    }

    &:disabled {
      background-color: rgba($color: $danger-color, $alpha: 0.2);
    }
  }
}
</style>
