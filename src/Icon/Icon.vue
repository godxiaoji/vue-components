<template>
  <component
    :is="component"
    class="fx-icon"
    :class="[moreClassName]"
    :style="[iconColor, iconSize]"
    :icon-name="iconName"
  >
  </component>
</template>

<script>
import { isObject } from '../helpers/util'
import SvgIcon from './SvgIcon'
import { iconValidator } from '../helpers/validator'

function isComponent(value) {
  return isObject(value) && value.functional
}

export default {
  name: 'fx-icon',
  props: {
    icon: {
      validator: iconValidator,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    component() {
      if (isComponent(this.icon)) {
        return this.icon
      }

      return SvgIcon
    },
    moreClassName() {
      return {
        spin: this.spin
      }
    },
    iconName() {
      return `#icon-${isComponent(this.icon) ? 'component' : this.icon}`
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
      if (this.width > 0 && this.height > 0) {
        return {
          width: this.width + 'px',
          height: this.height + 'px'
        }
      }
      if (this.size > 0) {
        return {
          width: this.size + 'px',
          height: this.size + 'px'
        }
      }
      return null
    }
  }
}
</script>
