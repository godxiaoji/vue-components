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

<script>
import Icon from '../Icon'
import { inArray, capitalize } from '../helpers/util'
import { iconValidator } from '../helpers/validator'

const LINK_ICON_NAMES = ['right', 'up', 'down', 'left']

export default {
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
      validator(val) {
        return inArray(val, LINK_ICON_NAMES)
      },
      default: LINK_ICON_NAMES[0]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    linkIconName() {
      return `${capitalize(
        inArray(this.arrowDirection, LINK_ICON_NAMES)
          ? this.arrowDirection
          : LINK_ICON_NAMES[0]
      )}Outlined`
    }
  },
  methods: {
    noop() {},
    onClick(e) {
      if (!this.disabled) {
        this.$emit(e.type, e)
      }
    }
  }
}
</script>
