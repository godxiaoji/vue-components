<template>
  <label
    :class="[
      prefix + '-checkbox',
      prefix + '-horizontal-hairline',
      { disabled: disabled2 }
    ]"
  >
    <input
      :class="[prefix + '-checkbox_input']"
      type="checkbox"
      :name="formName"
      :value="value"
      :disabled="disabled2"
      @change="onChange"
    />
    <div :class="[prefix + '-checkbox_box']">
      <icon :class="[prefix + '-checkbox_icon']" icon="BorderOutlined" />
      <icon
        :class="[prefix + '-checkbox_checked-icon']"
        icon="CheckSquareFilled"
      />
      <span :class="[prefix + '-checkbox_text']" v-if="$slots.default">
        <slot></slot>
      </span>
    </div>
  </label>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../config'
import { inArray, isStringNumberMix } from '../helpers/util'

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
    disabled2() {
      if (this.appCheckboxGroup) {
        return this.appCheckboxGroup.disabled
      }

      return this.disabled
    }
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
  mounted() {
    const $input = this.getInputEl()

    let checked
    if (this.appCheckboxGroup) {
      checked = inArray(this.value, this.appCheckboxGroup.modelValue)
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
  beforeUnmount() {
    this.appCheckboxGroup && this.appCheckboxGroup.removeChild(this)
  },
  emits: ['update:checked'],
  methods: {
    onChange(e) {
      if (this.appCheckboxGroup) {
        this.appCheckboxGroup.onChange(this)
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
