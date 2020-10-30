<template>
  <label :class="[prefix + '-switch']">
    <input
      :class="[prefix + '-switch_checkbox']"
      type="checkbox"
      :disabled="disabled"
      :style="[switchColor]"
      @change="onChange"
    />
    <input
      type="hidden"
      :disabled="disabled"
      :name="formName"
      :value="formChecked"
    />
  </label>
</template>

<script>
import { CustomEvent } from '../../helpers/events'
import { SDKKey } from '../../config'
import formMixin from '../util/form-mixin'

export default {
  name: SDKKey + '-switch',
  mixins: [formMixin],
  props: {
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

    $el.lastElementChild._app_component = this
    $el.lastElementChild._app_type = 'switch'
    $el.firstElementChild.defaultChecked = checked
    $el.firstElementChild.checked = checked
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

      this.validateAfterEventTrigger(type, checked)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-switch {
  --color: #{$primary-color};
  --font-size: 32px;

  &_checkbox {
    position: relative;
    width: 1.75em;
    height: 1em;
    background: $border-color;
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
      content: '';
    }

    &:checked::after {
      left: calc(100% / 1.75 * 0.75 + 2px);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }
  }
}
</style>
