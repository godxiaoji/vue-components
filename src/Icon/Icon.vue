<template>
  <component
    :is="component"
    :class="[prefix + '-icon', moreClassName]"
    :style="[iconColor, iconSize]"
    :icon-name="iconName"
  >
  </component>
</template>

<script>
import { SDKKey } from '../config'
import { isObject, isString } from '../helpers/util'
import SvgIcon from './SvgIcon'

function isComponent(value) {
  return isObject(value) && value.functional
}

export default {
  name: SDKKey + '-icon',
  props: {
    icon: {
      validator(value) {
        return isString(value) || isComponent(value)
      },
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
    }
  },
  data() {
    return { prefix: SDKKey }
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
  },
  methods: {
    onClick(e) {
      this.$emit(e.type, e)
    }
  }
}
</script>
