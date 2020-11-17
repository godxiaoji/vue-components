<template>
  <div :class="[prefix + '-picker-view', { disabled }]" ref="picker">
    <div :class="[prefix + '-picker-view_cols']">
      <div
        :class="[prefix + '-picker-view_col']"
        v-for="(list, listIndex) in cols"
        :key="listIndex"
      >
        <ul
          :class="[prefix + '-picker-view_list']"
          :data-index="listIndex"
          @scroll.stop="onListScroll"
        >
          <li
            :class="[
              prefix + '-picker-view_item',
              { selected: item.selected, disabled: item.disabled }
            ]"
            v-for="(item, index) in list"
            :key="item.value"
            :selected="item.selected"
            :disabled="item.disabled"
            :data-index="index"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>
    <input
      type="hidden"
      :name="formName"
      :value="formValueString"
      :disabled="disabled"
    />
    <div :class="[prefix + '-picker-view_disabled']" v-if="disabled"></div>
  </div>
</template>

<script>
import { frameTo } from '../../helpers/animation'
import { SDKKey } from '../../config'
import formMixin from '../util/form-mixin'
import pickerMixin from '../util/picker-mixin'

export default {
  name: SDKKey + '-picker-view',
  components: {},
  mixins: [pickerMixin, formMixin],
  props: {},
  data() {
    return {
      prefix: SDKKey
    }
  },
  computed: {},
  watch: {},
  mounted() {
    const $input = this.getInputEl()

    $input._app_component = this
    $input._app_type = 'picker'
  },
  updated() {},
  attached() {},
  methods: {
    getInputEl() {
      return this.$el && this.$el.lastElementChild
    },

    afterUpdate(menuGroup) {
      // 设置默认值
      const lastGroup = menuGroup[menuGroup.length - 1]
      for (let i = 0; i < lastGroup.length; i++) {
        if (lastGroup[i].selected) {
          this.formValue = lastGroup[i].values
          this.formLabel = lastGroup[i].labels
          break
        }
      }

      this.$nextTick(() => {
        // 把选择数据展示在选择框内
        const $picker = this.$refs.picker

        if ($picker) {
          const $lists = $picker.querySelectorAll(`.${SDKKey}-picker-view_list`)
          const $firstList = $lists[0]

          if ($firstList && $firstList.firstElementChild) {
            const itemHeight = $firstList.firstElementChild.clientHeight
            const $selecteds = $picker.querySelectorAll('[selected]')
            $selecteds.forEach(($selected, index) => {
              const itemIndex = parseInt($selected.dataset.index)
              $lists[index].scrollTop = itemHeight * itemIndex
            })
          }
        }
      })
    },

    onListScroll(e) {
      const $list = e.currentTarget

      if ($list.scrolling) {
        return
      }

      clearTimeout($list.scrollTimer)

      const $items = $list.children
      const itemHeight = $list.firstElementChild.clientHeight
      const groupIndex = parseInt($list.dataset.index)
      let current = Math.round($list.scrollTop / itemHeight)
      let oldSelectIndex = 0

      for (let i = 0; i < $items.length; i++) {
        if ($items[i].getAttribute('selected') === 'selected') {
          oldSelectIndex = i
          break
        }
      }

      let isChange = current !== oldSelectIndex

      if (isChange) {
        while (
          $items[current].getAttribute('disabled') === 'disabled' &&
          current !== oldSelectIndex
        ) {
          // 处理disabled 不能选的问题
          if (current > oldSelectIndex) {
            current--
          } else {
            current++
          }
        }
      }

      isChange = current !== oldSelectIndex

      const item = this.cols[groupIndex][current]

      if (current * itemHeight === $list.scrollTop && !isChange) {
        // 如果一致 就不需要修正了
      } else {
        $list.scrollTimer = setTimeout(() => {
          // $list.scrollTop = current * itemHeight
          $list.scrolling = true

          frameTo({
            from: $list.scrollTop,
            to: current * itemHeight,
            duration: 100,
            progress(res) {
              $list.scrollTop = res.current
            },
            complete() {
              $list.scrolling = false
            }
          })

          if (isChange) {
            if (this.isCascade) {
              this.update(item.values)
            } else {
              this.updateColSelected(groupIndex, current)
            }

            this.onChange()
          }
        }, 400)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-picker-view {
  position: relative;
  background: #fff;
  color: $title-color;

  &.disabled {
    opacity: 0.2;
  }

  &_disabled {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: not-allowed;
  }

  &_cols {
    width: 100%;
    height: 250px;
    display: flex;
    flex-wrap: nowrap;
  }

  &_col {
    position: relative;
    height: 100%;
    flex: 1;

    &::before {
      content: '';
      position: absolute;
      top: 100px;
      left: 0;
      height: 0;
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid $border-color;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 100px;
      left: 0;
      height: 0;
      width: 100%;
      box-sizing: border-box;
      border-top: 1px solid $border-color;
    }
  }

  &_list {
    width: 100%;
    max-height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    user-select: none;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    cursor: grab;
  }

  &_item {
    padding: 0 12px;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: $font3-color;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;

    &:first-child {
      margin-top: 100px;
    }

    &:last-child {
      margin-bottom: 100px;
    }

    &.selected {
      color: $title-color;
    }

    &.disabled {
      color: $divider-color;
    }
  }
}
</style>
