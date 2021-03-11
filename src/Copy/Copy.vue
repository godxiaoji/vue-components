<template>
  <div class="fx-copy" @click="onCopy">
    <input type="text" :value="text" class="fx-copy_input" />
    <div class="fx-copy_box"><slot>复制</slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'fx-copy',
  props: {
    // 需要复制的文本
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    /**
     * 复制
     */
    onCopy(e: Event) {
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
})
</script>
