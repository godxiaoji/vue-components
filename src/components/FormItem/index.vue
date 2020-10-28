<template>
  <div :class="[prefix + '-form-item']">
    <label
      v-if="label"
      :class="[prefix + '-form-item_label', { required }]"
      :style="labelStyles"
      >{{ label }}</label
    >
    <div :class="[prefix + '-form-item_content']">
      <div :class="[prefix + '-form-item_content_inner']">
        <slot></slot>
      </div>
      <div :class="[prefix + '-form-item_error']" v-if="isError">
        {{ errMsg }}
      </div>
    </div>
  </div>
</template>

<script>
import Schema from 'async-validator'
import { SDKKey } from '../../config'
import { isArray, isBoolean, isNumber } from '../../helpers/util'

export default {
  name: SDKKey + '-form-item',
  provide() {
    return {
      appFormItem: this
    }
  },
  inject: {
    appForm: {
      default: null
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    rules: Array,
    label: String,
    required: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: ''
    }
  },
  data() {
    return { prefix: SDKKey, isError: false, errMsg: '' }
  },
  computed: {
    labelStyles() {
      const styles = {}

      if (this.labelWidth) {
        styles.width = this.labelWidth
      } else if (this.appForm) {
        styles.width = this.appForm.labelWidth
      }

      return styles
    }
  },
  created() {
    this._form_item = true

    if (this.appForm) {
      this.appForm.formList.push(this)
    }
  },
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  beforeDestroy() {
    if (this.appForm) {
      const formList = this.appForm.formList
      for (let i = 0; i < formList.length; i++) {
        if (formList[i]._uid === this._uid) {
          this.appForm.formList.splice(i, 1)
        }
      }
    }
  },
  methods: {
    getRulesByName(name, value) {
      let rules = []

      if (this.rules && this.rules[0]) {
        rules = this.rules
      } else if (
        this.appForm &&
        this.appForm.rules &&
        isArray(this.appForm.rules[name])
      ) {
        rules = this.appForm.rules[name]
      }

      if (rules.length === 0 && this.required) {
        // 如果没有规则，根据required情况默认规则
        let valueType = 'string'

        if (isArray(value)) {
          valueType = 'array'
        } else if (isNumber(value)) {
          valueType = 'number'
        } else if (isBoolean(value)) {
          valueType = 'boolean'
        }

        rules = [{ required: true, trigger: 'change', type: valueType }]
      }

      return rules
    },

    validateAfterEventTrigger(event, value) {
      if (!this.name) {
        return
      }

      const name = this.name

      const rules = this.getRulesByName(name, value).filter(v => {
        if (v) {
          if (v.trigger === event) {
            return true
          } else if (!v.trigger && event === 'change') {
            return true
          }
        }

        return false
      })

      if (rules[0]) {
        this.validate(value, rules)
      }
    },

    validate(value, rules) {
      if (!this.name) {
        return this.clearValidate()
      }

      const name = this.name

      if (!rules) {
        rules = this.getRulesByName(name, value)
      }

      if (rules[0]) {
        const validator = new Schema({
          [name]: rules
        })

        return validator.validate({ [name]: value }, errors => {
          if (errors) {
            // validation failed, errors is an array of all errors
            // fields is an object keyed by field name with an array of
            // errors per field
            this.isError = true
            this.errMsg = errors
              .map(v => {
                return v.message
              })
              .join(' ')
          } else {
            // validation passed
            this.clearValidate()
          }
        })
      } else {
        return this.clearValidate()
      }
    },

    clearValidate() {
      this.isError = false
      this.errMsg = ''

      return Promise.resolve(true)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-form-item {
  display: flex;
  align-items: flex-start;
  min-height: 45px;

  &_label {
    height: 44px;
    display: flex;
    align-items: center;
    padding-right: 12px;
    font-size: 17px;
    color: $font-color;
    box-sizing: border-box;

    &.required::after {
      content: '*';
      margin-left: 4px;
      color: $danger-color;
    }
  }

  &_content {
    flex: 1;
    border-bottom: 0.5px solid $divider-color;
    padding: 8px 0;

    &_inner {
      min-height: 28px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .#{$prefix}-input {
        --height: 26px;
        border-left-width: 0;
        border-right-width: 0;
        border-top-color: transparent;
        border-bottom-color: transparent;

        &_prepend {
          padding: 0 16px 0 0;
        }

        &_append {
          padding: 0 0 0 16px;
        }

        &_input {
          padding: 0;
        }
      }

      .#{$prefix}-switch {
        font-size: 28px;
      }
    }
  }

  &_error {
    position: relative;
    color: $danger-color;
    font-size: 12px;
    line-height: 17px;
    padding: 2px 0;
  }
}
</style>
