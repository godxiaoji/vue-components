<template>
  <div :class="[prefix + '-checkbox-group', { vertical: !inline }]">
    <slot></slot>
  </div>
</template>

<script>
import { CustomEvent } from '../../helpers/events'
import { SDKKey } from '../../config'
import formMixin from '../util/form-mixin'
import {
  isStringArray,
  isNumberArray,
  cloneData,
  isSameArray
} from '../../helpers/util'

export default {
  name: SDKKey + '-checkbox-group',
  mixins: [formMixin],
  provide() {
    return {
      appCheckboxGroup: this
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      validator(value) {
        return isStringArray(value) || isNumberArray(value)
      },
      default() {
        return []
      }
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey,

      formValue: []
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  computed: {},
  watch: {},
  created() {
    this._app_checkbox_group = true
  },
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  methods: {
    updateValue() {
      const value = this.formValue.slice(0, 0)

      this.$children.forEach(vm => {
        if (vm._app_checkbox_item && vm.getInputChecked() === true) {
          value.push(cloneData(vm.value))
        }
      })

      this.formValue = value

      if (!isSameArray(value, this.value)) {
        this.$emit('_change', value)
      }
    },

    onChange(e) {
      this.updateValue()

      const type = 'change'

      this.$emit(
        type,
        new CustomEvent(
          { type, currentTarget: this.$el, target: e.target },
          {
            value: this.hookFormValue()
          }
        )
      )

      this.validateAfterEventTrigger(e.type, this.formValue)
    },

    hookFormValue() {
      return cloneData(this.formValue)
    },

    reset() {
      this.$children.forEach(vm => {
        if (vm._app_checkbox_item) {
          vm.reset()
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-checkbox-group {
  display: flex;
  height: 32px;
  align-items: center;
  color: $title-color;
  box-sizing: border-box;
  flex: 1;

  &.vertical {
    flex-direction: column;
    height: auto;
    min-height: 32px;

    .#{$prefix}-checkbox {
      display: flex;
      width: 100%;

      + .#{$prefix}-checkbox {
        margin-left: 0;

        &::before {
          content: '';
        }
      }
    }
  }
}
</style>
