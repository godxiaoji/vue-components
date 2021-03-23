import Icon from '../../Icon'
import formMixin from '../form-mixin'
import multiSelectorPropsMixin from './props-mixin'
import { cloneData, isSameArray, inArray, isEmpty } from '../../helpers/util'
import {
  getDefaultDetail,
  getFormatOptions,
  MODE_NAMES,
  string2Array,
  validateValues
} from './'

export default {
  components: { Icon },
  mixins: [multiSelectorPropsMixin, formMixin],
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formLabel: [],
      formValue: [],
      formLabelString: '',
      formValueString: '',
      detail: getDefaultDetail(),
      defaultDetail: getDefaultDetail(),

      mode: MODE_NAMES[0],
      separator: '/',

      isInitPopup: false,
      popupVisible: true
    }
  },
  watch: {
    modelValue: {
      handler(val) {
        this.updateValue(val)
      }
    },
    options: {
      handler() {
        if (!this.$refs.popup) {
          this.updateValue(this.modelValue)
        }
      }
    }
  },
  created() {
    // 优先确定模式
    if (inArray(this.initialMode, MODE_NAMES)) {
      this.mode = this.initialMode
    }
    // 初始化分隔符
    this.separator = this.initialSeparator

    this.updateValue(this.modelValue)
    this.defaultDetail = cloneData(this.detail)
  },
  mounted() {
    const $input = this.getInputEl()

    $input._app_component = this
    $input._app_type = this.compName
    $input.defaultValue = $input.value
  },
  methods: {
    updateValue(val) {
      if (this.$refs.popup) {
        const popupDetail = this.$refs.popup.updateValue(val)
        this.updateDetail(
          isEmpty(val) && val !== 0 ? getDefaultDetail() : popupDetail
        )
        return
      }

      const values = string2Array(val, this.mode, this.separator)
      const { options, isCascade } = getFormatOptions(
        this.options,
        this.fieldNames,
        this.mode,
        this.compName === 'cascader'
      )

      if (!isSameArray(values, this.formValue)) {
        const validateRet = validateValues(
          values,
          options,
          this.mode,
          this.separator,
          isCascade
        )

        if (validateRet.valid) {
          delete validateRet.valid
          this.updateDetail(validateRet)
        }
      }
    },

    onFieldClick() {
      if (!this.disabled) {
        if (!this.isInitPopup) {
          this.isInitPopup = true
        } else {
          this.popupVisible = true
        }
      }
    },

    onChange(detail) {
      this.updateDetail(detail)

      this.$emit('update:modelValue', this.hookFormValue())
      this.$emit('change', cloneData(detail))

      this.validateAfterEventTrigger('change', this.formValue)
    },

    updateDetail(detail) {
      if (!isSameArray(detail.value, this.formValue)) {
        this.$emit('value-change', cloneData(detail))
      }

      this.detail = detail
      this.formValue = detail.value
      this.formLabel = detail.label
      this.formValueString = detail.valueString
      this.formLabelString = detail.labelString
    },

    hookFormValue() {
      return this.formatString
        ? this.formValueString
        : cloneData(this.formValue)
    },

    reset() {
      this.updateValue(this.getInputEl().value)

      this.$emit('update:modelValue', this.hookFormValue())

      this.$emit('reset', { name: this.formName, value: this.hookFormValue() })

      return this.hookFormValue()
    }
  }
}
