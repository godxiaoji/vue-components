<template>
  <label :class="[prefix + '-switch']">
    <input
      :class="[prefix + '-switch_checkbox']"
      type="checkbox"
      :disabled="disabled"
      @change="onChange"
    />
    <input
      type="hidden"
      :disabled="disabled"
      :name="formName"
      :value="formValue"
    />
  </label>
</template>

<script>
import { SDKKey } from '../../config'
import formMixin from '../util/form-mixin'

export default {
  name: SDKKey + '-switch',
  mixins: [formMixin],
  props: {
    value: {
      type: Boolean,
      default: false
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
    prop: 'value',
    event: '_change'
  },
  data() {
    return {
      prefix: SDKKey,

      formValue: false
    }
  },
  computed: {},
  watch: {
    value(val) {
      val = !!val

      if (val !== this.formValue) {
        this.getInputEl().checked = this.formValue = val
      }
    }
  },
  created() {
    this.formValue = !!this.value
  },
  ready() {},
  mounted() {
    const $el = this.$el

    $el.lastElementChild._app_component = this
    $el.lastElementChild._app_type = 'switch'
    $el.firstElementChild.defaultChecked = this.formValue
    $el.firstElementChild.checked = this.formValue
  },
  updated() {},
  attached() {},
  methods: {
    onChange(e) {
      const value = !!e.target.checked

      this.formValue = value

      if (this.value !== value) {
        this.$emit('_change', value)
      }

      this.eventEmit('change', value)
    },
    reset() {
      return this._reset(this.getInputEl().checked)
    },
    eventEmit(type, value) {
      this.$emit(type, {
        value
      })
      this.validateAfterEventTrigger(type, value)
    },
    getInputEl() {
      return this.$el.firstElementChild
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-switch {
  --switch-on-color: #{$primary-color};
  --switch-off-color: #{$border-color};
  --switch-size: 32px;
  height: var(--switch-size);

  &_checkbox {
    position: relative;
    width: 1.875em;
    height: 1em;
    background: var(--switch-off-color);
    border: 0;
    border-radius: 1em;
    font-size: var(--switch-size);
    outline: 0;
    cursor: pointer;
    transition: all 0.2s linear;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    appearance: none;

    &:checked {
      background-color: var(--switch-on-color);
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
      box-sizing: border-box;
      content: '';
      box-shadow: 0px 4px 4px rgba($color: $black-color, $alpha: 0.12),
        0px 1px 2px rgba($color: $black-color, $alpha: 0.02);
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
