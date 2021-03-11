<template>
  <div class="fx-image" @click="onClick" ref="root">
    <span
      v-if="aspectRatio != null && aspectRatio > 0"
      class="fx-image_ratio"
      :style="{ 'padding-top': aspectRatio * 100 + '%' }"
    ></span>
    <i class="fx-image_loading" v-if="loading">
      <icon icon="ImageOutlined" />
    </i>
    <i class="fx-image_error" v-if="error">
      <icon icon="ImageBreakOutlined" />
    </i>
    <img
      v-if="currentSrc"
      class="fx-image_img"
      :class="[modeClassName]"
      :src="currentSrc"
    />
  </div>
</template>

<script lang="ts">
import Icon from '../Icon'
import {
  addLazyQueue,
  loadNow,
  removeComponentFromLazy,
  ImageLoadObject,
  ImageLoadedResource
} from './load-image'
import {
  defineComponent,
  onMounted,
  PropType,
  ref,
  getCurrentInstance,
  watch,
  onBeforeUnmount,
  computed,
  ComponentInternalInstance
} from 'vue'
import { createEnumsValidator, getEnumsValue } from '../utils/validator'
import Exception from '../helpers/exception'

type ModeNames =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

const MODE_NAMES = [
  'scaleToFill',
  'aspectFit',
  'aspectFill',
  'widthFix',
  'top',
  'bottom',
  'left',
  'right',
  'top left',
  'top right',
  'bottom left',
  'bottom right'
]

const LAZY_PRELOAD = 1.3

export default defineComponent({
  name: 'fx-image',
  components: { Icon },
  props: {
    // 图片资源地址
    src: {
      type: String,
      default: ''
    },
    mode: {
      type: String as PropType<ModeNames>,
      validator: createEnumsValidator(MODE_NAMES),
      default: null
    },
    // 图片懒加载，在即将进入一定范围(preload=1.3)时才开始加载
    lazyLoad: {
      type: Boolean,
      default: false
    },
    // 自适应正方形
    aspectRatio: {
      type: Number,
      default: null
    }
  },
  setup(props, { emit }) {
    const instance = getCurrentInstance() as ComponentInternalInstance
    const loading = ref(true)
    const error = ref(false)
    const root = ref<HTMLElement>()
    const currentSrc = ref<string | null>(null)

    function load() {
      const loadObject: ImageLoadObject = {
        src: props.src,
        uid: instance.uid,
        checkInView,
        onLoad,
        onError
      }

      props.lazyLoad ? addLazyQueue(loadObject) : loadNow(loadObject)
    }

    function checkInView() {
      const {
        top,
        right,
        bottom,
        left
      } = (root.value as HTMLElement).getBoundingClientRect()

      return (
        top < window.innerHeight * LAZY_PRELOAD &&
        bottom > 0 &&
        left < window.innerWidth * LAZY_PRELOAD &&
        right > 0
      )
    }

    function onLoad(res: ImageLoadedResource) {
      if (res.src === props.src) {
        // 防止多次变更图片导致的图片不正确
        loading.value = false
        error.value = false
        currentSrc.value = res.src
      }

      emit('load', {
        width: res.naturalWidth,
        height: res.naturalHeight,
        src: res.src
      })
    }

    function onError(e: Exception) {
      loading.value = false
      error.value = true

      emit('error', e)
    }

    function onClick(e: Event) {
      emit(e.type, e)
    }

    onMounted(() => props.src && load())

    onBeforeUnmount(() => removeComponentFromLazy(instance.uid))

    watch(() => props.src, load)

    const modeClassName = computed(() => {
      return (
        'mode--' + getEnumsValue(MODE_NAMES, props.mode).replace(/\s+/g, '-')
      )
    })

    return {
      currentSrc,
      modeClassName,
      loading,
      error,
      root,
      onClick
    }
  }
})
</script>
