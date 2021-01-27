<template>
  <div class="fx-slider" :class="{ disabled: !!disabled }">
    <div class="fx-slider_inner">
      <div class="fx-slider_box">
        <div class="fx-slider_track" :style="[{ width: progress }]"></div>
        <div class="fx-slider_thumb" :style="[{ left: progress }]">
          {{ showValue ? formValue : '' }}
        </div>
      </div>
      <input
        class="fx-slider_range"
        type="range"
        :disabled="disabled"
        :value="formValue"
        :min="min"
        :max="max"
        :step="step"
        :name="formName"
        @input="onInput"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
import formMixin from '../util/form-mixin'
import { isNumeric } from '../helpers/util'

export default {
  name: 'fx-slider',
  mixins: [formMixin],
  props: {
    modelValue: {
      validator: isNumeric,
      default: null
    },
    min: {
      validator: isNumeric,
      default: 0
    },
    max: {
      validator: isNumeric,
      default: 100
    },
    step: {
      validator: isNumeric,
      default: 1
    },
    showValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formValue: null
    }
  },
  computed: {
    progress() {
      return ((this.formValue - this.min) / (this.max - this.min)) * 100 + '%'
    }
  },
  watch: {
    modelValue(val) {
      this.formValue = val

      this.$nextTick(() => {
        this.updateValue()
      })
    },
    min() {
      this.$nextTick(() => {
        this.updateValue()
        this.inputModel()
      })
    },
    max() {
      this.$nextTick(() => {
        this.updateValue()
        this.inputModel()
      })
    }
  },
  mounted() {
    const $input = this.getInputEl()

    $input._app_component = this
    $input._app_type = 'slider'

    this.formValue = $input.value
    this.inputModel()
  },
  methods: {
    updateValue() {
      this.formValue = this.getInputEl().value
    },
    inputModel() {
      if (
        this.modelValue == null ||
        this.formValue !== this.modelValue.toString()
      ) {
        this.$emit('update:modelValue', this.hookFormValue())
      }
    },
    onInput(e) {
      this.formValue = e.target.value
      this.inputModel()

      this.eventEmit(e.type)
    },
    onChange(e) {
      this.eventEmit(e.type)
    },
    eventEmit(type) {
      const value = this.hookFormValue()

      this.$emit(type, {
        value
      })
      this.validateAfterEventTrigger(type, value)
    },
    hookFormValue() {
      return parseFloat(this.formValue)
    },
    reset() {
      return this._reset(this.getInputEl().value)
    }
  }
}
</script>
