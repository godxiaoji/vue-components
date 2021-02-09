<script>
import { h } from 'vue'
import SkeletonLayout from './SkeletonLayout.vue'
import { inArray } from '../helpers/util'
import {
  paragraphDefaultRow,
  AVATAR_SHAPE_NAMES,
  BUTTON_SHAPE_NAMES
} from './util'

export default {
  render() {
    if (!this.loading) {
      return this.$slots.default ? this.$slots.default() : null
    }

    return h(
      SkeletonLayout,
      {
        animated: this.animated,
        avatar: this.avatar
      },
      this.$slots.layout
    )
  },
  name: 'fx-skeleton',
  provide() {
    return {
      skeletonSubOptions: this.subOptions
    }
  },
  props: {
    // 是否加载中
    loading: {
      type: Boolean,
      default: true
    },
    // 是否显示头像
    avatar: {
      type: Boolean,
      default: false
    },
    // 是否显示动画
    animated: {
      type: Boolean,
      default: false
    },
    // 指定头像的形状
    avatarShape: {
      validator(val) {
        return inArray(val, AVATAR_SHAPE_NAMES)
      },
      default: AVATAR_SHAPE_NAMES[0]
    },
    // 指定按钮的形状
    buttonShape: {
      validator(val) {
        return inArray(val, BUTTON_SHAPE_NAMES)
      },
      default: BUTTON_SHAPE_NAMES[0]
    },
    // 设置段落占位图的行数
    paragraphRow: {
      type: Number,
      default: paragraphDefaultRow
    }
  },
  data() {
    return {
      subOptions: {
        avatarShape: AVATAR_SHAPE_NAMES[0],
        buttonShape: BUTTON_SHAPE_NAMES[0],
        paragraphRow: paragraphDefaultRow,
        animated: false
      }
    }
  },
  watch: {
    avatarShape: {
      immediate: true,
      handler(val) {
        this.subOptions.avatarShape = val
      }
    },
    buttonShape: {
      immediate: true,
      handler(val) {
        this.subOptions.buttonShape = val
      }
    },
    paragraphRow: {
      immediate: true,
      handler(val) {
        this.subOptions.paragraphRow = val
      }
    },
    animated: {
      immediate: true,
      handler(val) {
        this.subOptions.animated = val
      }
    }
  },
  created() {
    this._app_skeleton = true
  }
}
</script>
