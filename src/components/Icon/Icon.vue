<template>
  <svg
    :class="[prefix + '-icon', moreClassName]"
    :style="[iconColor, iconSize]"
    aria-hidden="true"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { SDKKey } from '../../config'

const req = require.context('../../icons', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

export default {
  name: SDKKey + '-icon',
  props: {
    className: {
      type: String,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 0
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  computed: {
    moreClassName() {
      return {
        spin: this.spin
      }
    },
    iconName() {
      return `#icon-${this.className}`
    },
    iconColor() {
      if (this.color) {
        return {
          fill: this.color
        }
      }
      return null
    },
    iconSize() {
      if (this.size > 0) {
        return {
          width: this.size + 'px',
          height: this.size + 'px'
        }
      }
      return null
    }
  },
  watch: {},
  created() {},
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  methods: {
    onClick(e) {
      this.$emit(e.type, e)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-icon {
  --size: 24px;
  --color: #{$title-color};

  display: inline-block;
  width: var(--size);
  height: var(--size);
  overflow: hidden;
  line-height: 0;
  fill: var(--color);

  &.spin {
    @include rotate-360-animation(800ms);
  }
}
</style>
