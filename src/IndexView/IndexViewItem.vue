<template>
  <group class="fx-sticky-view-item fx-index-view-item" :title="name">
    <slot></slot>
  </group>
</template>

<script>
import StickyViewItem from '../StickyViewItem'
import Group from '../Group'

export default {
  name: 'fx-index-view-item',
  components: { Group },
  extends: StickyViewItem
}
</script>
