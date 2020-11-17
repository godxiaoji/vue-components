<template>
  <label
    :class="[prefix + '-checkbox', prefix + '-horizontal-hairline']"
    :disabled="disabled"
  >
    <input
      :class="[prefix + '-checkbox_input']"
      type="checkbox"
      :name="formName"
      :value="valueString"
      :disabled="disabled"
      @change="onChange"
    />
    <div :class="[prefix + '-checkbox_box']">
      <icon
        :class="[prefix + '-checkbox_icon']"
        class-name="BorderOutlined"
      ></icon>
      <icon
        :class="[prefix + '-checkbox_checked-icon']"
        class-name="CheckSquareFilled"
      ></icon>
      <span :class="[prefix + '-checkbox_text']" v-if="$slots.default">
        <slot></slot>
      </span>
    </div>
  </label>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../../config'
import { inArray, isString, isNumber } from '../../helpers/util'

export default {
  name: SDKKey + '-checkbox',
  components: { Icon },
  inject: {
    appCheckboxGroup: {
      default: null
    }
  },
  props: {
    value: {
      validator(val) {
        return isString(val) || isNumber(val)
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
    formName() {
      if (this.appCheckboxGroup) {
        return this.appCheckboxGroup.formName
      }

      return this.name || ''
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
      if (this.appCheckboxGroup) {
        return
      }

      const $input = this.getInputEl()
      const checked = !!this.checked

      if (checked !== $input.checked) {
        $input.checked = checked
      }
    }
  },
  created() {
    this.appCheckboxGroup && this.appCheckboxGroup.addChild(this)
  },
  ready() {},
  mounted() {
    const $input = this.getInputEl()

    let checked
    if (this.appCheckboxGroup) {
      checked = inArray(this.value, this.appCheckboxGroup.value)
    } else {
      checked = !!this.checked
    }

    if (checked !== $input.checked) {
      $input.defaultChecked = checked
      $input.checked = checked
    }

    $input._app_component = this.appCheckboxGroup || this
    $input._app_type = 'checkbox'
  },
  updated() {},
  attached() {},
  beforeDestroy() {
    this.appCheckboxGroup && this.appCheckboxGroup.removeChild(this)
  },
  methods: {
    onChange(e) {
      if (this.appCheckboxGroup) {
        this.appCheckboxGroup.onChange(this)
      } else {
        this.$emit('_change', e.target.checked)
      }
    },
    getInputEl() {
      return this.$el && this.$el.firstElementChild
    },
    getInputChecked() {
      return !!this.getInputEl().checked
    },
    setChecked(checked = true) {
      this.getInputEl().checked = checked
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-checkbox {
  --checkbox-color: #{$border-color};
  --checkbox-active-color: #{$primary-color};

  display: inline-flex;
  flex-direction: column;
  align-items: center;
  font-size: 17px;
  color: $title-color;
  text-align: left;
  position: relative;

  + .#{$prefix}-checkbox {
    margin-left: 16px;
  }

  &_box {
    display: flex;
    width: 100%;
    height: 32px;
    box-sizing: border-box;
    align-items: center;
    box-sizing: border-box;
  }

  &_icon,
  &_checked-icon {
    --size: 24px;
    --color: var(--checkbox-color);
  }

  &_checked-icon {
    display: none;
    --color: var(--checkbox-active-color);
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
    margin-left: 12px;
  }

  &[disabled] {
    opacity: 0.3;
  }
}
</style>
