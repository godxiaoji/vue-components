<template>
  <div :class="[prefix + '-tab-bar']">
    <div :class="[prefix + '-tab-bar_inner', prefix + '-horizontal-hairline', { fixed }]" :style="innerStyles">
      <ul :class="[prefix + '-tab-bar_list']" ref="list">
        <li
          :class="[
            prefix + '-tab-bar_item',
            {
              active: index === activeIndex
            }
          ]"
          v-for="(item, index) in options2"
          :key="item.value"
          @click="onChange(item.value)"
        >
          <badge :class="[prefix + '-tab-bar_item-icon']" v-bind="item.badge">
            <icon v-if="item.icon" :icon="index === activeIndex ? item.activeIcon : item.icon" />
          </badge>
          <span :class="[prefix + '-tab-bar_item-text']">{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import tabMixin from './tab-mixin'
import { SDKKey } from '../config'

export default {
  name: SDKKey + '-tab-bar',
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
      prefix: SDKKey,

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
