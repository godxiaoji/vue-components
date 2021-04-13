<template>
  <div class="fx-collapse-item fx-horizontal-hairline" :class="{ active }">
    <cell
      class="fx-collapse-item_header"
      :label="title"
      :icon="icon"
      :disabled="disabled"
      isLink
      arrow-direction="down"
      @click="onClick"
    />
    <div
      class="fx-collapse-item_body fx-horizontal-hairline"
      style="display: none"
      ref="body"
    >
      <div class="fx-collapse-item_content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  getCurrentInstance,
  inject,
  ComponentInternalInstance
} from 'vue'
import Cell from '@/Cell'
import { iconValidator } from '@/helpers/validator'
import { useGroupItem } from '@/hooks/group'
import Exception from '@/helpers/exception'

export default defineComponent({
  name: 'fx-collapse-item',
  components: { Cell },
  props: {
    icon: {
      validator: iconValidator,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const active = ref(false)
    const body = ref<HTMLElement>()
    const onChange = inject('fxCollapseChange', collapseItemChange)
    const instance = getCurrentInstance() as ComponentInternalInstance

    function collapseItemChange(uid: number) {
      new Exception(
        `CollapseItem uid=${uid} is not in Collapse`,
        Exception.TYPE.DEFAULT,
        'CollapseItem'
      )
    }

    let visibleTimer: number

    function show(isClick = false) {
      if (active.value) {
        return
      }
      active.value = true

      clearTimeout(visibleTimer)

      const $body = body.value as HTMLElement

      $body.style.cssText = 'position: absolute; opacity: 0;'
      const contentHeight = $body.getBoundingClientRect().height
      $body.style.cssText = 'height: 0px;'

      visibleTimer = window.setTimeout(() => {
        $body.style.cssText = `height: ${contentHeight}px;`

        visibleTimer = window.setTimeout(() => {
          $body.style.cssText = ''
        }, 210)
      }, 17)

      emitToggle(true)

      isClick && onChange(instance.uid)
    }

    function hide(isClick = false) {
      if (!active.value) {
        return
      }
      active.value = false

      clearTimeout(visibleTimer)

      const $body = body.value as HTMLElement
      $body.style.cssText = `height: ${$body.getBoundingClientRect().height}px;`

      visibleTimer = window.setTimeout(() => {
        $body.style.cssText = 'height: 0px;'

        visibleTimer = window.setTimeout(() => {
          $body.style.cssText = 'display: none;'
        }, 210)
      }, 17)

      emitToggle(false)

      isClick && onChange(instance.uid)
    }

    function emitToggle(spread: boolean) {
      emit('toggle', {
        name: props.name,
        type: 'toggle',
        spread
      })
    }

    function onClick() {
      active.value ? hide(true) : show(true)
    }

    useGroupItem('collapse', {
      uid: instance.uid,
      getName: () => props.name,
      getActive: () => active.value,
      show,
      hide
    })

    return {
      active,
      body,
      onClick
    }
  }
})
</script>
