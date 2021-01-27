<template>
  <div
    class="fx-cell fx-horizontal-hairline"
    :class="{ clickable, 'has--icon': !!icon, disabled: !!disabled }"
    @click="onClick"
  >
    <div class="fx-cell_cover"></div>
    <div class="fx-cell_inner">
      <i class="fx-cell_icon" v-if="icon">
        <icon :icon="icon" />
      </i>
      <div class="fx-cell_label">
        {{ label }}
        <span class="fx-cell_required" v-if="required">*</span>
      </div>
      <div class="fx-cell_content">
        <template v-if="!$slots.default">{{ content }}</template>
        <slot></slot>
      </div>
      <i
        class="fx-cell_link-icon"
        v-if="clickable && arrowDirection !== 'none'"
      >
        <icon :icon="linkIconName" />
      </i>
      <div class="fx-cell_description" v-if="description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { inArray, capitalize } from '../helpers/util'
import { iconValidator } from '../helpers/validator'

const LINK_ICON_NAMES = ['right', 'up', 'down', 'left', 'none']

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
    onClick(e) {
      if (!this.disabled) {
        this.$emit(e.type, e)
      }
    }
  }
}
</script>
