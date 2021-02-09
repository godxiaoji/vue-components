<template>
  <teleport to="body">
    <div
      class="fx-popover fx-popup fx-pop-menu"
      :class="{ visible: visible2, 'no--mask': !showMask }"
      :style="popupStyles"
      v-bind="$attrs"
      v-show="isShow"
    >
      <div class="fx-mask" @click="onMaskClick"></div>
      <div class="fx-popover_inner" ref="inner" :style="innerStyles">
        <i class="fx-popover_arrow" :style="arrowStyles"></i>
        <div class="fx-popover_content">
          <ul
            class="fx-pop-menu_list fx-pop-menu_list"
            v-if="options2 && options2.length > 0"
          >
            <li
              class="fx-pop-menu_item fx-horizontal-hairline"
              :class="{ disabled: !!item.disabled }"
              v-for="(item, index) in options2"
              :key="index"
              @click="onItemClick(index)"
            >
              <div
                class="fx-pop-menu_item-inner"
                :class="{ 'has--icon': item.icon }"
              >
                <icon v-if="item.icon" :icon="item.icon" />
                <span>{{ item.name }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import Popover from './Popover.vue'
import Icon from '../Icon'
import { cloneData, isArray, isObject } from '../helpers/util'

export default {
  name: 'fx-pop-menu',
  extends: Popover,
  components: { Icon },
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    options2() {
      if (isArray(this.options)) {
        return this.options.map(v => {
          if (isObject(v)) {
            return cloneData(v)
          }
          return {
            name: v.toString()
          }
        })
      }
      return []
    }
  },
  emits: ['select'],
  methods: {
    onItemClick(index) {
      const item = this.options[index]

      if (!item || item.disabled) {
        return
      }

      const detail = {
        item: cloneData(item),
        index
      }

      this.$emit('select', detail)
      this.afterSelect(detail)

      this.hide()
    },
    afterSelect() {}
  }
}
</script>
