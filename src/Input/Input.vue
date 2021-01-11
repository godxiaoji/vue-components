<template>
  <label
    :class="[
      prefix + '-input',
      {
        'has--prepend': $slots.prepend,
        'has--append': $slots.append,
        [prefix + '-textarea']: type === 'textarea',
        focus: focus2
      }
    ]"
    :disabled="disabled"
  >
    <div :class="[prefix + '-input_prepend']" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <textarea
      v-if="type === 'textarea'"
      :class="[prefix + '-input_input']"
      :name="formName"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    ></textarea>
    <input
      v-else
      :class="[prefix + '-input_input']"
      :name="formName"
      :type="inputType"
      :inputmode="inputMode"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
    />
    <icon
      v-if="showClear"
      v-show="formValue"
      :class="[prefix + '-input_clear']"
      icon="CloseCircleFilled"
      @click.native.prevent="onClear"
    />
    <div :class="[prefix + '-input_append']" v-if="$slots.append">
      <slot name="append"></slot>
    </div>
  </label>
</template>

<script>
import Icon from '../Icon'
import { inArray, isStringNumberMix } from '../helpers/util'
import { SDKKey } from '../config'
import formMixin from '../util/form-mixin'
import { formatInputDigit, formatInputNumber } from '../helpers/input'

const TYPE_NAMES = ['text', 'number', 'digit', 'tel', 'password', 'search', 'textarea']

export default {
  name: SDKKey + '-input',
  components: { Icon },
  mixins: [formMixin],
  props: {
    name: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: 140
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      validator: isStringNumberMix,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showClear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey,

      formValue: '',

      focus2: false,
      inputField: true
    }
  },
  computed: {
    inputType() {
      if (this.type === 'number') {
        return 'text'
      }

      if (this.type === 'digit') {
        return 'tel'
      }

      return inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0]
    },
    inputMode() {
      let mode = ''

      switch (this.type) {
        case 'search':
          mode = 'search'
          break

        case 'digit':
          mode = 'numeric'
          break

        case 'number':
          mode = 'decimal'
          break

        case 'tel':
          mode = 'tel'
          break

        case 'text':
          mode = 'text'
          break

        default:
          break
      }

      return mode
    }
  },
  model: {
    prop: 'modelValue',
    event: '_input'
  },
  watch: {
    modelValue(val) {
      if (val != this.formValue) {
        this.updateValue(val)
      }
    },
    focus(val) {
      const $input = this.getInputEl()

      if (val) {
        $input.focus()
      } else {
        $input.blur()
      }
    }
  },
  mounted() {
    this.updateValue(this.modelValue == null ? '' : this.modelValue)

    const $input = this.getInputEl()

    $input.defaultValue = $input.value

    if (this.focus) {
      $input.focus()
    }

    $input._app_component = this
  },
  methods: {
    onCompositionStart() {
      this.isComposition = true
    },
    onCompositionEnd(e) {
      this.isComposition = false
      this._input(e.target.value)
    },
    updateValue(value) {
      switch (this.type) {
        case 'digit':
          value = formatInputDigit(value)
          break

        case 'number':
          value = formatInputNumber(value)
          break

        default:
          break
      }

      const $input = this.getInputEl()
      let isChange = false

      if ($input.value != value) {
        $input.value = value.toString()
      }

      value = $input.value

      if (value !== this.formValue) {
        this.formValue = value
        isChange = true
      }

      if (value != this.modelValue) {
        this.$emit('_input', this.formValue)
      }

      return { value, isChange }
    },
    /**
     * 输入改变时触发
     */
    onInput(e) {
      if (!this.isComposition) {
        this._input(e.target.value)
      }
    },
    _input(newVal) {
      const { value, isChange } = this.updateValue(newVal)

      if (isChange) {
        const type = 'input'

        this.$emit(type, {
          value
        })
      }
    },
    onFocus(e) {
      this.focus2 = true
      this.$emit(e.type, e)
    },
    onBlur(e) {
      this.focus2 = false
      this.$emit(e.type, e)

      this.validateAfterEventTrigger(e.type, this.formValue)
    },
    onChange(e) {
      this.$emit(e.type, {
        value: this.formValue
      })

      this.validateAfterEventTrigger(e.type, this.formValue)
    },
    getInputEl() {
      return (this.$el && this.$el.querySelector('input')) || this.$el.querySelector('textarea')
    },
    reset() {
      return this._reset(this.getInputEl().value)
    },
    onClear() {
      this._input('')
    }
  }
}
</script>
