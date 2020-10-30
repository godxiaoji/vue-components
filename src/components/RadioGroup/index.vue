<template>
  <div :class="[prefix + '-radio-group']">
    <slot></slot>
  </div>
</template>

<script>
import { CustomEvent } from '../../helpers/events'
import { cloneData, isString, isNumber } from '../../helpers/util'
import { SDKKey } from '../../config'
import formMixin from '../util/form-mixin'

export default {
  name: SDKKey + '-radio-group',
  mixins: [formMixin],
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
      default: ''
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
  created() {
    this._app_radio_group = true
  },
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  methods: {
    updateValue() {
      let value = ''

      for (let i = 0; i < this.$children.length; i++) {
        const vm = this.$children[i]

        if (vm._app_radio_item) {
          if (vm.getInputChecked()) {
            value = cloneData(vm.value)
            break
          }
        }
      }

      this.formValue = value

      if (value !== this.value) {
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
        if (vm._app_radio_item) {
          vm.reset()
        }
      })
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
}
</style>
