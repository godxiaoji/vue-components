<template>
  <div :class="[prefix + '-skeleton', { animated }]">
    <slot>
      <div :class="[prefix + '-skeleton_layout']">
        <div :class="[prefix + '-skeleton_layout-left']" v-if="avatar">
          <skeleton-avatar />
        </div>
        <div :class="[prefix + '-skeleton_layout-right']">
          <skeleton-title />
          <skeleton-paragraph />
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import { SDKKey } from '../config'
import SkeletonAvatar from './Avatar.vue'
import SkeletonTitle from './Title.vue'
import SkeletonParagraph from './Paragraph.vue'

export default {
  name: SDKKey + '-skeleton-layout',
  props: { animated: Boolean, avatar: Boolean },
  components: {
    SkeletonAvatar,
    SkeletonTitle,
    SkeletonParagraph
  },
  data() {
    return { prefix: SDKKey }
  }
}
</script>
