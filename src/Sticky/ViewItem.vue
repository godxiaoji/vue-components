<template>
  <div :class="[prefix + '-sticky-view-item']">
    <div :class="[prefix + '-sticky-view-item_header']">{{ name }}</div>
    <div :class="[prefix + '-sticky-view-item_body']"><slot></slot></div>
  </div>
</template>

<script>
import { SDKKey } from '../config'

export default {
  name: SDKKey + '-sticky-view-item',
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
  data() {
    return { prefix: SDKKey }
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
