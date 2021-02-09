<template>
  <div class="fx-skeleton" :class="{ animated }">
    <slot>
      <div class="fx-skeleton_layout">
        <div class="fx-skeleton_layout-left" v-if="avatar">
          <skeleton-avatar />
        </div>
        <div class="fx-skeleton_layout-right">
          <skeleton-title />
          <skeleton-paragraph />
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import SkeletonAvatar from './SkeletonAvatar.vue'
import SkeletonTitle from './SkeletonTitle.vue'
import SkeletonParagraph from './SkeletonParagraph.vue'

export default {
  name: 'fx-skeleton-layout',
  props: { animated: Boolean, avatar: Boolean },
  components: {
    SkeletonAvatar,
    SkeletonTitle,
    SkeletonParagraph
  }
}
</script>
