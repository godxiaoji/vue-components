<template>
  <div
    :class="[
      prefix + '-cell',
      { clickable, 'has--icon': !!icon },
      prefix + '-horizontal-hairline'
    ]"
    @click="onClick"
  >
    <div :class="[prefix + '-cell_inner']">
      <i :class="[prefix + '-cell_icon']" v-if="icon">
        <icon :class-name="icon"></icon>
      </i>
      <div :class="[prefix + '-cell_label']">
        {{ label }}
        <span :class="[prefix + '-cell_required']" v-if="required">*</span>
      </div>
      <div :class="[prefix + '-cell_content']">
        <template v-if="!hasContent">{{ content }}</template>
        <slot></slot>
      </div>
      <i :class="[prefix + '-cell_link-icon']" v-if="clickable">
        <icon :class-name="linkIconName"></icon>
      </i>
      <div :class="[prefix + '-cell_description']" v-if="description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../../config'
import { inArray, capitalize } from '../../helpers/util'

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
    }
  },
  data() {
    return { prefix: SDKKey, hasContent: false }
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
  ready() {},
  mounted() {
    if (this.$scopedSlots.default) {
      this.hasContent = true
    }
  },
  updated() {},
  attached() {},
  methods: {
    onClick(e) {
      this.$emit(e.type, e)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-cell {
  --left-color: #{$title-color};
  --right-color: #{$font-color};
  min-height: 48px;
  background-color: #fff;

  + .#{$prefix}-cell::before {
    content: '';
    margin-left: 16px;
  }

  &_inner {
    padding: 8px 16px 8px 0;
    margin-left: 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &_label {
    height: 32px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 32px;
    color: var(--left-color);
    font-size: 17px;
    font-weight: 400;
    padding-right: 12px;
  }

  &_required {
    color: $danger-color;
  }

  &_description {
    width: 100%;
    line-height: 20px;
    font-size: 14px;
    color: $font2-color;
    margin: 0 0 4px 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    .#{$prefix}-cell.has--icon & {
      margin-left: 23px;
    }
  }

  &_content {
    flex: 1;
    font-size: 17px;
    font-weight: 400;
    color: var(--right-color);
    min-height: 32px;
    line-height: 32px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &_icon {
    display: flex;
    align-items: center;
    height: 32px;
    margin-right: 5px;

    .#{$prefix}-icon {
      --size: 18px;
      --color: var(--left-color);
    }
  }

  &_link-icon {
    display: flex;
    align-items: center;
    height: 32px;
    margin-left: 5px;

    .#{$prefix}-icon {
      --size: 18px;
      --color: var(--right-color);
    }
  }

  &.clickable {
    cursor: pointer;
    &:active {
      background-color: $background-color;
    }
  }

  .#{$prefix}-input {
    --input-height: 32px;
    border-left-width: 0;
    border-right-width: 0;
    border-top-color: transparent;
    border-bottom-color: transparent;
    padding: 0;

    &_input {
      text-align: right;
    }

    &[disabled] {
      background-color: transparent;
    }
  }

  .#{$prefix}-radio-group {
    justify-content: flex-end;

    &.vertical .#{$prefix}-radio_box {
      justify-content: flex-end;
    }
  }

  .#{$prefix}-checkbox-group {
    justify-content: flex-end;

    &.vertical .#{$prefix}-checkbox_box {
      justify-content: flex-end;
    }
  }
}
</style>
