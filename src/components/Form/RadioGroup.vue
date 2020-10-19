<template>
  <div :class="[prefix + '-radio-group']">
    <slot></slot>
  </div>
</template>

<script>
import { CustomEvent } from '../../helpers/events'
import { cloneData } from '../../helpers/util'
import { SDKKey } from '../../config'
import formMixin from './util/form-mixin'

export default {
  name: SDKKey + '-radio-group',
  mixins: [formMixin],
  props: {
    name: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      value: 'left'
    }
  },
  data() {
    return {
      prefix: SDKKey,

      formName: '',
      formValue: ''
    }
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

      if (this.parentIsFormItem()) {
        this.$parent.validateAfterEventTrigger(e.type, this.formValue)
      }
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
  color: $semi-color;
  box-sizing: border-box;
}
</style>
