import { frameTo } from '@/helpers/animation'
import Exception from '@/helpers/exception'
import { iconValidator } from '@/utils/validator'
import {
  getCurrentInstance,
  ComponentInternalInstance,
  SetupContext,
  PropType,
  reactive,
  ref,
  watch
} from 'vue'
import {
  isArray,
  isNumber,
  isObject,
  isString,
  isStringNumberMix
} from '@/helpers/util'

interface PropsOptions {
  options: OptionList
  [propName: string]: any
}

export const tabEmits = ['update:activeValue', 'change']

type OptionValue = number | string

interface OptionItem {
  label: string
  value: OptionValue
  icon?: any
  activeIcon?: any
  badge?: any
  subLabel?: string
}

type OptionList = (OptionValue | OptionItem)[]

export const tabProps = {
  options: {
    type: Array as PropType<OptionList>,
    validator: (val: OptionList) => {
      if (isArray(val)) {
        for (let i = 0; i < val.length; i++) {
          const option = val[i]

          if (isStringNumberMix(option)) {
            //
          } else if (
            isObject(option) &&
            isStringNumberMix((option as OptionItem).value) &&
            isString((option as OptionItem).label)
          ) {
            //
          } else {
            return false
          }
        }
      } else {
        return false
      }

      return true
    },
    required: true,
    default: () => []
  },
  activeValue: {
    type: [String, Number],
    default: null
  }
}

export function useTab(
  props: PropsOptions,
  { emit }: SetupContext<any>,
  tabName: string
) {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const list = ref<HTMLElement>()
  const options2 = reactive<OptionItem[]>([])
  const activeIndex = ref(-1)
  const hasSub = ref(false)

  let value2: OptionValue | null = props.activeValue

  function updateOptions() {
    const options: OptionItem[] = []

    let hasActive = false
    hasSub.value = false

    if (isArray(props.options)) {
      props.options.forEach((item, index) => {
        let option: OptionItem | null = null

        if (isNumber(item)) {
          option = {
            label: item.toString(),
            value: item as number
          }
        } else if (isString(item)) {
          option = {
            label: item as string,
            value: item as string
          }
        } else if (isObject(item)) {
          item = item as OptionItem

          if (isStringNumberMix(item.value)) {
            option = {
              label: isString(item.label) ? item.label : item.value.toString(),
              subLabel: isString(item.subLabel) ? item.subLabel : '',
              value: item.value,
              icon: iconValidator(item.icon) ? item.icon : null
            }

            if (option.subLabel) {
              hasSub.value = true
            }

            option.activeIcon = iconValidator(item.activeIcon)
              ? item.activeIcon
              : option.icon

            if (isStringNumberMix(item.badge)) {
              option.badge = {
                content: item.badge
              }
            } else if (isObject(item.badge)) {
              option.badge = item.badge
            } else {
              option.badge = {
                content: null
              }
            }
          }
        }

        if (option) {
          option = option as OptionItem

          if (option.value === value2) {
            activeIndex.value = index
            hasActive = true
          }

          options.push(option)
        }
      })
    }

    options2.length = 0
    options2.push(...options)

    if (!hasActive && options[0]) {
      // this.onChange(options[0].value)
      updateActive(options[0].value)
    }
  }

  function switchTo(value: OptionValue, isProp = false) {
    if (!updateActive(value)) {
      // emit('update:activeValue', value2)
      console.error(
        new Exception(
          '"value" is not in "options".',
          isProp ? Exception.TYPE.PROP_ERROR : Exception.TYPE.PARAM_ERROR,
          tabName
        )
      )
    }
  }

  function switchToIndex(index: number) {
    if (options2[index]) {
      updateActive(options2[index].value)
    } else {
      console.error(
        new Exception(
          '"options[index]" not found.',
          Exception.TYPE.PARAM_ERROR,
          tabName
        )
      )
    }
  }

  function updateActive(value: OptionValue) {
    if (value === value2) {
      return true
    }

    let hasValue = false

    options2.forEach((option, index) => {
      if (option.value === value) {
        value2 = option.value
        activeIndex.value = index
        hasValue = true
      }
    })

    if (!hasValue) {
      activeIndex.value = -1
    }

    afterUpdate({
      hasValue,
      activeIndex: activeIndex.value
    })

    return hasValue
  }

  function afterUpdate({
    hasValue
  }: {
    hasValue: boolean
    activeIndex: number
  }) {
    hasValue && instance.isMounted && updatePos()
  }

  function onChange(value: OptionValue) {
    if (value === value2) {
      return
    }

    updateActive(value)
    emit('update:activeValue', value)

    const type = 'change'
    emit(type, {
      type,
      value,
      index: activeIndex.value
    })
  }

  function updatePos() {
    if (tabName === 'TabBar') {
      return
    }

    const $list = list.value as HTMLElement
    const $activeItem = $list.children[activeIndex.value] as HTMLElement

    if (!$activeItem) {
      return
    }

    const vertical = tabName === 'SideTab'
    const sizeKey = !vertical ? 'Width' : 'Height'
    const directionKey = !vertical ? 'Left' : 'Top'
    const offsetSizeKey = ('offset' + sizeKey) as 'offsetWidth'
    const scrollSizeKey = ('scroll' + sizeKey) as 'scrollWidth'
    const offsetDirectionKey = ('offset' + directionKey) as 'offsetLeft'
    const scrollDirectionKey = ('scroll' + directionKey) as 'scrollLeft'

    frameTo({
      from: $list[scrollDirectionKey],
      to:
        $activeItem[offsetSizeKey] > $list[offsetSizeKey]
          ? $activeItem[offsetDirectionKey]
          : Math.min(
              $activeItem[offsetDirectionKey] -
                ($list[offsetSizeKey] - $activeItem[offsetSizeKey]) / 2,
              $list[scrollSizeKey] - $list[offsetSizeKey]
            ),
      duration: 200,
      progress({ current }) {
        $list[scrollDirectionKey] = current
      },
      complete({ current }) {
        $list[scrollDirectionKey] = current
      }
    })
  }

  watch(
    () => props.activeValue,
    val => switchTo(val, true)
  )

  watch(() => props.options, updateOptions, {
    deep: true,
    immediate: true
  })

  return {
    list,
    activeIndex,
    hasSub,
    options2,
    switchTo,
    switchToIndex,
    onChange
  }
}
