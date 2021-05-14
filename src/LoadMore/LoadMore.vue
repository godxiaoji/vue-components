<template>
  <div class="fx-load-more" :class="{ loading }">
    <activity-indicator class="fx-load-more_icon" v-if="loading" />
    <slot>
      <i class="fx-load-more_dot"></i>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ActivityIndicator from '@/ActivityIndicator'

export default defineComponent({
  name: 'fx-load-more',
  components: { ActivityIndicator },
  props: {
    // 是否显示加载中
    loading: {
      type: Boolean,
      default: false
    }
  }
})
</script>
