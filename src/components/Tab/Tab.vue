<template>
  <div :class="[prefix + '-tab', { vertical, 'no--scroll': options2.length <= scrollThreshold }]">
    <ul :class="[prefix + '-tab_list']" ref="list">
      <li
        :class="[
          prefix + '-tab_item',
          {
            active: index === activeIndex,
            'active-prev': index === activeIndex - 1,
            'active-next': index === activeIndex + 1
          }
        ]"
        v-for="(item, index) in options2"
        :key="item.value"
        @click="onChange(item.value)"
      >
        <badge :class="[prefix + '-tab_item-inner']" :content="item.badge != null ? item.badge : 0">
          <icon v-if="item.icon" :class-name="item.icon" />
          <span :class="[prefix + '-tab_item-text']">{{ item.label }}</span>
        </badge>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '../Icon'
import Badge from '../Badge'
import { isNumber, isString, isArray, isObject, isStringNumberMix } from '../../helpers/util'
import { SDKKey } from '../../config'
import { frameTo } from '../../helpers/animation'
import Exception from '../../helpers/exception'

export default {
  name: SDKKey + '-tab',
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
    value: {
      validator: isStringNumberMix,
      default: ''
    },
    fieldNames: {
      type: Object,
      default() {
        return { label: 'label', value: 'value' }
      }
    },
    // 纵向
    vertical: {
      type: Boolean,
      default: false
    },
    scrollThreshold: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      prefix: SDKKey,

      value2: null,
      label2: '',
      activeIndex: -1,

      fieldNames2: { label: 'label', value: 'value' },
      options2: []
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  watch: {
    value() {
      this.updateValue()
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
  mounted() {
    this.isMounted = true
    this.updatePos()
  },
  destroyed() {},
  methods: {
    updateValue() {
      if (!this.updateActive(this.value)) {
        this.$emit('_change', this.value2)
        console.error(new Exception('"value" is not in "options".', Exception.TYPE.PROP_ERROR, 'Tab'))
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
          } else if (isObject(item) && (isString(item[valueName]) || isNumber(item[valueName]))) {
            option = {
              label: item[labelName] == null ? item[valueName] : item[labelName],
              value: item[valueName],
              icon: isString(item.icon) && item.icon ? item.icon : null
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

      if (hasValue) {
        this.isMounted && this.updatePos()
      } else {
        this.activeIndex = -1
      }

      return hasValue
    },

    updatePos() {
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
          $activeItem['offset' + directionKey] - ($list['offset' + sizeKey] - $activeItem['offset' + sizeKey]) / 2,
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

      this.$emit('_change', value)

      const type = 'change'
      this.$emit(type, {
        value,
        index: this.activeIndex
      })
    }
  }
}
</script>
