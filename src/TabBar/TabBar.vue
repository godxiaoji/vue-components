<template>
  <div class="fx-tab-bar fx-horizontal-hairline">
    <ul class="fx-tab-bar_list" ref="list">
      <li
        class="fx-tab-bar_item"
        :class="{
          active: index === activeIndex
        }"
        v-for="(item, index) in options2"
        :key="item.value"
        @click="onChange(item.value)"
      >
        <badge class="fx-tab-bar_item-icon" v-bind="item.badge">
          <fx-image
            v-if="item.iconLink"
            :src="index === activeIndex ? item.activeIconLink : item.iconLink"
          />
          <icon
            v-else-if="item.icon"
            :icon="index === activeIndex ? item.activeIcon : item.icon"
          />
        </badge>
        <span class="fx-tab-bar_item-text">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FxImage from '@/Image'
import Icon from '@/Icon'
import Badge from '@/Badge'
import { useTab, tabEmits, tabProps } from '@/Tab/tab'

export default defineComponent({
  name: 'fx-tab-bar',
  components: { FxImage, Icon, Badge },
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
      ...useTab(props, ctx, 'TabBar')
    }
  }
})
</script>
