<template>
  <label class="fx-switch" :class="{ disabled: !!disabled }">
    <input
      class="fx-switch_checkbox"
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
import formMixin from '../util/form-mixin'

export default {
  name: 'fx-switch',
  mixins: [formMixin],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formValue: false
    }
  },
  watch: {
    modelValue(val) {
      val = !!val

      if (val !== this.formValue) {
        this.getInputEl().checked = this.formValue = val
      }
    }
  },
  created() {
    this.formValue = !!this.modelValue
  },
  mounted() {
    const $el = this.$el

    $el.lastElementChild._app_component = this
    $el.lastElementChild._app_type = 'switch'
    $el.firstElementChild.defaultChecked = this.formValue
    $el.firstElementChild.checked = this.formValue
  },
  methods: {
    onChange(e) {
      const value = !!e.target.checked

      this.formValue = value

      if (this.modelValue !== value) {
        this.$emit('update:modelValue', value)
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
