<template>
  <div :class="[prefix + '-group', { card: card }]">
    <div :class="[prefix + '-group_header']">
      <div :class="[prefix + '-group_title']">{{ title }}</div>
    </div>
    <div :class="[prefix + '-group_body', prefix + '-horizontal-hairline']">
      <div :class="[prefix + '-group_body-inner']">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-group',
  components: {},
  props: {
    title: {
      type: String,
      required: true
    },
    card: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  computed: {},
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

.#{$prefix}-group {
  overflow: hidden;
  margin-bottom: 12px;

  &_header {
    height: 44px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }

  &_body {
    background-color: #fff;

    &::before,
    &::after {
      content: '';
    }
  }

  &_title {
    font-size: 14px;
    color: $font2-color;
  }

  &.card {
    margin: 16px 12px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba($color: $black-color, $alpha: 0.04);

    .#{$prefix}-group {
      &_header {
        height: 48px;
        padding: 0 12px;
      }

      &_title {
        font-size: 17px;
        font-weight: 700;
        color: $title-color;
      }

      &_body {
        border-bottom: none;

        &::after {
          content: none;
        }
      }
    }

    .#{$prefix}-cell_inner {
      padding-right: 12px;
      margin-left: 12px;
    }
  }
}
</style>
