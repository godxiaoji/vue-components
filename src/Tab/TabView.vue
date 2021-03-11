<template>
  <div class="fx-tab-view" :class="{ vertical }">
    <div class="fx-tab-view_header fx-horizontal-hairline">
      <side-tab
        v-if="vertical"
        :options="tabList"
        v-model:activeValue="activeIndex"
      ></side-tab>
      <tab
        v-else
        :options="tabList"
        v-model:activeValue="activeIndex"
        :scroll-threshold="scrollThreshold"
      />
    </div>
    <div class="fx-tab-view_body" ref="list">
      <swiper
        v-model:activeIndex="activeIndex"
        @change="onChange"
        @animated="onAnimated"
        ref="swiper"
        :initial-vertical="vertical"
      >
        <slot></slot>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  reactive,
  provide,
  ComponentPublicInstance,
  shallowRef
} from 'vue'
import Tab from '../Tab'
import SideTab from '../SideTab'
import Swiper from '../Swiper'
import { useList } from '../utils/list'

interface SwiperCallbackRes {
  activeIndex: number
  fromIndex: number
}

export default defineComponent({
  name: 'fx-tab-view',
  components: { Tab, SideTab, Swiper },
  props: {
    // 纵向
    initialVertical: {
      type: Boolean,
      default: false
    },
    scrollThreshold: {
      type: Number,
      default: 4
    },
    backUpperWhenChange: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change', 'animated'],
  setup(props, { emit }) {
    const vertical = ref(!!props.initialVertical)
    const swiper = shallowRef<ComponentPublicInstance<typeof Swiper>>()
    const tabList = reactive<
      {
        value: number
        label: string
        subLabel: string
      }[]
    >([])
    const activeIndex = ref(0)

    function resetItems($items: HTMLElement[]) {
      tabList.splice(
        0,
        Infinity,
        ...$items.map(($item, index) => {
          const { name, subName } = $item.dataset

          return {
            value: index,
            label: name || '',
            subLabel: subName || ''
          }
        })
      )
    }

    const { list, update } = useList('tab-view', resetItems)

    function onChange(res: SwiperCallbackRes) {
      emit('change', res)

      if (props.backUpperWhenChange) {
        // 切换时回到顶部

        if (!swiper.value) {
          return
        }

        const $viewItem = swiper.value.getItemEl[res.activeIndex]

        if (!$viewItem) {
          return
        }

        $viewItem.scrollTop = 0
        $viewItem.scrollLeft = 0

        const $firstChild = $viewItem.firstElementChild

        if (
          $firstChild &&
          $firstChild.className.indexOf(`fx-scroll-view`) !== -1
        ) {
          // ScrollView
          $firstChild.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
          })
        }
      }
    }

    function onAnimated(res: SwiperCallbackRes) {
      emit('animated', res)
    }

    function swipeTo(activeIndex: number) {
      swiper.value && swiper.value.swipeTo(activeIndex)
    }

    provide('fxTabViewUpdate', update)
    provide('fxTabViewVertical', vertical.value)

    return {
      activeIndex,
      tabList,
      vertical,
      list,
      swiper,
      onChange,
      onAnimated,
      swipeTo
    }
  }
})
</script>
