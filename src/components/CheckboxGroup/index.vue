<template>
  <div :class="[prefix + '-checkbox-group', { vertical: !inline }]">
    <slot></slot>
  </div>
</template>

<script>
import {
  isStringNumberMixArray,
  cloneData,
  isSameArray,
  inArray
} from '../../helpers/util'
import { SDKKey } from '../../config'
import formMixin from '../util/form-mixin'

export default {
  name: SDKKey + '-checkbox-group',
  mixins: [formMixin],
  provide() {
    return {
      appCheckboxGroup: this
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      validator(value) {
        return isStringNumberMixArray(value)
      },
      default() {
        return []
      }
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey,

      formValue: [],
      appChildren: []
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  computed: {},
  watch: {},
  created() {},
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  methods: {
    updateValue() {
      const value = this.formValue.slice(0, 0)

      for (let i = 0; i < this.appChildren.length; i++) {
        const child = this.appChildren[i]

        if (child.getInputChecked()) {
          value.push(cloneData(child.value))
        }
      }

      this.formValue = value

      if (!isSameArray(value, this.value)) {
        this.$emit('_change', this.hookFormValue())
      }
    },

    onChange() {
      this.updateValue()

      const type = 'change'

      this.$emit(type, {
        value: this.hookFormValue()
      })

      this.validateAfterEventTrigger(type, this.hookFormValue())
    },

    hookFormValue() {
      return cloneData(this.formValue)
    },

    addChild(vm) {
      if (
        !inArray(
          vm._uid,
          this.appChildren.map(({ _uid }) => {
            return _uid
          })
        )
      ) {
        this.appChildren.push(vm)
      }
    },

    removeChild(vm) {
      const index = this.appChildren
        .map(({ _uid }) => {
          return _uid
        })
        .indexOf(vm._uid)

      if (index !== -1) {
        this.appChildren.splice(index, 1)
      }
    },

    reset() {
      const value = this.formValue.slice(0, 0)

      for (let i = 0; i < this.appChildren.length; i++) {
        const child = this.appChildren[i]

        if (child.getInputChecked()) {
          value.push(cloneData(child.value))
        }
      }

      this.formValue = value

      if (!isSameArray(value, this.value)) {
        this.$emit('_change', this.hookFormValue())
      }

      this.$emit('reset', { name: this.formName, value: this.hookFormValue() })

      return this.hookFormValue()
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-checkbox-group {
  display: flex;
  height: 32px;
  align-items: center;
  color: $title-color;
  box-sizing: border-box;
  flex: 1;

  &.vertical {
    flex-direction: column;
    height: auto;
    min-height: 32px;

    .#{$prefix}-checkbox {
      display: flex;
      width: 100%;

      + .#{$prefix}-checkbox {
        margin-left: 0;

        &::before {
          content: '';
        }
      }
    }
  }
}
</style>
