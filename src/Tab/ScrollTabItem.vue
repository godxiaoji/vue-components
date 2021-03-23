<template>
  <div class="fx-sticky-view-item fx-scroll-tab-item">
    <div class="fx-sticky-view-item_header">{{ name }}</div>
    <div class="fx-sticky-view-item_body"><slot></slot></div>
  </div>
</template>

<script>
import StickyViewItem from '../StickyViewItem'

export default {
  name: 'fx-scroll-tab-item',
  extends: StickyViewItem
}
</script>
