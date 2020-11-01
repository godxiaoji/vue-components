<template>
  <div :class="[prefix + '-nav-bar']">
    <div
      :class="[
        prefix + '-nav-bar_inner',
        prefix + '-horizontal-hairline',
        { fixed: fixedTop }
      ]"
    >
      <div :class="[prefix + '-nav-bar_left']">
        <slot name="left" v-if="$slots.left"></slot>
        <template v-else>
          <fx-button-group size="small" :shape="buttonShape2">
            <fx-button
              type="default"
              icon="LeftOutlined"
              v-if="showBack"
              @click="onBack"
              >返回</fx-button
            >
            <fx-button
              type="default"
              icon="HomeOutlined"
              v-if="showHome"
              @click="onBackHome"
              >首页</fx-button
            >
          </fx-button-group>
        </template>
      </div>
      <div
        :class="[prefix + '-nav-bar_title']"
        @mousedown="onTitleStart"
        @touchstart="onTitleStart"
      >
        {{ title }}
      </div>
      <div :class="[prefix + '-nav-bar_right']">
        <slot name="right" v-if="$slots.right"></slot>
        <template v-else>
          <fx-button-group
            size="small"
            :shape="buttonShape2"
            v-if="rightButtons.length > 0"
          >
            <fx-button
              type="default"
              :icon="item.icon"
              v-for="(item, index) in rightButtons"
              :key="index"
              @click="onRightIconClick(item, index)"
              >{{ item.text }}</fx-button
            >
          </fx-button-group>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { SDKKey } from '../../config'
import { inArray, isArray, isString } from '../../helpers/util'

const BUTTON_SHAPE_NAMES = ['default', 'round', 'circle', 'square']

export default {
  name: SDKKey + '-nav-bar',
  components: {},
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 是否展示返回按钮
    fixedTop: {
      type: Boolean,
      default: false
    },
    // 是否展示返回按钮
    showBack: {
      type: Boolean,
      default: false
    },
    // 是否展示返回首页按钮
    showHome: {
      type: Boolean,
      default: false
    },
    rightButtons: {
      validator(val) {
        if (isArray(val)) {
          if (val.length === 0) {
            return true
          }

          for (let i = 0; i < val.length; i++) {
            if (!(isString(val[i].text) && isString(val[i].icon))) {
              return false
            }
          }

          return true
        }

        return false
      },
      default() {
        return []
      }
    },
    buttonShape: {
      validator(val) {
        return inArray(val, BUTTON_SHAPE_NAMES)
      },
      default: BUTTON_SHAPE_NAMES[3]
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  watch: {},
  computed: {
    buttonShape2() {
      return inArray(this.buttonShape, BUTTON_SHAPE_NAMES)
        ? this.buttonShape
        : BUTTON_SHAPE_NAMES[3]
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    onBack() {
      console.log(this.$scopedSlots, this.$slots)
      this.$emit('back-click', {})
    },
    onBackHome() {
      this.$emit('home-click', {})
    },
    onRightIconClick(item, index) {
      this.$emit('right-button-click', {
        icon: item.icon,
        text: item.text,
        index
      })
    },
    onTitleStart(e) {
      if (!this.dbClickTag) {
        this.dbClickTag = e.type
        this.dbClickTimer = setTimeout(() => {
          this.dbClickTag = null
        }, 300)
      } else if (this.dbClickTag === e.type) {
        clearTimeout(this.dbClickTimer)
        this.dbClickTag = null
        this.$emit('title-dbclick', {})
      }
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-nav-bar {
  --nav-bar-height: 48px;
  position: relative;
  height: var(--nav-bar-height);
  width: 100%;
  font-size: 17px;

  &_inner {
    position: relative;
    width: 100%;
    height: var(--nav-bar-height);
    display: flex;
    align-items: center;
    background: #ffffff;

    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }

  &_title {
    flex: 1;
    margin: 0 90px;
    font-weight: 500;
    font-size: 17px;
    color: $black-color;
    height: var(--nav-bar-height);
    line-height: var(--nav-bar-height);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
  }

  &_left,
  &_right {
    position: absolute;
    padding: 0 16px;
    left: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &_right {
    left: auto;
    right: 0;
  }
}
</style>
