<template>
  <label class="fx-form-item fx-cell fx-horizontal-hairline" @click="onClick">
    <div class="fx-cell_cover"></div>
    <div class="fx-cell_header">
      <div class="fx-cell_label" v-if="label">
        {{ label }}
        <span class="fx-form-item_required" v-if="required">*</span>
      </div>
      <div class="fx-cell_content">
        <slot></slot>
      </div>
    </div>
    <div class="fx-cell_body" v-if="errMsg">
      {{ errMsg }}
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, provide, ref } from 'vue'
import Schema from 'async-validator'
import { isArray, isBoolean, isNumber } from '@/helpers/util'
import {
  FormItemProvide,
  FormRuleItem,
  FormRules,
  FormRuleType,
  FormRuleValidate
} from '../hooks/types'
import { useGroupItem } from '@/hooks/group'

export default defineComponent({
  name: 'fx-form-item',
  props: {
    name: {
      type: String,
      required: true
    },
    rules: Array as PropType<FormRuleItem[]>,
    label: String,
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const errMsg = ref('')
    const formRules = inject<FormRules>('fxFormRules', {})

    function getRulesByName(name: string, value: any) {
      let rules: FormRuleItem[] = []

      if (props.rules && props.rules[0]) {
        rules = props.rules
      } else if (isArray(formRules[name])) {
        rules = formRules[name]
      }

      if (rules.length === 0 && props.required) {
        // 如果没有规则，根据required情况默认规则
        let valueType: FormRuleType = 'string'

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
    }

    function validateAfterEventTrigger(event: string, value: any) {
      if (!props.name) {
        return
      }

      const name = props.name

      const rules = getRulesByName(name, value).filter(v => {
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
        validate(value, rules)
      }
    }

    const validate: FormRuleValidate = (value, rules) => {
      if (!props.name) {
        return clearValidate()
      }

      const name = props.name

      if (!rules) {
        rules = getRulesByName(name, value)
      }

      if (rules[0]) {
        const validator = new Schema({
          [name]: rules
        })

        return validator.validate({ [name]: value }, {}, errors => {
          if (errors) {
            // validation failed, errors is an array of all errors
            // fields is an object keyed by field name with an array of
            // errors per field
            // errMsg.value = errors
            //   .map(v => {
            //     return v.message
            //   })
            //   .join(' ')

            errMsg.value = (errors[0] && errors[0].message) || 'error'
          } else {
            // validation passed
            clearValidate()
          }
        })
      } else {
        return clearValidate()
      }
    }

    function clearValidate() {
      errMsg.value = ''

      return Promise.resolve(true)
    }

    function onClick(e: Event) {
      emit(e.type, e)
    }

    provide('fxFormItem', {
      props,
      validateAfterEventTrigger
    } as FormItemProvide)

    useGroupItem('form', {
      getFormName() {
        return props.name
      },
      validate
    })

    return {
      errMsg,
      clearValidate,
      onClick,
      validateAfterEventTrigger
    }
  }
})
</script>
