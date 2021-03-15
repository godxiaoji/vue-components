<template>
  <div class="fx-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, provide } from 'vue'
import { cloneData, isArray, inArray, isSameArray } from '@/helpers/util'
import { stringNumberArrayMixValidator } from '@/utils/validator'
import { useGroup } from '@/utils/group'

type CollapseActiveNames = (string | number)[]

export default defineComponent({
  name: 'fx-collapse',
  props: {
    activeNames: {
      validator: stringNumberArrayMixValidator,
      default: () => []
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:activeNames', 'change'],
  setup(props, { emit }) {
    let activeNames2: CollapseActiveNames = []

    const { children } = useGroup('collapse')

    function updateValue(val: string | number | CollapseActiveNames) {
      let values = cloneData(
        stringNumberArrayMixValidator(val) ? (isArray(val) ? val : [val]) : []
      ) as CollapseActiveNames

      if (props.accordion) {
        // 手风琴模式只保留一个值
        values = values.slice(0, 1)
      }

      if (isArray(values) && isSameArray(values, activeNames2)) {
        return
      }

      activeNames2 = []

      children.forEach(child => {
        const childName = child.getName()

        if (childName && inArray(childName, values)) {
          activeNames2.push(childName)
          child.show()
        } else {
          child.hide()
        }
      })
    }

    function onChange(uid: number) {
      activeNames2 = []

      if (props.accordion) {
        children.forEach(child => {
          if (child.uid === uid) {
            child.getActive() &&
              child.getName() &&
              activeNames2.push(child.getName())
          } else {
            child.hide()
          }
        })
      } else {
        children.forEach(child => {
          child.getActive() &&
            child.getName() &&
            activeNames2.push(child.getName())
        })
      }

      emit('update:activeNames', cloneData(activeNames2))
      emit('change', {
        activeNames: cloneData(activeNames2)
      })
    }

    onMounted(() => updateValue(props.activeNames))

    watch(
      () => props.activeNames,
      val => updateValue(val)
    )

    provide('fxCollapseChange', onChange)

    return {}
  }
})
</script>
