import Icon from '../../Icon'
import { initPickerPopup } from '../../../helpers/popup'
import formMixin from '../form-mixin'
import mulitSelectorPropsMixin from './props-mixin'
import { cloneData, isSameArray, inArray } from '../../../helpers/util'
import {
  getDefaultDetail,
  getFormatOptions,
  isEmpty,
  MODE_NAMES,
  string2Array,
  validateValues
} from './'

export default {
  components: { Icon },
  mixins: [mulitSelectorPropsMixin, formMixin],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
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
      separator: '/'
    }
  },
  watch: {
    value: {
      handler(val) {
        this.updateValue(val)
      }
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  created() {
    // 优先确定模式
    if (inArray(this.initialMode, MODE_NAMES)) {
      this.mode = this.initialMode
    }
    // 初始化分隔符
    this.separator = this.initialSeparator

    this.updateValue(this.value)
    this.defaultDetail = cloneData(this.detail)
  },
  mounted() {
    const $input = this.getInputEl()

    $input._app_component = this
    $input._app_type = this.compName
    $input.defaultValue = $input.value
  },
  methods: {
    initPopup(Popup) {
      const parent = this

      this.popup = initPickerPopup(
        parent,
        {
          methods: {
            afterChange(detail) {
              parent.onChange(detail)
            }
          }
        },
        [
          { propName: 'initialMode', parentName: 'initialMode', watch: false },
          {
            propName: 'initialSeparator',
            parentName: 'initialSeparator',
            watch: false
          },
          { propName: 'formatString', parentName: 'formatString', watch: true },
          { propName: 'value', parentName: 'formValue', watch: false },
          { propName: 'title', parentName: 'placeholder', watch: true },
          { propName: 'options', parentName: 'options', watch: true },
          { propName: 'fieldNames', parentName: 'fieldNames', watch: true }
        ],
        Popup
      )
    },

    updateValue(val) {
      if (this.popup) {
        const popupDetail = this.popup.updateValue(val)
        this.updateDetail(isEmpty(val) ? getDefaultDetail() : popupDetail)
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

        if (validateRet.vaild) {
          delete validateRet.vaild
          this.updateDetail(validateRet)
        }
      }
    },

    onFieldClick() {
      if (!this.disabled) {
        if (!this.popup) {
          this.initPopup(this.Popup)
          delete this.Popup
        } else {
          this.popup.show()
        }
      }
    },

    getInputEl() {
      return this.$el && this.$el.querySelector('input')
    },

    onChange(detail) {
      this.updateDetail(detail)

      this.$emit('_change', this.hookFormValue())
      this.$emit('change', cloneData(detail))

      this.validateAfterEventTrigger('change', this.formValue)
    },

    updateDetail(detail) {
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

      this.$emit('_change', this.hookFormValue())

      this.$emit('reset', { name: this.formName, value: this.hookFormValue() })

      return this.hookFormValue()
    }
  }
}
