<template>
  <div class="fx-tag" :class="[typeClassName, sizeClassName, patternClassName]">
    <slot></slot>
    <icon
      icon="CloseOutlined"
      @mousedown.native.stop="noop"
      @touchstart.native.stop="noop"
      @click.native="onClose"
      v-if="closable"
    />
  </div>
</template>

<script>
import Icon from '../Icon'
import { createEnumsValidator, getEnumsValue } from '../helpers/validator'
import { addLongPressEvent } from '../helpers/events'

export default {
  name: 'fx-tag',
  components: { Icon },
  props: {
    size: {
      validator: createEnumsValidator('tagSize'),
      default: null
    },
    type: {
      validator: createEnumsValidator('type'),
      default: null
    },
    // 款式
    pattern: {
      validator: createEnumsValidator('tagPattern'),
      default: null
    },
    // 可关闭的
    closable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    typeClassName() {
      return 'type--' + getEnumsValue('type', this.type)
    },
    sizeClassName() {
      return 'size--' + getEnumsValue('tagSize', this.size)
    },
    patternClassName() {
      return 'pattern--' + getEnumsValue('tagPattern', this.pattern)
    }
  },
  mounted() {
    this.removeLongPressEvent = addLongPressEvent(this.$el, this.onLongPress)
  },
  beforeDestroy() {
    this.removeLongPressEvent && this.removeLongPressEvent()
  },
  methods: {
    noop() {},
    onClose() {
      this.$emit('close', {
        type: 'close'
      })
    },
    onLongPress(e) {
      this.$emit(e.type, {
        type: e.e
      })
    }
  }
}
</script>
