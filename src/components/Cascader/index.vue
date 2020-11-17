<template>
  <div
    :class="[
      prefix + '-cascader',
      {
        focus,
        disabled
      }
    ]"
  >
    <div
      :class="[prefix + '-input', { focus }]"
      :disabled="disabled"
      @mouseup="onBoxClick"
    >
      <div
        :class="[prefix + '-input_input', { placeholder: !formLabelString }]"
      >
        {{ formLabelString || placeholder }}
      </div>
      <div :class="[prefix + '-input_append']">
        <icon class-name="RightOutlined"></icon>
      </div>
      <input
        :class="[prefix + '-cascader_input']"
        type="text"
        readonly
        :name="formName"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="formValueString"
        @focus="onInputFocus"
        @blur="onInputBlur"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Icon from '../Icon'
import CascaderDrawer from './Drawer.vue'
import { SDKKey } from '../../config'
import { createPopup } from '../../helpers/popup'
import formMixin from '../util/form-mixin'
import pickerMixin from '../util/picker-mixin'

const VISIBILITY_CHANGE_TYPE = 'visibility-change'

function createCascaderPicker(parent) {
  const { $wrapper } = createPopup()

  const Comp = Vue.extend({
    extends: CascaderDrawer,
    created() {
      this.$parent = parent
    }
  })

  return new Comp({
    propsData: {
      placeholder: parent.placeholder,
      options: parent.options2,
      mode: parent.mode,
      separator: parent.separator
    }
  }).$mount($wrapper)
}

export default {
  name: SDKKey + '-cascader',
  components: { Icon },
  mixins: [pickerMixin, formMixin],
  props: {},
  data() {
    return {
      prefix: SDKKey,

      focus: false,
      cascader: true // 表明是级联选择器
    }
  },
  watch: {
    focus(newVal) {
      if (this.picker) {
        if (newVal) {
          this.picker.show()
        } else {
          this.picker.hide()
        }
      }
    }
  },
  mounted() {
    const $input = this.getInputEl()

    $input._app_component = this
    $input._app_type = 'cascader'
  },
  destroyed() {
    if (this.picker) {
      this.picker.destroy()
    }
  },
  methods: {
    afterUpdate() {},

    /**
     * 组件点击
     */
    onBoxClick() {
      if (!this.disabled) {
        const $input = this.getInputEl()

        if (this.focus) {
          // 如果组件已经展开，则收起
          $input.blur()
        } else {
          this.focus = true

          if (!this.picker) {
            this.picker = createCascaderPicker(this, !!this.appFormItem)
          }
          this.picker.parseDropdown(this.formValue)

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
      return this.$el && this.$el.querySelector('input')
    },

    onSelect(item) {
      this.formValue = item.values
      this.formLabel = item.labels

      this.getInputEl().blur()
      this.onChange()
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-cascader {
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

  &_groups {
    box-sizing: border-box;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    text-align: center;
    position: relative;
  }

  &_group {
    position: relative;
    height: 100%;
    min-width: 60px;
    display: inline-flex;
    flex: 0 0 auto;
    vertical-align: top;
    color: $font2-color;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      content: '';
    }

    &:last-child::after {
      content: none;
    }
  }

  &_group:last-child {
    color: $title-color;
  }

  &_list {
    width: 100%;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    user-select: none;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &_item {
    padding: 0 0 0 12px;
    height: 45px;
    font-size: 15px;
    cursor: pointer;
    overflow: hidden;
    position: relative;

    &.selected {
      color: $primary-color;
    }

    &::after {
      content: '';
      position: absolute;
      left: 12px;
      width: 100%;
      bottom: 0;
    }

    &.disabled {
      color: $font3-color;
      cursor: not-allowed;
    }

    &-text {
      flex: 1;
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      padding-right: 12px;
      height: 100%;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
