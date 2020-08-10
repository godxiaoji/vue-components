<template>
  <div
    class="ly-radio-group"
    :class="[
      alignClassName,
      {
        'has--prepend': hasPrepend
      }
    ]"
  >
    <div class="ly-radio-group_prepend" v-if="hasPrepend">
      <slot name="prepend"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { CustomEvent } from '../../helpers/events'
import { cloneData, inArray } from '../../helpers/util'

const ALIGN_NAMES = ['left', 'right']

export default {
  name: 'ly-radio-group',
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

<style>
.ly-radio-group {
  --padding-left-right: 12px;

  display: flex;
  width: 100%;
  height: 32px;
  align-items: center;
  color: var(--ly-semi-color);
  box-sizing: border-box;
}

.ly-radio-group.align--right {
  justify-content: flex-end;
}

.ly-radio-group_prepend {
  padding: 0 var(--padding-left-right);
}

.ly-radio-group.align--right .ly-radio-group_prepend {
  flex: 1;
}
</style>
