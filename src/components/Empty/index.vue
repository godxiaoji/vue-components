<template>
  <div :class="[prefix + '-empty']">
    <slot name="image" v-if="$slots.image"></slot>
    <template v-else>
      <img :class="[prefix + '-empty_image']" :src="imageUrl" />
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
    return { prefix: SDKKey }
  },
  watch: {},
  computed: {
    imageUrl() {
      return `https://cdn.fox2.cn/vfox/empty/${
        inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0]
      }@2x.png`
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

.#{$prefix}-empty {
  --empty-font-color: #{$font2-color};

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
    color: var(--empty-font-color);
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
    margin: 16px 0 0 0;
    font-size: 14px;
    line-height: 19.6px;

    + * {
      margin-top: 16px;
    }
  }
}
</style>
