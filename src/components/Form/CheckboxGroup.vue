<template>
  <div :class="[prefix + '-checkbox-group']">
    <slot></slot>
  </div>
</template>

<script>
import { CustomEvent } from '../../helpers/events'
import { cloneData } from '../../helpers/util'
import { SDKKey } from '../../config'
import formMixin from './util/form-mixin'

export default {
  name: SDKKey + '-checkbox-group',
  mixins: [formMixin],
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefix: SDKKey,

      formName: '',
      formValue: []
    }
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
  height: 28px;
  align-items: center;
  color: $title-color;
  box-sizing: border-box;
}
</style>
