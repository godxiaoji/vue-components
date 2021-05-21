<template>
  <div
    class="fx-order"
    :class="{ drag: dragOn }"
    :style="{ height: orderHeight + 'px' }"
    v-bind="$attrs"
    ref="root"
  >
    <div
      class="fx-order_item"
      :class="{
        current: dragCurrent === index,
        deleted: item.deleted,
        fixed: dragFixed === index
      }"
      :style="{
        left: item.left + 'px',
        top: item.top + 'px',
        width: ((1 / columnNumber) * 100).toFixed(2) + '%'
      }"
      :data-index="index"
      v-for="(item, index) in positions"
      :key="item.id"
    >
      <span
        class="fx-order_item-ratio"
        :style="{ paddingTop: aspectRatio * 100 + '%' }"
      ></span>
      <div class="fx-order_item-inner">
        <slot :item="item.data" :index="index"> </slot>
      </div>
    </div>
  </div>
  <drawer
    class="fx-order_delete"
    placement="bottom"
    :visible="dragDelete"
    :showMask="false"
    @visible-state-change="onVisibleStateChange"
  >
    <div class="fx-order_delete-button" ref="deleteButton">
      <icon icon="DeleteOutlined"></icon>
      <span>{{ deleting ? '松手即可删除' : '拖动到此处删除' }}</span>
    </div>
  </drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  reactive,
  onMounted,
  nextTick,
  watch,
  onBeforeUnmount
} from 'vue'
import Icon from '@/Icon'
import Drawer from '@/Drawer'
import { isArray, isStringNumberMix, rangeNumber } from '@/helpers/util'
import { DataObject } from '../helpers/types'
import { useTouch } from '@/hooks/touch'
import { UseTouchEvent } from '../hooks/touch'
import { addClassName, getParentTarget, removeClassName } from '@/helpers/dom'
import { cloneData } from '@/helpers/util'
import { VisibleStateChangeArgs } from '../hooks/types'

type Item = {
  id: string | number
  draggable?: boolean
} & DataObject

interface TargetObject {
  id: string | number
  index: number
  startX: number
  startY: number
  top: number
  left: number
  height: number
  rectBottom: number
  fixedOffsetX: number
  fixedOffsetY: number
}

interface Position {
  id: number | string
  draggable: boolean
  top: number
  left: number
  data: any
  deleted: boolean
}

export default defineComponent({
  name: 'fx-order',
  components: { Icon, Drawer },
  props: {
    items: {
      type: Array as PropType<Item[]>,
      validator: (val: Item[]) => {
        if (isArray(val)) {
          for (let i = 0; i < val.length; i++) {
            if (!isStringNumberMix(val[i].id)) {
              return false
            }
          }
        } else {
          return false
        }

        return true
      },
      required: true,
      default: () => [] as Item[]
    },
    columnNumber: {
      type: Number,
      default: 3
    },
    // 允许删除
    deletable: {
      type: Boolean,
      default: false
    },
    // 自适应正方形
    aspectRatio: {
      type: Number,
      default: 1
    }
  },
  emits: ['delete', 'update:items'],
  setup(props, { emit }) {
    const root = ref<HTMLElement>()
    const deleteButton = ref<HTMLElement>()
    const positions = reactive<Position[]>([])
    const dragOn = ref(false)
    const dragCurrent = ref(-1)
    const dragDelete = ref(false)
    const dragFixed = ref(-1)
    const deleting = ref(false)
    const orderHeight = ref(0)

    const drag: {
      on: boolean
      current: number
      targetObject?: TargetObject
      deletable: boolean
    } = {
      on: false,
      current: -1,
      deletable: false
    }

    const imgsMode: {
      itemSize: number
      sort: number[]
      size: number
      moveShift: number
      shift: number
      moveSort: number[] | null
    } = {
      itemSize: 0,
      sort: [],
      size: 0,
      moveShift: -1,
      shift: -1,
      moveSort: null
    }
    let deleteAreaY = document.documentElement.clientHeight
    let onTimer: number

    function onTouchStart(e: UseTouchEvent) {
      const target = getParentTarget(e.target, 'fx-order_item')

      if (!target || drag.on) {
        return
      }

      const index = parseInt(target.dataset.index as string)
      const rects = target.getClientRects()[0]
      const position = positions[index]

      if (position.draggable === false) {
        return
      }

      removeClassName(root.value as HTMLElement, 'forbid-animation')

      const targetObject = {
        id: position.id,
        index,
        startX: e.touchObject.pageX,
        startY: e.touchObject.pageY,
        left: position.left,
        top: position.top,
        height: target.offsetHeight,
        fixedOffsetX: rects.left - position.left,
        fixedOffsetY: rects.top - position.top,
        rectBottom: rects.bottom
      }

      drag.current = index
      drag.targetObject = targetObject

      clearTimeout(onTimer)
      onTimer = window.setTimeout(() => {
        if (drag.targetObject && drag.targetObject.id === targetObject.id) {
          // 长按，进入拖拽模式
          enterDrag(targetObject)
        }
      }, 500)

      // const index = parseInt(target.dataset.index as string)
    }

    function getNewIndex(sort: number[], index: number) {
      let newIndex = index
      for (let i = 0; i < sort.length; i++) {
        if (sort[i] === index) {
          newIndex = i
          break
        }
      }

      return newIndex
    }

    function enterDrag(targetObject: TargetObject) {
      const index = drag.current

      if (index === -1 || props.items.length <= 1) {
        // 只有一张不进入编辑模式
        return
      }

      imgsMode.size = props.items.length
      drag.targetObject = targetObject

      dragOn.value = true
      dragFixed.value = index
      dragCurrent.value = index
      dragDelete.value = !!props.deletable

      positions[index].left = positions[index].left + targetObject.fixedOffsetX
      positions[index].top = positions[index].top + targetObject.fixedOffsetY

      imgsMode.shift = getNewIndex(imgsMode.sort, index)
    }

    let lazyTimer: number

    function exitDragDone(callback: () => void) {
      lazyTimer = window.setTimeout(() => {
        callback()
        drag.on = false
      }, 220)
    }

    function exitDrag() {
      const end = () => {
        dragOn.value = false
        dragCurrent.value = -1
        dragDelete.value = false
        deleting.value = false

        delete drag.targetObject

        imgsMode.size = 0
        imgsMode.shift = -1
      }

      const restoreFixed = (index: number, left: number, top: number) => {
        addClassName(root.value as HTMLElement, 'forbid-animation')

        positions[index].left = left
        positions[index].top = top
        dragFixed.value = -1
      }

      if (dragOn.value) {
        const sort = imgsMode.sort
        const index = drag.current
        const targetObject = drag.targetObject as TargetObject

        if (dragDelete.value && deleting.value) {
          let currentPosition: Position | null = null

          for (let i = 0; i < sort.length; i++) {
            if (sort[i] === index) {
              positions[sort[i]].deleted = true
              currentPosition = positions[sort[i]]
              sort.splice(i, 1)
              break
            }
          }

          sort.forEach((v, k) => {
            positions[v].left = getItemPos(k).left
            positions[v].top = getItemPos(k).top
          })

          imgsMode.moveSort = null
          imgsMode.moveShift = -1

          if (currentPosition) {
            emit('delete', {
              index,
              item: cloneData(currentPosition.data)
            })
          }

          exitDragDone(() => {
            dragFixed.value = -1
            updateOrderHeight()
            updateOptions()
          })
        } else if (imgsMode.moveShift !== -1 && imgsMode.moveSort != null) {
          // 先到最新位置
          const newIndex = getNewIndex(imgsMode.moveSort, index)
          const { left, top } = getItemPos(newIndex)

          positions[index].left = left + targetObject.fixedOffsetX
          positions[index].top = top + targetObject.fixedOffsetY
          dragCurrent.value = -1

          imgsMode.sort = imgsMode.moveSort
          imgsMode.moveSort = null
          imgsMode.moveShift = -1

          exitDragDone(() => {
            restoreFixed(index, left, top)
            updateOptions()
          })
        } else {
          const newIndex = getNewIndex(sort, index)
          const { left, top } = getItemPos(newIndex)

          positions[index].left = left + targetObject.fixedOffsetX
          positions[index].top = top + targetObject.fixedOffsetY

          exitDragDone(() => {
            restoreFixed(index, left, top)
          })
        }
        end()
      }
    }

    function onTouchMove(e: UseTouchEvent) {
      if (!dragOn.value || !drag.targetObject) {
        // 取消拖拽判定
        clearTimeout(onTimer)
        return
      }

      const targetObject = drag.targetObject
      const index = targetObject.index

      const moveX = e.touchObject.pageX - targetObject.startX
      const moveY = e.touchObject.pageY - targetObject.startY
      const left = targetObject.left + moveX
      const top = targetObject.top + moveY
      const itemSize = imgsMode.itemSize
      const sort = cloneData(imgsMode.sort)

      // 优先判断是否删除
      deleting.value = targetObject.rectBottom + moveY + 2 > deleteAreaY

      const shift = rangeNumber(
        Math.round(top / itemSize) * 3 + Math.round(left / itemSize),
        0,
        max as number
      )

      if (
        (imgsMode.moveShift > 0 && imgsMode.moveShift != shift) ||
        imgsMode.shift != shift
      ) {
        // 计算位置
        sort.splice(imgsMode.shift, 1)
        sort.splice(shift, 0, index)

        const tempPoss = new Array(sort.length)

        sort.forEach((v, k) => {
          tempPoss[v] = getItemPos(k)
        })
        tempPoss[index].left = left + targetObject.fixedOffsetX
        tempPoss[index].top = top + targetObject.fixedOffsetY

        positions.forEach((v, k) => {
          if (tempPoss[k]) {
            v.left = tempPoss[k].left
            v.top = tempPoss[k].top
          }
        })

        imgsMode.moveShift = shift
        imgsMode.moveSort = sort
      } else {
        positions[index].left = left + targetObject.fixedOffsetX
        positions[index].top = top + targetObject.fixedOffsetY
      }
    }

    function onTouchEnd() {
      clearTimeout(onTimer)

      if (dragOn.value) {
        exitDrag()
      }

      // console.log(imgsMode)
    }

    function updateOptions() {
      setTimeout(() => {
        const newOptions = imgsMode.sort.map(v => {
          return props.items[v]
        })

        emit('update:items', newOptions)
      }, 250)
    }

    function getItemPos(index: number) {
      return {
        left: (index % props.columnNumber) * imgsMode.itemSize,
        top: Math.floor(index / props.columnNumber) * imgsMode.itemSize
      }
    }

    let max = Infinity

    function updateItemsData() {
      if (!root.value) {
        return
      }

      imgsMode.itemSize = root.value.offsetWidth / props.columnNumber
      imgsMode.sort = []
      max = Infinity

      positions.splice(0, Infinity)

      props.items.forEach((v, k) => {
        const position = Object.assign(
          {
            id: v.id,
            data: v,
            deleted: false,
            draggable: !(v.draggable === false)
          },
          getItemPos(k)
        )

        positions.push(position)

        imgsMode.sort.push(k)

        if (!position.draggable && max === Infinity) {
          max = k - 1
        }
      })

      nextTick(() => {
        updateOrderHeight()
      })
    }

    function updateOrderHeight() {
      const $item = root.value?.firstElementChild

      if ($item) {
        orderHeight.value =
          ($item as HTMLElement).offsetHeight *
          Math.ceil(imgsMode.sort.length / props.columnNumber)
      }
    }

    function onVisibleStateChange(e: VisibleStateChangeArgs) {
      if (e.state === 'shown') {
        const rects = (deleteButton.value as HTMLElement).getClientRects()[0]

        deleteAreaY = rects.top
      }
    }

    useTouch({
      el: root,
      onTouchStart,
      onTouchMove,
      onTouchEnd
    })

    watch(() => props.items, updateItemsData, {
      deep: true
    })

    onMounted(() => {
      updateItemsData()
    })

    onBeforeUnmount(() => {
      clearTimeout(onTimer)
      clearTimeout(lazyTimer)
    })

    return {
      root,
      deleteButton,
      dragOn,
      dragCurrent,
      dragDelete,
      dragFixed,
      deleting,
      orderHeight,
      positions,
      onVisibleStateChange
    }
  }
})
</script>
