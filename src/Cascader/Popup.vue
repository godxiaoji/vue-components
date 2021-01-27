<template>
  <drawer
    class="fx-cascader-popup"
    :title="title2"
    placement="right"
    :visible="visible"
    @show="onShow"
    @shown="onShown"
    @hide="onHide"
    @hidden="onHidden"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <div ref="dropdown" class="fx-cascader_groups">
      <div
        class="fx-cascader_group fx-vertical-hairline"
        v-for="(list, listIndex) in cols"
        :key="listIndex"
      >
        <ul class="fx-cascader_list" :data-index="listIndex">
          <li
            class="fx-cascader_item fx-horizontal-hairline"
            :class="{
              selected: item.selected,
              disabled: item.disabled
            }"
            v-for="(item, index) in list"
            :key="item.value"
            :data-index="index"
            @click="onItemClick($event, item)"
          >
            <span class="fx-cascader_item-text">
              {{ item.label }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </drawer>
</template>

<script>
import Drawer from '../Drawer'
import { array2String, getDefaultDetail } from '../util/mulit-selector'
import { frameTo } from '../helpers/animation'
import mulitSelectorMixin from '../util/mulit-selector/mixin'
import popupExtendMixin from '../util/popup-extend-mixin'
import { isSameArray } from '../helpers/util'

export default {
  name: 'fx-cascader-popup',
  mixins: [popupExtendMixin, mulitSelectorMixin],
  components: { Drawer },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      detail: getDefaultDetail(),

      cascader: true
    }
  },
  computed: {
    title2() {
      if (this.cacheLabel[0]) {
        return array2String(this.cacheLabel, this.mode, this.separator)
      }

      return this.title || ' '
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.update(this.formValue)
        }
      }
    }
  },
  methods: {
    afterUpdate() {
      this.$nextTick(() => {
        const $dropdown = this.$refs.dropdown

        if (!$dropdown) {
          return
        }

        const $lists = $dropdown.querySelectorAll(`.fx-cascader_list`)
        const $selecteds = $dropdown.querySelectorAll('.selected')

        if ($lists[1]) {
          let $next
          if ($lists.length > $selecteds.length) {
            // 还有未选择
            $next = $lists[$selecteds.length]
          } else {
            // 选择完毕
            $next = $lists[$lists.length - 1]
          }

          $next = $next.parentNode
          const $groups = $next.parentNode

          let to

          if ($next.offsetWidth >= document.documentElement.offsetWidth * 0.9) {
            to = $next.offsetLeft
          } else {
            to = $next.offsetLeft - ($groups.offsetWidth - $next.offsetWidth)
          }

          if (to >= 0) {
            frameTo({
              from: $groups.scrollLeft,
              to,
              duration: 100,
              progress(res) {
                $groups.scrollLeft = res.current
              }
            })
          }

          // $next.scrollIntoView(
          //   $next.offsetWidth < document.documentElement.offsetWidth
          // )
        } else {
          $dropdown.scrollLeft = 0
        }

        $lists.forEach(($list, index) => {
          if ($selecteds[index]) {
            frameTo({
              from: $list.scrollTop,
              to: $selecteds[index].offsetTop,
              duration: 100,
              progress(res) {
                $list.scrollTop = res.current
              }
            })
          } else {
            $list.scrollTop = 0
          }
        })
      })
    },

    /**
     * 选项点击
     */
    onItemClick(e, item) {
      if (item.disabled) {
        return
      }

      if (item.hasChildren) {
        this.update(item.values)
      } else {
        if (!isSameArray(this.formValue, item.values)) {
          this.formValue = item.values
          this.formLabel = item.labels

          this.select()

          this.$emit('update:modelValue', this.hookFormValue())
          this.$emit('change', this.getDetail())
          this.afterChange(this.getDetail())
        } else {
          this.select()
        }

        this.onUpdateVisible(false)
      }
    },

    select() {
      const selectDetail = this.getDetail()
      this.$emit('select', selectDetail)
      this.afterSelect(selectDetail)
    },

    afterSelect() {},

    afterChange() {},

    hookFormValue() {
      const { value, valueString } = this.getDetail()
      return this.formatString ? valueString : value
    }
  }
}
</script>
