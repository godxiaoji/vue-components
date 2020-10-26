<template>
  <ul :class="[prefix + '-skeleton-paragraph', { animated: useAnimation }]">
    <li v-for="num in size" :key="num"></li>
  </ul>
</template>

<script>
import { SDKKey } from '../../config'
import { isNumber } from '../../helpers/util'
import { paragraphDefaultRow } from './util'

export default {
  name: SDKKey + '-skeleton-paragraph',
  components: {},
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
    // 设置段落占位图的行数
    row: {
      type: Number
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  watch: {},
  computed: {
    useAnimation() {
      if (this.skeletonSubOptions) {
        return this.skeletonSubOptions.animated
      }
      return this.animated
    },
    size() {
      let row

      if (this.row == null) {
        if (
          this.skeletonSubOptions &&
          this.skeletonSubOptions.paragraphRow != null
        ) {
          row = this.skeletonSubOptions.paragraphRow
        }
      } else {
        row = this.row
      }

      return isNumber(row) ? row : paragraphDefaultRow
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

.#{$prefix}-skeleton-paragraph {
  overflow: hidden;
  list-style: none;
  padding: 0;
  margin: 0;

  & li {
    width: 100%;
    margin: 0 0 12px 0;
    height: 16px;
    @include skeleton-background;
    border-radius: 2px;

    &:last-child {
      width: 60%;
      margin-bottom: 0;
    }
  }

  &.animated {
    & li {
      animation: #{$prefix}-skeleton-loading 1.4s ease infinite;
    }
  }
}
</style>
