<template>
  <div
    class="fx-cell fx-horizontal-hairline"
    :class="{
      clickable: clickable || isLink,
      'has--icon': $slots.icon || icon,
      disabled: !!disabled
    }"
    @click="onClick"
  >
    <div class="fx-cell_cover"></div>
    <div class="fx-cell_header">
      <div class="fx-cell_icon" v-if="$slots.icon">
        <slot name="icon"></slot>
      </div>
      <div class="fx-cell_icon" v-else-if="icon"><icon :icon="icon" /></div>
      <div class="fx-cell_label" v-if="label">
        {{ label }}
        <span class="fx-cell_required" v-if="required">*</span>
      </div>
      <div class="fx-cell_content">
        <slot>{{ content }}</slot>
      </div>
      <icon class="fx-cell_link-icon" v-if="isLink" :icon="linkIconName" />
    </div>
    <div class="fx-cell_body" v-if="description">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import Icon from '@/Icon'
import { capitalize } from '@/helpers/util'
import {
  createEnumsValidator,
  getEnumsValue,
  iconValidator
} from '@/helpers/validator'

const LINK_ICON_NAMES = ['right', 'up', 'down', 'left']

export default defineComponent({
  name: 'fx-cell',
  components: { Icon },
  props: {
    icon: {
      validator: iconValidator,
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    clickable: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: false
    },
    arrowDirection: {
      type: String as PropType<'right' | 'up' | 'down' | 'left'>,
      validator: createEnumsValidator(LINK_ICON_NAMES),
      default: LINK_ICON_NAMES[0]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const linkIconName = computed(() => {
      return `${capitalize(
        getEnumsValue(LINK_ICON_NAMES, props.arrowDirection)
      )}Outlined`
    })

    function onClick(e: Event) {
      if (!props.disabled) {
        emit('click', e)
      }
    }

    return {
      linkIconName,
      onClick
    }
  }
})
</script>
