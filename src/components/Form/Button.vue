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
    <icon
      v-if="loading"
      class-name="LoadingOutlined"
      :spin="true"
    ></icon>
    <slot>按钮</slot>
  </button>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { inArray } from '../../helpers/util'
import { SDKKey } from '../../config'

const SIZE_NAMES = ['default', 'mini', 'large']
const TYPE_NAMES = ['primary', 'warning', 'danger', 'success']
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
  --icon-size: 20px;
  --icon-color: #fff;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  min-width: 66px;
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
  line-height: 19.6px;
  border-width: 1px;
  border-style: solid;
  background: none;
  font-weight: 400;

  color: #fff;
  background-color: #fbfafc;
  border-color: #d6d5d6;

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
    border-color: rgba($color: #d6d5d6, $alpha: 0.6);
    background-color: rgba($color: #fbfafc, $alpha: 0.6);
    color: rgba($color: #000000, $alpha: 0.3);
    --icon-color: rgba(0, 0, 0, 0.3);
  }

  &.type--primary {
    border-color: $primary-color;
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
      border-color: rgba($color: #029400, $alpha: 0.4);
      background-color: rgba($color: #09bb07, $alpha: 0.4);
    }
  }

  &.type--success {
    border-color: $success-color;
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
      border-color: rgba($color: #029400, $alpha: 0.4);
      background-color: rgba($color: #09bb07, $alpha: 0.4);
    }
  }

  &.type--warning {
    border-color: $warn-color;
    background-color: $warn-color;

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
      border-color: rgba($color: #029400, $alpha: 0.4);
      background-color: rgba($color: #09bb07, $alpha: 0.4);
    }
  }

  &.type--danger {
    border-color: $danger-color;
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
      border-color: rgba($color: #029400, $alpha: 0.4);
      background-color: rgba($color: #09bb07, $alpha: 0.4);
    }
  }

  .#{$prefix}-icon {
    display: inline-block;
    line-height: 1;
    margin: -0.2em 0.34em 0 0;
    vertical-align: middle;
    --size: var(--icon-size);
    --color: var(--icon-color);
    fill: #fff;
  }
}
</style>
