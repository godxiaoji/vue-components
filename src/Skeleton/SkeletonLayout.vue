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

<script lang="ts">
import { defineComponent } from 'vue'
import SkeletonAvatar from '@/SkeletonAvatar'
import SkeletonTitle from '@/SkeletonTitle'
import SkeletonParagraph from '@/SkeletonParagraph'

export default defineComponent({
  name: 'fx-skeleton-layout',
  props: { animated: Boolean, avatar: Boolean },
  components: {
    SkeletonAvatar,
    SkeletonTitle,
    SkeletonParagraph
  }
})
</script>
