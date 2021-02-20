import {
  computed,
  inject,
  getCurrentInstance,
  onMounted,
  ComponentInternalInstance,
  Ref,
  SetupContext
} from 'vue'
import { cloneData } from '../../helpers/util'

type FormValue = string | number | boolean | string[] | number[]
type HookFormValue = () => FormValue
interface UseOptions<T> {
  hookFormValue?: HookFormValue
  formValue: Ref<T>
}
interface PropsOptions<T> {
  name?: string
  value?: T
  [propName: string]: any
}

export default function userFormItem<T extends FormValue = string>(
  props: Readonly<PropsOptions<T>>,
  { emit }: SetupContext,
  { hookFormValue, formValue }: UseOptions<T>
) {
  const appFormItem: any = inject('appFormItem', null)
  let $input: HTMLInputElement
  const newHookFormValue: HookFormValue = hookFormValue
    ? hookFormValue
    : function() {
        return cloneData(formValue.value)
      }

  const formName = computed<string>(() => {
    if (appFormItem) {
      return appFormItem.name || ''
    }
    return props.name || ''
  })

  function validateAfterEventTrigger(type: string, value: T) {
    appFormItem && appFormItem.validateAfterEventTrigger(type, value)
  }

  function formReset(value: T) {
    formValue.value = value

    if (value != props.value) {
      emit('update:modelValue', newHookFormValue())
    }
  }

  function getInputEl() {
    return $input
  }

  onMounted(() => {
    const vm = getCurrentInstance() as ComponentInternalInstance

    $input = vm.refs.input as HTMLInputElement
    // $input._app_component = {
    //   $: {
    //     uid: vm.uid
    //   },
    //   formName,
    //   formValue
    // }
  })

  return {
    formName,
    validateAfterEventTrigger,
    formReset,
    getInputEl,
    hookFormValue: newHookFormValue
  }
}
