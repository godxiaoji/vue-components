<template>
  <div :class="[prefix + '-rate', { disabled, readonly }]">
    <input :name="name" type="hidden" :value="formValue" :disabled="disabled" />
    <div
      :class="[
        prefix + '-rate_item',
        { active: num - 0.5 <= formValue, half: formValue - num === -0.5 }
      ]"
      v-for="num in size"
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
import Icon from '../Icon/Icon.vue'
import { CustomEvent } from '../../helpers/events'
import { rangeInt, inArray, capitalize, isInteger } from '../../helpers/util'
import { SDKKey } from '../../config'
import formMixin from './util/form-mixin'

const ALLOW_ICONS = ['star', 'heart']

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
      type: Number,
      default: 0
    },
    size: {
      validator(val) {
        return isInteger(val)
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
    }
  },
  watch: {
    value() {
      this.updateValue()
    }
  },
  created() {
    this._app_rate = true

    this.formValue = this.value
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

        const type = 'change'

        this.$emit(
          type,
          new CustomEvent(
            {
              type,
              currentTarget: this.$el,
              target: this.getInputEl()
            },
            {
              value
            }
          )
        )
      }
    },

    updateValue() {
      if (this.value === this.formValue) {
        return
      }

      const times = this.allowHalf ? 5 : 10

      const value =
        rangeInt(this.value * times, 0, Math.floor(this.size) * times) / times

      if (value !== this.value) {
        this.$emit('_change', value)
      }

      this.formValue = value
    },

    reset() {
      this.updateValue(this.defaultValue)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-rate {
  --item-size: 24px;
  display: flex;
  align-items: center;
  height: 28px;

  &_item {
    width: var(--item-size);
    height: var(--item-size);
    margin-right: 6px;
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
    --size: var(--item-size);
    --color: #{$border-color};
    flex-shrink: 0;
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
      --color: #{$danger-color};
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
    .#{$prefix}-rate {
      &_item {
        cursor: not-allowed;
      }

      &_active-icon {
        .#{$prefix}-icon {
          --color: #{$border-color};
        }
      }
    }
  }
}
</style>
