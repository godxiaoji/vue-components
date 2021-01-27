<template>
  <label
    class="fx-radio fx-horizontal-hairline"
    :class="{ disabled: disabled2 }"
  >
    <input
      class="fx-radio_input"
      type="radio"
      :name="formName"
      :value="value"
      :disabled="disabled2"
      @change="onChange"
    />
    <div class="fx-radio_box">
      <icon class="fx-radio_icon" icon="CircleOutlined" />
      <icon class="fx-radio_checked-icon" icon="CheckCircleFilled" />
      <span class="fx-radio_text" v-if="$slots.default">
        <slot></slot>
      </span>
    </div>
  </label>
</template>

<script>
import Icon from '../Icon'
import { isStringNumberMix } from '../helpers/util'

export default {
  name: 'fx-radio',
  components: { Icon },
  inject: {
    appRadioGroup: {
      default: null
    }
  },
  props: {
    value: {
      validator: isStringNumberMix,
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
  computed: {
    /* 优先接受来自分组的name */
    formName() {
      if (this.appRadioGroup) {
        return this.appRadioGroup.formName
      }

      return this.name || ''
    },
    disabled2() {
      if (this.appRadioGroup) {
        return this.appRadioGroup.disabled
      }

      return this.disabled
    }
  },
  model: {
    prop: 'checked',
    event: 'update:checked'
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
  mounted() {
    const $input = this.getInputEl()

    let checked
    if (this.appRadioGroup) {
      checked = this.appRadioGroup.modelValue == this.value
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
  beforeDestroy() {
    this.appRadioGroup && this.appRadioGroup.removeChild(this)
  },
  methods: {
    onChange(e) {
      if (this.appRadioGroup) {
        this.appRadioGroup.onChange(this)
      } else {
        this.$emit('update:checked', e.target.checked)
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
