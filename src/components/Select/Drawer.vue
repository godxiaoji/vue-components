<template>
  <drawer ref="drawer" title="请选择" :visible="true">
    <div
      :class="[prefix + '-select_options']"
      @mousedown.prevent="onDropdownTap"
      @scroll.stop="onDropdownTap"
    >
      <div
        v-for="item in options"
        :key="item.value"
        :disabled="item.disabled"
        :class="[prefix + '-select_option', { selected: item.selected }]"
        :title="item.label"
        @mousedown="onSelect(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </drawer>
</template>

<script>
import Drawer from '../Drawer'
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-select-drawer',
  components: { Drawer },
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
      prefix: SDKKey
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
    show() {
      this.$refs.drawer && this.$refs.drawer.show()
    },

    hide() {
      this.$refs.drawer && this.$refs.drawer.hide()
    },

    destroy() {
      this.$refs.drawer && this.$refs.drawer.destroy()
    },

    onDropdownTap() {},

    onSelect(item) {
      if (!item.disabled) {
        this.$parent.onSelect(item.value)
      }
    }
  }
}
</script>
