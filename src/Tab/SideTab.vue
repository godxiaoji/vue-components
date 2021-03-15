<template>
  <div class="fx-side-tab">
    <ul class="fx-side-tab_list" ref="list">
      <li
        class="fx-side-tab_item"
        :class="{
          active: index === activeIndex,
          'active-prev': index === activeIndex - 1,
          'active-next': index === activeIndex + 1
        }"
        v-for="(item, index) in options2"
        :key="item.value"
        @click="onChange(item.value)"
      >
        <badge class="fx-side-tab_item-inner" v-bind="item.badge">
          <icon
            v-if="item.icon"
            :icon="index === activeIndex ? item.activeIcon : item.icon"
          />
          <span class="fx-side-tab_item-text">{{ item.label }}</span>
        </badge>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/Icon'
import Badge from '@/Badge'
import { useTab, tabEmits, tabProps } from '@/utils/tab'

export default defineComponent({
  name: 'fx-side-tab',
  components: { Icon, Badge },
  props: {
    ...tabProps,
    scrollThreshold: {
      type: Number,
      default: 4
    }
  },
  emits: tabEmits,
  setup(props, ctx) {
    return {
      ...useTab(props, ctx, 'SideTab')
    }
  }
})
</script>
