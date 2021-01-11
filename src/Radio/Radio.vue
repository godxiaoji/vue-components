<template>
  <label :class="[prefix + '-radio', prefix + '-horizontal-hairline']" :disabled="disabled">
    <input
      :class="[prefix + '-radio_input']"
      type="radio"
      :name="formName"
      :value="value"
      :disabled="disabled"
      @change="onChange"
    />
    <div :class="[prefix + '-radio_box']">
      <icon :class="[prefix + '-radio_icon']" icon="CircleOutlined" />
      <icon :class="[prefix + '-radio_checked-icon']" icon="CheckCircleFilled" />
      <span :class="[prefix + '-radio_text']" v-if="$slots.default">
        <slot></slot>
      </span>
    </div>
  </label>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../config'
import { isStringNumberMix } from '../helpers/util'

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
