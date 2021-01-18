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
      default: ''
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

      tabName: 'Tab'
    }
  },
  model: {
    prop: 'activeValue',
    event: 'update:activeValue'
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
    this.updateOptions()
  },
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
              value: item[valueName],
              icon: iconValidator(item.icon) ? item.icon : null,
              badge: item.badge
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

      this.options2 = options

      if (!hasActive && options[0]) {
        this.onChange(options[0].value)
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

    afterUpdate() {},

    onChange(value) {
      if (value === this.value2) {
        return
      }

      this.updateActive(value)
      this.$emit('update:activeValue', value)

      const type = 'change'
      this.$emit(type, {
        value,
        index: this.activeIndex
      })
    }
  }
}
