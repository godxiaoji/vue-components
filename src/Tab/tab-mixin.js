import Icon from '../Icon'
import Badge from '../Badge'
import {
  isNumber,
  isString,
  isArray,
  isObject,
  isStringNumberMix
} from '../helpers/util'
import Exception from '../helpers/exception'
import { iconValidator } from '../helpers/validator'
import { frameTo } from '../helpers/animation'

export default {
  components: { Icon, Badge },
  props: {
    options: {
      validator(value) {
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            const option = value[i]

            if (!(isNumber(option) || isString(option) || isObject(option))) {
              return false
            }
          }
        } else {
          return false
        }

        return true
      },
      required: true,
      default() {
        return []
      }
    },
    activeValue: {
      validator: isStringNumberMix,
      default: null
    },
    fieldNames: {
      type: Object,
      default() {
        return { label: 'label', value: 'value' }
      }
    },
    fixed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      value2: null,
      label2: '',
      activeIndex: -1,

      fieldNames2: { label: 'label', value: 'value' },
      options2: [],

      tabName: 'Tab',
      hasSub: false
    }
  },
  watch: {
    activeValue(value) {
      this.switchTo(value, true)
    },
    options() {
      this.updateOptions()
    },
    fieldNames() {
      this.updateOptions()
    }
  },
  created() {
    this.value2 = this.activeValue
    this.updateOptions()
  },
  mounted() {
    this.updatePos()
  },
  emits: ['update:activeValue', 'change'],
  methods: {
    switchTo(value, isProp = false) {
      if (!this.updateActive(value)) {
        // this.$emit('update:activeValue', this.value2)
        console.error(
          new Exception(
            '"value" is not in "options".',
            isProp ? Exception.TYPE.PROP_ERROR : Exception.TYPE.PARAM_ERROR,
            this.tabName
          )
        )
      }
    },

    switchToIndex(index) {
      if (this.options2[index]) {
        this.updateActive(this.options2[index].value)
      } else {
        console.error(
          new Exception(
            '"options[index]" not found.',
            Exception.TYPE.PARAM_ERROR,
            this.tabName
          )
        )
      }
    },

    updateOptions() {
      if (isObject(this.fieldNames)) {
        if (isString(this.fieldNames.label)) {
          this.fieldNames2.label = this.fieldNames.label
        }
        if (isString(this.fieldNames.value)) {
          this.fieldNames2.value = this.fieldNames.value
        }
      }

      const options = []
      const { label: labelName, value: valueName } = this.fieldNames2
      let hasActive = false
      let hasSub = false

      if (isArray(this.options)) {
        this.options.forEach((item, index) => {
          let option

          if (isNumber(item)) {
            option = {
              label: item.toString(),
              value: item
            }
          } else if (isString(item)) {
            option = {
              label: item,
              value: item
            }
          } else if (
            isObject(item) &&
            (isString(item[valueName]) || isNumber(item[valueName]))
          ) {
            option = {
              label:
                item[labelName] == null ? item[valueName] : item[labelName],
              subLabel: item.subLabel ? item.subLabel.toString() : '',
              value: item[valueName],
              icon: iconValidator(item.icon) ? item.icon : null,
              badge: item.badge
            }
            if (item.subLabel) {
              hasSub = true
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

          if (option) {
            if (option.value === this.value2) {
              this.activeIndex = index
              hasActive = true
            }

            options.push(option)
          }
        })
      }

      this.hasSub = hasSub
      this.options2 = options

      if (!hasActive && options[0]) {
        // this.onChange(options[0].value)
        this.updateActive(options[0].value)
      }
    },

    updateActive(value) {
      if (value === this.value2) {
        return true
      }

      let hasValue = false

      this.options2.forEach((option, index) => {
        if (option.value === value) {
          this.label2 = option.label
          this.value2 = option.value
          this.activeIndex = index
          hasValue = true
        }
      })

      if (!hasValue) {
        this.activeIndex = -1
      }

      this.afterUpdate({
        hasValue,
        activeIndex: this.activeIndex
      })

      return hasValue
    },

    afterUpdate({ hasValue }) {
      hasValue && this.$.isMounted && this.updatePos()
    },

    updatePos() {
      if (this.tabName === 'TabBar') {
        return
      }

      const $list = this.$refs.list
      const $activeItem = $list.children[this.activeIndex]

      if (!$activeItem) {
        return
      }

      let scrollOffset = 0
      const sizeKey = !this.vertical ? 'Width' : 'Height'
      const directionKey = !this.vertical ? 'Left' : 'Top'

      if ($activeItem['offset' + sizeKey] > $list['offset' + sizeKey]) {
        scrollOffset = $activeItem['offset' + directionKey]
      } else {
        scrollOffset = Math.min(
          $activeItem['offset' + directionKey] -
            ($list['offset' + sizeKey] - $activeItem['offset' + sizeKey]) / 2,
          $list['scroll' + sizeKey] - $list['offset' + sizeKey]
        )
      }

      frameTo({
        from: $list['scroll' + directionKey],
        to: scrollOffset,
        duration: 200,
        progress(res) {
          $list['scroll' + directionKey] = res.current
        }
      })
    },

    onChange(value) {
      if (value === this.value2) {
        return
      }

      this.updateActive(value)
      this.$emit('update:activeValue', value)

      const type = 'change'
      this.$emit(type, {
        type,
        value,
        index: this.activeIndex
      })
    }
  }
}
