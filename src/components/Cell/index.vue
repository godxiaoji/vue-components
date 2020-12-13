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
    },
    disabled: {
      type: Boolean,
      default: false
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
      if (!this.disabled) {
        this.$emit(e.type, e)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-cell {
  --cell-label-color: #{$title-color};
  --cell-content-color: #{$font-color};
  --cell-description-color: #{$font2-color};
  min-height: 48px;
  background-color: #fff;
  position: relative;

  + .#{$prefix}-cell::before {
    content: '';
    margin-left: 16px;
  }

  &_cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: $black-color, $alpha: 0.16);
    z-index: 0;
    display: none;
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
    color: var(--cell-label-color);
    font-size: 17px;
    padding-right: 12px;
  }

  &_required {
    color: $danger-color;
  }

  &_description {
    width: 100%;
    line-height: 20px;
    font-size: 14px;
    color: var(--cell-description-color);
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
    flex-grow: 1;
    flex-shrink: 0;
    font-size: 17px;
    color: var(--cell-content-color);
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
      --color: var(--cell-label-color);
    }
  }

  &_link-icon {
    display: flex;
    align-items: center;
    height: 32px;
    margin-left: 5px;

    .#{$prefix}-icon {
      --size: 18px;
      --color: var(--cell-content-color);
    }
  }

  &:not(.disabled).clickable {
    cursor: pointer;
    &:active {
      .#{$prefix}-cell_cover {
        display: block;
      }
    }
  }

  &.disabled {
    --cell-label-color: #{$font3-color};
    --cell-content-color: #{$font3-color};
    --cell-description-color: #{$font3-color};
    cursor: not-allowed;
  }

  .#{$prefix} {
    &-input {
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

    &-radio-group {
      justify-content: flex-end;

      &.vertical .#{$prefix}-radio_box {
        justify-content: flex-end;
      }
    }

    &-checkbox-group {
      justify-content: flex-end;

      &.vertical .#{$prefix}-checkbox_box {
        justify-content: flex-end;
      }
    }

    &-picker-view {
      margin: -8px 0;
    }
  }
}
</style>
