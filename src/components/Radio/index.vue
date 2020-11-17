<template>
  <label
    :class="[prefix + '-radio', prefix + '-horizontal-hairline']"
    :disabled="disabled"
  >
    <input
      :class="[prefix + '-radio_input']"
      type="radio"
      :name="formName"
      :value="value"
      :disabled="disabled"
      @change="onChange"
    />
    <div :class="[prefix + '-radio_box']">
      <icon
        :class="[prefix + '-radio_icon']"
        class-name="CircleOutlined"
      ></icon>
      <icon
        :class="[prefix + '-radio_checked-icon']"
        class-name="CheckCircleFilled"
      ></icon>
      <span :class="[prefix + '-radio_text']" v-if="$slots.default">
        <slot></slot>
      </span>
    </div>
  </label>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../../config'
import { isString, isNumber } from '../../helpers/util'

export default {
  name: SDKKey + '-radio',
  components: { Icon },
  inject: {
    appRadioGroup: {
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
      if (this.appRadioGroup) {
        return this.appRadioGroup.formName
      }

      return this.name || ''
    }
  },
  model: {
    prop: 'checked',
    event: '_change'
  },
  watch: {
    checked() {
      if (this.appRadioGroup) {
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
    this.appRadioGroup && this.appRadioGroup.addChild(this)
  },
  ready() {},
  mounted() {
    const $input = this.getInputEl()

    let checked
    if (this.appRadioGroup) {
      checked = this.appRadioGroup.value == this.value
    } else {
      checked = !!this.checked
    }

    if (checked !== $input.checked) {
      $input.defaultChecked = checked
      $input.checked = checked
    }

    $input._app_component = this.appRadioGroup || this
    $input._app_type = 'radio'
  },
  updated() {},
  attached() {},
  beforeDestroy() {
    this.appRadioGroup && this.appRadioGroup.removeChild(this)
  },
  methods: {
    onChange(e) {
      if (this.appRadioGroup) {
        this.appRadioGroup.onChange(this)
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

.#{$prefix}-radio {
  --radio-color: #{$border-color};
  --radio-active-color: #{$primary-color};

  display: inline-flex;
  flex-direction: column;
  align-items: center;
  font-size: 17px;
  color: $title-color;
  text-align: left;
  position: relative;

  + .#{$prefix}-radio {
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
    --color: var(--radio-color);
  }

  &_checked-icon {
    display: none;
    --color: var(--radio-active-color);
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
    margin-left: 12px;
  }

  &[disabled] {
    opacity: 0.3;
  }
}
</style>
