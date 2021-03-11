<template>
  <div
    class="fx-divider fx-horizontal-hairline"
    :class="{ 'has--title': !!title, 'border--dashed': dashed }"
  >
    <span v-if="title">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'fx-divider',
  props: {
    title: {
      type: String,
      default: null
    },
    dashed: {
      type: Boolean,
      default: false
    }
  }
})
</script>
