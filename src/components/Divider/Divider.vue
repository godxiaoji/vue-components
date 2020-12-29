<template>
  <div
    :class="[
      prefix + '-divider',
      prefix + '-horizontal-hairline',
      { 'has--title': !!title, 'border--dashed': dashed }
    ]"
  >
    <span v-if="title">{{ title }}</span>
  </div>
</template>

<script>
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-divider',
  props: {
    title: {
      type: String,
      default: null
    },
    dashed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey
    }
  },
  computed: {},
  watch: {},
  created() {},
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-divider {
  --divider-font-color: #{$font3-color};
  --divider-border-color: #{$divider-color};

  display: flex;
  align-items: center;
  margin: 12px 0;
  border: 0 solid var(--divider-border-color);
  color: var(--divider-font-color);

  &.#{$prefix}-horizontal-hairline {
    &::before,
    &::after {
      flex: 1;
      border-color: inherit;
      border-style: inherit;
    }
  }

  &::before {
    content: '';
  }

  &.has--title::after {
    content: '';
  }

  span {
    display: block;
    margin: 0 16px;
    font-size: 14px;
    line-height: 20px;
  }

  &.border--dashed {
    border-style: dashed;
  }
}
</style>
