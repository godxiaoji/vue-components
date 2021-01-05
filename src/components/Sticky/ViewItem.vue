<template>
  <div :class="[prefix + '-sticky-view-item']">
    <div :class="[prefix + '-sticky-view-item_header']">{{ name }}</div>
    <div :class="[prefix + '-sticky-view-item_body']"><slot></slot></div>
  </div>
</template>

<script>
import { SDKKey } from '../../config'

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

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-sticky-view-item {
  &_header {
    width: 100%;
    height: 28px;
    line-height: 28px;
    height: var(--sticky-view-fixed-height);
    line-height: var(--sticky-view-fixed-height);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 16px;
    background-color: #fff;
    color: $font-color;
    font-size: 14px;
    box-sizing: border-box;
  }
}
</style>
