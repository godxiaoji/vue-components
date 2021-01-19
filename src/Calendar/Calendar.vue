<template>
  <div
    :class="[
      prefix + '-calendar',
      {
        disabled
      }
    ]"
  >
    <div
      :class="[prefix + '-input', { 'has--value': formLabel, disabled }]"
      @click="onFieldClick"
    >
      <div :class="[prefix + '-input_input', { placeholder: !formLabel }]">
        {{ formLabel || placeholder }}
      </div>
      <icon :class="[prefix + '-input_arrow']" icon="RightOutlined" />
      <input
        :class="[prefix + '-input_cover']"
        type="text"
        readonly
        :name="formName"
        :disabled="disabled"
        :value="formLabel"
      />
    </div>
    <calendar-popup
      v-bind="$props"
      :title="placeholder"
      v-model:visible="popupVisible"
      v-if="isInitPopup"
      @confirm="onConfirm"
      ref="popup"
    />
  </div>
</template>

<script>
import Icon from '../Icon'
import CalendarPopup from './Popup.vue'
import { SDKKey } from '../config'
import formMixin from '../util/form-mixin'
import mixin from './mixin'
import {
  cloneDetail,
  getDefaultDetail,
  getDetail,
  isSameDate,
  parseValues
} from './util'
import { isFunction, isUndefined } from '../helpers/util'
import dayjs from 'dayjs'

export default {
  name: SDKKey + '-calendar',
  components: { Icon, CalendarPopup },
  mixins: [mixin, formMixin],
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    formatter: {
      type: Function,
      default: null
    },
    showConfirm: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey,

      formValue: [],
      formLabel: '',
      detail: getDefaultDetail(),
      defaultDetail: getDefaultDetail(),

      isInitPopup: false,
      popupVisible: true
    }
  },
  watch: {
    modelValue: {
      handler(val) {
        if (!isUndefined(this._changeValue) && this._changeValue == val) {
          //
        } else {
          this.updateValue(val)
        }

        delete this._changeValue
      }
    }
  },
  created() {
    this.updateValue(this.modelValue)
    this.defaultDetail = cloneDetail(this.detail)
  },
  mounted() {
    const $input = this.getInputEl()

    $input._app_component = this
    $input._app_type = 'calendar'
    $input.defaultValue = $input.value
  },
  methods: {
    onFieldClick() {
      if (!this.disabled) {
        if (!this.isInitPopup) {
          this.isInitPopup = true
        } else {
          this.popupVisible = true
        }
      }
    },

    onConfirm(detail) {
      if (isSameDate(detail.value, this.detail.value)) {
        return
      }

      this.updateDetail(detail)
      const formatValue = this.hookFormValue()
      this._changeValue = formatValue
      this.$emit('update:modelValue', formatValue)
      this.$emit('change', cloneDetail(detail))

      this.validateAfterEventTrigger('change', this.formValue)
    },

    updateValue(val) {
      if (this.$refs.popup) {
        this.updateDetail(this.$refs.popup.updateValue(val))
      } else {
        this.updateDetail(
          getDetail(parseValues(val, this.initialType), this.initialType)
        )
      }
    },

    updateDetail(detail) {
      this.detail = detail
      this.formValue = detail.value
      this.formLabel = detail.label
    },

    hookFormValue() {
      const newValue = cloneDetail(this.detail).value
      if (isFunction(this.formatter)) {
        return this.formatter(newValue, function formatter(template) {
          return newValue.map(date => {
            return dayjs(date).format(template)
          })
        })
      }
      return newValue
    },

    reset() {
      this.updateValue(this.defaultDetail.value)

      this.$emit('update:modelValue', this.hookFormValue())

      this.$emit('reset', { name: this.formName, value: this.hookFormValue() })

      return this.hookFormValue()
    }
  }
}
</script>
