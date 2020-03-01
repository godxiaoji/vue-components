<template>
  <div :id="itemId" class="swiper-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'app-swiper-item',
  props: {
    itemId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  ready() {
    this.update()
  },
  mounted() {
    this.update()
  },
  updated() {
    this.update()
  },
  attached() {
    this.update()
  },
  methods: {
    update() {
      if (this.$parent && this.$parent.swiper) {
        this.$parent.update()
      }
    }
  }
}
</script>
