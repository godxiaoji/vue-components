<template>
  <label class="checkbox" :disabled="disabled">
    <input
      class="checkbox-input"
      type="checkbox"
      :name="groupName"
      :value="value"
      :disabled="disabled"
      @change="onChange"
    />
    <div class="checkbox-box">
      <icon class="checkbox-icon" type="checkbox"></icon>
      <icon class="checkbox-checked-icon" type="checkbox_checked"></icon>
    </div>
    <span class="checkbox-text">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import Icon from '../Icon/Icon.vue'

export default {
  name: 'app-checkbox',
  components: { Icon },
  props: {
    value: {
      type: String,
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
    /* 只接受来自分组的name */
    groupName() {
      if (this.$parent && this.$parent.name) {
        return this.$parent.name
      }
      return ''
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

<style scoped>
@import url('../../global.css');

.checkbox {
  --color: var(--app-main-color);

  display: inline-flex;
  align-items: center;
  font-size: 14px;
  height: 1.715em;
  color: var(--app-semi-color);
  padding: 4px;
  text-align: left;
}

.checkbox-box {
  display: inline-flex;
  width: 1.429em;
  height: 1.429em;
  box-sizing: border-box;
  margin-right: 0.34em;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.checkbox-icon {
  width: 100%;
  height: 100%;
}

.checkbox-checked-icon {
  display: none;
  width: 100%;
  height: 100%;
  fill: var(--color);
}

.checkbox-input:not([disabled]):checked + .checkbox-box .checkbox-icon {
  display: none;
}

.checkbox-input:not([disabled]):checked + .checkbox-box .checkbox-checked-icon {
  display: block;
}

.checkbox-input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.checkbox-text {
  display: block;
  line-height: 1;
}

.checkbox[disabled] {
  opacity: 0.3;
}
</style>
