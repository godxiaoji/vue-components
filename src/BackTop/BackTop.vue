<template>
  <div v-show="scrollTop >= visibleHeight" :class="[prefix + '-back-top']" :style="styles" @click="onClick">
    <slot>
      <icon icon="UpCircleOutlined" />
    </slot>
  </div>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../config'
import { pageScrollTo } from '../apis/Scroll'
import { addScrollEvent, removeScrollEvent } from '../helpers/events'

export default {
  name: SDKKey + '-back-top',
  components: { Icon },
  props: {
    visibleHeight: {
      type: Number,
      default: 200
    },
    // 是否需要动画
    animated: {
      type: Boolean,
      default: true
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
    return {
      prefix: SDKKey,

      scrollTop: 0,
      duration: 200
    }
  },
  computed: {
    styles() {
      return {
        transform: `translate3d(${this.offset[0]}px, ${this.offset[1]}px, 0px)`
      }
    }
  },
  created() {
    this.scrollTop = document.documentElement.scrollTop

    addScrollEvent(this.onScroll)
  },
  beforeDestroy() {
    removeScrollEvent(this.onScroll)
  },
  methods: {
    onScroll(e) {
      this.scrollTop = e.target.documentElement.scrollTop
    },

    onClick(e) {
      this.toTop()

      this.$emit(e.type, e)
    },

    toTop() {
      pageScrollTo({
        scrollTop: 0,
        duration: this.duration
      })
    }
  }
}
</script>
