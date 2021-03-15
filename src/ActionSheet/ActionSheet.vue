<template>
  <drawer
    class="fx-action-sheet"
    placement="bottom"
    :visible="visible"
    @visible-state-change="onVisibleStateChange"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <div class="fx-action-sheet_header fx-horizontal-hairline" v-if="title">
      <div class="fx-action-sheet_title" v-if="title">
        {{ title }}
      </div>
    </div>
    <div class="fx-action-sheet_body">
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
    </div>
    <div class="fx-action-sheet_footer" v-if="showCancel">
      <ul class="fx-action-sheet_list">
        <li
          class="fx-action-sheet_item fx-horizontal-hairline"
          @click="onCancelClick"
        >
          <div class="fx-action-sheet_item-inner align--center">
            <span>{{ cancelText }}</span>
          </div>
        </li>
      </ul>
    </div>
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
} from '@/utils/popup'

interface ActionSheetItem {
  name: string
  highlight?: boolean
  description?: string
  disabled?: boolean
}

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
      default: () => []
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
