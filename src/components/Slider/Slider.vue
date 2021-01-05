<template>
  <div :class="[prefix + '-slider', { disabled }]">
    <div :class="[prefix + '-slider_inner']">
      <div :class="[prefix + '-slider_box']">
        <div :class="[prefix + '-slider_track']" :style="[{ width: progress }]"></div>
        <div :class="[prefix + '-slider_thumb']" :style="[{ left: progress }]">
          {{ showValue ? formValue : '' }}
        </div>
      </div>
      <input
        :class="[prefix + '-slider_range']"
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
import { SDKKey } from '../../config'
import formMixin from '../util/form-mixin'
import { isNumeric } from '../../helpers/util'

export default {
  name: SDKKey + '-slider',
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
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showValue: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'modelValue',
    event: '_input'
  },
  data() {
    return {
      prefix: SDKKey,

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
      if (this.modelValue == null || this.formValue !== this.modelValue.toString()) {
        this.$emit('_input', this.hookFormValue())
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
    getInputEl() {
      return this.$el && this.$el.querySelector('input')
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

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-slider {
  --slider-track-color: #{$border-color};
  --slider-track-active-color: #{$primary-color};

  position: relative;
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;

  &_inner {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
    padding: 13px 12px;
  }

  &_box {
    position: relative;
    height: 2px;
    width: 100%;
    background: var(--slider-track-color);
    border-radius: 2px;
  }

  &_track {
    width: 100%;
    height: 100%;
    background: var(--slider-track-active-color);
    border-radius: 2px;
  }

  &_thumb {
    position: absolute;
    min-width: 24px;
    height: 24px;
    border-radius: 12px;
    background: #ffffff;
    border: 1px solid $divider-color;
    box-sizing: border-box;
    box-shadow: 0px 1px 4px rgba($color: $black-color, $alpha: 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0;
    font-size: 12px;
    transform: translate3d(-50%, -13px, 0);
    color: var(--slider-track-active-color);
  }

  &_range {
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  &.disabled {
    opacity: 0.2;
  }
}
</style>
