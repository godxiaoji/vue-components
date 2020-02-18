<template>
  <div
    class="select-option"
    :disabled="disabled"
    :class="[{ selected: selected }, sizeClassName]"
    @mousedown="onSelect"
  >
    <slot></slot>
  </div>
</template>

<script>
import { inArray, isNumber, isString } from '../../helpers/util'

const SIZE_NAMES = ['default', 'mini', 'large']

export default {
  name: 'app-select-option',
  props: {
    value: {
      validator(value) {
        return isNumber(value) || isString(value)
      },
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: false,
      size: SIZE_NAMES[0]
    }
  },
  computed: {
    sizeClassName() {
      return (
        'size--' + (inArray(this.size, SIZE_NAMES) ? this.size : SIZE_NAMES[0])
      )
    }
  },
  watch: {},
  created() {
    this._select_option = true
  },
  ready() {},
  mounted() {
    this.update()
  },
  updated() {
    this.update()
  },
  attached() {},
  methods: {
    isGroupParent() {
      return this.$parent && this.$parent._select_group
    },

    update() {
      if (this.isGroupParent()) {
        const $parent = this.$parent

        if ($parent.formValue != null) {
          this.updateSelected($parent.formValue)
        }

        if ($parent.size !== this.size) {
          this.size = $parent.size
        }
      }
    },

    onSelect(e) {
      if (!this.disabled) {
        e.value = this.value

        if (this.isGroupParent()) {
          this.$parent.onChange(e)
        }
      }
    },

    updateSize(size) {
      this.size = size
    },

    updateSelected(value) {
      // 要弱校验，类型运行字符串和数字
      return (this.selected = value == this.value)
    }
  }
}
</script>

<style scoped>
@import url('../../global.css');

.select-option {
  --color: rgba(9, 187, 7, 0.1);
  --height: 30px;
  --font-size: 14px;

  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
  height: var(--height);
  line-height: var(--height);
  color: var(--app-semi-color);
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.select-option.size--mini {
  --height: 22px;
  --font-size: 12px;
}

.select-option.size--large {
  --height: 38px;
  --font-size: 16px;
}

.select-option.selected {
  background-color: var(--app-whitesmoke-color);
}

.select-option:hover {
  background-color: var(--color);
}

.select-option[disabled],
.select-option[disabled]:hover {
  background-color: var(--app-light-color);
  cursor: not-allowed;
}
</style>
