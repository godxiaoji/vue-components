<template>
  <label :class="[prefix + '-radio']" :disabled="disabled">
    <input
      :class="[prefix + '-radio_input']"
      type="radio"
      :name="groupName"
      :value="value"
      :disabled="disabled"
      @change="onChange"
    />
    <div :class="[prefix + '-radio_box']">
      <icon :class="[prefix + '-radio_icon']" type="radio"></icon>
      <icon :class="[prefix + '-radio_checked-icon']" type="radio_checked"></icon>
    </div>
    <span :class="[prefix + '-radio_text']">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-radio',
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
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  computed: {
    /* 只接受来自分组的name */
    groupName() {
      if (this.$parent && this.$parent.name) {
        return this.$parent.name
      }
      return ''
    }
  },
  model: {
    prop: 'checked',
    event: '_change'
  },
  watch: {
    checked() {
      const inputEl = this.getInputEl()
      const checked = this.checked

      if (checked !== inputEl.checked) {
        inputEl.checked = checked ? true : false

        this.callParent({
          target: inputEl
        })
      }
    }
  },
  created() {
    this._radio_item = true
  },
  ready() {},
  mounted() {
    const inputEl = this.getInputEl()
    const checked = this.checked

    if (checked != inputEl.checked) {
      inputEl.checked = checked ? true : false
    }

    if (this.isGroupParent()) {
      inputEl._app_component = this.$parent

      if (inputEl.checked) {
        this.$parent.updateValue(inputEl)
      }
    }

    inputEl._app_type = 'radio'
  },
  updated() {},
  attached() {},
  methods: {
    isGroupParent() {
      return this.$parent && this.$parent._radio_group
    },
    onChange(e) {
      this.modelChange()

      this.callParent(e)
    },
    /**
     * v-modal checked 的值跟input对齐
     */
    modelChange() {
      const inputChecked = this.getInputChecked()
      const checked = this.checked ? true : false

      if (checked !== inputChecked) {
        this.$emit('_change', inputChecked)
      }
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

      if (inputEl.checked !== false) {
        inputEl.checked = false
        this.modelChange()

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

.#{$prefix}-radio {
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

    &:not([disabled]):checked + .#{$prefix}-radio_box .#{$prefix}-radio_icon {
      display: none;
    }
    &:not([disabled]):checked
      + .#{$prefix}-radio_box
      .#{$prefix}-radio_checked-icon {
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
