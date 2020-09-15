<template>
  <label :class="[prefix + '-checkbox']" :disabled="disabled">
    <input
      :class="[prefix + '-checkbox_input']"
      type="checkbox"
      :name="groupName"
      :value="valueString"
      :disabled="disabled"
      @change="onChange"
    />
    <div :class="[prefix + '-checkbox_box']">
      <icon :class="[prefix + '-checkbox_icon']" type="checkbox"></icon>
      <icon
        :class="[prefix + '-checkbox_checked-icon']"
        type="checkbox_checked"
      ></icon>
    </div>
    <span :class="[prefix + '-checkbox_text']">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-checkbox',
  components: { Icon },
  props: {
    value: {
      validator(value) {
        return value != null
      },
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  computed: {
    /* 优先接受来自分组的name */
    groupName() {
      if (this.$parent && this.$parent.name) {
        return this.$parent.name
      }
      return this.name
    },
    valueString() {
      return this.value.toString()
    }
  },
  model: {
    prop: 'checked',
    event: '_change'
  },
  watch: {
    checked() {
      const inputEl = this.getInputEl()
      const checked = !!this.checked

      if (checked !== inputEl.checked) {
        inputEl.checked = checked

        this.callParent({
          target: inputEl
        })
      }
    }
  },
  created() {
    this._checkbox_item = true
  },
  ready() {},
  mounted() {
    const inputEl = this.getInputEl()
    const checked = !!this.checked

    if (checked !== inputEl.checked) {
      inputEl.defaultChecked = checked
      inputEl.checked = checked
    }

    if (this.isGroupParent()) {
      inputEl._app_component = this.$parent

      if (inputEl.checked) {
        this.$parent.updateValue()
      }
    }

    inputEl._app_type = 'checkbox'
  },
  updated() {},
  attached() {},
  methods: {
    onChange(e) {
      this.modelChange(this.getInputChecked())

      this.callParent(e)
    },
    /**
     * v-modal checked 的值跟input对齐
     */
    modelChange(inputChecked) {
      const checked = this.checked ? true : false

      if (checked !== inputChecked) {
        this.$emit('_change', inputChecked)
      }
    },
    isGroupParent() {
      return this.$parent && this.$parent._checkbox_group
    },
    getInputEl() {
      return this.$el && this.$el.firstElementChild
    },
    getInputChecked() {
      return this.getInputEl().checked
    },
    callParent(e) {
      if (this.isGroupParent()) {
        this.$parent.onChange(e)
      }
    },
    reset() {
      const inputEl = this.getInputEl()

      if (inputEl.checked !== inputEl.defaultChecked) {
        this.modelChange((inputEl.checked = inputEl.defaultChecked))

        this.callParent({
          target: inputEl
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-checkbox {
  --color: var(--#{$prefix}-main-color);
  --padding-left-right: 12px;

  display: inline-flex;
  align-items: center;
  font-size: 14px;
  height: 1.715em;
  color: $semi-color;
  padding: 0 var(--padding-left-right);
  text-align: left;
  position: relative;

  &_box {
    display: inline-flex;
    width: 1.429em;
    height: 1.429em;
    box-sizing: border-box;
    margin-right: 0.34em;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  &_icon {
    width: 100%;
    height: 100%;
  }

  &_checked-icon {
    display: none;
    width: 100%;
    height: 100%;
    fill: var(--color);
  }

  &_input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;

    &:not([disabled]):checked
      + .#{$prefix}-checkbox_box
      .#{$prefix}-checkbox_icon {
      display: none;
    }
    &:not([disabled]):checked
      + .#{$prefix}-checkbox_box
      .#{$prefix}-checkbox_checked-icon {
      display: block;
    }
  }

  &_text {
    display: block;
    line-height: 1;
  }

  &[disabled] {
    opacity: 0.3;
  }
}
</style>
