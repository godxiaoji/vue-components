<template>
  <div class="fx-sticky-view-item">
    <div class="fx-sticky-view-item_header">{{ name }}</div>
    <div class="fx-sticky-view-item_body"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'fx-sticky-view-item',
  inject: {
    appSticky: {
      default: null
    }
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  mounted() {
    const $el = this.$el

    $el._app_component = this

    this.update()
  },
  destroyed() {
    this.update()
  },
  methods: {
    update() {
      if (this.appSticky) {
        this.appSticky.update()
      }
    }
  }
}
</script>
