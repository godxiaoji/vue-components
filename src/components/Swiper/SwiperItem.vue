<template>
  <div :class="[prefix + '-swiper-item']">
    <slot></slot>
  </div>
</template>

<script>
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-swiper-item',
  inject: {
    appSwiper: {
      default: null
    }
  },
  props: {},
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
      if (this.appSwiper) {
        this.appSwiper.update()
      }
    }
  }
}
</script>
