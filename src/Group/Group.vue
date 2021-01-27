<template>
  <div class="fx-group" :class="{ card: !!card }">
    <div class="fx-group_header">
      <div class="fx-group_title">{{ title }}</div>
    </div>
    <div class="fx-group_body fx-horizontal-hairline hairline-reverse">
      <div class="fx-group_body-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fx-group',
  props: {
    title: {
      type: String,
      required: true
    },
    card: {
      type: Boolean,
      default: false
    }
  }
}
</script>
