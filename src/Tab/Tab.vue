<template>
  <div
    class="fx-tab"
    :class="{
      'no--scroll': options2.length <= scrollThreshold,
      'has--sub': hasSub
    }"
  >
    <ul class="fx-tab_list" ref="list">
      <li
        class="fx-tab_item fx-vertical-hairline"
        :class="{
          active: index === activeIndex,
          'active-prev': index === activeIndex - 1,
          'active-next': index === activeIndex + 1
        }"
        v-for="(item, index) in options2"
        :key="item.value"
        @click="onChange(item.value)"
      >
        <badge class="fx-tab_item-inner" v-bind="item.badge">
          <icon
            v-if="item.icon"
            :icon="index === activeIndex ? item.activeIcon : item.icon"
          />
          <span class="fx-tab_item-text">{{ item.label }}</span>
        </badge>
        <span class="fx-tab_item-sub-text" v-if="hasSub">{{
          item.subLabel
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import tabMixin from './tab-mixin'

export default {
  name: 'fx-tab',
  mixins: [tabMixin],
  props: {
    scrollThreshold: {
      type: Number,
      default: 4
    }
  }
}
</script>
