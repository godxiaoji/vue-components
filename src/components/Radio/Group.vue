<template>
  <div :class="[prefix + '-radio-group', { vertical: !inline }]">
    <slot></slot>
  </div>
</template>

<script>
import { cloneData, isString, isNumber } from '../../helpers/util'
import { SDKKey } from '../../config'
import formMixin from '../util/form-mixin'
import groupMixin from '../util/group-mixin'

export default {
  name: SDKKey + '-radio-group',
  mixins: [formMixin, groupMixin],
  provide() {
    return {
      appRadioGroup: this
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      validator(value) {
        return isString(value) || isNumber(value)
      },
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey,

      formValue: ''
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  computed: {},
  watch: {},
  created() {},
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  methods: {
    updateValue(vm) {
      let value = ''

      for (let i = 0; i < this.appChildren.length; i++) {
        const child = this.appChildren[i]

        if (child._uid === vm._uid) {
          value = cloneData(vm.value)
        } else if (child.getInputChecked()) {
          child.setChecked(false)
        }
      }

      this.formValue = value

      if (value !== this.value) {
        this.$emit('_change', value)
      }
    },

    onChange(vm) {
      this.updateValue(vm)

      const type = 'change'

      this.$emit(type, {
        value: this.hookFormValue()
      })

      this.validateAfterEventTrigger(type, this.hookFormValue())
    },

    reset() {
      let value = ''

      for (let i = 0; i < this.appChildren.length; i++) {
        const child = this.appChildren[i]

        if (child.getInputChecked()) {
          value = cloneData(child.value)
          break
        }
      }

      return this._reset(value)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-radio-group {
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

    .#{$prefix}-radio {
      display: flex;
      width: 100%;

      + .#{$prefix}-radio {
        margin-left: 0;

        &::before {
          content: '';
        }
      }
    }
  }
}
</style>
