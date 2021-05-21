<template>
  <form class="fx-form" @submit.prevent="onSubmit" @reset="onReset">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, provide } from 'vue'
import { inArray, isUndefined } from '@/helpers/util'
import { useGroup } from '@/hooks/group'
import { DataObject } from '../helpers/types'
import { FormRules, FormInputElement, FormGroupItemOut } from '../hooks/types'

export default defineComponent({
  name: 'fx-form',
  props: {
    rules: Object as PropType<FormRules>
  },
  emits: ['validate-submit', 'submit', 'reset'],
  setup(props, { emit }) {
    const { children } = useGroup<FormGroupItemOut>('form')

    function onSubmit(e: Event) {
      const inputEls = (e.target as HTMLFormElement).elements
      const value: DataObject = {}
      const uids = []

      for (let i = 0, len = inputEls.length; i < len; i++) {
        const el = inputEls[i]
        const out = (el as FormInputElement)._fxFormItemOut

        if (out) {
          const uid = out.uid
          const formName = out.getFormName()

          if (!inArray(uid, uids)) {
            // 获取配套表单组件
            uids.push(uid)

            if (formName) {
              value[formName] = out.hookFormValue()
            }
          }
        } else {
          if ((el as HTMLInputElement).name) {
            const { type, name, checked } = el as HTMLInputElement

            if (type === 'checkbox') {
              // 数组类型
              if (!value[name]) {
                value[name] = []
              }

              if (checked) {
                value[name].push((el as HTMLInputElement).value)
              }
            } else if (type === 'radio') {
              if (value[name] == null) {
                value[name] = ''
              }
              // 需要判断checked
              if (checked) {
                value[name] = (el as HTMLInputElement).value
              }
            } else if (type === 'select-multiple') {
              // 多项选择，不能直接获取值
              const selectOptions = (el as HTMLSelectElement).options
              const selectedValues = []
              for (let i = 0; i < selectOptions.length; i++) {
                // 如果该option被选中，则将它的value存入数组
                if (selectOptions[i].selected) {
                  selectedValues.push(selectOptions[i].value)
                }
              }
              value[name] = selectedValues
            } else if (
              type === 'text' ||
              type === 'range' ||
              type === 'select-one' ||
              type === 'hidden'
            ) {
              // input
              value[name] = (el as HTMLInputElement).value
            }
          }
        }
      }

      emit('submit', {
        type: 'submit',
        value
      })

      const validateEmit = (valid: boolean) => {
        emit('validate-submit', {
          type: 'validate-submit',
          valid,
          value
        })
      }

      validate(value)
        .then(() => {
          validateEmit(true)
        })
        .catch(() => {
          validateEmit(false)
        })

      return false
    }

    function validate(value: DataObject) {
      const retList: Promise<any>[] = []

      children.forEach(child => {
        const formName = child.getFormName()

        if (formName && !isUndefined(value[formName])) {
          retList.push(child.validate(value[formName]))
        }
      })

      return Promise.all(retList)
    }

    function onReset(e: Event) {
      const inputEls = (e.target as HTMLFormElement).elements
      const values: DataObject = {}
      const uids: number[] = []

      setTimeout(() => {
        for (let i = 0, len = inputEls.length; i < len; i++) {
          const el = inputEls[i]
          const out = (el as FormInputElement)._fxFormItemOut

          if (out) {
            const uid = out.uid
            const formName = out.getFormName()

            if (!inArray(uid, uids)) {
              // 获取配套表单组件
              uids.push(uid)

              if (out.reset) {
                const value = out.reset()

                if (formName) {
                  values[formName] = value
                }
              }
            }
          }
        }
      }, 17)

      emit('reset', {
        type: 'reset',
        value: values
      })
    }

    provide('fxFormRules', props.rules)

    return {
      onSubmit,
      onReset
    }
  },
  methods: {}
})
</script>
