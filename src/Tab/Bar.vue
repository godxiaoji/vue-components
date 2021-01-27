<template>
  <div class="fx-tab-bar">
    <div
      class="fx-tab-bar_inner fx-horizontal-hairline"
      :class="{ fixed }"
      :style="innerStyles"
    >
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
            <icon
              v-if="item.icon"
              :icon="index === activeIndex ? item.activeIcon : item.icon"
            />
          </badge>
          <span class="fx-tab-bar_item-text">{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import tabMixin from './tab-mixin'

export default {
  name: 'fx-tab-bar',
  mixins: [tabMixin],
  props: {
    fixed: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      tabName: 'TabBar'
    }
  },
  computed: {
    innerStyles() {
      const styles = {}

      if (this.fixed) {
        styles.zIndex = this.zIndex
      }

      return styles
    }
  }
}
</script>
