<template>
  <div
    :class="[
      prefix + '-skeleton-button',
      shapeClassName,
      { animated: useAnimation }
    ]"
  ></div>
</template>

<script>
import { SDKKey } from '../config'
import { inArray } from '../helpers/util'
import { BUTTON_SHAPE_NAMES } from './util'

export default {
  name: SDKKey + '-skeleton-button',
  inject: {
    skeletonSubOptions: {
      default: null
    }
  },
  props: {
    // 是否显示动画
    animated: {
      type: Boolean,
      default: false
    },
    // 指定按钮的形状
    shape: {
      validator(val) {
        return inArray(val, BUTTON_SHAPE_NAMES)
      }
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  computed: {
    shapeClassName() {
      let shape

      if (this.shape == null) {
        if (this.skeletonSubOptions && this.skeletonSubOptions.buttonShape) {
          shape = this.skeletonSubOptions.buttonShape
        }
      } else {
        shape = this.shape
      }

      return (
        'shape--' +
        (inArray(shape, BUTTON_SHAPE_NAMES) ? shape : BUTTON_SHAPE_NAMES[0])
      )
    },
    useAnimation() {
      if (this.skeletonSubOptions) {
        return this.skeletonSubOptions.animated
      }
      return this.animated
    }
  }
}
</script>
