<template>
  <div :class="[prefix + '-select_option-group', prefix + '-scroll-bar']">
    <div
      v-for="item in options"
      :key="item.value"
      :disabled="item.disabled"
      :class="[
        prefix + '-select_option',
        { selected: item.selected }
      ]"
      :title="item.label"
      @mousedown="onSelect(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-select-picker',
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      prefix: SDKKey,

      selected: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  methods: {
    onSelect(item) {
      if (!item.disabled) {
        this.$parent.onChange(item.value)
      }
    }
  }
}
</script>
