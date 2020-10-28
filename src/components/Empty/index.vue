<template>
  <div :class="[prefix + '-empty']">
    <slot class="image" v-if="hasImage"></slot>
    <template v-else>
      <img
        :class="[prefix + '-empty_image']"
        :src="imageUrl"
      />
    </template>
    <p :class="[prefix + '-empty_description']" v-show="description">
      {{ description }}
    </p>
    <slot></slot>
  </div>
</template>

<script>
import { SDKKey } from '../../config'
import { inArray } from '../../helpers/util'

const TYPE_NAMES = ['default', 'error', 'network', 'search']

export default {
  name: SDKKey + '-empty',
  components: {},
  props: {
    // 描述文字
    description: {
      type: String,
      default: ''
    },
    // 类型
    type: {
      validator(val) {
        return inArray(val, TYPE_NAMES)
      },
      default: TYPE_NAMES[0]
    }
  },
  data() {
    return { prefix: SDKKey, hasImage: false }
  },
  watch: {},
  computed: {
    imageUrl() {
      return inArray(this.type, TYPE_NAMES)
        ? `https://cdn.fox2.cn/vfox/empty/${this.type}@2x.png`
        : null
    }
  },
  created() {},
  mounted() {
    if (this.$scopedSlots.image) {
      this.hasImage = true
    }
  },
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  box-sizing: border-box;

  &_image {
    width: 160px;
    height: 160px;
  }

  &_description {
    color: $font2-color;
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
    margin: 16px 0 0 0;
    font-size: 14px;
    line-height: 19.6px;
  }
}
</style>
