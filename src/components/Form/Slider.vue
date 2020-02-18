<template>
  <div class="slider" :disabled="disabled">
    <div class="slider-inner">
      <div class="slider-handle">
        <div
          class="slider-track"
          :style="[sliderColor, { width: progress }]"
        ></div>
        <div
          class="slider-thumb"
          :style="[sliderColor, { left: progress }]"
        ></div>
      </div>
      <input
        class="slider-range"
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
    <div v-if="showValue" class="slider-value">{{ formValue }}</div>
  </div>
</template>

<script>
import { getHandleEvent } from '../../helpers/events'
import { getRandomNumber } from '../../helpers/util'

export default {
  name: 'app-slider',
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
      default() {
        return 'slider-' + getRandomNumber()
      }
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
      formValue: '0'
    }
  },
  computed: {
    progress() {
      return (
        ((parseInt(this.formValue) - this.min) / (this.max - this.min)) * 100 +
        '%'
      )
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
        this.$emit('_change', val2)
      }

      if (val2 !== oldVal) {
        const type = 'change'
        const handleEvent = getHandleEvent(
          this.$el,
          {},
          {
            value: parseInt(val2)
          },
          type
        )

        this.$emit(type, handleEvent)
      }

      if (val2 != this.formValue) {
        this.formValue = val.toString()
      }
    },
    formValue(val) {
      const type = 'changing'
      const handleEvent = getHandleEvent(
        this.$el,
        {},
        {
          value: parseInt(val)
        },
        type
      )

      this.$emit(type, handleEvent)
    }
  },
  created() {
    const value = Math.min(this.max, Math.max(this.min, this.value))

    if (this.formValue != value) {
      this.formValue = value.toString()
    }

    if (value !== this.value) {
      this.$nextTick(() => {
        this.$emit('_change', parseInt(this.formValue))
      })
    }
  },
  ready() {},
  mounted() {
    const inputEl = this.getInputEl()

    inputEl._app_component = this
  },
  updated() {},
  attached() {},
  methods: {
    onChange() {
      if (this.formValue != this.value) {
        this.$emit('_change', parseInt(this.formValue))
      }
    },
    getInputEl() {
      return this.$el && this.$el.querySelector('input')
    },
    hookFormValue() {
      return parseInt(this.formValue)
    },
    reset() {
      this.formValue = this.min.toString()
      this.$emit('_change', this.min)
    }
  }
}
</script>

<style scoped>
@import url('../../global.css');

.slider {
  --color: var(--app-main-color);

  position: relative;
  height: 24px;
  display: flex;
  align-items: center;
}

.slider-inner {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 6px;
  position: relative;
}

.slider-handle {
  position: relative;
  height: 2px;
  width: 100%;
  background: var(--app-light-color);
}

.slider-track {
  width: 100%;
  height: 100%;
  background: var(--color);
}

.slider-thumb {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: -7px 0 0 -6px;
  background: var(--color);
}

.slider-range {
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.slider-value {
  font-size: 14px;
  margin-left: 4px;
  color: var(--app-grey-color);
}
</style>
