<template>
  <div :class="[prefix + '-rate', { disabled, readonly }]">
    <input
      :name="formName"
      type="hidden"
      :value="formValue"
      :disabled="disabled"
    />
    <div
      :class="[
        prefix + '-rate_item',
        { active: num - 0.5 <= formValue, half: formValue - num === -0.5 }
      ]"
      v-for="num in max"
      :key="num"
      @click="onItemClick(num)"
    >
      <div :class="[prefix + '-rate_icon']">
        <icon :class-name="defaultIcon"></icon>
      </div>
      <div :class="[prefix + '-rate_active-icon']">
        <icon :class-name="activeIcon" :style="iconStyles"></icon>
      </div>
      <i :class="[prefix + '-rate_half']" @click.stop="onHalfClick(num)"></i>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { inArray, capitalize, isInteger, isNumeric } from '../../helpers/util'
import { SDKKey } from '../../config'
import formMixin from '../util/form-mixin'

const ALLOW_ICONS = ['star', 'heart']

function isIntegerOrHalf(val) {
  if (isNumeric(val)) {
    if (isInteger(val) || (parseFloat(val) * 10) % 5 === 0) {
      return true
    }
  }
  return false
}

export default {
  name: SDKKey + '-rate',
  mixins: [formMixin],
  components: { Icon },
  props: {
    name: {
      type: String,
      default: ''
    },
    pattern: {
      validator(val) {
        return inArray(val, ALLOW_ICONS)
      },
      default: ALLOW_ICONS[0]
    },
    value: {
      validator(val) {
        return isIntegerOrHalf(val)
      },
      default: null
    },
    count: {
      validator(val) {
        return isInteger(parseFloat(val)) && parseFloat(val) > 0
      },
      default: 5
    },
    allowHalf: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey,

      formValue: 0,
      defaultValue: 0
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  computed: {
    defaultIcon() {
      const icon = inArray(this.pattern, ALLOW_ICONS)
        ? this.pattern
        : ALLOW_ICONS[0]

      return capitalize(icon) + 'Outlined'
    },
    activeIcon() {
      const icon = inArray(this.pattern, ALLOW_ICONS)
        ? this.pattern
        : ALLOW_ICONS[0]

      return capitalize(icon) + 'Filled'
    },
    iconStyles() {
      const styles = {}

      if (this.activeColor && !this.disabled) {
        styles.fill = this.activeColor
      }

      return styles
    },
    max() {
      const count = parseFloat(this.count)
      return isInteger(count) && count > 0 ? count : 5
    }
  },
  watch: {
    value() {
      this.updateValue()
    },
    max(val) {
      if (val < this.defaultValue) {
        this.defaultValue = 0
      }
    }
  },
  created() {
    this.updateValue()

    this.defaultValue = this.formValue
  },
  ready() {},
  mounted() {
    const inputEl = this.getInputEl()

    inputEl._app_component = this
    inputEl._app_type = 'rate'
  },
  updated() {},
  attached() {},
  methods: {
    onHalfClick(num) {
      if (this.readonly || this.disabled) {
        return
      }

      if (this.allowHalf) {
        num -= 0.5
      }

      this._change(num)
    },

    onItemClick(num) {
      if (this.readonly || this.disabled) {
        return
      }

      this._change(num)
    },

    getInputEl() {
      return this.$el.firstElementChild
    },

    _change(value) {
      if (value !== this.formValue) {
        this.formValue = value

        this.$emit('_change', value)

        this.eventEmit('change')
      }
    },

    eventEmit(type) {
      const value = this.formValue

      this.$emit(type, {
        value
      })
      this.validateAfterEventTrigger(type, value)
    },

    updateValue() {
      if (!isIntegerOrHalf(this.value)) {
        return
      }

      const value = parseFloat(this.value)

      if (value === this.formValue) {
        return
      }

      if (value < 0 || value > this.max) {
        return
      }

      if (!this.allowHalf && !isInteger(value)) {
        return
      }

      this.formValue = value
    },

    reset() {
      return this._reset(this.defaultValue)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-rate {
  --rate-size: 24px;
  --rate-color: #{$border-color};
  --rate-active-color: #{$danger-color};

  display: flex;
  align-items: center;
  height: 32px;

  &_item {
    width: var(--rate-size);
    height: var(--rate-size);
    font-size: var(--rate-size);
    margin-right: 0.2em;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      .#{$prefix}-rate {
        &_icon {
          display: none;
        }

        &_active-icon {
          display: block;
        }
      }
    }

    &.active.half {
      .#{$prefix}-rate {
        &_icon {
          width: 50%;
          margin-left: 50%;
          display: flex;
          justify-content: flex-end;
          overflow: hidden;
        }

        &_active-icon {
          display: block;
          width: 50%;
          overflow: hidden;
        }
      }
    }
  }

  .#{$prefix}-icon {
    --size: var(--rate-size);
    --color: var(--rate-color);
    flex-shrink: 0;
    display: block;
  }

  &_icon {
    width: 100%;
    height: 100%;
  }

  &_active-icon {
    position: absolute;
    left: 0;
    top: 0;
    display: none;
    width: 100%;
    height: 100%;

    .#{$prefix}-icon {
      --color: var(--rate-active-color);
    }
  }

  &_half {
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
  }

  &.readonly {
    .#{$prefix}-rate {
      &_item {
        cursor: default;
      }
    }
  }

  &.disabled {
    opacity: 0.2;

    .#{$prefix}-rate {
      &_item {
        cursor: not-allowed;
      }
    }
  }
}
</style>
