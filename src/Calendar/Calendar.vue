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
      :class="[prefix + '-input', { 'has--value': formLabel }]"
      :disabled="disabled"
      @click="onFieldClick"
    >
      <div :class="[prefix + '-input_input', { placeholder: !formLabel }]">
        {{ formLabel || placeholder }}
      </div>
      <icon
        :class="[prefix + '-input_arrow']"
        icon="RightOutlined"
      />
      <input
        :class="[prefix + '-input_cover']"
        type="text"
        readonly
        :name="formName"
        :disabled="disabled"
        :value="formLabel"
      />
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import CalendarPopup from './Popup.vue'
import { SDKKey } from '../config'
import { initPickerPopup } from '../helpers/popup'
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
  components: { Icon },
  mixins: [mixin, formMixin],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    formatter: {
      type: Function,
      default: null
    },
    popupShowConfirm: {
      type: Boolean,
      default: false
    },
    popupShowClose: {
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
      defaultDetail: getDefaultDetail()
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
    initPopup() {
      const parent = this

      this.popup = initPickerPopup(
        parent,
        {
          methods: {
            afterConfirm(detail) {
              parent.onConfirm(detail)
            }
          }
        },
        [
          { propName: 'initialType', parentName: 'initialType', watch: false },
          { propName: 'modelValue', parentName: 'modelValue', watch: false },
          { propName: 'minDate', parentName: 'minDate', watch: true },
          { propName: 'maxDate', parentName: 'maxDate', watch: true },
          { propName: 'allowSameDay', parentName: 'allowSameDay', watch: true },
          { propName: 'maxRange', parentName: 'maxRange', watch: true },
          {
            propName: 'showConfirm',
            parentName: 'popupShowConfirm',
            watch: true
          },
          { propName: 'showClose', parentName: 'popupShowClose', watch: true },
          { propName: 'title', parentName: 'placeholder', watch: true },
          { propName: 'dayHandler', parentName: 'dayHandler', watch: true }
        ],
        CalendarPopup
      )
    },

    onFieldClick() {
      if (!this.disabled) {
        if (!this.popup) {
          this.initPopup()
        } else {
          this.popup.show()
        }
      }
    },

    getInputEl() {
      return this.$el && this.$el.querySelector('input')
    },

    onConfirm(detail) {
      if (isSameDate(detail.value, this.detail.value)) {
        return
      }

      this.updateDetail(detail)
      const formatValue = this.hookFormValue()
      this._changeValue = formatValue
      this.$emit('_change', formatValue)
      this.$emit('change', cloneDetail(detail))

      this.validateAfterEventTrigger('change', this.formValue)
    },

    updateValue(val) {
      if (this.popup) {
        this.updateDetail(this.popup.updateValue(val))
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

      this.$emit('_change', this.hookFormValue())

      this.$emit('reset', { name: this.formName, value: this.hookFormValue() })

      return this.hookFormValue()
    }
  }
}
</script>
