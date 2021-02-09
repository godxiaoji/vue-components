<template>
  <div
    class="fx-divider fx-horizontal-hairline"
    :class="{ 'has--title': !!title, 'border--dashed': dashed }"
  >
    <span v-if="title">{{ title }}</span>
  </div>
</template>

<script>
export default {
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
}
</script>
