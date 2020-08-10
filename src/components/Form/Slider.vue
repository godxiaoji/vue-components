<template>
  <div class="ly-slider" :disabled="disabled">
    <div class="ly-slider_inner">
      <div class="ly-slider_box">
        <div
          class="ly-slider_track"
          :style="[sliderColor, { width: progress }]"
        ></div>
        <div
          class="ly-slider_thumb"
          :style="[sliderColor, { left: progress }]"
        ></div>
      </div>
      <input
        class="ly-slider_range"
        type="range"
        :disabled="disabled"
        v-model="formValue"
        :min="min"
        :max="max"
        :step="step"
        :name="name"
        @change="onChange"
      />
    </div>
    <div v-if="showValue" class="ly-slider_text">{{ formValue }}</div>
  </div>
</template>

<script>
import { CustomEvent } from '../../helpers/events'

export default {
  name: 'ly-slider',
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
      formValue: 0
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
    value(val, oldVal) {
      const val2 = Math.min(this.max, Math.max(this.min, val))

      if (val2 !== val) {
        // 设定的值不在允许范围内，取边界
        this.$emit('_change', val2)
      }

      if (val2 !== oldVal) {
        const type = 'change'

        this.$emit(
          type,
          new CustomEvent(
            {
              type,
              currentTarget: this.$el
            },
            {
              value: val2
            }
          )
        )
      }

      if (val2 != this.formValue) {
        this.formValue = val
      }
    },
    min(val) {
      if (val > this.formValue) {
        this.$nextTick(() => {
          this.formValue = parseFloat(this.getInputEl().value)
        })
      }
    },
    max(val) {
      if (val < this.formValue) {
        this.$nextTick(() => {
          this.formValue = parseFloat(this.getInputEl().value)
        })
      }
    },
    formValue(val) {
      const type = 'changing'

      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el
          },
          {
            value: val
          }
        )
      )
    }
  },
  created() {
    const value = Math.min(this.max, Math.max(this.min, this.value))

    if (this.formValue != value) {
      this.formValue = value
    }

    if (value !== this.value) {
      this.$nextTick(() => {
        this.$emit('_change', this.formValue)
      })
    }
  },
  ready() {},
  mounted() {
    const inputEl = this.getInputEl()

    inputEl._app_component = this
    inputEl._app_type = 'slider'
  },
  updated() {},
  attached() {},
  methods: {
    onChange() {
      if (this.formValue != this.value) {
        this.$emit('_change', this.formValue)
      }
    },
    getInputEl() {
      return this.$el && this.$el.querySelector('input')
    },
    hookFormValue() {
      return parseInt(this.formValue)
    },
    reset() {
      this.formValue = this.min
      this.$emit('_change', this.min)
    }
  }
}
</script>

<style>
@import url('../../global.css');

.ly-slider {
  --color: var(--ly-main-color);

  position: relative;
  height: 24px;
  display: flex;
  align-items: center;
}

.ly-slider_inner {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 6px;
  position: relative;
}

.ly-slider_box {
  position: relative;
  height: 2px;
  width: 100%;
  background: var(--ly-light-color);
}

.ly-slider_track {
  width: 100%;
  height: 100%;
  background: var(--color);
}

.ly-slider_thumb {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: -7px 0 0 -6px;
  background: var(--color);
}

.ly-slider_range {
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.ly-slider_text {
  font-size: 14px;
  margin-left: 4px;
  color: var(--ly-grey-color);
}
</style>
