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
      const $input = this.getInputEl()
      if ($input.defaultChecked !== $input.checked) {
        this._change($input.defaultChecked)
      }
    },
    getInputEl() {
      return this.$el.firstElementChild
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
          { type, target: this.$el.lastElementChild, currentTarget: this.$el },
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
  height: 32px;

  &_checkbox {
    position: relative;
    width: 1.875em;
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
      width: calc(100% / 1.875 - 4px);
      height: calc(100% - 4px);
      background: #fff;
      border-radius: 100%;
      transition: all 0.2s linear;
      border: 1px solid $divider-color;
      box-sizing: border-box;
      content: '';
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12),
        0px 1px 2px rgba(0, 0, 0, 0.02);
    }

    &:checked::after {
      left: calc(100% / 1.875 * 0.875 + 2px);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.2;
    }
  }
}
</style>
