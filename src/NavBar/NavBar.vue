<template>
  <div :class="[prefix + '-nav-bar']">
    <div :class="[prefix + '-nav-bar_inner', prefix + '-horizontal-hairline', { fixed: fixedTop }]">
      <div :class="[prefix + '-nav-bar_layout']">
        <div :class="[prefix + '-nav-bar_left']">
          <slot name="left" v-if="$slots.left"></slot>
          <fx-button-group
            v-else-if="leftButtons.length > 0 || showBack || showHome"
            :class="[prefix + '-nav-bar_button-group']"
            :shape="buttonShape"
            pattern="borderless"
          >
            <template v-if="leftButtons.length > 0">
              <fx-button
                :class="[prefix + '-nav-bar_button']"
                :type="item.type || 'default'"
                :icon="item.icon"
                v-for="(item, index) in leftButtons"
                :key="index"
                @click="onLeftIconClick(item, index)"
                >{{ item.text }}</fx-button
              >
            </template>
            <template v-else>
              <fx-button
                :class="[prefix + '-nav-bar_button']"
                type="default"
                icon="LeftOutlined"
                v-if="showBack"
                @click="onBack"
                >返回</fx-button
              >
              <fx-button
                :class="[prefix + '-nav-bar_button']"
                type="default"
                icon="HomeOutlined"
                v-if="showHome"
                @click="onBackHome"
                >首页</fx-button
              >
            </template>
          </fx-button-group>
        </div>
        <div :class="[prefix + '-nav-bar_title']" @mousedown="onTitleStart" @touchstart="onTitleStart">
          {{ title }}
        </div>
        <div :class="[prefix + '-nav-bar_right']">
          <slot name="right" v-if="$slots.right"></slot>
          <template v-else>
            <fx-button-group
              :class="[prefix + '-nav-bar_button-group']"
              :shape="buttonShape"
              pattern="borderless"
              v-if="rightButtons.length > 0"
            >
              <fx-button
                :class="[prefix + '-nav-bar_button']"
                :type="item.type || 'default'"
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
  </div>
</template>

<script>
import FxButton from '../Button'
import FxButtonGroup from '../ButtonGroup'
import { SDKKey } from '../config'
import { isArray, isString } from '../helpers/util'

function validateButtons(val) {
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
}

export default {
  name: SDKKey + '-nav-bar',
  components: { FxButton, FxButtonGroup },
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
    leftButtons: {
      validator(val) {
        return validateButtons(val)
      },
      default() {
        return []
      }
    },
    rightButtons: {
      validator(val) {
        return validateButtons(val)
      },
      default() {
        return []
      }
    },
    iconOnly: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  computed: {
    buttonShape() {
      return this.iconOnly ? 'square' : 'rectangle'
    }
  },
  methods: {
    onBack() {
      this.$emit('back-click', {})
    },
    onBackHome() {
      this.$emit('home-click', {})
    },
    onLeftIconClick(item, index) {
      this.$emit('left-button-click', {
        icon: item.icon,
        text: item.text,
        index
      })
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
