<template>
  <div
    :class="[
      prefix + '-checkbox-group',
      alignClassName,
      {
        'has--prepend': hasPrepend
      }
    ]"
  >
    <div :class="[prefix + '-checkbox-group_prepend']" v-if="hasPrepend">
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
  name: SDKKey + '-checkbox-group',
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
      formValue: []
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
    this._checkbox_group = true
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
      const value = this.formValue.slice(0, 0)

      this.$children.forEach(vm => {
        if (vm._checkbox_item && vm.getInputChecked() === true) {
          value.push(cloneData(vm.value))
        }
      })

      this.formValue = value
    },

    onChange() {
      this.updateValue()

      const value = cloneData(this.formValue)
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
        if (vm._checkbox_item) {
          vm.reset()
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-checkbox-group {
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

    .#{$prefix}-checkbox-group.align--right & {
      flex: 1;
    }
  }
}
</style>
