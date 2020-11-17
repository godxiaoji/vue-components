<template>
  <div :class="[prefix + '-select', { focus, disabled }]">
    <div
      :class="[prefix + '-input', { focus }]"
      :disabled="disabled"
      @mouseup="onBoxClick"
    >
      <div :class="[prefix + '-input_input', { placeholder: !formLabel }]">
        {{ formLabel || placeholder }}
      </div>
      <div :class="[prefix + '-input_append']">
        <icon class-name="RightOutlined"></icon>
      </div>
      <input
        :class="[prefix + '-select_input']"
        type="text"
        readonly
        :name="formName"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="formValue"
        @focus="onInputFocus"
        @blur="onInputBlur"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import SelectDrawer from './Drawer.vue'
import Icon from '../Icon'
import { isNumber, isString, isArray, isObject } from '../../helpers/util'
import { SDKKey } from '../../config'
import { createPopup } from '../../helpers/popup'
import formMixin from '../util/form-mixin'

const VISIBILITY_CHANGE_TYPE = 'visibility-change'

function createSelectPicker(parent) {
  const { $wrapper } = createPopup()

  const Comp = Vue.extend({
    extends: SelectDrawer,
    created() {
      this.$parent = parent
    }
  })

  return new Comp({
    propsData: {
      options: parent.options2
    }
  }).$mount($wrapper)
}

export default {
  name: SDKKey + '-select',
  components: { Icon },
  mixins: [formMixin],
  props: {
    options: {
      validator(value) {
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            const option = value[i]

            if (!(isNumber(option) || isString(option) || isObject(option))) {
              return false
            }
          }
        } else {
          return false
        }

        return true
      },
      type: Array,
      default() {
        return []
      }
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return isNumber(value) || isString(value)
      },
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fieldNames: {
      type: Object,
      default() {
        return { label: 'label', value: 'value' }
      }
    }
  },
  data() {
    return {
      prefix: SDKKey,

      focus: false,
      formValue: '',
      formLabel: '',
      defaultValue: '',

      fieldNames2: { label: 'label', value: 'value' },
      options2: []
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  computed: {},
  watch: {
    value() {
      this.updateValue()
    },
    focus(newVal) {
      if (this.picker) {
        if (newVal) {
          this.picker.show()
        } else {
          this.picker.hide()
        }
      }
    },
    options() {
      this.updateOptions()
    },
    fieldNames() {
      this.updateOptions()
    }
  },
  created() {
    this.updateOptions()
    this.updateValue()

    this.defaultValue = this.formValue
  },
  ready() {},
  mounted() {
    const inputEl = this.getInputEl()

    inputEl._app_component = this
    inputEl._app_type = 'select'
  },
  updated() {},
  attached() {},
  destroyed() {
    if (this.picker) {
      this.picker.destroy()
    }
  },
  methods: {
    updateValue() {
      if (!this.updateSelected(this.value)) {
        if (this.value !== '') {
          this.$emit('_change', this.formValue)
          console.error('Invalid prop: "value" is not in "options".')
        }
      }
    },

    updateOptions() {
      if (isObject(this.fieldNames)) {
        if (isString(this.fieldNames.label)) {
          this.fieldNames2.label = this.fieldNames.label
        }
        if (isString(this.fieldNames.value)) {
          this.fieldNames2.value = this.fieldNames.value
        }
      }

      const options = []
      const { label: labelName, value: valueName } = this.fieldNames2

      if (isArray(this.options)) {
        this.options.forEach(item => {
          let option

          if (isNumber(item)) {
            option = {
              label: item.toString(),
              value: item
            }
          } else if (isString(item)) {
            option = {
              label: item,
              value: item
            }
          } else if (
            isObject(item) &&
            (isString(item[valueName]) || isNumber(item[valueName]))
          ) {
            option = {
              label:
                item[labelName] == null ? item[valueName] : item[labelName],
              value: item[valueName],
              disabled: !!item.disabled
            }
          }

          if (option) {
            if (option.value === this.formValue) {
              option.selected = true
            }

            options.push(option)
          }
        })
      }

      this.options2 = options
    },

    onBoxClick() {
      if (!this.disabled) {
        const inputEl = this.getInputEl()

        if (this.focus) {
          inputEl.blur()
        } else {
          this.focus = true

          if (!this.picker) {
            this.picker = createSelectPicker(this, !!this.appFormItem)
          }

          this.$emit(VISIBILITY_CHANGE_TYPE, {
            visibility: true
          })
        }
      }
    },
    onInputFocus(e) {
      this.$emit(e.type, e)
    },
    onInputBlur(e) {
      this.focus = false

      this.$emit(e.type, e)

      this.$emit(VISIBILITY_CHANGE_TYPE, {
        visibility: false
      })
    },
    getInputEl() {
      return this.$el && this.$el.firstElementChild.lastElementChild
    },

    updateSelected(value) {
      let hasValue = false

      this.options2.forEach((option, index) => {
        if (option.value === value) {
          this.formLabel = option.label
          this.formValue = option.value
          hasValue = true
          this.$set(this.options2[index], 'selected', true)
        } else {
          this.$set(this.options2[index], 'selected', false)
        }
      })

      if (!hasValue) {
        this.formValue = ''
        this.formLabel = ''
      }

      return hasValue
    },

    onSelect(value) {
      this.getInputEl().blur()

      this.onChange(value)
    },

    onChange(value) {
      this.updateSelected(value)

      this.$emit('_change', value)

      const type = 'change'

      this.validateAfterEventTrigger(type, this.formValue)

      this.$emit(type, {
        value
      })
    },

    reset() {
      return this._reset(this.getInputEl().value)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-select {
  display: flex;
  width: 100%;
  position: relative;

  &_input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    margin: 0;
    padding: 0;
    border: none;

    &:disabled {
      cursor: not-allowed;
    }
  }

  &_options {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    padding: 10px 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &_option {
    width: 100%;
    box-sizing: border-box;
    padding: 0 12px;
    height: 41px;
    line-height: 41px;
    font-size: 15px;
    color: $title-color;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &.selected {
      color: $primary-color;
    }

    &:hover {
      background-color: $background-color;
    }

    &[disabled],
    &[disabled]:hover {
      background-color: $background2-color;
      color: $font3-color;
      cursor: not-allowed;
    }
  }
}
</style>
