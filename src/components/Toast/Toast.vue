<template>
  <div
    v-show="visibility"
    :class="[
      prefix + '-toast',
      { 'has--icon': image || (icon && icon !== 'none') }
    ]"
  >
    <div :class="[prefix + '-toast_mask']" v-show="mask"></div>
    <div :class="[prefix + '-toast_box']">
      <img v-if="image" :class="[prefix + '-toast_icon']" :src="image" />
      <icon
        v-else-if="icon == 'success'"
        :class="[prefix + '-toast_icon']"
        type="success_no_circle"
      ></icon>
      <icon
        v-else-if="icon == 'loading'"
        :class="[prefix + '-toast_icon loading-icon']"
        type="loading"
      ></icon>
      <div :class="[prefix + '-toast_text']">
        <slot>{{ title }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-toast',
  components: { Icon },
  props: {
    visibility: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    mask: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {}
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 200px;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -20px 0 0 -100px;

  &_mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  &_box {
    min-height: 40px;
    padding: 6px 20px;
    border-radius: 20px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
  }

  &_text {
    max-width: 200px;
    line-height: 28px;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &.has--icon {
    height: 100px;
    width: 100px;
    margin: -50px 0 0 -50px;

    .#{$prefix}-toast_box {
      padding: 0;
      height: 100px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .#{$prefix}-toast_icon {
      width: 48px;
      height: 48px;
      fill: #fff;
    }

    .#{$prefix}-toast_text {
      margin-top: 10px;
      height: 16px;
      line-height: 16px;
      -webkit-line-clamp: 1;
    }

    .loading-icon {
      @include rotate-360-animation(800ms);
    }
  }
}
</style>
