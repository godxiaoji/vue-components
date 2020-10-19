<template>
  <input
    type="checkbox"
    :disabled="disabled"
    :name="name"
    :value="checked + ''"
    :class="[prefix + '-switch', sizeClassName]"
    :style="[switchColor]"
    @change="onChange"
  />
</template>

<script>
import { CustomEvent } from '../../helpers/events'
import { inArray } from '../../helpers/util'
import { SDKKey } from '../../config'
import formMixin from './util/form-mixin'

const SIZE_NAMES = ['default', 'mini', 'large']

export default {
  name: SDKKey + '-switch',
  mixins: [formMixin],
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

      formName: '',
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
      val = !!val

      if (val !== this.formChecked) {
        const $el = this.$el
        $el.checked = this.formChecked = val

        this.$emit(
          'change',
          new CustomEvent(
            { type: 'change', target: $el, currentTarget: $el },
            {
              value: val
            }
          )
        )
      }
    }
  },
  created() {
    this.formChecked = !!this.checked
  },
  ready() {},
  mounted() {
    const $el = this.$el
    const checked = !!this.checked

    $el._app_component = this
    $el._app_type = 'switch'
    $el.defaultChecked = checked
    $el.checked = checked
  },
  updated() {},
  attached() {},
  methods: {
    onChange(e) {
      this._change(e.target.checked)
    },
    reset() {
      if (this.$el.defaultChecked !== this.$el.checked) {
        this._change(this.$el.defaultChecked)
      }
    },
    _change(checked) {
      this.formChecked = checked

      if (this.checked !== checked) {
        this.$emit('_change', checked)
      }

      const type = 'change'

      this.$emit(
        type,
        new CustomEvent(
          { type, target: this.$el, currentTarget: this.$el },
          {
            value: checked
          }
        )
      )

      if (this.parentIsFormItem()) {
        this.$parent.validateAfterEventTrigger(type, checked)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-switch {
  --color: var(--#{$prefix}-primary-color);
  --font-size: 32px;

  position: relative;
  width: 1.75em;
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
  margin: 0;
  appearance: none;

  &.size--mini {
    --font-size: 16px;
  }

  &.size--large {
    --font-size: 32px;
  }

  &:checked {
    background-color: var(--color);
  }

  &::after {
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(100% / 1.75 - 4px);
    height: calc(100% - 4px);
    background: #fff;
    border-radius: 100%;
    transition: all 0.2s linear;
    border: 1px solid rgba(4, 10, 19, 0.06);
    box-sizing: border-box;
    box-shadow: 0px 4px 4px $border-color, 0px 1px 2px $background2-color;
    content: '';
  }

  &:checked::after {
    left: calc(100% / 1.75 * 0.75 + 2px);
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
