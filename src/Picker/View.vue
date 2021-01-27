<template>
  <div class="fx-picker-view" ref="picker">
    <div class="fx-picker-view_cols">
      <div
        class="fx-picker-view_col"
        v-for="(list, listIndex) in cols"
        :key="listIndex"
      >
        <ul
          class="fx-picker-view_list"
          :data-index="listIndex"
          @scroll.stop="onListScroll"
        >
          <li
            class="fx-picker-view_item"
            :class="{ selected: item.selected, disabled: item.disabled }"
            v-for="(item, index) in list"
            :key="item.value"
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
import { frameTo } from '../helpers/animation'
import mulitSelectorMixin from '../util/mulit-selector/mixin'
import { hasClassName } from '../helpers/dom'

export default {
  name: 'fx-picker-view',
  mixins: [mulitSelectorMixin],
  data() {
    return {
      itemHeight: 48,
      picker: true
    }
  },
  created() {
    this.formLabel = this.cacheLabel
    this.formValue = this.cacheValue

    // 需要立即同步好数据
    this.$emit('update:modelValue', this.hookFormValue())
  },
  methods: {
    onChange() {
      this.$emit('update:modelValue', this.hookFormValue())
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
          const $lists = $picker.querySelectorAll(`.fx-picker-view_list`)
          const $firstList = $lists[0]

          if ($firstList && $firstList.firstElementChild) {
            const itemHeight =
              $firstList.firstElementChild.clientHeight || this.itemHeight
            const $selecteds = $picker.querySelectorAll('.selected')
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
        if (hasClassName($items[i], 'selected')) {
          oldSelectIndex = i
          break
        }
      }

      let isChange = current !== oldSelectIndex

      if (isChange) {
        while (
          hasClassName($items[current], 'disabled') &&
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
