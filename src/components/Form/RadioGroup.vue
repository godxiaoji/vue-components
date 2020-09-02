<template>
  <div
    :class="[
      prefix + '-radio-group',
      alignClassName,
      {
        'has--prepend': hasPrepend
      }
    ]"
  >
    <div :class="[prefix + '-radio-group_prepend']" v-if="hasPrepend">
      <slot name="prepend"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { CustomEvent } from '../../helpers/events'
import { cloneData, inArray } from '../../helpers/util'
import { SDKKey } from '../../config'

const ALIGN_NAMES = ['left', 'right']

export default {
  name: SDKKey + '-radio-group',
  props: {
    name: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      value: 'left'
    }
  },
  data() {
    return {
      prefix: SDKKey,

      hasPrepend: false,
      formValue: ''
    }
  },
  computed: {
    alignClassName() {
      return (
        'align--' +
        (inArray(this.align, ALIGN_NAMES) ? this.align : ALIGN_NAMES[0])
      )
    }
  },
  watch: {},
  created() {
    this._radio_group = true
  },
  ready() {},
  mounted() {
    if (this.$scopedSlots.prepend) {
      this.hasPrepend = true
    }
  },
  updated() {},
  attached() {},
  methods: {
    updateValue() {
      let value = ''

      for (let i = 0; i < this.$children.length; i++) {
        const vm = this.$children[i]

        if (vm._radio_item) {
          if (vm.getInputChecked()) {
            value = cloneData(vm.value)
            break
          }
        }
      }

      this.formValue = value
    },

    onChange(e) {
      this.updateValue(e.target)

      const value = this.formValue
      const type = 'change'

      this.$emit(
        type,
        new CustomEvent(
          { type, currentTarget: this.$el },
          {
            value
          }
        )
      )
    },

    hookFormValue() {
      return cloneData(this.formValue)
    },

    reset() {
      this.$children.forEach(vm => {
        if (vm._radio_item) {
          vm.reset()
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-radio-group {
  --padding-left-right: 12px;

  display: flex;
  width: 100%;
  height: 32px;
  align-items: center;
  color: $semi-color;
  box-sizing: border-box;

  &.align--right {
    justify-content: flex-end;
  }

  &_prepend {
    padding: 0 var(--padding-left-right);

    .#{$prefix}-radio-group.align--right & {
      flex: 1;
    }
  }
}
</style>
