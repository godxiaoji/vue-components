<template>
  <div class="fx-scroll-tab">
    <div class="fx-scroll-tab_sidebar">
      <sticky
        ref="sidebar"
        :offset-top="stickyOffsetTop"
        :offset-bottom="stickyOffsetBottom"
      >
        <side-tab :options="tabList" v-model:activeValue="activeIndex" />
      </sticky>
    </div>
    <div class="fx-scroll-tab_body">
      <sticky-view
        :offset-top="stickyOffsetTop"
        ref="body"
        v-model:activeIndex="activeIndex"
        @reset-items="onResetItems"
        @change="onChange"
      >
        <slot></slot>
      </sticky-view>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ComponentPublicInstance,
  defineComponent,
  onMounted,
  reactive,
  ref,
  shallowRef
} from 'vue'
import SideTab from '@/SideTab'
import Sticky from '@/Sticky'
import StickyView from '@/StickyView'
import { sizeValidator } from '@/utils/validator'
import { ScrollToIndexOptions } from '@/utils/types'

export default defineComponent({
  name: 'fx-scroll-tab',
  components: { SideTab, Sticky, StickyView },
  props: {
    stickyOffsetTop: {
      validator: sizeValidator,
      default: 0
    },
    stickyOffsetBottom: {
      validator: sizeValidator,
      default: 0
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const sidebar = shallowRef<ComponentPublicInstance<typeof Sticky>>()
    const body = shallowRef<ComponentPublicInstance<typeof StickyView>>()
    const tabList = reactive<
      {
        value: number
        label: string
      }[]
    >([])
    const activeIndex = ref(0)

    function resetContainer(containSelector: any) {
      sidebar.value && sidebar.value.resetContainer(containSelector)
      body.value && body.value.resetContainer(containSelector)
    }

    function onResetItems(items: { name: string; index: number }[]) {
      tabList.splice(
        0,
        Infinity,
        ...items.map(item => {
          return {
            value: item.index,
            label: item.name
          }
        })
      )
    }

    function onChange(res: { activeIndex: number }) {
      emit('change', res)
    }

    /**
     * 滚动到第index个
     * @param index 索引
     */
    function scrollToIndex(index: number | ScrollToIndexOptions) {
      body.value && body.value.scrollToIndex(index)
    }

    /**
     * 滚到到指定位置
     * @param scrollTop 位置值
     */
    function scrollToOffset(scrollTop: number | ScrollToOptions) {
      body.value && body.value.scrollToOffset(scrollTop)
    }

    onMounted(() => resetContainer(document))

    return {
      sidebar,
      body,
      activeIndex,
      tabList,
      onChange,
      scrollToIndex,
      scrollToOffset,
      resetContainer,
      onResetItems
    }
  }
})
</script>
