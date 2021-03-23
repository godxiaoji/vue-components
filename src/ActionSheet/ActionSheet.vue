<template>
  <drawer
    class="fx-action-sheet"
    :title="title"
    placement="bottom"
    :visible="visible"
    @visible-state-change="onVisibleStateChange"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <ul class="fx-action-sheet_list">
      <li
        class="fx-action-sheet_item fx-horizontal-hairline"
        :class="{ disabled: !!item.disabled }"
        v-for="(item, index) in options2"
        :key="index"
        @click="onItemClick(index)"
      >
        <div
          class="fx-action-sheet_item-inner"
          :class="{ highlight: item.highlight }"
        >
          <span>{{ item.name }}</span>
          <small v-if="item.description">{{ item.description }}</small>
        </div>
      </li>
    </ul>
    <ul class="fx-action-sheet_list" v-if="showCancel">
      <li
        class="fx-action-sheet_item fx-horizontal-hairline"
        @click="onCancelClick"
      >
        <div class="fx-action-sheet_item-inner align--center">
          <span>{{ cancelText }}</span>
        </div>
      </li>
    </ul>
  </drawer>
</template>

<script lang="ts">
import { computed, PropType, defineComponent } from 'vue'
import Drawer from '@/Drawer'
import { isArray, isObject, cloneData } from '@/helpers/util'
import {
  usePopupExtend,
  popupExtendEmits,
  popupExtendProps
} from '@/hooks/popup'
import type { ActionSheetItem } from './types'

export default defineComponent({
  name: 'fx-action-sheet',
  components: { Drawer },
  props: {
    ...popupExtendProps,
    title: {
      type: String,
      default: null
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    options: {
      type: Array as PropType<ActionSheetItem[]>,
      default: () => [] as ActionSheetItem[]
    }
  },
  emits: popupExtendEmits,
  setup(props, ctx) {
    const popup = usePopupExtend(ctx)

    function onItemClick(index: number) {
      const detail = {
        item: cloneData(props.options[index]),
        index
      }

      ctx.emit('confirm', detail)
      popup.customConfirm(detail, 'selected')
    }

    const options2 = computed(() => {
      const options: ActionSheetItem[] = []

      if (isArray(props.options)) {
        props.options.forEach(v => {
          options.push(
            isObject(v)
              ? cloneData<ActionSheetItem>(v)
              : {
                  name: v.toString()
                }
          )
        })
      }
      return options
    })

    return {
      ...popup,
      options2,
      onItemClick
    }
  }
})
</script>
