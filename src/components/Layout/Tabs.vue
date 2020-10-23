<template>
  <div :class="[prefix + '-tabs', { horizontal }]">
    <ul :class="[prefix + '-tabs_list', prefix + '-scroll-bar']" ref="list">
      <li
        :class="[prefix + '-tabs_item', { active: item.active }]"
        v-for="item in options2"
        :key="item.value"
        @click="onChange(item.value)"
      >
        <icon v-if="item.icon" :class-name="item.icon"></icon>
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { CustomEvent } from '../../helpers/events'
import { isNumber, isString, isArray, isObject } from '../../helpers/util'
import { SDKKey } from '../../config'
import { frameTo } from '../../helpers/animation'

export default {
  name: SDKKey + '-tabs',
  components: { Icon },
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
      type: Array,
      default() {
        return []
      }
    },
    value: {
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return isNumber(value) || isString(value)
      },
      default: ''
    },
    fieldNames: {
      type: Object,
      default() {
        return { label: 'label', value: 'value' }
      }
    },
    // 横向
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey,

      value2: null,
      label2: '',

      fieldNames2: { label: 'label', value: 'value' },
      options2: []
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  computed: {},
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
    this.value2 = this.value
    this.updateOptions()
  },
  ready() {},
  mounted() {
    this.isMounted = true
    this.updatePos()
  },
  updated() {},
  attached() {},
  destroyed() {},
  methods: {
    updateValue() {
      if (!this.updateActive(this.value)) {
        this.$emit('_change', this.value2)
        console.error('Invalid prop: "value" is not in "options".')
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
        this.options.forEach(item => {
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
              icon: isString(item.icon) && item.icon ? item.icon : null
            }
          }

          if (option) {
            if (option.value === this.value2) {
              option.active = true
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
          hasValue = true
          this.$set(this.options2[index], 'active', true)
        } else {
          this.$set(this.options2[index], 'active', false)
        }
      })

      if (hasValue && this.isMounted) {
        this.updatePos()
      }

      return hasValue
    },

    getActiveIndex() {
      for (let i = 0; i < this.options2.length; i++) {
        if (this.options2[i].active) {
          return i
        }
      }

      return 0
    },

    updatePos() {
      const activeIndex = this.getActiveIndex()
      const $list = this.$refs.list
      const $activeItem = $list.children[activeIndex]

      let scrollOffset = 0
      const sizeKey = this.horizontal ? 'Width' : 'Height'
      const directionKey = this.horizontal ? 'Left' : 'Top'

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

      this.$emit('_change', value)

      const type = 'change'
      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el,
            target: this.$el
          },
          {
            value,
            index: this.getActiveIndex()
          }
        )
      )
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-tabs {
  --active-color: #{$danger-color};
  --color: #{$font-color};

  &_list {
    position: relative;
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &_item {
    display: flex;
    align-items: center;
    height: 40px;
    cursor: pointer;
    padding: 0 10px;
    font-size: 18px;
    box-sizing: border-box;
    color: var(--color);

    &::before {
      content: '';
      display: block;
      width: 14px;
      height: 14px;
      box-sizing: border-box;
      border: 2px solid #fff;
      margin-right: 10px;
      border-radius: 50%;
    }

    &.active {
      color: var(--active-color);

      &::before {
        border-color: var(--active-color);
      }
    }
  }

  &.horizontal {
    .#{$prefix}-tabs {
      &_list {
        width: 100%;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        height: 40px;
      }

      &_item {
        display: inline-flex;
        justify-content: center;
      }
    }
  }
}

@media screen and (max-width: 575px) {
}
</style>
