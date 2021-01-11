<template>
  <div
    :class="[
      prefix + '-cell',
      { clickable, 'has--icon': !!icon, disabled: !!disabled },
      prefix + '-horizontal-hairline'
    ]"
    @click="onClick"
  >
    <div :class="[prefix + '-cell_cover']"></div>
    <div :class="[prefix + '-cell_inner']">
      <i :class="[prefix + '-cell_icon']" v-if="icon">
        <icon :icon="icon" />
      </i>
      <div :class="[prefix + '-cell_label']">
        {{ label }}
        <span :class="[prefix + '-cell_required']" v-if="required">*</span>
      </div>
      <div :class="[prefix + '-cell_content']">
        <template v-if="!$slots.default">{{ content }}</template>
        <slot></slot>
      </div>
      <i :class="[prefix + '-cell_link-icon']" v-if="clickable">
        <icon :icon="linkIconName" />
      </i>
      <div :class="[prefix + '-cell_description']" v-if="description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../config'
import { inArray, capitalize } from '../helpers/util'

const LINK_ICON_NAMES = ['right', 'up', 'down', 'left']

export default {
  name: SDKKey + '-cell',
  components: { Icon },
  props: {
    icon: {
      type: String,
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
  data() {
    return { prefix: SDKKey }
  },
  computed: {
    linkIconName() {
      return `${capitalize(
        inArray(this.arrowDirection, LINK_ICON_NAMES) ? this.arrowDirection : LINK_ICON_NAMES[0]
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
