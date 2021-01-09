<template>
  <svg :class="[prefix + '-icon', moreClassName]" :style="[iconColor, iconSize]" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { SDKKey } from '../config'
import './lib/load-svg'

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
  methods: {
    onClick(e) {
      this.$emit(e.type, e)
    }
  }
}
</script>