<template>
  <div :class="[prefix + '-badge']">
    <slot></slot>
    <i
      v-if="dot"
      :class="[prefix + '-badge_dot']"
      :style="styles"
      v-show="showZero || count > 0"
    ></i>
    <span
      v-else
      :class="[prefix + '-badge_num']"
      :style="styles"
      v-show="showZero || count > 0"
      >{{ showCount }}</span
    >
  </div>
</template>

<script>
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-badge',
  components: {},
  props: {
    // 消息条数
    count: {
      type: Number,
      default: 0
    },
    // 最大完全显示消息条数
    maxCount: {
      type: Number,
      default: 99
    },
    // 是否显示为小红点
    dot: {
      type: Boolean,
      default: false
    },
    // 消息数为0时是否显示
    showZero: {
      type: Boolean,
      default: false
    },
    // 偏移量，格式为 [x, y]
    offset: {
      type: Array,
      default() {
        return [0, 0]
      }
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  watch: {},
  computed: {
    showCount() {
      const count = Math.abs(this.count)

      if (count > this.maxCount) {
        return this.maxCount + '+'
      }
      return count.toString()
    },
    styles() {
      return {
        transform: `translate3d(${this.offset[0]}px, ${this.offset[1]}px, 0px)`
      }
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-badge {
  display: inline-block;
  position: relative;
  --background-color: var(--#{$prefix}-danger-color);
  --border-color: #fff;
  --color: #fff;

  &_num {
    position: absolute;
    right: -9px;
    top: -9px;
    height: 18px;
    min-width: 18px;
    display: inline-flex;
    align-items: center;
    padding: 0 4px;
    border-radius: 9px;
    box-sizing: border-box;
    font-size: 12px;
    color: var(--color);
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
  }

  &_dot {
    position: absolute;
    right: -5px;
    top: -5px;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    color: var(--color);
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
  }
}
</style>
