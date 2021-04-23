<template>
  <div class="fx-load-more" :class="{ loading }">
    <icon
      class="fx-load-more_icon"
      icon="LoadingOutlined"
      spin
      v-if="loading"
    />
    <slot>
      <i class="fx-load-more_dot"></i>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/Icon'

export default defineComponent({
  name: 'fx-load-more',
  components: { Icon },
  props: {
    // 是否显示加载中
    loading: {
      type: Boolean,
      default: false
    }
  }
})
</script>
