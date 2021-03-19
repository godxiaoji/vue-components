<template>
  <div class="fx-nav-bar">
    <div
      class="fx-nav-bar_inner fx-horizontal-hairline"
      :class="{ fixed: fixedTop }"
    >
      <div class="fx-nav-bar_layout">
        <div class="fx-nav-bar_left">
          <slot name="left" v-if="$slots.left"></slot>
          <fx-button-group
            v-else-if="leftButtons.length > 0 || showBack || showHome"
            class="fx-nav-bar_button-group"
            :shape="iconOnly ? 'square' : 'rectangle'"
            pattern="borderless"
          >
            <template v-if="leftButtons.length > 0">
              <fx-button
                class="fx-nav-bar_button"
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
                class="fx-nav-bar_button"
                type="default"
                icon="LeftOutlined"
                v-if="showBack"
                @click="onBack"
                >返回</fx-button
              >
              <fx-button
                class="fx-nav-bar_button"
                type="default"
                icon="HomeOutlined"
                v-if="showHome"
                @click="onBackHome"
                >首页</fx-button
              >
            </template>
          </fx-button-group>
        </div>
        <div
          class="fx-nav-bar_title"
          @mousedown="onTitleStart"
          @touchstart="onTitleStart"
        >
          {{ title }}
        </div>
        <div class="fx-nav-bar_right">
          <slot name="right" v-if="$slots.right"></slot>
          <template v-else>
            <fx-button-group
              class="fx-nav-bar_button-group"
              :shape="iconOnly ? 'square' : 'rectangle'"
              pattern="borderless"
              v-if="rightButtons.length > 0"
            >
              <fx-button
                class="fx-nav-bar_button"
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

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import FxButton from '@/Button'
import FxButtonGroup from '@/ButtonGroup'
import { isArray, isString, isObject } from '@/helpers/util'
import { iconValidator } from '@/helpers/validator'

interface ButtonOptions {
  text: string
  icon: any
}

const validateButtons = (val: any[]) => {
  if (isArray(val)) {
    for (let i = 0; i < val.length; i++) {
      if (
        !(
          isObject(val[i]) &&
          isString(val[i].text) &&
          iconValidator(val[i].icon)
        )
      )
        return false
    }
    return true
  } else {
    return false
  }
}

export default defineComponent({
  name: 'fx-nav-bar',
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
      type: Array as PropType<ButtonOptions[]>,
      validator: validateButtons,
      default: () => [] as ButtonOptions[]
    },
    rightButtons: {
      type: Array as PropType<ButtonOptions[]>,
      validator: validateButtons,
      default: () => [] as ButtonOptions[]
    },
    iconOnly: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'back-click',
    'home-click',
    'left-button-click',
    'right-button-click',
    'title-dbclick'
  ],
  setup(props, { emit }) {
    function onBack() {
      eventEmit('back-click')
    }

    function onBackHome() {
      eventEmit('home-click')
    }

    function onLeftIconClick(item: ButtonOptions, index: number) {
      eventEmit('left-button-click', {
        icon: item.icon,
        text: item.text,
        index
      })
    }

    function onRightIconClick(item: ButtonOptions, index: number) {
      eventEmit('right-button-click', {
        icon: item.icon,
        text: item.text,
        index
      })
    }

    let dbClickTag: string | null = null
    let dbClickTimer: number
    function onTitleStart(e: Event) {
      if (!dbClickTag) {
        dbClickTag = e.type
        dbClickTimer = window.setTimeout(() => {
          dbClickTag = null
        }, 300)
      } else if (dbClickTag === e.type) {
        clearTimeout(dbClickTimer)
        dbClickTag = null
        eventEmit('title-dbclick')
      }
    }

    function eventEmit(type: string, res = {}) {
      emit(
        type as 'back-click',
        Object.assign(
          {
            type
          },
          res
        )
      )
    }

    return {
      onBack,
      onBackHome,
      onLeftIconClick,
      onRightIconClick,
      onTitleStart
    }
  }
})
</script>
