<template>
  <div :class="[prefix + '-slider']" :disabled="disabled">
    <div :class="[prefix + '-slider_inner']">
      <div :class="[prefix + '-slider_box']">
        <div
          :class="[prefix + '-slider_track']"
          :style="[sliderColor, { width: progress }]"
        ></div>
        <div
          :class="[prefix + '-slider_thumb']"
          :style="[sliderColor, { left: progress }]"
        ></div>
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
    <div v-if="showValue" :class="[prefix + '-slider_text']">
      {{ formValue }}
    </div>
  </div>
</template>

<script>
import { CustomEvent } from '../../helpers/events'
import { SDKKey } from '../../config'
import formMixin from '../util/form-mixin'

export default {
  name: SDKKey + '-slider',
  mixins: [formMixin],
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: ''
    },
    color: {
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
    prop: 'value',
    event: '_change'
  },
  data() {
    return {
      prefix: SDKKey,

      formValue: '0'
    }
  },
  computed: {
    progress() {
      return ((this.formValue - this.min) / (this.max - this.min)) * 100 + '%'
    },
    sliderColor() {
      if (this.color) {
        return {
          'background-color': this.color
        }
      }
      return null
    }
  },
  watch: {
    value(val) {
      const val2 = Math.min(this.max, Math.max(this.min, val))

      if (val2 !== val) {
        // 设定的值不在允许范围内，取边界
        this.$emit('_change', val2)
      }

      if (val2 != this.formValue) {
        this.formValue = val.toString()
      }
    },
    min(val) {
      if (val > this.formValue) {
        this.$nextTick(() => {
          const inputEl = this.getInputEl()
          this.formValue = inputEl.value

          if (inputEl.defaultValue < val) {
            inputEl.defaultValue = inputEl.value
          }
          if (this.formValue != this.value) {
            this._change()
          }
        })
      }
    },
    max(val) {
      if (val < this.formValue) {
        this.$nextTick(() => {
          const inputEl = this.getInputEl()
          this.formValue = inputEl.value

          if (inputEl.defaultValue > val) {
            inputEl.defaultValue = inputEl.value
          }
          if (this.formValue != this.value) {
            this._change()
          }
        })
      }
    }
  },
  created() {
    const value = this.value

    if (this.formValue != value) {
      this.formValue = value.toString()
    }
  },
  ready() {},
  mounted() {
    const inputEl = this.getInputEl()

    inputEl._app_component = this
    inputEl._app_type = 'slider'

    if (this.formValue !== inputEl.value) {
      this.formValue = inputEl.defaultValue = inputEl.value
      this._change()
    }
  },
  updated() {},
  attached() {},
  methods: {
    _change() {
      if (this.formValue !== this.value.toString()) {
        this.$emit('_change', this.hookFormValue())
      }
    },
    onInput(e) {
      this.formValue = e.target.value
      const value = this.hookFormValue()

      this._change()

      this.$emit(
        e.type,
        new CustomEvent(
          {
            type: e.type,
            currentTarget: this.$el,
            target: e.target
          },
          {
            value
          }
        )
      )

      this.validateAfterEventTrigger(e.type, value)
    },
    onChange(e) {
      const value = this.hookFormValue()

      this.$emit(
        e.type,
        new CustomEvent(
          {
            type: e.type,
            currentTarget: this.$el,
            target: e.target
          },
          {
            value
          }
        )
      )

      this.validateAfterEventTrigger(e.type, value)
    },
    getInputEl() {
      return this.$el && this.$el.querySelector('input')
    },
    hookFormValue() {
      return parseFloat(this.formValue)
    },
    reset() {
      const inputEl = this.getInputEl()
      const defaultValue = inputEl.defaultValue || this.min.toString()

      if (defaultValue !== this.formValue) {
        this.formValue = defaultValue
        this._change()

        this.onChange({
          type: 'change',
          currentTarget: this.$el,
          target: inputEl
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-slider {
  --color: var(--#{$prefix}-primary-color);

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
    background: $border-color;
    border-radius: 2px;
  }

  &_track {
    width: 100%;
    height: 100%;
    background: var(--color);
    border-radius: 2px;
  }

  &_thumb {
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin: -13px 0 0 -12px;
    background: #ffffff;
    border: 1px solid $divider-color;
    box-sizing: border-box;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.02);
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

  &_text {
    font-size: 17px;
    margin-left: 5px;
    color: $title-color;
  }
}
</style>
