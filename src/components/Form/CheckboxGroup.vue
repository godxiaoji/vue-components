<template>
  <div
    class="ly-checkbox-group"
    :class="[
      alignClassName,
      {
        'has--prepend': hasPrepend
      }
    ]"
  >
    <div class="ly-checkbox-group_prepend" v-if="hasPrepend">
      <slot name="prepend"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { getHandleEvent } from '../../helpers/events'
import { cloneData, inArray } from '../../helpers/util'

const ALIGN_NAMES = ['left', 'right']

export default {
  name: 'ly-checkbox-group',
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

    onChange(e) {
      this.updateValue()

      const value = cloneData(this.formValue)
      const type = 'change'
      const handleEvent = getHandleEvent(
        this.$el,
        e,
        {
          value
        },
        type
      )

      this.$emit(type, handleEvent)
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

<style>
.ly-checkbox-group {
  --padding-left-right: 12px;

  display: flex;
  width: 100%;
  height: 32px;
  align-items: center;
  color: var(--ly-semi-color);
  box-sizing: border-box;
}

.ly-checkbox-group.align--right {
  justify-content: flex-end;
}

.ly-checkbox-group_prepend {
  padding: 0 var(--padding-left-right);
}

.ly-checkbox-group.align--right .ly-checkbox-group_prepend {
  flex: 1;
}
</style>
