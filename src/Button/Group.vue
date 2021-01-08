<template>
  <div
    :class="[
      prefix + '-button-group',
      'size--' + subOptions.size,
      'pattern--' + subOptions.pattern,
      'shape--' + subOptions.shape,
      'count--' + (buttonIds.length || 1)
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
import { SDKKey } from '../config'
import { inArray } from '../helpers/util'
import { createEnumsValidator, getEnumsValue } from '../helpers/validator'

export default {
  name: SDKKey + '-button-group',
  provide() {
    return {
      appButtonGroupSubOptions: this.subOptions,
      appButtonGroup: this
    }
  },
  props: {
    size: {
      validator: createEnumsValidator('buttonSize'),
      default: null
    },
    pattern: {
      validator: createEnumsValidator('buttonPattern'),
      default: null
    },
    shape: {
      validator: createEnumsValidator('buttonShape'),
      default: null
    }
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
  watch: {
    size: {
      immediate: true,
      handler(newVal) {
        this.subOptions.size = getEnumsValue('buttonSize', newVal)
      }
    },
    pattern: {
      immediate: true,
      handler(newVal) {
        this.subOptions.pattern = getEnumsValue('buttonPattern', newVal)
      }
    },
    shape: {
      immediate: true,
      handler(newVal) {
        this.subOptions.shape = getEnumsValue('buttonShape', newVal)
      }
    }
  },
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
