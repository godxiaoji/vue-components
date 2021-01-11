<template>
  <div :class="[prefix + '-form-item']" @click="onClick">
    <cell :label="label" :description="errMsg" :required="required">
      <slot>
        <div :class="[prefix + '-input']">
          <div :class="[prefix + '-input_input', { placeholder: !valueString2 }]">
            {{ valueString2 || placeholder }}
          </div>
          <div :class="[prefix + '-input_append']">
            <icon icon="RightOutlined" :class="[prefix + '-form-item_icon']" />
          </div>
          <input type="hidden" ref="input" :name="name" :value="valueString2" />
        </div>
      </slot>
    </cell>
  </div>
</template>

<script>
import Cell from '../Cell'
import Icon from '../Icon'
import Schema from 'async-validator'
import { SDKKey } from '../config'
import { isArray, isBoolean, isNumber, isFunction, isString } from '../helpers/util'

export default {
  name: SDKKey + '-form-item',
  components: { Cell, Icon },
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
    // 自身作为输入
    value: {
      validator(val) {
        return isNumber(val) || isString(val)
      },
      default: ''
    },
    valueString: {
      type: String,
      default: null
    },
    getValueString: {
      type: Function,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return { prefix: SDKKey, errMsg: '' }
  },
  computed: {
    valueString2() {
      if (isFunction(this.getValueString)) {
        return this.getValueString(this.value)
      } else if (isString(this.valueString)) {
        return this.valueString
      }

      return (this.value && this.value.toString()) || ''
    }
  },
  watch: {
    value: {
      immediate: false,
      handler(val) {
        this.validateAfterEventTrigger('change', val)
      }
    }
  },
  created() {
    this._form_item = true

    if (this.appForm) {
      this.appForm.formList.push(this)
    }
  },
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
      } else if (this.appForm && this.appForm.rules && isArray(this.appForm.rules[name])) {
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
