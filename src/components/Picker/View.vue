<template>
  <div :class="[prefix + '-picker-view']" ref="picker">
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
  </div>
</template>

<script>
import { frameTo } from '../../helpers/animation'
import { SDKKey } from '../../config'
import mulitSelectorMixin from '../util/mulit-selector/mixin'

export default {
  name: SDKKey + '-picker-view',
  mixins: [mulitSelectorMixin],
  data() {
    return {
      prefix: SDKKey,
      itemHeight: 48,
      picker: true
    }
  },
  created() {
    this.formLabel = this.cacheLabel
    this.formValue = this.cacheValue

    // 需要立即同步好数据
    this.$emit('_change', this.hookFormValue())
  },
  methods: {
    onChange() {
      this.$emit('_change', this.hookFormValue())
      this.$emit('change', this.getDetail())
    },

    hookFormValue() {
      const { value, valueString } = this.getDetail()
      return this.formatString ? valueString : value
    },

    afterUpdate() {
      this.formLabel = this.cacheLabel
      this.formValue = this.cacheValue

      // 把选择数据展示在选择框内
      this.updatePos()
    },

    updatePos() {
      this.$nextTick(() => {
        // 把选择数据展示在选择框内
        const $picker = this.$refs.picker

        if ($picker) {
          const $lists = $picker.querySelectorAll(`.${SDKKey}-picker-view_list`)
          const $firstList = $lists[0]

          if ($firstList && $firstList.firstElementChild) {
            const itemHeight =
              $firstList.firstElementChild.clientHeight || this.itemHeight
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
      const itemHeight = $list.firstElementChild.clientHeight || this.itemHeight
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
  flex-grow: 1;
  position: relative;
  background: #fff;
  color: $title-color;
  --pick-view-item-height: 48px;

  &_cols {
    width: 100%;
    height: calc(var(--pick-view-item-height) * 5);
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
      top: calc(var(--pick-view-item-height) * 2);
      left: 0;
      height: 0;
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid $border-color;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: calc(var(--pick-view-item-height) * 2);
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
    height: var(--pick-view-item-height);
    line-height: var(--pick-view-item-height);
    font-size: 17px;
    color: $font3-color;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;

    &:first-child {
      margin-top: calc(var(--pick-view-item-height) * 2);
    }

    &:last-child {
      margin-bottom: calc(var(--pick-view-item-height) * 2);
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
