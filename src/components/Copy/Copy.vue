<template>
  <div :class="[prefix + '-copy']" @click="onCopy">
    <input type="text" :value="text" :class="[prefix + '-copy_input']" />
    <div :class="[prefix + '-copy_box']"><slot>复制</slot></div>
  </div>
</template>

<script>
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-copy',
  props: {
    // 需要复制的文本
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  methods: {
    /**
     * 复制
     */
    onCopy(e) {
      const $el = this.$el

      try {
        $el.firstElementChild.select()
        document.execCommand('Copy')

        this.$emit('success', {
          text: $el.firstElementChild.value
        })
      } catch (error) {
        this.$emit('error', error)
      }

      this.$emit(e.type, e)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-copy {
  display: inline-block;
  position: relative;

  &_input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    opacity: 0;
    z-index: 0;
  }

  &_box {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    display: flex;
  }
}
</style>
