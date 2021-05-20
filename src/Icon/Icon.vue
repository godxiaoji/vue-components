<template>
  <component
    :is="component"
    class="fx-icon"
    :class="{ spin }"
    :style="iconStyles"
    :icon-name="iconName"
  >
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SvgIcon from './SvgIcon.vue'
import { iconValidator, isSvgComponent } from '@/helpers/validator'
import { StyleObject } from '../helpers/types'

export default defineComponent({
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
  setup(props) {
    const iconStyles = computed(() => {
      const obj: StyleObject = {}

      props.color && (obj.color = props.color)

      if (props.width > 0 && props.height > 0) {
        obj.width = props.width + 'px'
        obj.height = props.height + 'px'
      } else if (props.size > 0) {
        obj.width = props.size + 'px'
        obj.height = props.size + 'px'
      }

      return obj
    })

    const component = computed(() => {
      return isSvgComponent(props.icon) ? props.icon : SvgIcon
    })

    const iconName = computed(() => {
      return `#icon-${isSvgComponent(props.icon) ? 'component' : props.icon}`
    })

    return {
      iconName,
      iconStyles,
      component
    }
  }
})
</script>
