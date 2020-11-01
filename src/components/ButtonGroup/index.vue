<template>
  <div
    :class="[
      prefix + '-button-group',
      'size--' + size,
      'pattern--' + pattern,
      'shape--' + shape,
      'count--' + (buttonIds.length || 1)
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
import { SDKKey } from '../../config'
import { inArray } from '../../helpers/util'

const SIZE_NAMES = ['default', 'small']
const PATTERN_NAMES = ['default', 'solid', 'dashed']
const SHAPE_NAMES = ['default', 'round', 'circle', 'square']

export default {
  name: SDKKey + '-button-group',
  components: {},
  provide() {
    return {
      appButtonGroupSubOptions: this.subOptions,
      appButtonGroup: this
    }
  },
  props: {
    size: {
      validator(val) {
        return inArray(val, SIZE_NAMES)
      },
      default: SIZE_NAMES[0]
    },
    pattern: {
      validator(val) {
        return inArray(val, PATTERN_NAMES)
      },
      default: PATTERN_NAMES[0]
    },
    shape: {
      validator(val) {
        return inArray(val, SHAPE_NAMES)
      },
      default: SHAPE_NAMES[0]
    }
  },
  data() {
    return {
      prefix: SDKKey,

      buttonIds: [],

      subOptions: {
        pattern: PATTERN_NAMES[0],
        size: SIZE_NAMES[0],
        shape: SHAPE_NAMES[0]
      }
    }
  },
  computed: {},
  watch: {
    size: {
      immediate: true,
      handler(newVal) {
        this.subOptions.size = inArray(newVal, SIZE_NAMES)
          ? newVal
          : SIZE_NAMES[0]
      }
    },
    pattern: {
      immediate: true,
      handler(newVal) {
        this.subOptions.pattern = inArray(newVal, PATTERN_NAMES)
          ? newVal
          : PATTERN_NAMES[0]
      }
    },
    shape: {
      immediate: true,
      handler(newVal) {
        this.subOptions.shape = inArray(newVal, SHAPE_NAMES)
          ? newVal
          : SHAPE_NAMES[0]
      }
    }
  },
  created() {},
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  beforeDestroy() {},
  methods: {
    addButton(uid) {
      if (!inArray(uid, this.buttonIds)) {
        this.buttonIds.push(uid)
      }
    },
    removeButton(uid) {
      const index = this.buttonIds.indexOf(uid)

      if (index !== -1) {
        this.buttonIds.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-button-group {
  display: inline-flex;
  flex: 1;

  &.shape--square,
  &.shape--circle {
    flex: 0;
  }

  + .#{$prefix}-button-group {
    margin-left: 16px;
  }

  &:not(.count--1) {
    > .#{$prefix}-button {
      &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
        margin-right: -1px;
        padding-right: 13px;

        &.shape--square,
        &.shape--circle {
          width: 55px;
          min-width: 55px;
          padding: 0;
        }

        &.size--small {
          padding-right: 9px;

          &.shape--square,
          &.shape--circle {
            width: 33px;
            min-width: 33px;
            padding: 0;
          }
        }
      }

      + .#{$prefix}-button {
        position: relative;
        margin-left: 0;
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

        &::before {
          content: '';
        }

        &.shape--square,
        &.shape--circle {
          width: 55px;
          min-width: 55px;
        }

        &.shape--square.size--small,
        &.shape--circle.size--small {
          width: 33px;
          min-width: 33px;
        }
      }
    }
  }
}
</style>
