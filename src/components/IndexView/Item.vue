<template>
  <group :class="[prefix + '-sticky-view-item', prefix + '-index-view-item']" :title="name">
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
