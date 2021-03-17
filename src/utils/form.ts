import { UseProps } from '@/utils/types'
import {
  ref,
  computed,
  inject,
  getCurrentInstance,
  onMounted,
  ComponentInternalInstance,
  Ref,
  SetupContext,
  isRef
} from 'vue'
import { cloneData } from '@/helpers/util'
import { RuleItem, RuleType } from 'async-validator'

export interface FormRuleItem extends RuleItem {
  trigger?: string
}

export interface FormRules {
  [propName: string]: FormRuleItem[]
}

export type FormRuleType = RuleType

export type HookFormValue = () => any

export interface FormItemOut {
  uid: number
  getFormName: () => string
  hookFormValue: HookFormValue
}

export interface FormGroupItemOut {
  getFormName: () => string
  validate: FormRuleValidate
}

export interface FormRuleValidate {
  (value: any, rules?: FormRuleItem[]): Promise<any>
}

export interface FormInputElement extends HTMLInputElement {
  _app_component: any
  _fxFormItemOut: FormItemOut
}

export interface FormItemProvide {
  props: UseProps
  validateAfterEventTrigger: (type: string, value: any) => void
}

type FormValue = string | number | boolean | Date | (string | number | Date)[]
interface UseOptions<T> {
  hookFormValue?: HookFormValue
  formValue: Ref<T> | Array<T>
}

export const formItemEmits = ['update:modelValue', 'change', 'reset']

export const formItemProps = {
  name: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export function useFormItem<T extends FormValue = string>(
  props: UseProps,
  { emit }: SetupContext<any>,
  { hookFormValue, formValue }: UseOptions<T>
) {
  const root = ref<HTMLElement>()
  const formItem = inject<FormItemProvide | null>('fxFormItem', null)
  let $input: FormInputElement
  const newHookFormValue: HookFormValue = hookFormValue
    ? hookFormValue
    : function() {
        return isRef(formValue) ? formValue.value : cloneData(formValue)
      }

  const formName = computed<string>(() => {
    if (formItem) {
      return formItem.props.name || ''
    }
    return props.name || ''
  })

  function validateAfterEventTrigger(type: string, value: T) {
    formItem && formItem.validateAfterEventTrigger(type, value)
  }

  function formReset(value: T) {
    if (isRef(formValue)) {
      formValue.value = value
    } else {
      // (formValue as Array) = value
    }

    if (value != props.value) {
      emit('update:modelValue', newHookFormValue())
    }
  }

  function eventEmit(type: string) {
    const value = newHookFormValue()

    emit(type, {
      type,
      value
    })
    validateAfterEventTrigger(type, value)
  }

  function getInputEl() {
    return $input
  }

  function setItemOut($el: FormInputElement, uid: number) {
    $el._fxFormItemOut = {
      uid,
      getFormName() {
        return formItem?.props.name || ''
      },
      hookFormValue: newHookFormValue
    }
  }

  onMounted(() => {
    const vm = getCurrentInstance() as ComponentInternalInstance

    $input = vm.refs.input as FormInputElement

    if (!$input) {
      const $inputs = (root.value as HTMLElement).querySelectorAll(
        '.fx-form-input'
      )

      for (let i = 0; i < $inputs.length; i++) {
        setItemOut($inputs[i] as FormInputElement, vm.uid)
      }
    } else {
      setItemOut($input, vm.uid)
    }

    // $input._app_component = {
    //   $: {
    //     uid: vm.uid
    //   },
    //   formName,
    //   formValue
    // }
  })

  return {
    root,
    formName,
    validateAfterEventTrigger,
    formReset,
    getInputEl,
    hookFormValue: newHookFormValue,
    eventEmit
  }
}
