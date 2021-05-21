<template>
  <drawer
    class="fx-cascader-popup"
    :title="title2"
    placement="right"
    :visible="visible"
    @visible-state-change="onVisibleStateChange"
    @confirm="onConfirm"
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

<script lang="ts">
import { defineComponent, nextTick, ref, computed } from 'vue'
import Drawer from '@/Drawer'
import { frameTo } from '@/helpers/animation'
import { isSameArray } from '@/helpers/util'
import { useView, viewEmits } from '@/Picker/view'
import pickerCommonProps from '@/Picker/props'
import {
  usePopupExtend,
  popupExtendEmits,
  popupExtendProps
} from '@/hooks/popup'
import { ColRow, Values } from '../Picker/types'

export default defineComponent({
  name: 'fx-cascader-popup',
  components: { Drawer },
  props: {
    ...popupExtendProps,
    ...pickerCommonProps,
    title: {
      type: String,
      default: ''
    }
  },
  emits: [...viewEmits, ...popupExtendEmits],
  setup(props, ctx) {
    const dropdown = ref<HTMLElement>()

    const popup = usePopupExtend(ctx)

    function updateLayout() {
      nextTick(() => {
        const $dropdown = dropdown.value as HTMLElement

        if (!$dropdown) {
          return
        }

        const $lists = $dropdown.querySelectorAll(`.fx-cascader_list`)
        const $selecteds = $dropdown.querySelectorAll('.selected')

        if ($lists[1]) {
          let $next: HTMLElement
          if ($lists.length > $selecteds.length) {
            // 还有未选择
            $next = $lists[$selecteds.length] as HTMLElement
          } else {
            // 选择完毕
            $next = $lists[$lists.length - 1] as HTMLElement
          }

          $next = $next.parentElement as HTMLElement
          const $groups = $next.parentElement as HTMLElement

          let to: number

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
              to: ($selecteds[index] as HTMLElement).offsetTop,
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
    }

    function onItemClick(e: Event, item: ColRow) {
      if (item.disabled) {
        return
      }

      const selecteds = getValuesByRow(item)

      if (item.hasChildren) {
        update(selecteds)
      } else {
        if (!isSameArray(formValue, selecteds)) {
          onSelect(selecteds)
          onChange()
        } else {
          onSelect(selecteds)
        }
      }
    }

    function onSelect(selecteds: Values) {
      const confirmDetail = updateValue(selecteds)
      popup.customConfirm(confirmDetail)
    }

    const {
      format2String,
      cacheLabel,
      getDetail,
      formLabel,
      formValue,
      cols,
      update,
      getValuesByRow,
      updateValue,
      onChange
    } = useView(props, ctx, { name: 'cascader', afterUpdate: updateLayout }, {})

    const title2 = computed(() => {
      return format2String(cacheLabel) || props.title
    })

    return {
      ...popup,
      title2,
      dropdown,
      cols,
      getDetail,
      formLabel,
      formValue,
      updateValue,
      onItemClick
    }
  }
  // watch: {
  //   visible: {
  //     handler(val) {
  //       if (val) {
  //         this.update(this.formValue)
  //       }
  //     }
  //   }
  // }
})
</script>
