import { UseProps } from '../helpers/types'
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
import { cloneData, isArray, isSameArray } from '@/helpers/util'
import { FormItemProvide, HookFormValue, FormInputElement } from './types'

type FormValue = string | number | boolean | Date | (string | number | Date)[]
interface UseOptions<T> {
  hookFormValue?: HookFormValue
  formValue: Ref<T> | Array<T>
  hookResetValue?: (input: HTMLInputElement) => T | T[]
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
  { hookFormValue, formValue, hookResetValue }: UseOptions<T>
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

  function formReset(value: T | T[]) {
    if (isRef(formValue)) {
      formValue.value = value as T
    } else {
      formValue.splice(0, Infinity, ...(value as T[]))
    }

    if (
      (isArray(formValue) &&
        !isSameArray(formValue as T[], props.modelValue)) ||
      (isRef(formValue) && formValue.value != props.modelValue)
    ) {
      emit('update:modelValue', newHookFormValue())
    }

    return cloneData(value)
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
      hookFormValue: newHookFormValue,
      reset() {
        return formReset(
          hookResetValue
            ? hookResetValue(getInputEl())
            : ((getInputEl()?.value || '') as T)
        )
      }
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
    getInputEl,
    hookFormValue: newHookFormValue,
    eventEmit
  }
}
