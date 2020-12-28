<template>
  <group
    :class="[prefix + '-sticky-view-item', prefix + '-index-view-item']"
    :title="name"
  >
    <slot></slot>
  </group>
</template>

<script>
import StickyViewItem from '../Sticky/ViewItem.vue'
import Group from '../Group'
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-index-view-item',
  components: { Group },
  extends: StickyViewItem
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-index-view-item {
  margin-bottom: 0;

  .#{$prefix}-group_header {
    height: 28px;
    background-color: $background-color;
  }
}
</style>
