<template>
  <button
    class="switch"
    type="button"
    :checked="formChecked"
    :disabled="disabled"
    :name="name"
    :class="[sizeClassName]"
    :style="[switchColor]"
    @click="onClick"
  ></button>
</template>

<script>
import { getHandleEvent } from '../../helpers/events'
import { getRandomNumber, inArray } from '../../helpers/util'

const SIZE_NAMES = ['default', 'mini', 'large']

export default {
  name: 'app-switch',
  props: {
    size: {
      type: String,
      default: SIZE_NAMES[0]
    },
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
      default() {
        return 'switch-' + getRandomNumber()
      }
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
    },
    sizeClassName() {
      return (
        'size--' + (inArray(this.size, SIZE_NAMES) ? this.size : SIZE_NAMES[0])
      )
    }
  },
  watch: {
    checked(val) {
      this.formChecked = val ? true : false
    },
    formChecked(val) {
      this.$emit(
        'change',
        getHandleEvent(
          this.$el,
          {},
          {
            value: val
          },
          'change'
        )
      )
    }
  },
  created() {
    this.formChecked = this.checked
  },
  ready() {},
  mounted() {
    this.$el._app_component = this
  },
  updated() {},
  attached() {},
  methods: {
    onClick() {
      this.formChecked = !this.formChecked

      if (this.formChecked != this.checked) {
        this.$emit('_change', this.formChecked)
      }
    },
    reset() {
      this.formChecked = false
      if (this.formChecked != this.checked) {
        this.$emit('_change', this.formChecked)
      }
    }
  }
}
</script>

<style scoped>
@import url('../../global.css');

.switch {
  --color: var(--app-main-color);
  --font-size: 24px;

  position: relative;
  width: 2em;
  height: 1em;
  background: var(--app-light-color);
  border: 0;
  border-radius: 1em;
  font-size: var(--font-size);
  outline: 0;
  cursor: pointer;
  transition: all 0.2s linear;
}

.switch.size--mini {
  --font-size: 16px;
}

.switch.size--large {
  --font-size: 32px;
}

.switch[checked] {
  background-color: var(--color);
}

.switch:after {
  position: absolute;
  top: 1px;
  left: 1px;
  width: calc(50% - 2px);
  height: calc(100% - 2px);
  background: #fff;
  border-radius: 100%;
  transition: all 0.2s linear;
  content: '';
}

.switch[checked]:after {
  left: calc(50% + 1px);
}

.switch:not(:disabled):hover {
  opacity: 0.8;
}

.switch:not(:disabled):active {
  opacity: 0.6;
}

.switch:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>
