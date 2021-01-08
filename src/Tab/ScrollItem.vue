<template>
  <div :class="[prefix + '-sticky-view-item', prefix + '-scroll-tab-item']">
    <div :class="[prefix + '-sticky-view-item_header']">{{ name }}</div>
    <div :class="[prefix + '-sticky-view-item_body']"><slot></slot></div>
  </div>
</template>

<script>
import StickyViewItem from '../Sticky/ViewItem.vue'
import { SDKKey } from '../config'

export default {
  name: SDKKey + '-scroll-tab-item',
  extends: StickyViewItem
}
</script>
