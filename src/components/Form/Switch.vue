<template>
  <button
    type="button"
    :checked="formChecked"
    :disabled="disabled"
    :name="name"
    :value="checked + ''"
    :class="[prefix + '-switch', sizeClassName]"
    :style="[switchColor]"
    @click="onClick"
  ></button>
</template>

<script>
import { CustomEvent } from '../../helpers/events'
import { inArray } from '../../helpers/util'
import { SDKKey } from '../../config'

const SIZE_NAMES = ['default', 'mini', 'large']

export default {
  name: SDKKey + '-switch',
  props: {
    size: {
      type: String,
      default: SIZE_NAMES[0]
    },
    checked: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'checked',
    event: '_change'
  },
  data() {
    return {
      prefix: SDKKey,

      formChecked: false
    }
  },
  computed: {
    switchColor() {
      if (this.color && this.formChecked) {
        return {
          'background-color': this.color
        }
      }
      return null
    },
    formValue() {
      return this.formChecked
    },
    sizeClassName() {
      return (
        'size--' + (inArray(this.size, SIZE_NAMES) ? this.size : SIZE_NAMES[0])
      )
    }
  },
  watch: {
    checked(val) {
      this.$el.checked = this.formChecked = val ? true : false
    },
    formChecked(val) {
      const type = 'change'

      this.$emit(
        type,
        new CustomEvent(
          { type, currentTarget: this.$el },
          {
            value: val
          }
        )
      )
    }
  },
  created() {
    this.formChecked = this.checked
  },
  ready() {},
  mounted() {
    this.$el._app_component = this
    this.$el._app_type = 'switch'
    this.$el.checked = this.formChecked
  },
  updated() {},
  attached() {},
  methods: {
    onClick() {
      this.formChecked = !this.formChecked

      if (this.formChecked != this.checked) {
        this.$emit('_change', this.formChecked)
      }
    },
    reset() {
      this.formChecked = false
      if (this.formChecked != this.checked) {
        this.$emit('_change', this.formChecked)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-switch {
  --color: var(--#{$prefix}-main-color);
  --font-size: 24px;

  position: relative;
  width: 2em;
  height: 1em;
  background: $light-color;
  border: 0;
  border-radius: 1em;
  font-size: var(--font-size);
  outline: 0;
  cursor: pointer;
  transition: all 0.2s linear;
  box-sizing: border-box;
  padding: 0;

  &.size--mini {
    --font-size: 16px;
  }

  &.size--large {
    --font-size: 32px;
  }

  &[checked] {
    background-color: var(--color);
  }

  &::after {
    position: absolute;
    top: 1px;
    left: 1px;
    width: calc(50% - 2px);
    height: calc(100% - 2px);
    background: #fff;
    border-radius: 100%;
    transition: all 0.2s linear;
    content: '';
  }

  &[checked]::after {
    left: calc(50% + 1px);
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
}
</style>
