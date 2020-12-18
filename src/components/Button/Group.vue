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
import { getPropValidation, getPropValue } from '../../helpers/validator'

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
    size: getPropValidation('buttonSize'),
    pattern: getPropValidation('buttonPattern'),
    shape: getPropValidation('buttonShape')
  },
  data() {
    return {
      prefix: SDKKey,

      buttonIds: [],

      subOptions: {
        pattern: '',
        size: '',
        shape: ''
      }
    }
  },
  computed: {},
  watch: {
    size: {
      immediate: true,
      handler(newVal) {
        this.subOptions.size = getPropValue('buttonSize', newVal)
      }
    },
    pattern: {
      immediate: true,
      handler(newVal) {
        this.subOptions.pattern = getPropValue('buttonPattern', newVal)
      }
    },
    shape: {
      immediate: true,
      handler(newVal) {
        this.subOptions.shape = getPropValue('buttonShape', newVal)
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
        border-right-color: transparent;
        margin-right: -1px;

        &.size--small {
          padding: 0 12px;
        }

        &.shape--round,
        &.shape--circle {
          padding-left: 16px;
        }
      }

      + .#{$prefix}-button {
        position: relative;
        margin-left: 0;
        border-left-width: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

        &::before {
          content: '';
        }

        &.size--small {
          padding: 0 12px;
        }
      }

      &:last-child {
        &.shape--round,
        &.shape--circle {
          padding-right: 16px;
        }
      }
    }
  }
}
</style>
