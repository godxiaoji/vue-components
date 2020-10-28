<template>
  <div :class="[prefix + '-tabs', { vertical }]">
    <ul :class="[prefix + '-tabs_list']" ref="list">
      <li
        :class="[
          prefix + '-tabs_item',
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
        <div :class="[prefix + '-tabs_item-inner']">
          <icon v-if="item.icon" :class-name="item.icon"></icon>
          <span>{{ item.label }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '../Icon'
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
      required: true,
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
    // 纵向
    vertical: {
      type: Boolean,
      default: false
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
            index: this.activeIndex
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
  --active-color: #{$title-color};
  --default-color: #{$font-color};

  &_list {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 36px;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
  }

  &_item {
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    font-size: 16px;
    padding: 0 16px;
    position: relative;
    box-sizing: border-box;
    color: var(--default-color);

    &-inner {
      display: inline-flex;
      align-items: center;
      height: 22px;
      position: relative;

      &::before {
        content: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: -4px;
        width: 16px;
        height: 16px;
        z-index: 0;
        border-radius: 50%;
        background: linear-gradient(
          145deg,
          rgba(24, 144, 255, 0.3) 13.5%,
          rgba(24, 144, 255, 0.05) 86.5%
        );
      }

      span {
        flex: 1;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }

    &.active {
      color: var(--active-color);
      font-weight: 700;

      .#{$prefix}-tabs_item-inner::before {
        content: '';
      }
    }
  }

  &.vertical {
    height: 100%;
    background: none;

    .#{$prefix}-tabs {
      &_list {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
      }

      &_item {
        display: flex;
        height: 48px;
        cursor: pointer;

        &.active {
          background-color: transparent;
        }

        &.active-prev {
          border-radius: 0 0 4px 0;
        }

        &.active-next {
          border-radius: 0 4px 0 0;
        }
      }
    }
  }
}

@media screen and (max-width: 575px) {
}
</style>
