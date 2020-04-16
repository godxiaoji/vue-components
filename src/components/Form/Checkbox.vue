<template>
  <label class="ly-checkbox" :disabled="disabled">
    <input
      class="ly-checkbox_input"
      type="checkbox"
      :name="groupName"
      :value="valueString"
      :disabled="disabled"
      @change="onChange"
    />
    <div class="ly-checkbox_box">
      <icon class="ly-checkbox_icon" type="checkbox"></icon>
      <icon class="ly-checkbox_checked-icon" type="checkbox_checked"></icon>
    </div>
    <span class="ly-checkbox_text">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import Icon from '../Icon/Icon.vue'

export default {
  name: 'ly-checkbox',
  components: { Icon },
  props: {
    value: {
      validator(value) {
        return value != null
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
  model: {
    prop: 'checked',
    event: '_change'
  },
  data() {
    return {}
  },
  computed: {
    /* 优先接受来自分组的name */
    groupName() {
      if (this.$parent && this.$parent.name) {
        return this.$parent.name
      }
      return this.name
    },
    valueString() {
      return this.value.toString()
    }
  },
  watch: {
    checked() {
      const inputEl = this.getInputEl()
      const checked = this.checked

      if (checked != inputEl.checked) {
        inputEl.checked = checked ? true : false
        this.callParent({})
      }
    }
  },
  created() {
    this._checkbox_item = true
  },
  ready() {},
  mounted() {
    const inputEl = this.getInputEl()
    const checked = this.checked

    if (checked != inputEl.checked) {
      inputEl.checked = checked ? true : false
    }

    if (this.isGroupParent()) {
      inputEl._app_component = this.$parent

      if (inputEl.checked) {
        this.$parent.updateValue()
      }
    }

    inputEl._app_type = 'checkbox'
  },
  updated() {},
  attached() {},
  methods: {
    onChange(e) {
      this.modelChange()

      this.callParent(e)
    },
    /**
     * v-modal checked 的值跟input对齐
     */
    modelChange() {
      const inputChecked = this.getInputChecked()
      const checked = this.checked ? true : false

      if (checked !== inputChecked) {
        this.$emit('_change', inputChecked)
      }
    },
    isGroupParent() {
      return this.$parent && this.$parent._checkbox_group
    },
    getInputEl() {
      return this.$el && this.$el.firstElementChild
    },
    getInputChecked() {
      return this.getInputEl().checked
    },
    callParent(e) {
      if (this.isGroupParent()) {
        this.$parent.onChange(e)
      }
    },
    reset() {
      const inputEl = this.getInputEl()

      if (inputEl.checked !== false) {
        inputEl.checked = false
        this.modelChange()

        this.callParent({})
      }
    }
  }
}
</script>

<style>
@import url('../../global.css');

.ly-checkbox {
  --color: var(--ly-main-color);
  --padding-left-right: 12px;

  display: inline-flex;
  align-items: center;
  font-size: 14px;
  height: 1.715em;
  color: var(--ly-semi-color);
  padding: 0 var(--padding-left-right);
  text-align: left;
}

.ly-checkbox_box {
  display: inline-flex;
  width: 1.429em;
  height: 1.429em;
  box-sizing: border-box;
  margin-right: 0.34em;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.ly-checkbox_icon {
  width: 100%;
  height: 100%;
}

.ly-checkbox_checked-icon {
  display: none;
  width: 100%;
  height: 100%;
  fill: var(--color);
}

.ly-checkbox_input:not([disabled]):checked
  + .ly-checkbox_box
  .ly-checkbox_icon {
  display: none;
}

.ly-checkbox_input:not([disabled]):checked
  + .ly-checkbox_box
  .ly-checkbox_checked-icon {
  display: block;
}

.ly-checkbox_input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.ly-checkbox_text {
  display: block;
  line-height: 1;
}

.ly-checkbox[disabled] {
  opacity: 0.3;
}
</style>
