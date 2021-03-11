import { useFormItem } from '../Form/form-item'
import {
  computed,
  onMounted,
  SetupContext,
  ref,
  watch,
  inject,
  getCurrentInstance,
  ComponentInternalInstance,
  provide,
  Ref
} from 'vue'
import { capitalize, inArray } from '../helpers/util'
import { useGroup, useGroupItem } from './group'
import { UseProps } from './types'

interface Options {
  formName: string
  props: UseProps
  onChange: (uid: number) => void
}

export function useCheckboxOrRadio(
  props: UseProps,
  ctx: SetupContext<any>,
  name: string
) {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const options = inject<Options | null>(`fx${capitalize(name)}Options`, null)
  const input = ref<HTMLInputElement>()
  const { emit } = ctx

  const formName = computed(() => {
    return options?.formName || props.name || ''
  })

  const disabled2 = computed(() => {
    return options?.props.disabled ?? props.disabled
  })

  function getValue() {
    return props.value
  }

  function getInputEl() {
    return input.value as HTMLInputElement
  }

  function getInputChecked() {
    return !!getInputEl().checked
  }

  function setChecked(checked = true) {
    getInputEl().checked = checked
  }

  function onChange(e: Event) {
    if (options) {
      options.onChange(instance.uid)
    } else {
      emit('update:checked', !!(e.target as HTMLInputElement).checked)
    }
  }

  watch(
    () => props.checked,
    val => {
      if (options) {
        return
      }

      const $input = getInputEl()
      const checked = !!val

      if (checked !== $input.checked) {
        $input.checked = checked
      }
    }
  )

  useGroupItem(name, {
    uid: instance.uid,
    getInputChecked,
    getValue,
    setChecked
  })

  onMounted(() => {
    const $input = getInputEl()

    let checked: boolean
    if (options) {
      checked =
        name === 'checkbox'
          ? inArray(props.value, options.props.modelValue)
          : props.value === options.props.modelValue
    } else {
      checked = !!props.checked
    }

    if (checked !== $input.checked) {
      $input.checked = $input.defaultChecked = checked
    }

    // $input._app_component = this.appCheckboxGroup || this
  })

  return {
    input,
    formName,
    disabled2,
    onChange
  }
}

export type ModelValue = number | string

interface UpdateValueOptions {
  isChange: boolean
  children: any[]
  uid: number | undefined
  hookFormValue: Function
}

interface WatchValueOptions {
  children: any[]
  value: any
}

interface UseGroupOptions {
  name: string
  updateValue: (options: UpdateValueOptions) => void
  watchValue: (options: WatchValueOptions) => void
  formValue: Ref<ModelValue> | ModelValue[]
}

export function useCheckboxOrRadioGroup(
  props: UseProps,
  ctx: SetupContext<any>,
  { name, updateValue, watchValue, formValue }: UseGroupOptions
) {
  const { children } = useGroup(name)

  const {
    formName,
    validateAfterEventTrigger,
    hookFormValue,
    eventEmit,
    root
  } = useFormItem<ModelValue>(props, ctx, { formValue })

  function _updateValue(isChange: boolean, uid?: number) {
    updateValue({ isChange, children, uid, hookFormValue })
  }

  function onChange(uid: number) {
    _updateValue(true, uid)

    eventEmit('change')
  }

  function reset() {
    _updateValue(true)
  }

  watch(
    () => props.modelValue,
    value => {
      watchValue({ children, value })
    },
    {
      deep: true
    }
  )

  onMounted(() => _updateValue(false))

  provide(`fx${capitalize(name)}Options`, {
    props,
    onChange
  })

  return {
    root,
    formName,
    formValue,
    validateAfterEventTrigger,
    hookFormValue,
    reset,
    onChange
  }
}
