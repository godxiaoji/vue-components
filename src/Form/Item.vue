<template>
  <div :class="[prefix + '-form-item']" @click="onClick">
    <cell :label="label" :description="errMsg" :required="required">
      <slot></slot>
    </cell>
  </div>
</template>

<script>
import Cell from '../Cell'
import Schema from 'async-validator'
import { SDKKey } from '../config'
import { isArray, isBoolean, isNumber } from '../helpers/util'

export default {
  name: SDKKey + '-form-item',
  components: { Cell },
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
    }
  },
  data() {
    return { prefix: SDKKey, errMsg: '' }
  },
  created() {
    this.appForm && this.appForm.addChild(this)
  },
  beforeDestroy() {
    this.appForm && this.appForm.removeChild(this)
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
            // this.errMsg = errors
            //   .map(v => {
            //     return v.message
            //   })
            //   .join(' ')

            this.errMsg = (errors[0] && errors[0].message) || 'error'
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
      this.errMsg = ''

      return Promise.resolve(true)
    },

    onClick(e) {
      this.$emit(e.type, e)
    }
  }
}
</script>
