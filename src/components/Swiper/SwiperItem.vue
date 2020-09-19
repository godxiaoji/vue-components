<template>
  <div :id="itemId" :class="[prefix + '-swiper-item']">
    <slot></slot>
  </div>
</template>

<script>
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-swiper-item',
  props: {
    itemId: {
      type: String,
      default: ''
    }
  },
  data() {
    return { prefix: SDKKey }
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
